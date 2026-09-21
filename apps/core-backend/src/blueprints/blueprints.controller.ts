import { Request, Response, Router } from 'express';
import { cloneBlueprint } from './blueprints.service';

export const blueprintsRouter = Router();

blueprintsRouter.post('/clone', async (request: Request, response: Response) => {
	try {
		const body = request.body as Record<string, unknown>;
		const sourceProjectId = String(body.source_project_id || body.sourceProjectId || '').trim();
		const targetDistrict = String(body.target_district || body.targetDistrict || '').trim();
		if (!sourceProjectId || !targetDistrict) {
			response.status(400).json({ error: 'source_project_id and target_district are required.' });
			return;
		}
		response.status(201).json(await cloneBlueprint({ sourceProjectId, targetDistrict }));
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to clone blueprint.' });
	}
});
