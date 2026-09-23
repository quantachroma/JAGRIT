import { query } from '../db/client';

export interface BreakdownReport {
	citizenId: string;
	verified: boolean;
	reportedAt: Date | string;
}

export interface AlarmState {
	clockStartedAt: Date;
	frozenAt?: Date;
	reports: BreakdownReport[];
}

export type AlarmResult = 'OUTSIDE_FIELD_TEST' | 'MONITORING' | 'CLOCK_FROZEN';

const FIELD_TEST_DAYS = 45;
const REPORT_WINDOW_MS = 24 * 60 * 60 * 1000;
export const REPAIR_SLA_DAYS = 7;

interface AlarmStateRow {
	clock_started_at: Date | string;
	frozen_at: Date | string | null;
	repair_deadline: Date | string | null;
	reports: BreakdownReport[];
}

export async function loadAlarmState(projectId: string, initialClockStartedAt: Date): Promise<AlarmState> {
	const result = await query<AlarmStateRow>(
		`SELECT clock_started_at, frozen_at, repair_deadline, reports
		 FROM public.project_alarm_states WHERE project_id = $1;`,
		[projectId],
	);
	const row = result.rows[0];
	if (!row) return { clockStartedAt: initialClockStartedAt, reports: [] };
	return {
		clockStartedAt: new Date(row.clock_started_at),
		frozenAt: row.frozen_at ? new Date(row.frozen_at) : undefined,
		reports: (row.reports || []).map((report) => ({ ...report, reportedAt: new Date(report.reportedAt) })),
	};
}

export async function persistAlarmState(projectId: string, state: AlarmState, repairedAt?: Date): Promise<void> {
	const repairDeadline = state.frozenAt ? getRepairDeadline(state) : null;
	await query(
		`INSERT INTO public.project_alarm_states
			(project_id, clock_started_at, frozen_at, repair_deadline, reports, repaired_at)
		 VALUES ($1, $2, $3, $4, $5::jsonb, $6)
		 ON CONFLICT (project_id) DO UPDATE SET
			clock_started_at = EXCLUDED.clock_started_at,
			frozen_at = EXCLUDED.frozen_at,
			repair_deadline = EXCLUDED.repair_deadline,
			reports = EXCLUDED.reports,
			repaired_at = COALESCE(EXCLUDED.repaired_at, public.project_alarm_states.repaired_at),
			updated_at = NOW();`,
		[projectId, state.clockStartedAt, state.frozenAt || null, repairDeadline, JSON.stringify(state.reports), repairedAt || null],
	);
}

function uniqueVerifiedReportsInLast24Hours(reports: BreakdownReport[], now: Date): number {
	const cutoff = now.getTime() - REPORT_WINDOW_MS;
	return new Set(reports.filter((report) => {
		const reportedAt = new Date(report.reportedAt).getTime();
		return report.verified && report.citizenId && Number.isFinite(reportedAt) && reportedAt >= cutoff && reportedAt <= now.getTime();
	}).map((report) => report.citizenId)).size;
}

/** ADR-013: three unique verified reports in 24h freeze Days 1–45 field testing. */
export function recordBreakdownReport(state: AlarmState, report: BreakdownReport, now = new Date()): { state: AlarmState; result: AlarmResult } {
	const elapsedDays = (now.getTime() - state.clockStartedAt.getTime()) / (24 * 60 * 60 * 1000);
	if (elapsedDays < 0 || elapsedDays > FIELD_TEST_DAYS) return { state, result: 'OUTSIDE_FIELD_TEST' };
	const reports = [...state.reports, report];
	if (state.frozenAt) return { state: { ...state, reports }, result: 'CLOCK_FROZEN' };
	const frozenAt = uniqueVerifiedReportsInLast24Hours(reports, now) >= 3 ? now : undefined;
	return { state: { ...state, reports, frozenAt }, result: frozenAt ? 'CLOCK_FROZEN' : 'MONITORING' };
}

/** ADR-013: a completed repair resets the 45-day field-test clock to Day 1. */
export function completeRepair(state: AlarmState, repairCompletedAt = new Date()): AlarmState {
	if (!state.frozenAt) throw new Error('A repair can only reset a frozen field-test clock.');
	return { clockStartedAt: repairCompletedAt, reports: [] };
}

/** ADR-013: frozen projects receive a seven-day repair SLA. */
export function getRepairDeadline(state: AlarmState): Date {
	if (!state.frozenAt) throw new Error('A repair deadline exists only after the field-test clock is frozen.');
	return new Date(state.frozenAt.getTime() + REPAIR_SLA_DAYS * 24 * 60 * 60 * 1000);
}
