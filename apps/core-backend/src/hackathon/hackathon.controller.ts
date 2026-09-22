import { Router } from 'express';
import { evaluateBids, placeBid, submitDeliverableMock } from './hackathon.service';

export const hackathonRouter = Router();

hackathonRouter.post('/deliverable', (request, response) => {
	const body = request.body as Record<string, unknown>;
	const projectId = String(body.project_id || body.projectId || '').trim();
	const round = Number(body.round);
	if (!projectId || ![1, 2, 3].includes(round)) {
		response.status(400).json({ error: 'project_id and round (1, 2, or 3) are required.' });
		return;
	}
	response.status(201).json(submitDeliverableMock(projectId, round as 1 | 2 | 3));
});

hackathonRouter.post('/bid', async (request, response) => {
	const body = request.body as Record<string, unknown>;
	const challengeId = String(body.challenge_id || body.challengeId || '').trim();
	const universityName = String(body.university_name || body.universityName || '').trim();
	const facultyValue = body.faculty_id || body.facultyId;
	const facultyId = facultyValue == null || facultyValue === '' ? null : String(facultyValue);
	const budget = Number(body.budget);

	if (!challengeId || !universityName || !Number.isFinite(budget)) {
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
		const result = await evaluateBids(String(request.params.challengeId));
		response.json(result);
	} catch (error) {
		console.error('Bid evaluation failed:', error);
		response.status(500).json({ error: 'Unable to evaluate bids.' });
	}
});
