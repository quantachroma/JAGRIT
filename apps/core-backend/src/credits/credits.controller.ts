import { Request, Response, Router } from 'express';
import { issueCreditMock } from './credits.service';

export const creditsRouter = Router();

creditsRouter.post('/issue', (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	const projectId = String(body.project_id || body.projectId || 'mock-project-001').trim();
	response.status(201).json(issueCreditMock(projectId));
});
