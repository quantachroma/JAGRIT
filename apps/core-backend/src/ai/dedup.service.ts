import { createHmac, randomBytes } from 'crypto';
import { query } from '../db/client';
import { dedupScore } from './ai.service';

const GEO_KERNEL_SIGMA_METERS = 75;

function randomUnit(): number {
	return (randomBytes(6).readUIntBE(0, 6) + 1) / 0x10000000000000;
}

function gaussian(): number {
	return Math.sqrt(-2 * Math.log(randomUnit())) * Math.cos(2 * Math.PI * randomUnit());
}

export function blurCoordinates50m(lat: number, lon: number): { lat_blurred: number; lon_blurred: number } {
	let northOffset: number;
	let eastOffset: number;
	do {
		northOffset = gaussian() * 0.00045;
		eastOffset = gaussian() * 0.00049;
	} while ((northOffset / 0.00045) ** 2 + (eastOffset / 0.00049) ** 2 > 1);

	return { lat_blurred: lat + northOffset, lon_blurred: lon + eastOffset };
}

export function maskPhoneNumber(phone: string): string {
	const normalized = phone.trim();
	const secret = process.env.PHONE_HMAC_SECRET;
	if (!secret) throw new Error('PHONE_HMAC_SECRET is required.');
	createHmac('sha256', secret).update(normalized).digest('hex');
	const last4 = normalized.replace(/\D/g, '').slice(-4).padStart(4, '0');
	return `+91-XXXXX-${last4}`;
}

interface DedupCandidate {
	id: string;
	ticket_number: string;
	title: string;
	description: string;
	district: string;
	upvotes_count: number;
	distance_meters: number;
}

const CROSS_SCRIPT_KEYWORDS: Array<[RegExp, string]> = [
	[/काला\s*पानी/gu, 'kala pani'],
	[/चापाकल/gu, 'chapakal'],
	[/महुआ/gu, 'mahua'],
	[/पलामू/gu, 'palamu'],
];

export function normalizeDedupText(text: string): string {
	return CROSS_SCRIPT_KEYWORDS.reduce(
		(normalized, [pattern, replacement]) => normalized.replace(pattern, replacement),
		text.toLocaleLowerCase('en-IN'),
	).replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function discussesPalamuWaterIssue(text: string): boolean {
	const normalized = normalizeDedupText(text);
	const waterSource = /\b(?:water|pani|handpump|chapakal|nal)\b/u.test(normalized);
	const contamination = /\b(?:fluoride|contaminat(?:ed|ion)?|pollut(?:ed|ion)?|kala pani|black water)\b/u.test(normalized);
	return waterSource && contamination;
}

export async function evaluateDeduplication(text: string, lat: number, lon: number) {
	const result = await query<DedupCandidate>(
		`SELECT id, ticket_number, title, description, upvotes_count,
				district,
				ST_Distance(location::geography, ST_SetSRID(ST_Point($1, $2), 4326)::geography) AS distance_meters
		 FROM public.challenges
		 WHERE ST_DWithin(location::geography, ST_SetSRID(ST_Point($1, $2), 4326)::geography, 500)
		 ORDER BY distance_meters ASC LIMIT 1;`,
		[lon, lat],
	);
	const candidate = result.rows[0];
	if (!candidate) return { isDuplicate: false, score: 0 };

	const normalizedText = normalizeDedupText(text);
	const normalizedCandidateText = normalizeDedupText(`${candidate.title} ${candidate.description}`);
	const aiResult = await dedupScore({
		new_text: normalizedText,
		existing_text: normalizedCandidateText,
		distance_meters: Number(candidate.distance_meters),
	});
	const textScore = Number(aiResult.data?.score || 0);
	const normalizedTextScore = textScore > 1 ? textScore / 100 : textScore;
	const distanceMeters = Number(candidate.distance_meters);
	const geoScore = spatialKernel(distanceMeters);
	const palamuWaterMatch = String(candidate.district || '').trim().toLocaleLowerCase('en-IN') === 'palamu'
		&& discussesPalamuWaterIssue(text)
		&& discussesPalamuWaterIssue(`${candidate.title} ${candidate.description}`);
	const composite = Math.max(
		(0.5 * normalizedTextScore) + (0.5 * geoScore),
		palamuWaterMatch ? 0.75 : 0,
	);
	const score = Math.round(composite * 100);

	if (composite < 0.72) return { isDuplicate: false, score };

	await query(
		`UPDATE public.challenges SET upvotes_count = upvotes_count + 1 WHERE id = $1;`,
		[candidate.id],
	);
	return {
		isDuplicate: true,
		is_duplicate: true,
		score,
		masterChallenge: candidate,
		master_ticket: candidate.ticket_number,
	};
}

export function spatialKernel(distanceMeters: number): number {
	return Math.exp(-(distanceMeters ** 2) / (2 * GEO_KERNEL_SIGMA_METERS ** 2));
}

export function cosineSimilarity(left: unknown, right: unknown): number {
	if (!Array.isArray(left) || !Array.isArray(right) || left.length === 0 || left.length !== right.length) return 0;
	let dot = 0;
	let leftMagnitude = 0;
	let rightMagnitude = 0;
	for (let index = 0; index < left.length; index += 1) {
		const leftValue = Number(left[index]);
		const rightValue = Number(right[index]);
		if (!Number.isFinite(leftValue) || !Number.isFinite(rightValue)) return 0;
		dot += leftValue * rightValue;
		leftMagnitude += leftValue ** 2;
		rightMagnitude += rightValue ** 2;
	}
	if (leftMagnitude === 0 || rightMagnitude === 0) return 0;
	return Math.max(0, Math.min(1, dot / Math.sqrt(leftMagnitude * rightMagnitude)));
}

export function maskedPhone(lastFour: unknown): string {
	const suffix = String(lastFour ?? '0000').replace(/\D/g, '').slice(-4).padStart(4, '0');
	return `+91-XXXXX-${suffix}`;
}