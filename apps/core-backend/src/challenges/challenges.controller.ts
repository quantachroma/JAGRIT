import { Request, Response, Router } from 'express';
import { query } from '../db/client';
import {
	ChallengeSubmission,
	createOrDeduplicateChallenge,
	hashPhoneNumber,
	blurPublicLocation,
} from './challenges.service';
import { dedupScore, embed, triageClassify } from '../ai/ai.service';

export const challengesRouter = Router();

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
		const phone = String(body.phone || body.phone_number || '').trim();

		if (!title || !description || !phone || !Number.isFinite(lat) || !Number.isFinite(lon)) {
			response.status(400).json({ error: 'title, description, phone, lat, and lon are required.' });
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
		console.error('Challenge submission failed:', error);
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
		const result = await query<{ id: string; ticket_number: string; upvotes_count: number }>(
			`UPDATE public.challenges
			 SET upvotes_count = upvotes_count + 1
			 WHERE id = $1
			 RETURNING id, ticket_number, upvotes_count;`,
			[String(request.params.id)],
		);

		if (result.rowCount === 0) {
			response.status(404).json({ error: 'Challenge not found.' });
			return;
		}

		response.json(result.rows[0]);
	} catch (error) {
		console.error('Challenge upvote failed:', error);
		response.status(500).json({ error: 'Unable to upvote challenge.' });
	}
});
