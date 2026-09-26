import { query } from '../db/client';

export interface Project {
	id: string;
	challengeId: string;
	ticketNumber?: string;
	title?: string;
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
	ticket_number?: string;
	challenge_title?: string;
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
		`SELECT p.id, p.challenge_id, c.ticket_number, c.title AS challenge_title, p.resolution_status AS status, p.execution_mode,
				tranche_1_disbursed, tranche_2_disbursed, tranche_3_disbursed,
				lead_university_name, total_budget_inr, p.created_at
		 FROM public.projects p LEFT JOIN public.challenges c ON c.id = p.challenge_id WHERE p.id = $1;`,
		[id],
	);
	const row = result.rows[0];
	if (!row) return null;

	return {
		id: row.id,
		challengeId: row.challenge_id,
		ticketNumber: row.ticket_number,
		title: row.challenge_title,
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

export async function getProjects(): Promise<Project[]> {
	const result = await query<ProjectRow>(
		`SELECT p.id, p.challenge_id, c.ticket_number, c.title AS challenge_title, p.resolution_status AS status, p.execution_mode,
				tranche_1_disbursed, tranche_2_disbursed, tranche_3_disbursed,
				lead_university_name, total_budget_inr, p.created_at
		 FROM public.projects p LEFT JOIN public.challenges c ON c.id = p.challenge_id
		 ORDER BY p.created_at DESC;`,
	);

	return result.rows.map((row) => ({
		id: row.id,
		challengeId: row.challenge_id,
		ticketNumber: row.ticket_number,
		title: row.challenge_title,
		status: row.status,
		executionMode: row.execution_mode,
		tranche1Disbursed: row.tranche_1_disbursed,
		tranche2Disbursed: row.tranche_2_disbursed,
		tranche3Disbursed: row.tranche_3_disbursed,
		leadUniversityName: row.lead_university_name,
		totalBudgetInr: row.total_budget_inr,
		createdAt: row.created_at,
	}));
}
