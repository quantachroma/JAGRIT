jest.mock('../src/db/client', () => ({ query: jest.fn() }));

import { query } from '../src/db/client';
import { completeRepair, loadAlarmState, persistAlarmState, recordBreakdownReport } from '../src/quorum/alarm.service';

const mockedQuery = query as jest.MockedFunction<typeof query>;
const projectId = 'project-alarm-1';

beforeEach(() => mockedQuery.mockReset());

test('reloads frozen reports and persists repair reset state', async () => {
	const frozenAt = new Date('2026-09-23T00:00:00Z');
	const startedAt = new Date('2026-09-20T00:00:00Z');
	const reports = [
		{ citizenId: 'one', verified: true, reportedAt: frozenAt },
		{ citizenId: 'two', verified: true, reportedAt: frozenAt },
		{ citizenId: 'three', verified: true, reportedAt: frozenAt },
	];
	mockedQuery.mockResolvedValueOnce({
		rows: [{ clock_started_at: startedAt, frozen_at: frozenAt, repair_deadline: new Date('2026-09-30T00:00:00Z'), reports }],
		rowCount: 1,
	} as never);

	const reloaded = await loadAlarmState(projectId, new Date());
	expect(reloaded.frozenAt).toEqual(frozenAt);
	expect(reloaded.reports).toHaveLength(3);

	const repairedAt = new Date('2026-09-24T00:00:00Z');
	const reset = completeRepair(reloaded, repairedAt);
	expect(recordBreakdownReport(reset, { citizenId: 'four', verified: true, reportedAt: repairedAt }, repairedAt).result).toBe('MONITORING');

	await persistAlarmState(projectId, reset, repairedAt);
	expect(mockedQuery).toHaveBeenCalledWith(expect.stringContaining('project_alarm_states'), expect.arrayContaining([projectId, repairedAt, null, null]));
});
