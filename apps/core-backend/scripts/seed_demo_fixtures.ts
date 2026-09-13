import { pool } from '../src/db/client';
import type { PoolClient } from 'pg';

type ChallengeSeed = {
	ticket: string;
	title: string;
	description: string;
	district: string;
	block: string;
	lat: number;
	lon: number;
	status: string;
	pool: number;
	biddingDays?: number;
};

type ProjectSeed = {
	mode: string;
	lead: string;
	partner?: string | null;
	facultyId?: string | null;
	mentorId?: string | null;
	budget: number;
	round: number;
	tranche1: boolean;
	tranche2: boolean;
	tranche3: boolean;
	maturationDays?: number | null;
	deploymentDays?: number | null;
};

async function ensureUser(client: PoolClient, email: string, name: string, role: string, institution: string) {
	const result = await client.query<{ id: string }>(
		`INSERT INTO public.users (email, full_name, role, institution_name, preferred_language)
		 VALUES ($1, $2, $3, $4, 'en')
		 ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name, role = EXCLUDED.role, institution_name = EXCLUDED.institution_name
		 RETURNING id;`,
		[email, name, role, institution],
	);
	return result.rows[0].id;
}

async function ensureChallenge(client: PoolClient, seed: ChallengeSeed) {
	const result = await client.query<{ id: string }>(
		`INSERT INTO public.challenges
			(ticket_number, title, description, location, district, block, status, submission_channel, allocated_pool_inr, bidding_deadline)
		 VALUES ($1, $2, $3, ST_SetSRID(ST_Point($4, $5), 4326), $6, $7, $8, 'WEB', $9,
			CASE WHEN $10::int IS NULL THEN NULL ELSE NOW() + ($10::int * INTERVAL '1 day') END)
		 ON CONFLICT (ticket_number) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description,
			location = EXCLUDED.location, district = EXCLUDED.district, block = EXCLUDED.block,
			status = EXCLUDED.status, allocated_pool_inr = EXCLUDED.allocated_pool_inr,
			bidding_deadline = EXCLUDED.bidding_deadline
		 RETURNING id;`,
		[seed.ticket, seed.title, seed.description, seed.lon, seed.lat, seed.district, seed.block, seed.status, seed.pool, seed.biddingDays ?? null],
	);
	return result.rows[0].id;
}

async function ensureProject(client: PoolClient, challengeId: string, seed: ProjectSeed) {
	const existing = await client.query<{ id: string }>(
		'SELECT id FROM public.projects WHERE challenge_id = $1 ORDER BY created_at ASC LIMIT 1;',
		[challengeId],
	);
	const values = [seed.mode, seed.lead, seed.partner || null, seed.facultyId || null, seed.mentorId || null, seed.budget, seed.round, seed.tranche1, seed.tranche2, seed.tranche3, seed.deploymentDays ?? null, seed.maturationDays ?? null];

	if (existing.rows[0]) {
		await client.query(
			`UPDATE public.projects SET execution_mode = $2, lead_university_name = $3, partner_university_name = $4,
				pi_faculty_id = $5, industry_mentor_id = $6, total_budget_inr = $7, current_hackathon_round = $8,
				tranche_1_disbursed = $9, tranche_2_disbursed = $10, tranche_3_disbursed = $11,
				field_deployment_date = CASE WHEN $12::int IS NULL THEN NULL ELSE NOW() - ($12::int * INTERVAL '1 day') END,
				maturation_ends_at = CASE WHEN $13::int IS NULL THEN NULL ELSE NOW() + ($13::int * INTERVAL '1 day') END
			 WHERE id = $1;`,
			[existing.rows[0].id, ...values],
		);
		return existing.rows[0].id;
	}

	const created = await client.query<{ id: string }>(
		`INSERT INTO public.projects
			(challenge_id, execution_mode, lead_university_name, partner_university_name, pi_faculty_id, industry_mentor_id,
			 current_hackathon_round, total_budget_inr, tranche_1_disbursed, tranche_2_disbursed, tranche_3_disbursed,
			 field_deployment_date, maturation_ends_at)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
			 CASE WHEN $12::int IS NULL THEN NULL ELSE NOW() - ($12::int * INTERVAL '1 day') END,
			 CASE WHEN $13::int IS NULL THEN NULL ELSE NOW() + ($13::int * INTERVAL '1 day') END)
		 RETURNING id;`,
		[challengeId, ...values],
	);
	return created.rows[0].id;
}

async function seed() {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const facultyId = await ensureUser(client, 'demo.faculty@jagrit.test', 'Dr. Demo Faculty', 'FACULTY_PI', 'Birla Institute of Technology, Mesra');
		const mentorId = await ensureUser(client, 'tata.csr@jagrit.test', 'Tata Steel CSR Mentor', 'INDUSTRY_MENTOR', 'Tata Steel CSR');

		const palamu = await ensureChallenge(client, { ticket: 'JAG-4102', title: 'Palamu Community Water Purification', description: 'Solar-assisted purification for iron-contaminated community groundwater in Palamu.', district: 'Palamu', block: 'Daltonganj', lat: 24.04, lon: 84.18, status: 'IN_PILOT', pool: 450000 });
		const khunti = await ensureChallenge(client, { ticket: 'JAG-3891', title: 'Khunti Lac Storage Innovation', description: 'Climate-resilient lac storage for tribal producer groups in Khunti.', district: 'Khunti', block: 'Murhu', lat: 23.07, lon: 85.28, status: 'DYNAMIC_HACKATHON', pool: 800000 });
		const chaibasa = await ensureChallenge(client, { ticket: 'JAG-4022', title: 'Chaibasa Community Composter', description: 'Low-maintenance community composting for market and household organic waste.', district: 'West Singhbhum', block: 'Chaibasa', lat: 22.56, lon: 85.80, status: 'OPEN_FOR_BIDS', pool: 300000, biddingDays: 4 });

		const palamuProject = await ensureProject(client, palamu, { mode: 'DIRECT_RND', lead: 'Birla Institute of Technology, Mesra', facultyId, budget: 450000, round: 1, tranche1: true, tranche2: true, tranche3: true, maturationDays: 5, deploymentDays: 40 });
		const khuntiProject = await ensureProject(client, khunti, { mode: 'DYNAMIC_HACKATHON', lead: 'Birla Institute of Technology, Mesra', partner: 'Xavier Institute of Social Service', facultyId, mentorId, budget: 800000, round: 2, tranche1: true, tranche2: false, tranche3: false });
		const chaibasaProject = await ensureProject(client, chaibasa, { mode: 'DIRECT_RND', lead: 'National Institute of Technology, Jamshedpur', facultyId, budget: 300000, round: 1, tranche1: false, tranche2: false, tranche3: false });

		const electrodeRoot = 'Electrode scaling reduced conductivity during pilot expansion.';
		const batteryRoot = 'Solar battery degradation caused unacceptable storage loss during monsoon deployment.';
		await client.query('DELETE FROM public.rnd_failure_repository WHERE root_cause_analysis IN ($1, $2);', [electrodeRoot, batteryRoot]);
		await client.query(
			`INSERT INTO public.rnd_failure_repository
				(project_id, failure_classification, root_cause_analysis, attempted_solution_summary, lessons_learned, escalated_to_national_hackathon)
			 VALUES ($1, 'MINOR_FAILURE', $3, $4, $5, FALSE), ($2, 'MAJOR_FAILURE', $6, $7, $8, TRUE);`,
			[khuntiProject, palamuProject, electrodeRoot, 'Pilot electrode array was scaled without conductivity monitoring.', 'Bench-test electrode durability at full scale before procurement.', batteryRoot, 'Prototype used a standard battery bank without seasonal degradation modeling.', 'Future pilots require environmental stress testing and replacement-cost planning.'],
		);

		await client.query('COMMIT');
		console.log(JSON.stringify({ success: true, message: 'JAGRIT demo fixtures seeded successfully.', tickets: ['JAG-4102', 'JAG-3891', 'JAG-4022'], projects: [palamuProject, khuntiProject, chaibasaProject] }, null, 2));
		process.exit(0);
	} catch (error) {
		await client.query('ROLLBACK').catch(() => undefined);
		console.error('Demo fixture seeding failed:', error instanceof Error ? error.message : error);
		process.exit(1);
	} finally {
		client.release();
		await pool.end();
	}
}

void seed();
