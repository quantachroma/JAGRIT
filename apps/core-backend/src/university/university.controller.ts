import { Request, Response, Router } from 'express';
import { getMaintenanceInstallations, getResolutionVelocity, getUniversityLeaderboard, triggerMaintenanceRebid } from './university.service';

export const universityRouter = Router();

universityRouter.get('/leaderboard', async (_request: Request, response: Response) => {
	try {
		response.json({ institutions: await getUniversityLeaderboard(), resolutionVelocity: await getResolutionVelocity() });
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to load university leaderboard.' });
	}
});

universityRouter.get('/maintenance', async (_request: Request, response: Response) => {
	try {
		response.json({ testWindowDays: 45, inspectionSlaHours: 48, repairWindowDays: 7, installations: await getMaintenanceInstallations() });
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to load maintenance alarms.' });
	}
});

universityRouter.post('/maintenance/:projectId/rebid-clawback', async (request: Request, response: Response) => {
	try {
		response.json(await triggerMaintenanceRebid(String(request.params.projectId)));
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to trigger automatic re-bidding.';
		response.status(message === 'Project not found.' ? 404 : message.includes('already') ? 409 : 500).json({ error: message });
	}
});