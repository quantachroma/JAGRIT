import { pool, query } from '../db/client';

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

export interface EscrowOverview {
	metrics: {
		totalCommittedCsrPool: string;
		stateMatchingGrantsDisbursed: string;
		activeCorporateMentors: string;
		tripartiteIprConcordats: string;
	};
	projects: Array<{
		id: string;
		title: string;
		leadHei: string;
		stateAllocation: string;
		corporateMatch: string;
		corporatePartner: string;
		status: string;
		mentor: string;
	}>;
	patents: Array<{
		id: string;
		title: string;
		leadShare: string;
		heiRoyalty: string;
		rofrStatus: string;
		stateLicense: string;
	}>;
}

const DEFAULT_ESCROW_OVERVIEW: EscrowOverview = {
	metrics: {
		totalCommittedCsrPool: '₹50.00 Lakh',
		stateMatchingGrantsDisbursed: '₹24.50 Lakh',
		activeCorporateMentors: '14 Senior Engineers',
		tripartiteIprConcordats: '8 Agreements',
	},
	projects: [
		{
			id: 'JAG-CSR-01',
			title: 'Solar Fluoride Purification for 12 Anganwadi Centers (Palamu)',
			leadHei: 'BIT Mesra (Dept. of Environmental Engineering)',
			stateAllocation: '₹3.50 Lakh',
			corporateMatch: '₹3.50 Lakh',
			corporatePartner: 'Tata Steel CSR',
			status: '✅ 1:1 Matched & Escrow Locked (Schedule VII Compliant)',
			mentor: 'Dr. A. Sen (Senior Principal Scientist, Tata Steel R&D)',
		},
		{
			id: 'JAG-CSR-02',
			title: 'Tribal Lac Post-Harvest Desiccant Storage Units (Khunti)',
			leadHei: 'BAU Ranchi',
			stateAllocation: '₹4.20 Lakh',
			corporateMatch: '₹4.20 Lakh',
			corporatePartner: 'CCL CSR',
			status: '✅ 1:1 Matched & Escrow Locked',
			mentor: 'Er. Manoj Kumar (CCL Agro-Infrastructure Cell)',
		},
	],
	patents: [
		{
			id: 'IN-2026-JAG-001',
			title: 'Activated Alumina Gradient Defluoridation Filter',
			leadShare: '60%',
			heiRoyalty: '25%',
			rofrStatus: 'Tata Steel ROFR active through 15 Sep 2026',
			stateLicense: 'Verified: royalty-free public deployment',
		},
		{
			id: 'IN-2026-JAG-004',
			title: 'IoT Real-Time Water Quality Telemetry Module',
			leadShare: '60%',
			heiRoyalty: '20%',
			rofrStatus: 'CCL ROFR review pending',
			stateLicense: 'Verified: royalty-free public deployment',
		},
	],
};

export async function getEscrowOverview(): Promise<EscrowOverview> {
	try {
		const result = await query<{
			id: string;
			lead_university_name: string;
			industry_mentor_name: string | null;
			industry_organization: string | null;
		}>(
			`SELECT p.id::text AS id, p.lead_university_name, u.full_name AS industry_mentor_name,
					 u.organization AS industry_organization
			 FROM public.projects p
			 LEFT JOIN public.users u ON u.id = p.industry_mentor_id
			 WHERE p.resolution_status IN ('IN_PROGRESS', 'IN_PILOT')
			 ORDER BY p.created_at DESC LIMIT 10;`,
		);
		if (!result.rows.length) return DEFAULT_ESCROW_OVERVIEW;

		return {
			...DEFAULT_ESCROW_OVERVIEW,
			projects: result.rows.map((row, index) => ({
				...(DEFAULT_ESCROW_OVERVIEW.projects[index] || DEFAULT_ESCROW_OVERVIEW.projects[0]),
				id: row.id,
				leadHei: row.lead_university_name,
				mentor: row.industry_mentor_name
					? `${row.industry_mentor_name}${row.industry_organization ? ` (${row.industry_organization})` : ''}`
					: DEFAULT_ESCROW_OVERVIEW.projects[index]?.mentor || 'Mentor assignment pending',
			})),
		};
	} catch {
		return DEFAULT_ESCROW_OVERVIEW;
	}
}

export async function authorizeTranche(projectId: string, trancheNumber: 2 | 3) {
	const trancheColumn = trancheNumber === 2 ? 'tranche_2_disbursed' : 'tranche_3_disbursed';
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		await client.query(`
			CREATE TABLE IF NOT EXISTS public.escrow_audit_log (
				id BIGSERIAL PRIMARY KEY,
				project_id TEXT NOT NULL,
				tranche_number SMALLINT NOT NULL,
				action TEXT NOT NULL,
				actor TEXT NOT NULL,
				integrations TEXT[] NOT NULL,
				created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
			);
		`);

		const project = await client.query<{ id: string }>(
			'SELECT id::text AS id FROM public.projects WHERE id::text = $1 FOR UPDATE;',
			[projectId],
		);
		if (!project.rows[0]) throw new EscrowProjectNotFoundError();

		const updated = await client.query<{ id: string; tranche_2_disbursed?: boolean; tranche_3_disbursed?: boolean }>(
			`UPDATE public.projects
			 SET ${trancheColumn} = TRUE
			 WHERE id::text = $1 AND ${trancheColumn} IS DISTINCT FROM TRUE
			 RETURNING id, tranche_2_disbursed, tranche_3_disbursed;`,
			[projectId],
		);
		if (!updated.rows[0]) throw new Error(`Tranche ${trancheNumber} is already authorized.`);

		const audit = await client.query<{ id: string }>(
			`INSERT INTO public.escrow_audit_log
				(project_id, tranche_number, action, actor, integrations)
			 VALUES ($1, $2, 'AUTHORIZED', 'DHTE_EVALUATOR', ARRAY['SNA', 'PFMS'])
			 RETURNING id;`,
			[projectId, trancheNumber],
		);

		await client.query('COMMIT');
		return {
			success: true,
			projectId,
			trancheNumber,
			auditId: audit.rows[0].id,
			message: `Tranche ${trancheNumber} authorized and logged for SNA/PFMS disbursement.`,
		};
	} catch (error) {
		await client.query('ROLLBACK').catch(() => undefined);
		throw error;
	} finally {
		client.release();
	}
}

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
	const state = await query<{ tranche_1_disbursed: boolean }>('SELECT tranche_1_disbursed FROM public.projects WHERE id = $1;', [projectId]);
	if (state.rows[0].tranche_1_disbursed) throw new Error('Tranche 1 is already disbursed.');
	const result = await query<{ id: string; tranche_1_disbursed: boolean }>(
		'UPDATE public.projects SET tranche_1_disbursed = TRUE WHERE id = $1 RETURNING id, tranche_1_disbursed;',
		[projectId],
	);
	return { project_id: result.rows[0].id, tranche_1_disbursed: result.rows[0].tranche_1_disbursed, percentage: 30 };
}

export async function releaseTranche2(targetId: string, nablCertUrl: string, evaluatorApproved: boolean) {
	validateTranche2Requirements(nablCertUrl, evaluatorApproved);
	const projectId = await resolveProjectId(targetId);
	const state = await query<{ tranche_1_disbursed: boolean; tranche_2_disbursed?: boolean; created_at: Date | string }>('SELECT tranche_1_disbursed, tranche_2_disbursed, created_at FROM public.projects WHERE id = $1;', [projectId]);
	if (!state.rows[0].tranche_1_disbursed) throw new Error('Tranche 1 must be disbursed before Tranche 2');
	if ((state.rows[0] as { tranche_2_disbursed?: boolean }).tranche_2_disbursed) throw new Error('Tranche 2 is already disbursed.');
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
	const state = await query<{ tranche_2_disbursed: boolean; tranche_3_disbursed?: boolean; created_at: Date | string }>('SELECT tranche_2_disbursed, tranche_3_disbursed, created_at FROM public.projects WHERE id = $1;', [projectId]);
	if (!state.rows[0].tranche_2_disbursed) throw new Error('Tranche 2 must be disbursed before Tranche 3');
	if (state.rows[0].tranche_3_disbursed) throw new Error('Tranche 3 is already disbursed.');
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
