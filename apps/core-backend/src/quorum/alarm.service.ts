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
