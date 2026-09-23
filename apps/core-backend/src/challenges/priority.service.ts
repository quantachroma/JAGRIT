export type EquityCategory = 'PVTG' | 'PESA' | 'ASPIRATIONAL' | 'OTHER';

export interface PriorityScoreInput {
	healthScore: number;
	economicScore: number;
	vulnerabilityScore: number;
	decayScore: number;
	populationScore: number;
	upvoteScore: number;
	equityCategory: EquityCategory;
}

export interface PriorityScore {
	baseScore: number;
	equityMultiplier: number;
	mps: number;
}

const EQUITY_MULTIPLIERS: Record<EquityCategory, number> = {
	PVTG: 1.30,
	PESA: 1.20,
	ASPIRATIONAL: 1.15,
	OTHER: 1.00,
};

function score(value: number, name: string): number {
	if (!Number.isFinite(value) || value < 0 || value > 100) {
		throw new Error(`${name} must be a number between 0 and 100.`);
	}
	return value;
}

function calculate(input: PriorityScoreInput, upvoteScore: number): PriorityScore {
	const baseScore =
		0.25 * score(input.healthScore, 'healthScore') +
		0.20 * score(input.economicScore, 'economicScore') +
		0.15 * score(input.vulnerabilityScore, 'vulnerabilityScore') +
		0.15 * score(input.decayScore, 'decayScore') +
		0.15 * score(input.populationScore, 'populationScore') +
		0.10 * score(upvoteScore, 'upvoteScore');
	const equityMultiplier = EQUITY_MULTIPLIERS[input.equityCategory];

	return { baseScore, equityMultiplier, mps: Math.min(100, baseScore * equityMultiplier) };
}

/** ADR-006: preliminary MPS always excludes the upvote component. */
export function getPreliminaryMPS(data: PriorityScoreInput): PriorityScore {
	return calculate(data, 0);
}

/** ADR-006: final MPS includes the actual upvote component. */
export function getFinalMPS(data: PriorityScoreInput): PriorityScore {
	return calculate(data, data.upvoteScore);
}

export function getDecayScore(days: number): number {
	if (!Number.isFinite(days) || days < 0) throw new Error('days must be a non-negative number.');
	return 100 * (1 - Math.exp(-days / 14));
}

export function getPopulationScore(population: number): number {
	if (!Number.isFinite(population) || population < 0) throw new Error('population must be a non-negative number.');
	return Math.min(100, 20 * Math.log10(1 + population));
}

export function getUpvoteScore(verifiedVotes: number): number {
	if (!Number.isFinite(verifiedVotes) || verifiedVotes < 0) throw new Error('verifiedVotes must be a non-negative number.');
	return Math.min(100, (verifiedVotes / 50) * 100);
}
