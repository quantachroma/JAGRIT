import { query } from '../db/client';
import { startStageOneEscalation } from './escalation.service';

export interface HackathonDeliverableMock {
	projectId: string;
	round: 1 | 2 | 3;
	status: 'DELIVERABLE_RECEIVED';
}

export function submitDeliverableMock(projectId: string, round: 1 | 2 | 3): HackathonDeliverableMock {
	return { projectId, round, status: 'DELIVERABLE_RECEIVED' };
}

export async function placeBid(
	challengeId: string,
	universityName: string,
	budget: number,
	facultyId: string | null,
) {
	const result = await query(
		`INSERT INTO public.projects
			(challenge_id, lead_university_name, total_budget_inr, pi_faculty_id, execution_mode)
		 VALUES ($1, $2, $3, $4, 'DIRECT_RND')
		 RETURNING *;`,
		[challengeId, universityName, budget, facultyId],
	);

	return result.rows[0];
}

export async function evaluateBids(challengeId: string) {
	const countResult = await query<{ bids_count: string }>(
		'SELECT COUNT(*)::text AS bids_count FROM public.projects WHERE challenge_id = $1;',
		[challengeId],
	);
	const bidsCount = Number(countResult.rows[0].bids_count);

	if (bidsCount === 1) {
		await query(
			"UPDATE public.challenges SET status = 'DIRECT_RND' WHERE id = $1;",
			[challengeId],
		);
		await query(
			'UPDATE public.projects SET tranche_1_disbursed = TRUE WHERE challenge_id = $1;',
			[challengeId],
		);

		return {
			status: 'DIRECT_RND',
			bids_count: bidsCount,
			message: 'Solo bidder confirmed. Tranche 1 (30%) disbursed. Direct R&D track active.',
		};
	}

	if (bidsCount >= 2) {
		await query(
			"UPDATE public.challenges SET status = 'DYNAMIC_HACKATHON' WHERE id = $1;",
			[challengeId],
		);
		await query(
			`UPDATE public.projects
			 SET execution_mode = 'DYNAMIC_HACKATHON', current_hackathon_round = 1
			 WHERE challenge_id = $1;`,
			[challengeId],
		);

		return {
			status: 'DYNAMIC_HACKATHON',
			bids_count: bidsCount,
			message: 'Competition triggered! Challenge converted to 3-Stage Dynamic Hackathon (Round 1: Ideation).',
		};
	}

	await startStageOneEscalation(challengeId);

	return {
		status: 'ESCALATION',
		bids_count: bidsCount,
		message: 'Zero bids logged. Challenge escalated under ADR-011.',
	};
}
