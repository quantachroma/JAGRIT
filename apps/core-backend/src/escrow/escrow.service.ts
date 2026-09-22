import { query } from '../db/client';

export class EscrowProjectNotFoundError extends Error {
	statusCode = 404;
	constructor() {
		super('No project found for the supplied project/challenge ID.');
	}
}

export interface Tranche3Evidence {
	nocUrl: string;
	omHandoverVerified: boolean;
	sparesKitProofUrl: string;
	installationVerified: boolean;
	jalSahiyasTrained: number;
}

export type SlaStatus = 'ON_TRACK' | 'WARNING_DAY_7' | 'ESCALATION_DAY_14' | 'DRAW_DOWN_FROZEN_DAY_30';

export function validateTranche2Requirements(nablCertUrl: string, evaluatorApproved: boolean): void {
	assertNonEmpty(nablCertUrl, 'NABL certificate URL');
	if (!evaluatorApproved) throw new Error('Tranche 2 requires Evaluator approval.');
}

export function validateTranche3Requirements(evidence: Tranche3Evidence): void {
	assertNonEmpty(evidence.nocUrl, 'PESA or standard NOC URL');
	assertNonEmpty(evidence.sparesKitProofUrl, 'Spares kit proof URL');
	if (!evidence.omHandoverVerified) throw new Error('Tranche 3 requires verified O&M handover.');
	if (!evidence.installationVerified) throw new Error('Tranche 3 requires verified installation.');
	if (evidence.jalSahiyasTrained < 2) throw new Error('Tranche 3 requires two trained Jal Sahiyas.');
}

export function getSlaStatus(startedAt: Date | string, now = new Date()): SlaStatus {
	const elapsedDays = (now.getTime() - new Date(startedAt).getTime()) / (24 * 60 * 60 * 1000);
	if (elapsedDays >= 30) return 'DRAW_DOWN_FROZEN_DAY_30';
	if (elapsedDays >= 14) return 'ESCALATION_DAY_14';
	if (elapsedDays >= 7) return 'WARNING_DAY_7';
	return 'ON_TRACK';
}

function assertNonEmpty(value: string, requirement: string): void {
	if (!value.trim()) throw new Error(`${requirement} is required.`);
}

function assertNotFrozen(startedAt: Date | string): void {
	if (getSlaStatus(startedAt) === 'DRAW_DOWN_FROZEN_DAY_30') {
		throw new Error('Drawdown is frozen after the Day +30 SLA default.');
	}
}

async function resolveProjectId(targetId: string): Promise<string> {
	const result = await query<{ id: string }>(
		`SELECT id FROM public.projects WHERE id::text = $1 OR challenge_id::text = $1 ORDER BY created_at DESC LIMIT 1;`,
		[targetId],
	);
	if (!result.rows[0]) throw new EscrowProjectNotFoundError();
	return result.rows[0].id;
}

export async function releaseTranche1(targetId: string, kickoffConfirmed: boolean) {
	if (!kickoffConfirmed) throw new Error('Tranche 1 requires confirmed kickoff.');
	const projectId = await resolveProjectId(targetId);
	const result = await query<{ id: string; tranche_1_disbursed: boolean }>(
		'UPDATE public.projects SET tranche_1_disbursed = TRUE WHERE id = $1 RETURNING id, tranche_1_disbursed;',
		[projectId],
	);
	return { project_id: result.rows[0].id, tranche_1_disbursed: result.rows[0].tranche_1_disbursed, percentage: 30 };
}

export async function releaseTranche2(targetId: string, nablCertUrl: string, evaluatorApproved: boolean) {
	validateTranche2Requirements(nablCertUrl, evaluatorApproved);
	const projectId = await resolveProjectId(targetId);
	const state = await query<{ tranche_1_disbursed: boolean; created_at: Date | string }>('SELECT tranche_1_disbursed, created_at FROM public.projects WHERE id = $1;', [projectId]);
	if (!state.rows[0].tranche_1_disbursed) throw new Error('Tranche 1 must be disbursed before Tranche 2');
	assertNotFrozen(state.rows[0].created_at);
	const result = await query<{ id: string; tranche_2_disbursed: boolean }>(
		`UPDATE public.projects SET tranche_2_disbursed = TRUE, nabl_cert_url = $2 WHERE id = $1 RETURNING id, tranche_2_disbursed;`,
		[projectId, nablCertUrl || null],
	);
	return { project_id: result.rows[0].id, tranche_2_disbursed: result.rows[0].tranche_2_disbursed, message: 'Tranche 2 (40%) released upon NABL laboratory certificate verification.' };
}

export async function releaseTranche3(targetId: string, evidence: Tranche3Evidence) {
	validateTranche3Requirements(evidence);
	const projectId = await resolveProjectId(targetId);
	const state = await query<{ tranche_2_disbursed: boolean; created_at: Date | string }>('SELECT tranche_2_disbursed, created_at FROM public.projects WHERE id = $1;', [projectId]);
	if (!state.rows[0].tranche_2_disbursed) throw new Error('Tranche 2 must be disbursed before Tranche 3');
	assertNotFrozen(state.rows[0].created_at);
	const result = await query<{ id: string; tranche_3_disbursed: boolean; maturation_ends_at: Date | string }>(
		`UPDATE public.projects
		 SET tranche_3_disbursed = TRUE, pesa_noc_url = $2, field_deployment_date = NOW(), maturation_ends_at = NOW() + INTERVAL '45 days'
		 WHERE id = $1 RETURNING id, tranche_3_disbursed, maturation_ends_at;`,
		[projectId, evidence.nocUrl],
	);
	return { project_id: result.rows[0].id, tranche_3_disbursed: result.rows[0].tranche_3_disbursed, maturation_ends_at: new Date(result.rows[0].maturation_ends_at).toISOString(), message: 'Tranche 3 (30%) released upon Gram Sabha PESA Act NOC verification. 45-day operational maturation buffer started.' };
}

export async function auditSLA() {
	const result = await query(
		`SELECT id, challenge_id, lead_university_name, created_at, field_deployment_date,
			EXTRACT(EPOCH FROM (NOW() - COALESCE(field_deployment_date, created_at))) / 86400 AS elapsed_days,
			CASE WHEN NOW() - COALESCE(field_deployment_date, created_at) >= INTERVAL '30 days' THEN 'DRAW_DOWN_FROZEN_DAY_30'
				 WHEN NOW() - COALESCE(field_deployment_date, created_at) >= INTERVAL '14 days' THEN 'ESCALATION_DAY_14'
				 WHEN NOW() - COALESCE(field_deployment_date, created_at) >= INTERVAL '7 days' THEN 'WARNING_DAY_7' END AS sla_breach_status
		 FROM public.projects WHERE resolution_status = 'IN_PROGRESS'
		 AND NOW() - COALESCE(field_deployment_date, created_at) >= INTERVAL '7 days' ORDER BY elapsed_days DESC;`,
	);
	return result.rows;
}
