import { Router } from 'express';
import { evaluateBids, placeBid } from './hackathon.service';

export const hackathonRouter = Router();

hackathonRouter.post('/bid', async (request, response) => {
	const {
		challenge_id: challengeId,
		university_name: universityName,
		budget,
		faculty_id: facultyId,
	} = request.body as {
		challenge_id?: string;
		university_name?: string;
		budget?: number;
		faculty_id?: string;
	};

	if (!challengeId || !universityName || typeof budget !== 'number' || !facultyId) {
		response.status(400).json({ error: 'challenge_id, university_name, budget, and faculty_id are required.' });
		return;
	}

	try {
		const project = await placeBid(challengeId, universityName, budget, facultyId);
		response.status(201).json(project);
	} catch (error) {
		console.error('Hackathon bid failed:', error);
		response.status(500).json({ error: 'Unable to place bid.' });
	}
});

hackathonRouter.post('/:challengeId/evaluate-bids', async (request, response) => {
	try {
		const result = await evaluateBids(request.params.challengeId);
		response.json(result);
	} catch (error) {
		console.error('Bid evaluation failed:', error);
		response.status(500).json({ error: 'Unable to evaluate bids.' });
	}
});
