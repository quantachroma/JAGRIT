import { query } from '../db/client';
import { createHmac, randomBytes } from 'crypto';
import { shouldAutoCloseUpvoteWindow, VerifiedUpvote } from './window.service';

export interface ChallengeSubmission {
	title: string;
	description: string;
	lat: number;
	lon: number;
	district: string;
	block: string | null;
	panchayat?: string | null;
	phoneHash?: string;
}

export interface PublicLocation {
	lat: number;
	lon: number;
}

const EARTH_RADIUS_METRES = 6_371_000;

/** ADR-003: raw phone numbers must never be persisted. */
export function hashPhoneNumber(phone: string): string {
	const secret = process.env.PHONE_HMAC_SECRET;
	if (!secret) throw new Error('PHONE_HMAC_SECRET is required.');
	return createHmac('sha256', secret).update(phone.trim()).digest('hex');
}

/** ADR-003: public coordinates are offset by exactly 50 metres in a random direction. */
export function blurPublicLocation(lat: number, lon: number): PublicLocation {
	const bearing = (randomBytes(4).readUInt32BE(0) / 0xffffffff) * Math.PI * 2;
	const angularDistance = 50 / EARTH_RADIUS_METRES;
	const originLat = lat * Math.PI / 180;
	const originLon = lon * Math.PI / 180;
	const blurredLat = Math.asin(Math.sin(originLat) * Math.cos(angularDistance) + Math.cos(originLat) * Math.sin(angularDistance) * Math.cos(bearing));
	const blurredLon = originLon + Math.atan2(Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(originLat), Math.cos(angularDistance) - Math.sin(originLat) * Math.sin(blurredLat));
	return { lat: blurredLat * 180 / Math.PI, lon: blurredLon * 180 / Math.PI };
}

interface NearbyChallenge {
	id: string;
	ticket_number: string;
	title: string;
	description: string;
	upvotes_count: number;
	dist_meters: number;
}

interface ChallengeSupportResult {
	upvotes: number;
	vote_recorded: boolean;
	geofence_ok: boolean;
	window_closed: boolean;
	challenge_exists: boolean;
}

/**
 * Records one verified local support per hashed phone. The unique database
 * constraint is the concurrency guard: an already-recorded phone produces no
 * row in inserted_vote and therefore cannot increment the counter.
 */
export async function recordChallengeSupport(ticketId: string, phoneHash: string, lat: number, lon: number): Promise<ChallengeSupportResult> {
	if (!phoneHash) throw new Error('A hashed phone number is required to record support.');
	const result = await query<ChallengeSupportResult>(
		`WITH eligible_ticket AS (
			 SELECT id,
				ST_DWithin(location::geography, ST_SetSRID(ST_Point($3, $4), 4326)::geography, 30000) AS is_local,
				location,
				(accelerated_deadline IS NOT NULL AND accelerated_deadline <= NOW()) AS window_closed
			 FROM public.challenges WHERE id = $1
		), inserted_vote AS (
			 INSERT INTO public.challenge_upvotes (ticket_id, phone_hash, voter_location)
			 SELECT id, $2, ST_SetSRID(ST_Point($3, $4), 4326)
			 FROM eligible_ticket WHERE is_local AND NOT window_closed
			 ON CONFLICT (ticket_id, phone_hash) DO NOTHING
			 RETURNING ticket_id
		), incremented AS (
			 UPDATE public.challenges
			 SET upvotes_count = upvotes_count + 1
			 WHERE id IN (SELECT ticket_id FROM inserted_vote)
			 RETURNING upvotes_count
		)
		SELECT
			COALESCE((SELECT upvotes_count FROM incremented), (SELECT upvotes_count FROM public.challenges WHERE id = $1)) AS upvotes,
			EXISTS(SELECT 1 FROM inserted_vote) AS vote_recorded,
			COALESCE((SELECT is_local FROM eligible_ticket), FALSE) AS geofence_ok,
			COALESCE((SELECT window_closed FROM eligible_ticket), FALSE) AS window_closed,
			EXISTS(SELECT 1 FROM eligible_ticket) AS challenge_exists;`,
		[ticketId, phoneHash, lon, lat],
	);
	if (!result.rows[0]?.challenge_exists) throw new Error('Challenge not found.');
	if (result.rows[0].vote_recorded) {
		const voteResult = await query<VerifiedUpvote & { challenge_lat: number; challenge_lon: number }>(
			`SELECT c.location, ST_Y(c.location::geometry) AS challenge_lat, ST_X(c.location::geometry) AS challenge_lon,
				cu.phone_hash AS "phoneHash", TRUE AS verified, ST_Y(cu.voter_location::geometry) AS lat,
				ST_X(cu.voter_location::geometry) AS lon, cu.created_at AS "createdAt"
			 FROM public.challenges c
			 JOIN public.challenge_upvotes cu ON cu.ticket_id = c.id
			 WHERE c.id = $1;`,
			[ticketId],
		);
		const firstVote = voteResult.rows[0];
		if (firstVote && shouldAutoCloseUpvoteWindow(voteResult.rows, { lat: firstVote.challenge_lat, lon: firstVote.challenge_lon })) {
			await query(
				`UPDATE public.challenges
				 SET accelerated_deadline = COALESCE(accelerated_deadline, NOW())
				 WHERE id = $1 AND accelerated_deadline IS NULL;`,
				[ticketId],
			);
		}
	}
	return result.rows[0];
}

export async function createOrDeduplicateChallenge(data: ChallengeSubmission) {
	const nearbyResult = await query<NearbyChallenge>(
		`SELECT id, ticket_number, title, description, upvotes_count,
				ST_Distance(location::geography, ST_SetSRID(ST_Point($1, $2), 4326)::geography) as dist_meters
		 FROM public.challenges
		 WHERE ST_DWithin(location::geography, ST_SetSRID(ST_Point($1, $2), 4326)::geography, 500)
			AND status != 'SOLVED'
		 ORDER BY dist_meters ASC LIMIT 5;`,
		[data.lon, data.lat],
	);

	const normalizedWords = (text: string) => new Set(text.toLocaleLowerCase('en-IN').match(/[\p{L}\p{N}]+/gu) || []);
	const incomingWords = normalizedWords(`${data.title} ${data.description}`);
	const textSimilarity = (candidate: NearbyChallenge) => {
		const candidateWords = normalizedWords(`${candidate.title} ${candidate.description}`);
		const intersection = [...incomingWords].filter((word) => candidateWords.has(word)).length;
		const union = new Set([...incomingWords, ...candidateWords]).size;
		return union === 0 ? 0 : intersection / union;
	};

	const duplicate = nearbyResult.rows
		.map((candidate) => ({ candidate, textScore: textSimilarity(candidate), geoScore: Math.exp(-(Number(candidate.dist_meters) ** 2) / (2 * 75 ** 2)) }))
		.find(({ textScore, geoScore }) => (0.30 * textScore) + (0.25 * geoScore) + (0.45 * textScore) >= 0.72 || textScore >= 0.70);

	if (duplicate) {
		const { candidate } = duplicate;
		const updated = await query<{ upvotes_count: number }>(
			`UPDATE public.challenges
			 SET upvotes_count = upvotes_count + 1
			 WHERE id = $1
			 RETURNING upvotes_count;`,
			[candidate.id],
		);
		const upvotes = Number(updated.rows[0]?.upvotes_count ?? candidate.upvotes_count) ;
		return {
			success: true,
			is_duplicate: true,
			deduplicated: true,
			ticket_number: candidate.ticket_number,
			masterTicketNumber: candidate.ticket_number,
			upvotes,
			distanceMetres: Math.round(Number(candidate.dist_meters)),
			message: 'Formula 1 Match (D >= 0.72): Merged into Master Incident Cluster (+1 upvote).',
		};
	}

	const districtCode = (data.district || 'JHK').substring(0, 3).toUpperCase();
	const ticketNumber = `JAG-2026-${districtCode}-${Math.floor(1000 + Math.random() * 9000)}`;

	await query(
		`WITH created_challenge AS (
			INSERT INTO public.challenges
			(ticket_number, title, description, location, district, block, panchayat, status, submission_channel)
		 VALUES ($1, $2, $3, ST_SetSRID(ST_Point($4, $5), 4326), $6, $7, $8, 'PENDING_HITL', 'APP')
			RETURNING id
		), recorded_submitter_vote AS (
			INSERT INTO public.challenge_upvotes (ticket_id, phone_hash, voter_location)
			SELECT id, $9, ST_SetSRID(ST_Point($4, $5), 4326) FROM created_challenge
			ON CONFLICT (ticket_id, phone_hash) DO NOTHING
		)
		SELECT id FROM created_challenge;`,
		[
			ticketNumber,
			data.title,
			data.description,
			data.lon,
			data.lat,
			data.district || 'JHK',
			data.block || null,
			data.panchayat || null,
			data.phoneHash,
		],
	);

	return {
		is_duplicate: false,
		ticket_number: ticketNumber,
		status: 'PENDING_HITL',
		message: 'New challenge registered successfully.',
	};
}
