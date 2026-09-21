import { Request, Response, Router } from 'express';
import { getProjectMock } from './projects.service';
import { AlarmState, BreakdownReport, completeRepair, getRepairDeadline, recordBreakdownReport, REPAIR_SLA_DAYS } from '../quorum/alarm.service';

export const projectsRouter = Router();
const alarmStates = new Map<string, AlarmState>();

projectsRouter.get('/:id', (request: Request, response: Response) => {
	response.json(getProjectMock(String(request.params.id)));
});

/** [MOCK] Runtime-only state until the alarm ledger is added to the database schema. */
projectsRouter.post('/:id/alarm', (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	const projectId = String(request.params.id);
	const citizenId = String(body.citizen_id || body.citizenId || '').trim();
	const verified = body.verified === true;
	if (!citizenId) {
		response.status(400).json({ error: 'citizen_id is required.' });
		return;
	}
	const current = alarmStates.get(projectId) || { clockStartedAt: new Date(body.field_deployment_date as string || Date.now()), reports: [] };
	const report: BreakdownReport = { citizenId, verified, reportedAt: new Date() };
	const evaluation = recordBreakdownReport(current, report);
	alarmStates.set(projectId, evaluation.state);
	response.status(201).json({
		project_id: projectId,
		result: evaluation.result,
		clock_frozen: Boolean(evaluation.state.frozenAt),
		repair_deadline: evaluation.state.frozenAt ? getRepairDeadline(evaluation.state).toISOString() : null,
	});
});

projectsRouter.post('/:id/alarm/repair-complete', (request: Request, response: Response) => {
	try {
		const projectId = String(request.params.id);
		const current = alarmStates.get(projectId);
		if (!current) throw new Error('No alarm state exists for this project.');
		alarmStates.set(projectId, completeRepair(current));
		response.json({ project_id: projectId, result: 'CLOCK_RESET_DAY_1', repair_sla_days: REPAIR_SLA_DAYS });
	} catch (error) {
		response.status(409).json({ error: error instanceof Error ? error.message : 'Unable to complete repair.' });
	}
});
