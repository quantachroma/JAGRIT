export interface BidSubmissionMock {
	bidId: string;
	challengeId: string;
	status: 'SUBMITTED';
	message: string;
}

export function submitBidMock(challengeId: string): BidSubmissionMock {
	return {
		bidId: 'mock-bid-001',
		challengeId,
		status: 'SUBMITTED',
		message: '[MOCK] Bid accepted for evaluation.',
	};
}

export type BiddingExpiryState = 'DIRECT_RND' | 'DYNAMIC_HACKATHON' | 'ESCALATION';

/** ADR-009: an explicit final-MPS lookup table, never a continuous formula. */
export function getBiddingWindowDays(finalMps: number): 3 | 5 | 7 | 10 {
	if (!Number.isFinite(finalMps) || finalMps < 0 || finalMps > 100) {
		throw new Error('finalMps must be a number between 0 and 100.');
	}
	if (finalMps >= 85) return 3;
	if (finalMps >= 65) return 5;
	if (finalMps >= 45) return 7;
	return 10;
}

/** ADR-009: allocation mode is determined once the bidding window expires. */
export function resolveBiddingExpiry(bidCount: number): BiddingExpiryState {
	if (!Number.isInteger(bidCount) || bidCount < 0) throw new Error('bidCount must be a non-negative integer.');
	if (bidCount === 0) return 'ESCALATION';
	if (bidCount === 1) return 'DIRECT_RND';
	return 'DYNAMIC_HACKATHON';
}
