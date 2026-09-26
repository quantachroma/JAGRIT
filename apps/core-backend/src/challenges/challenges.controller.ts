import { Request, Response, Router } from 'express';
import { pool, query } from '../db/client';
import type { PoolClient } from 'pg';
import {
	ChallengeSubmission,
	createOrDeduplicateChallenge,
	hashPhoneNumber,
	blurPublicLocation,
	recordChallengeSupport,
} from './challenges.service';
import { dedupScore, embed, triageClassify } from '../ai/ai.service';
import { evaluateDeduplication, maskedPhone } from '../ai/dedup.service';

export const challengesRouter = Router();

type ChallengeFixture = {
	ticketNumber: string;
	title: string;
	description: string;
	district: string;
	block: string;
	longitude: number;
	latitude: number;
	status: string;
	submissionChannel: string;
	upvotes: number;
};

const CANONICAL_CHALLENGE_FIXTURES: ChallengeFixture[] = [
	{
		ticketNumber: 'JAG-2026-PAL-3785',
		title: 'Voice Report: मेरे गाउ महुआ में काला पानी आ रहा है नल से',
		description: 'मेरे गाउ महुआ में काला पानी आ रहा है नल से मैं बहुत परिशान हूँ प्लीज मदद करें',
		district: 'Palamu',
		block: 'Daltonganj',
		longitude: 84.0722,
		latitude: 24.0353,
		status: 'PENDING_HITL',
		submissionChannel: 'WHATSAPP',
		upvotes: 6,
	},
	{
		ticketNumber: 'JAG-2026-KHT-0014',
		title: 'Post-Harvest Lac Produce Spoilage & Fungal Rot in Khunti',
		description: 'Lac, tamarind and minor forest produce spoil within 48 hours in Khunti heat. Needs 5MT solar cold room.',
		district: 'Khunti',
		block: 'Murhu',
		longitude: 85.2814,
		latitude: 23.0724,
		status: 'DYNAMIC_HACKATHON',
		submissionChannel: 'WEB',
		upvotes: 34,
	},
	{
		ticketNumber: 'JAG-2026-WSH-0031',
		title: 'Primary Health Dispensary Solar Battery Voltage Surges',
		description: 'Remote tribal health dispensary in Tantnagar experiences battery inverter dropouts.',
		district: 'West Singhbhum',
		block: 'Tantnagar',
		longitude: 85.8123,
		latitude: 22.5507,
		status: 'IN_PILOT',
		submissionChannel: 'WEB',
		upvotes: 28,
	},
	{
		ticketNumber: 'JAG-2026-DHN-0055',
		title: 'Acid Mine Drainage Runoff into Potable Water Streams',
		description: 'Pyrite oxidation runoff contaminating drinking water streams in Jharia mining belt.',
		district: 'Dhanbad',
		block: 'Jharia',
		longitude: 86.4304,
		latitude: 23.7952,
		status: 'RESOLVED',
		submissionChannel: 'APP',
		upvotes: 52,
	},
	{
		ticketNumber: 'JAG-2026-RNC-0087',
		title: 'Deep Pothole and Drainage Waterlogging on Kanke Road',
		description: 'Routine municipal waterlogging and road crater outside Kanke block office.',
		district: 'Ranchi',
		block: 'Kanke',
		longitude: 85.3104,
		latitude: 23.3503,
		status: 'ROUTED_CIVIC',
		submissionChannel: 'WHATSAPP',
		upvotes: 12,
	},
];

async function seedChallengeFixture(client: PoolClient, fixture: ChallengeFixture): Promise<void> {
	await client.query(
		`INSERT INTO public.challenges
			(ticket_number, title, description, district, block, location, status, submission_channel, upvotes_count)
		 VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_Point($6, $7), 4326), $8, $9, $10)
		 ON CONFLICT (ticket_number) DO UPDATE SET
			title = EXCLUDED.title,
			description = EXCLUDED.description,
			district = EXCLUDED.district,
			block = EXCLUDED.block,
			location = EXCLUDED.location,
			status = EXCLUDED.status,
			submission_channel = EXCLUDED.submission_channel,
			upvotes_count = EXCLUDED.upvotes_count;`,
		[fixture.ticketNumber, fixture.title, fixture.description, fixture.district, fixture.block, fixture.longitude, fixture.latitude, fixture.status, fixture.submissionChannel, fixture.upvotes],
	);
}

challengesRouter.post('/seed-fixtures', async (_request, response) => {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		await client.query(
			`DELETE FROM public.challenges WHERE ticket_number = ANY($1::text[]);`,
			[['JAG-2026-PAL-3514', 'JAG-2026-PAL-3074', 'JAG-2026-PAL-4208']],
		);
		for (const fixture of CANONICAL_CHALLENGE_FIXTURES) await seedChallengeFixture(client, fixture);
		await client.query('COMMIT');
		response.json({ success: true, count: CANONICAL_CHALLENGE_FIXTURES.length, message: 'Canonical test fixtures seeded successfully.' });
	} catch (error) {
		await client.query('ROLLBACK').catch(() => undefined);
		console.error('Challenge fixture seeding failed:', error);
		response.status(500).json({ error: 'Unable to seed canonical challenge fixtures.' });
	} finally {
		client.release();
	}
});

challengesRouter.get('/', async (_request, response) => {
	try {
		const result = await query(
			`SELECT id, ticket_number, title, description, submission_channel, district, cluster_id, upvotes_count, status,
					NULL::text AS phone_last4,
					ST_Y(location::geometry) as lat, ST_X(location::geometry) as lon
			 FROM public.challenges ORDER BY created_at DESC;`,
		);
		response.json(result.rows.map((row) => {
			const publicLocation = blurPublicLocation(Number(row.lat), Number(row.lon));
			const upvotes = Number(row.upvotes_count || 0);
			const isMasterCluster = upvotes > 1 || Boolean(row.cluster_id);
			return {
				...row,
				lat: undefined,
				lon: undefined,
				blurred_lat: publicLocation.lat,
				blurred_lon: publicLocation.lon,
				is_dpdp_protected: true,
				masked_phone: maskedPhone(row.phone_last4),
				is_master_cluster: isMasterCluster,
				cluster_reports_count: isMasterCluster ? Math.max(upvotes, 1) : 1,
			};
		}));
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to load challenges.' });
	}
});

challengesRouter.patch('/:id/status', async (request: Request, response: Response) => {
	const status = String(request.body?.status || '').trim();
	if (!['APPROVED_RND', 'REROUTED_ULB'].includes(status)) {
		response.status(400).json({ error: "status must be 'APPROVED_RND' or 'REROUTED_ULB'." });
		return;
	}

	try {
		const result = await query(
			`UPDATE public.challenges
			 SET status = $1
			 WHERE id::text = $2 OR ticket_number = $2
			 RETURNING id, ticket_number, status;`,
			[status, request.params.id],
		);
		if (result.rowCount === 0) {
			response.status(404).json({ error: 'Challenge not found.' });
			return;
		}
		response.json({ success: true, challenge: result.rows[0] });
	} catch (error) {
		console.error('Challenge status update failed:', error);
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to update challenge status.' });
	}
});

	challengesRouter.post('/check-dedup', async (request: Request, response: Response) => {
	const { text, lat, lon } = request.body;
	const result = await evaluateDeduplication(String(text || ''), Number(lat), Number(lon));
	response.json(result);
});

async function submissionBody(request: Request): Promise<Record<string, unknown>> {
	if (!request.is('multipart/form-data')) return request.body as Record<string, unknown>;
	const boundary = request.headers['content-type']?.match(/boundary=([^;]+)/i)?.[1]?.replace(/^"|"$/g, '');
	if (!boundary) throw new Error('Multipart boundary is required.');
	const chunks: Buffer[] = [];
	for await (const chunk of request) chunks.push(Buffer.from(chunk));
	const fields: Record<string, string> = {};
	for (const part of Buffer.concat(chunks).toString('utf8').split(`--${boundary}`)) {
		const name = part.match(/name="([^"]+)"/)?.[1];
		const value = part.split('\r\n\r\n')[1]?.replace(/\r\n$/, '');
		if (name && value !== undefined && !part.includes('filename=')) fields[name] = value;
	}
	return fields;
}

challengesRouter.post('/submit', async (request: Request, response: Response) => {
	try {
		const body = await submissionBody(request);
		const location = typeof body.location === 'string' ? JSON.parse(body.location) as Record<string, unknown> : {};
		const lat = Number(body.lat ?? location.lat);
		const lon = Number(body.lon ?? location.lon);
		const title = String(body.title || '').trim();
		const description = String(body.description || '').trim();
		const district = String(body.district || 'JHK').trim();
		const block = body.block == null || body.block === '' ? null : String(body.block);
		const panchayat = body.panchayat == null || body.panchayat === '' ? null : String(body.panchayat);
		const phone = String(body.phone || body.phone_number || `anonymous:${request.ip}:${lat}:${lon}:${title}`).trim();

		if (!title || !description || !Number.isFinite(lat) || !Number.isFinite(lon)) {
			response.status(400).json({ error: 'title, description, lat, and lon are required.' });
			return;
		}

		const submission: ChallengeSubmission = {
			title,
			description,
			lat,
			lon,
			district,
			block,
			panchayat,
			phoneHash: hashPhoneNumber(phone),
		};
		const [triage, embedding, deduplication] = await Promise.all([
			triageClassify({ title, description }),
			embed({ text: `${title}\n${description}` }),
			dedupScore({ title, description, lat, lon }),
		]);
		const result = await createOrDeduplicateChallenge(submission);
		response.status(result.is_duplicate ? 200 : 201).json({
			...result,
			public_location: blurPublicLocation(lat, lon),
			ai: { triage: triage.data, embedding: embedding.data, deduplication: deduplication.data, fallback: triage.fallback || embedding.fallback || deduplication.fallback },
		});
	} catch (error) {
		response.status(500).json({ error: 'Unable to submit challenge.' });
	}
});

challengesRouter.get('/trending', async (_request, response) => {
	try {
		const result = await query(
			`SELECT id, ticket_number, title, district, upvotes_count, status,
					ST_Y(location::geometry) as lat, ST_X(location::geometry) as lon
			 FROM public.challenges
			 ORDER BY upvotes_count DESC LIMIT 10;`,
		);
		response.json(result.rows.map((row) => ({ ...row, ...blurPublicLocation(Number(row.lat), Number(row.lon)) })));
	} catch (error) {
		console.error('Trending challenges query failed:', error);
		response.status(500).json({ error: 'Unable to load trending challenges.' });
	}
});

challengesRouter.post('/:id/upvote', async (request, response) => {
	try {
		const body = request.body as Record<string, unknown>;
		const phone = String(body.phone || body.phone_number || '').trim();
		const lat = Number(body.lat);
		const lon = Number(body.lon);
		if (!phone || !Number.isFinite(lat) || !Number.isFinite(lon)) {
			response.status(400).json({ error: 'phone, lat, and lon are required.' });
			return;
		}

		const support = await recordChallengeSupport(String(request.params.id), hashPhoneNumber(phone), lat, lon);
		if (!support.geofence_ok) {
			response.status(400).json({ error: 'Verified support must be submitted within 30 km of the ticket.' });
			return;
		}
		if (support.window_closed) {
			response.status(400).json({ error: 'The upvote window is closed.' });
			return;
		}
		if (!support.vote_recorded) {
			response.json({ is_duplicate: true, already_voted: true, upvotes: support.upvotes, message: 'You have already supported this ticket.' });
			return;
		}
		response.json({ upvotes: support.upvotes, message: 'Upvote recorded.' });
	} catch (error) {
		console.error('Upvote failed:', error);
		if (error instanceof Error && error.message === 'Challenge not found.') {
			response.status(404).json({ error: 'Challenge not found.' });
			return;
		}
		response.status(500).json({ error: 'Unable to upvote challenge.' });
	}
});
