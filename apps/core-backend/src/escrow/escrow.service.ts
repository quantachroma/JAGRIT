import { query } from '../db/client';

export class EscrowProjectNotFoundError extends Error {
	statusCode = 404;
	constructor() {
		super('No project found for the supplied project/challenge ID.');
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

export async function releaseTranche2(targetId: string, nablCertUrl: string) {
	const projectId = await resolveProjectId(targetId);
	const state = await query<{ tranche_1_disbursed: boolean }>('SELECT tranche_1_disbursed FROM public.projects WHERE id = $1;', [projectId]);
	if (!state.rows[0].tranche_1_disbursed) throw new Error('Tranche 1 must be disbursed before Tranche 2');
	const result = await query<{ id: string; tranche_2_disbursed: boolean }>(
		`UPDATE public.projects SET tranche_2_disbursed = TRUE, nabl_cert_url = $2 WHERE id = $1 RETURNING id, tranche_2_disbursed;`,
		[projectId, nablCertUrl || null],
	);
	return { project_id: result.rows[0].id, tranche_2_disbursed: result.rows[0].tranche_2_disbursed, message: 'Tranche 2 (40%) released upon NABL laboratory certificate verification.' };
}

export async function releaseTranche3(targetId: string, pesaNocUrl: string) {
	const projectId = await resolveProjectId(targetId);
	const state = await query<{ tranche_2_disbursed: boolean }>('SELECT tranche_2_disbursed FROM public.projects WHERE id = $1;', [projectId]);
	if (!state.rows[0].tranche_2_disbursed) throw new Error('Tranche 2 must be disbursed before Tranche 3');
	const result = await query<{ id: string; tranche_3_disbursed: boolean; maturation_ends_at: Date | string }>(
		`UPDATE public.projects
		 SET tranche_3_disbursed = TRUE, pesa_noc_url = $2, field_deployment_date = NOW(), maturation_ends_at = NOW() + INTERVAL '45 days'
		 WHERE id = $1 RETURNING id, tranche_3_disbursed, maturation_ends_at;`,
		[projectId, pesaNocUrl || null],
	);
	return { project_id: result.rows[0].id, tranche_3_disbursed: result.rows[0].tranche_3_disbursed, maturation_ends_at: new Date(result.rows[0].maturation_ends_at).toISOString(), message: 'Tranche 3 (30%) released upon Gram Sabha PESA Act NOC verification. 45-day operational maturation buffer started.' };
}

export async function auditSLA() {
	const result = await query(
		`SELECT id, challenge_id, lead_university_name, created_at, field_deployment_date,
			EXTRACT(EPOCH FROM (NOW() - COALESCE(field_deployment_date, created_at))) / 86400 AS elapsed_days,
			CASE WHEN NOW() - COALESCE(field_deployment_date, created_at) >= INTERVAL '30 days' THEN 'CLAWBACK_DAY_30'
				 WHEN NOW() - COALESCE(field_deployment_date, created_at) >= INTERVAL '14 days' THEN 'ESCALATION_DAY_14'
				 WHEN NOW() - COALESCE(field_deployment_date, created_at) >= INTERVAL '7 days' THEN 'WARNING_DAY_7' END AS sla_breach_status
		 FROM public.projects WHERE resolution_status = 'IN_PROGRESS'
		 AND NOW() - COALESCE(field_deployment_date, created_at) >= INTERVAL '7 days' ORDER BY elapsed_days DESC;`,
	);
	return result.rows;
}
