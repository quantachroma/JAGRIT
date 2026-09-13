import { Router } from 'express';
import { query } from '../db/client';
import {
	ChallengeSubmission,
	createOrDeduplicateChallenge,
} from './challenges.service';

export const challengesRouter = Router();

challengesRouter.post('/submit', async (request, response) => {
	try {
		const body = request.body as Record<string, unknown>;
		const lat = Number(body.lat);
		const lon = Number(body.lon);
		const title = String(body.title || '').trim();
		const description = String(body.description || '').trim();
		const district = String(body.district || 'JHK').trim();
		const block = body.block == null || body.block === '' ? null : String(body.block);
		const panchayat = body.panchayat == null || body.panchayat === '' ? null : String(body.panchayat);

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
		};
		const result = await createOrDeduplicateChallenge(submission);
		response.status(result.is_duplicate ? 200 : 201).json(result);
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
		response.json(result.rows);
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
