import { PriorityScore, PriorityScoreInput, getPreliminaryMPS } from './priority.service';

export interface UpvoteWindow {
	preliminaryMps: PriorityScore;
	durationHours: 0 | 12 | 24 | 48 | 72;
	emergencyBypass: boolean;
}

export interface VerifiedUpvote {
	phoneHash: string;
	verified: boolean;
	lat: number;
	lon: number;
	createdAt: Date | string;
}

const EARTH_RADIUS_METRES = 6_371_000;

function distanceMetres(fromLat: number, fromLon: number, toLat: number, toLon: number): number {
	const radians = Math.PI / 180;
	const dLat = (toLat - fromLat) * radians;
	const dLon = (toLon - fromLon) * radians;
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(fromLat * radians) * Math.cos(toLat * radians) * Math.sin(dLon / 2) ** 2;
	return 2 * EARTH_RADIUS_METRES * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** ADR-007: priority determines the initial community upvote window. */
export function getUpvoteWindow(data: PriorityScoreInput): UpvoteWindow {
	const preliminaryMps = getPreliminaryMPS(data);
	if (data.healthScore >= 90) return { preliminaryMps, durationHours: 0, emergencyBypass: true };
	if (preliminaryMps.mps >= 85) return { preliminaryMps, durationHours: 12, emergencyBypass: false };
	if (preliminaryMps.mps >= 65) return { preliminaryMps, durationHours: 24, emergencyBypass: false };
	if (preliminaryMps.mps >= 45) return { preliminaryMps, durationHours: 48, emergencyBypass: false };
	return { preliminaryMps, durationHours: 72, emergencyBypass: false };
}

/** ADR-003/007: 25 unique, verified, local votes received within 24 hours close the window. */
export function shouldAutoCloseUpvoteWindow(
	votes: VerifiedUpvote[],
	challengeLocation: { lat: number; lon: number },
	now = new Date(),
): boolean {
	const cutoff = now.getTime() - 24 * 60 * 60 * 1000;
	const uniquePhoneHashes = new Set<string>();

	for (const vote of votes) {
		const createdAt = new Date(vote.createdAt).getTime();
		const isLocal = distanceMetres(challengeLocation.lat, challengeLocation.lon, vote.lat, vote.lon) <= 30_000;
		if (vote.verified && vote.phoneHash && Number.isFinite(createdAt) && createdAt >= cutoff && createdAt <= now.getTime() && isLocal) {
			uniquePhoneHashes.add(vote.phoneHash);
		}
	}

	return uniquePhoneHashes.size >= 25;
}
