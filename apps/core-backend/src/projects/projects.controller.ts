import { Request, Response, Router } from 'express';
import { getProjectById, getProjects } from './projects.service';
import { BreakdownReport, completeRepair, getRepairDeadline, loadAlarmState, persistAlarmState, recordBreakdownReport, REPAIR_SLA_DAYS } from '../quorum/alarm.service';

export const projectsRouter = Router();

projectsRouter.get('/', async (_request: Request, response: Response) => {
	try {
		response.json(await getProjects());
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to load projects.' });
	}
});

projectsRouter.get('/:id', async (request: Request, response: Response) => {
	const project = await getProjectById(String(request.params.id));
	if (!project) {
		response.status(404).json({ error: 'Project not found.' });
		return;
	}
	response.json(project);
});

projectsRouter.post('/:id/alarm', async (request: Request, response: Response) => {
	try {
		const body = request.body as Record<string, unknown>;
		const projectId = String(request.params.id);
		const citizenId = String(body.citizen_id || body.citizenId || '').trim();
		const verified = body.verified === true;
		if (!citizenId) {
			response.status(400).json({ error: 'citizen_id is required.' });
			return;
		}
		const current = await loadAlarmState(projectId, new Date(body.field_deployment_date as string || Date.now()));
		const report: BreakdownReport = { citizenId, verified, reportedAt: new Date() };
		const evaluation = recordBreakdownReport(current, report);
		await persistAlarmState(projectId, evaluation.state);
		response.status(201).json({
			project_id: projectId,
			result: evaluation.result,
			clock_frozen: Boolean(evaluation.state.frozenAt),
			repair_deadline: evaluation.state.frozenAt ? getRepairDeadline(evaluation.state).toISOString() : null,
		});
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to record breakdown report.' });
	}
});

projectsRouter.post('/:id/alarm/repair-complete', async (request: Request, response: Response) => {
	try {
		const projectId = String(request.params.id);
		const current = await loadAlarmState(projectId, new Date());
		if (!current.frozenAt) throw new Error('No frozen alarm state exists for this project.');
		const repairedAt = new Date();
		await persistAlarmState(projectId, completeRepair(current, repairedAt), repairedAt);
		response.json({ project_id: projectId, result: 'CLOCK_RESET_DAY_1', repair_sla_days: REPAIR_SLA_DAYS });
	} catch (error) {
		response.status(409).json({ error: error instanceof Error ? error.message : 'Unable to complete repair.' });
	}
});
