import { query } from '../db/client';

export async function placeBid(
	challengeId: string,
	universityName: string,
	budget: number,
	facultyId: string,
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

	await query(
		`UPDATE public.challenges
		 SET allocated_pool_inr = allocated_pool_inr * 1.20,
			 bidding_deadline = NOW() + INTERVAL '7 days'
		 WHERE id = $1;`,
		[challengeId],
	);

	return {
		status: 'EXTENDED',
		bids_count: bidsCount,
		message: 'Zero bids logged. Incentive pool increased by 20% and deadline extended by 7 days.',
	};
}
