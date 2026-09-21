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
