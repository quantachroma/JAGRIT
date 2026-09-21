import { Request, Response, Router } from 'express';
import { getProjectMock } from './projects.service';

export const projectsRouter = Router();

projectsRouter.get('/:id', (request: Request, response: Response) => {
	response.json(getProjectMock(String(request.params.id)));
});
