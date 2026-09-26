import { pool, query } from '../db/client';

export async function getUniversityLeaderboard() {
	const result = await query(
		`SELECT u.id, u.short_code, u.name, u.district, u.h_score, u.patents_count,
				COUNT(p.id) FILTER (WHERE p.resolution_status = 'COMPLETELY_SOLVED')::int AS solved_problems,
				COUNT(p.id) FILTER (WHERE p.resolution_status IN ('IN_PROGRESS', 'IN_PILOT', 'PARTIALLY_SOLVED'))::int AS active_projects,
				COALESCE(SUM(p.nep_credits) FILTER (WHERE p.resolution_status = 'COMPLETELY_SOLVED'), 0)::int AS nep_credits,
				COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(p.maturation_ends_at, NOW()) - p.created_at)) / 86400)::numeric, 1), 0) AS average_resolution_days
		 FROM public.universities u
		 LEFT JOIN public.projects p ON p.lead_university_name = u.name
		 GROUP BY u.id
		 ORDER BY u.h_score DESC, solved_problems DESC, nep_credits DESC, u.name ASC;`,
	);

	return result.rows.map((row, index) => ({
		rank: index + 1,
		id: row.id,
		shortCode: row.short_code,
		name: row.name,
		district: row.district,
		hScore: Number(row.h_score),
		solvedProblems: Number(row.solved_problems),
		activeProjects: Number(row.active_projects),
		nepCredits: Number(row.nep_credits),
		patents: Number(row.patents_count),
		averageResolutionDays: Number(row.average_resolution_days),
	}));
}

export async function getResolutionVelocity() {
	const result = await query(
		`SELECT c.district,
				COUNT(p.id)::int AS projects,
				COUNT(p.id) FILTER (WHERE p.resolution_status = 'COMPLETELY_SOLVED')::int AS solved,
				COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(p.maturation_ends_at, NOW()) - p.created_at)) / 86400)::numeric, 1), 0) AS average_resolution_days
		 FROM public.projects p
		 JOIN public.challenges c ON c.id = p.challenge_id
		 GROUP BY c.district
		 ORDER BY c.district ASC;`,
	);

	return result.rows.map((row) => ({
		district: row.district,
		projects: Number(row.projects),
		solved: Number(row.solved),
		averageResolutionDays: Number(row.average_resolution_days),
	}));
}

export async function getMaintenanceInstallations() {
	const result = await query(
		`SELECT p.id, c.ticket_number, c.title, c.district, p.lead_university_name,
				p.field_deployment_date, p.maturation_ends_at, p.total_budget_inr,
				a.clock_started_at, a.frozen_at, a.repair_deadline,
				COALESCE(jsonb_array_length(a.reports), 0)::int AS breakdown_reports
		 FROM public.projects p
		 JOIN public.challenges c ON c.id = p.challenge_id
		 LEFT JOIN public.project_alarm_states a ON a.project_id = p.id
		 WHERE p.field_deployment_date IS NOT NULL
			AND NOW() - p.field_deployment_date <= INTERVAL '45 days'
			AND a.frozen_at IS NOT NULL
		 ORDER BY a.repair_deadline ASC;`,
	);

	return result.rows.map((row) => ({
		projectId: row.id,
		ticketNumber: row.ticket_number,
		title: row.title,
		district: row.district,
		leadUniversity: row.lead_university_name,
		fieldTest: { startedAt: row.clock_started_at, endsAt: row.maturation_ends_at, days: 45 },
		inspectionSlaHours: 48,
		breakdownReports: Number(row.breakdown_reports),
		alarmFrozenAt: row.frozen_at,
		repairDeadline: row.repair_deadline,
		repairWindowDays: 7,
		budgetInr: Number(row.total_budget_inr),
	}));
}

export async function triggerMaintenanceRebid(projectId: string) {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		await client.query(`CREATE TABLE IF NOT EXISTS public.maintenance_actions (
			id BIGSERIAL PRIMARY KEY, project_id UUID NOT NULL REFERENCES public.projects(id),
			action TEXT NOT NULL, clawback_amount_inr NUMERIC NOT NULL DEFAULT 0,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE (project_id, action)
		);`);
		const project = await client.query<{ id: string; challenge_id: string; budget: string }>(
			`SELECT id::text, challenge_id::text, total_budget_inr::text AS budget
			 FROM public.projects WHERE id::text = $1 FOR UPDATE;`,
			[projectId],
		);
		if (!project.rows[0]) throw new Error('Project not found.');
		const action = await client.query<{ id: string }>(
			`INSERT INTO public.maintenance_actions (project_id, action, clawback_amount_inr)
			 VALUES ($1, 'REBid_AND_CLAWBACK', $2)
			 ON CONFLICT (project_id, action) DO NOTHING RETURNING id;`,
			[projectId, project.rows[0].budget],
		);
		if (!action.rows[0]) throw new Error('Automatic re-bidding has already been triggered for this project.');
		await client.query(`UPDATE public.projects SET resolution_status = 'FAILED' WHERE id::text = $1;`, [projectId]);
		await client.query(`UPDATE public.challenges SET status = 'OPEN_FOR_BIDS' WHERE id = $1;`, [project.rows[0].challenge_id]);
		await client.query('COMMIT');
		return { projectId, challengeId: project.rows[0].challenge_id, action: 'REBid_AND_CLAWBACK', clawbackAmountInr: Number(project.rows[0].budget) };
	} catch (error) {
		await client.query('ROLLBACK').catch(() => undefined);
		throw error;
	} finally {
		client.release();
	}
}