import { query } from '../db/client';

export interface Project {
	id: string;
	challengeId: string;
	status: string;
	executionMode: string;
	tranche1Disbursed: boolean;
	tranche2Disbursed: boolean;
	tranche3Disbursed: boolean;
	leadUniversityName: string;
	totalBudgetInr: string | number;
	createdAt: Date | string;
}

interface ProjectRow {
	id: string;
	challenge_id: string;
	status: string;
	execution_mode: string;
	tranche_1_disbursed: boolean;
	tranche_2_disbursed: boolean;
	tranche_3_disbursed: boolean;
	lead_university_name: string;
	total_budget_inr: string | number;
	created_at: Date | string;
}

export async function getProjectById(id: string): Promise<Project | null> {
	const result = await query<ProjectRow>(
		`SELECT id, challenge_id, resolution_status AS status, execution_mode,
				tranche_1_disbursed, tranche_2_disbursed, tranche_3_disbursed,
				lead_university_name, total_budget_inr, created_at
		 FROM public.projects WHERE id = $1;`,
		[id],
	);
	const row = result.rows[0];
	if (!row) return null;

	return {
		id: row.id,
		challengeId: row.challenge_id,
		status: row.status,
		executionMode: row.execution_mode,
		tranche1Disbursed: row.tranche_1_disbursed,
		tranche2Disbursed: row.tranche_2_disbursed,
		tranche3Disbursed: row.tranche_3_disbursed,
		leadUniversityName: row.lead_university_name,
		totalBudgetInr: row.total_budget_inr,
		createdAt: row.created_at,
	};
}
