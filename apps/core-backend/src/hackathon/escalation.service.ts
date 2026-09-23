import { query } from '../db/client';

export interface HScorePenaltyInput {
	baseHScore: number;
	matchScore: number;
	ignoredBids: number;
	hasValidTechnicalReason: boolean;
}

export type EscalationStage = 1 | 2 | 3 | 4;

export interface EscalationStageResult {
	stage: EscalationStage;
	status: 'BIDDING_PHASE_2' | 'ITI_POLYTECHNIC_ESCALATION' | 'DHTE_JCSTI_DIRECTIVE' | 'ESCALATED_PAN_INDIA_PRIORITY';
}

export function applyIgnoredBidPenalty(collegeMatchScore: number, hBase: number, ignoredBids: number): number {
	return calculateHScoreAfterIgnoredBids({
		baseHScore: hBase,
		matchScore: collegeMatchScore,
		ignoredBids,
		hasValidTechnicalReason: false,
	});
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

export function calculateExpandedBudget(currentBudget: number): number {
	if (!Number.isFinite(currentBudget) || currentBudget < 0) throw new Error('currentBudget must be non-negative.');
	return currentBudget * 1.25;
}

export async function applyScopeExpansion(challengeId: string, currentBudget: number) {
	const newBudget = calculateExpandedBudget(currentBudget);
	await query(
		`UPDATE public.challenges
		 SET allocated_pool_inr = $2
		 WHERE id = $1;`,
		[challengeId, newBudget],
	);
	await query(
		`UPDATE public.projects
		 SET total_budget_inr = $2,
				nep_credits = 6,
				deliverables_expanded = TRUE,
				spares_kit_months = 24
		 WHERE challenge_id = $1;`,
		[challengeId, newBudget],
	);
	return {
		challengeId,
		newBudget,
		nepCredits: 6,
		deliverablesExpanded: true,
		sparesKitMonths: 24,
	};
}

export function advanceEscalationStage(daysSinceWindowClosed: number): EscalationStageResult {
	if (!Number.isFinite(daysSinceWindowClosed) || daysSinceWindowClosed < 0) {
		throw new Error('daysSinceWindowClosed must be non-negative.');
	}
	if (daysSinceWindowClosed <= 5) return { stage: 1, status: 'BIDDING_PHASE_2' };
	if (daysSinceWindowClosed <= 10) return { stage: 2, status: 'ITI_POLYTECHNIC_ESCALATION' };
	if (daysSinceWindowClosed < 12) return { stage: 3, status: 'DHTE_JCSTI_DIRECTIVE' };
	return { stage: 4, status: 'ESCALATED_PAN_INDIA_PRIORITY' };
}

export async function startStageOneEscalation(challengeId: string) {
	const stage = advanceEscalationStage(1);
	await query(
		`UPDATE public.challenges
		 SET escalation_stage = $2,
				escalation_status = $3,
				statewide_bidding_open = TRUE,
				statewide_bidding_geofence_removed = TRUE
		 WHERE id = $1;`,
		[challengeId, stage.stage, stage.status],
	);
	return stage;
}
