import { getFinalMPS, getPreliminaryMPS } from '../src/challenges/priority.service';
import { getUpvoteWindow } from '../src/challenges/window.service';
import { getBiddingWindowDays, resolveBiddingExpiry } from '../src/bids/bids.service';
import {
	getSlaStatus,
	validateTranche2Requirements,
	validateTranche3Requirements,
} from '../src/escrow/escrow.service';
import { DESIGNATED_TRUSTEE_ROLES, evaluateDualLock, TrusteeBallot } from '../src/quorum/evaluate.service';

const scoreInput = (value: number) => {
	const healthScore = value >= 85 ? 89 : value;
	const targetMps = value === 85 ? value + 0.001 : value;
	const otherScore = (targetMps - 0.25 * healthScore) / 0.65;
	return {
		healthScore,
		economicScore: otherScore,
		vulnerabilityScore: otherScore,
		decayScore: otherScore,
		populationScore: otherScore,
		upvoteScore: 100,
		equityCategory: 'OTHER' as const,
	};
};

describe('ADR-006 and ADR-007 priority windows', () => {
	test.each([
		[85, 12], [84, 24], [65, 24], [64, 48], [45, 48], [44, 72],
	])('MPS boundary %i uses %i hours', (mps, hours) => {
		expect(getUpvoteWindow(scoreInput(mps)).durationHours).toBe(hours);
	});

	test('health score 90 uses the emergency bypass', () => {
		expect(getUpvoteWindow({ ...scoreInput(0), healthScore: 90 })).toMatchObject({ durationHours: 0, emergencyBypass: true });
	});

	test('preliminary MPS forces upvotes to zero while final MPS includes them', () => {
		expect(getPreliminaryMPS(scoreInput(50)).baseScore).toBe(50);
		expect(getFinalMPS(scoreInput(50)).baseScore).toBe(60);
	});
});

describe('ADR-009 bidding rules', () => {
	test.each([[85, 3], [84, 5], [65, 5], [64, 7], [45, 7], [44, 10]])(
		'final MPS %i has a %i day window', (mps, days) => {
			expect(getBiddingWindowDays(mps)).toBe(days);
		},
	);

	test.each([[0, 'ESCALATION'], [1, 'DIRECT_RND'], [2, 'DYNAMIC_HACKATHON'], [10, 'DYNAMIC_HACKATHON']])(
		'%i bids resolve to %s', (count, state) => expect(resolveBiddingExpiry(count)).toBe(state),
	);
});

describe('ADR-012 escrow gates', () => {
	test('SLA freezes drawdown at day 30', () => {
		const start = new Date('2026-01-01T00:00:00Z');
		expect(getSlaStatus(start, new Date('2026-01-07T00:00:00Z'))).toBe('ON_TRACK');
		expect(getSlaStatus(start, new Date('2026-01-08T00:00:00Z'))).toBe('WARNING_DAY_7');
		expect(getSlaStatus(start, new Date('2026-01-15T00:00:00Z'))).toBe('ESCALATION_DAY_14');
		expect(getSlaStatus(start, new Date('2026-01-31T00:00:00Z'))).toBe('DRAW_DOWN_FROZEN_DAY_30');
	});

	test('tranche 2 requires NABL evidence and evaluator approval', () => {
		expect(() => validateTranche2Requirements('', true)).toThrow();
		expect(() => validateTranche2Requirements('nabl://certificate', false)).toThrow();
		expect(() => validateTranche2Requirements('nabl://certificate', true)).not.toThrow();
	});

	test('tranche 3 requires NOC, O&M, installation, spares, and two Jal Sahiyas', () => {
		const evidence = {
			nocUrl: 'noc://document',
			omHandoverVerified: true,
			sparesKitProofUrl: 'spares://proof',
			installationVerified: true,
			jalSahiyasTrained: 2,
		};
		expect(() => validateTranche3Requirements({ ...evidence, jalSahiyasTrained: 1 })).toThrow();
		expect(() => validateTranche3Requirements(evidence)).not.toThrow();
	});
});

describe('ADR-014 dual-lock quorum', () => {
	const ballots = (yesCount: number): TrusteeBallot[] => DESIGNATED_TRUSTEE_ROLES.map((role, index) => ({
		role,
		vote: index < yesCount ? 'YES' : 'NO',
	}));

	test('exactly five trustees and four YES pass Key 1', () => {
		const result = evaluateDualLock(ballots(4), { totalVerifiedVotes: 15, yesVotes: 11, villagePopulation: 50 });
		expect(result.key1Passed).toBe(true);
		expect(result.outcome).toBe('14A_SUCCESS');
	});

	test('Jal Sahiya is excluded from the designated five', () => {
		const withJalSahiya = [...ballots(4), { role: 'JAL_SAHIYA', vote: 'YES' }] as unknown as TrusteeBallot[];
		expect(evaluateDualLock(withJalSahiya, { totalVerifiedVotes: 15, yesVotes: 11, villagePopulation: 50 }).key1Passed).toBe(false);
	});

	test.each([[50, 15], [100, 15], [400, 29]])('population %i requires %i public votes', (population, required) => {
		const result = evaluateDualLock(ballots(4), { totalVerifiedVotes: required, yesVotes: required, villagePopulation: population });
		expect(result.quorumRequired).toBe(required);
		expect(result.key2Passed).toBe(true);
	});
});
