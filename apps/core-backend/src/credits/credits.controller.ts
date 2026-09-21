import { Request, Response, Router } from 'express';
import { issueCredit } from './credits.service';

export const creditsRouter = Router();

creditsRouter.post('/issue', async (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	try {
		const verifiedWorkhours = Number(body.verified_workhours ?? body.verifiedWorkhours);
		const required = ['student_user_id', 'apaar_id', 'project_id', 'challenge_title', 'institution_name'];
		if (required.some((field) => !String(body[field] || '').trim()) || !Number.isFinite(verifiedWorkhours)) {
			response.status(400).json({ error: 'student_user_id, apaar_id, project_id, challenge_title, institution_name, and verified_workhours are required.' });
			return;
		}
		const record = await issueCredit({
			studentUserId: String(body.student_user_id || body.studentUserId),
			apaarId: String(body.apaar_id || body.apaarId),
			projectId: String(body.project_id || body.projectId),
			challengeTitle: String(body.challenge_title || body.challengeTitle),
			institutionName: String(body.institution_name || body.institutionName),
			verifiedWorkhours,
			creditCategory: String(body.credit_category || body.creditCategory || 'CAPSTONE_PROJECT') as 'CAPSTONE_PROJECT',
		});
		response.status(201).json(record);
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to issue credit.' });
	}
});
