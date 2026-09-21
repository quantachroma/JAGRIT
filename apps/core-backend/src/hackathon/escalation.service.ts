export interface HScorePenaltyInput {
	baseHScore: number;
	matchScore: number;
	ignoredBids: number;
	hasValidTechnicalReason: boolean;
}

export interface StageOneEscalation {
	budgetInr: number;
	budgetIncreasePercent: number;
	deliverables: ['TWO_HAMLETS', 'IOT_SENSORS', 'SPARES_KIT_24_MONTHS'];
	nepCredits: 6;
	stage: 'ESCALATION_STAGE_1';
}

/** ADR-011: penalties apply only to >80% invited HEIs without a valid reason. */
export function calculateHScoreAfterIgnoredBids(input: HScorePenaltyInput): number {
	if (!Number.isFinite(input.baseHScore) || input.baseHScore < 0) throw new Error('baseHScore must be non-negative.');
	if (!Number.isFinite(input.matchScore) || input.matchScore < 0 || input.matchScore > 100) throw new Error('matchScore must be between 0 and 100.');
	if (!Number.isInteger(input.ignoredBids) || input.ignoredBids < 0) throw new Error('ignoredBids must be a non-negative integer.');
	if (input.matchScore <= 80 || input.hasValidTechnicalReason) return input.baseHScore;
	return Math.max(0, input.baseHScore - 5 * input.ignoredBids);
}

/** ADR-011 Stage 1: evaluator may expand budget by no more than 25%. */
export function createStageOneEscalation(baseBudgetInr: number, budgetIncreasePercent: number): StageOneEscalation {
	if (!Number.isFinite(baseBudgetInr) || baseBudgetInr < 0) throw new Error('baseBudgetInr must be non-negative.');
	if (!Number.isFinite(budgetIncreasePercent) || budgetIncreasePercent < 0 || budgetIncreasePercent > 25) {
		throw new Error('budgetIncreasePercent must be between 0 and 25.');
	}
	return {
		budgetInr: baseBudgetInr * (1 + budgetIncreasePercent / 100),
		budgetIncreasePercent,
		deliverables: ['TWO_HAMLETS', 'IOT_SENSORS', 'SPARES_KIT_24_MONTHS'],
		nepCredits: 6,
		stage: 'ESCALATION_STAGE_1',
	};
}
