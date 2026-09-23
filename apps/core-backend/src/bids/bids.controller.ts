import { Request, Response, Router } from 'express';
import { submitBidMock } from './bids.service';

export const bidsRouter = Router();

bidsRouter.post('/submit', (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	const challengeId = String(body.challenge_id || body.challengeId || 'mock-challenge-001').trim();
	response.status(201).json(submitBidMock(challengeId));
});
