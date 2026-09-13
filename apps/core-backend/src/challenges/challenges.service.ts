import { query } from '../db/client';

export interface ChallengeSubmission {
	title: string;
	description: string;
	lat: number;
	lon: number;
	district: string;
	block: string | null;
	panchayat?: string | null;
}

interface NearbyChallenge {
	id: string;
	ticket_number: string;
	upvotes_count: number;
	dist_meters: number;
}

export async function createOrDeduplicateChallenge(data: ChallengeSubmission) {
	const nearbyResult = await query<NearbyChallenge>(
		`SELECT id, ticket_number, upvotes_count,
				ST_Distance(location::geography, ST_SetSRID(ST_Point($1, $2), 4326)::geography) as dist_meters
		 FROM public.challenges
		 WHERE ST_DWithin(location::geography, ST_SetSRID(ST_Point($1, $2), 4326)::geography, 500)
		 ORDER BY dist_meters ASC LIMIT 1;`,
		[data.lon, data.lat],
	);

	const nearbyChallenge = nearbyResult.rows[0];
	if (nearbyChallenge && Number(nearbyChallenge.dist_meters) <= 500) {
		const updatedResult = await query<{ upvotes_count: number }>(
			'UPDATE public.challenges SET upvotes_count = upvotes_count + 1 WHERE id = $1 RETURNING upvotes_count;',
			[nearbyChallenge.id],
		);

		return {
			is_duplicate: true,
			ticket_number: nearbyChallenge.ticket_number,
			upvotes: updatedResult.rows[0].upvotes_count,
			message: 'Matched to existing ticket within 500m. Upvote incremented.',
		};
	}

	const districtCode = (data.district || 'JHK').substring(0, 3).toUpperCase();
	const ticketNumber = `JAG-2026-${districtCode}-${Math.floor(1000 + Math.random() * 9000)}`;

	await query(
		`INSERT INTO public.challenges
			(ticket_number, title, description, location, district, block, panchayat, status, submission_channel)
		 VALUES ($1, $2, $3, ST_SetSRID(ST_Point($4, $5), 4326), $6, $7, $8, 'PENDING_HITL', 'APP');`,
		[
			ticketNumber,
			data.title,
			data.description,
			data.lon,
			data.lat,
			data.district || 'JHK',
			data.block || null,
			data.panchayat || null,
		],
	);

	return {
		is_duplicate: false,
		ticket_number: ticketNumber,
		status: 'PENDING_HITL',
		message: 'New challenge registered successfully.',
	};
}
