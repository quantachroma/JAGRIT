import { getFinalMPS, getPreliminaryMPS } from '../src/challenges/priority.service';
import { getUpvoteWindow, shouldAutoCloseUpvoteWindow, VerifiedUpvote } from '../src/challenges/window.service';
import { getBiddingWindowDays, resolveBiddingExpiry } from '../src/bids/bids.service';
import {
	getSlaStatus,
	validateTranche2Requirements,
	validateTranche3Requirements,
} from '../src/escrow/escrow.service';
import { DESIGNATED_TRUSTEE_ROLES, evaluateDualLock, TrusteeBallot } from '../src/quorum/evaluate.service';
import { query } from '../src/db/client';
import { recordChallengeSupport } from '../src/challenges/challenges.service';
import {
	advanceEscalationStage,
	applyIgnoredBidPenalty,
	calculateExpandedBudget,
} from '../src/hackathon/escalation.service';

jest.mock('../src/db/client', () => ({ query: jest.fn() }));

const mockedQuery = query as jest.MockedFunction<typeof query>;

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
	const challengeLocation = { lat: 23.4, lon: 85.3 };
	const validVote = (phoneHash: string, createdAt = '2026-09-23T12:00:00Z', lat = 23.4, lon = 85.3): VerifiedUpvote => ({
		phoneHash,
		verified: true,
		lat,
		lon,
		createdAt,
	});
	const now = new Date('2026-09-23T12:00:00Z');

	test('24 or fewer valid votes leave the window open', () => {
		expect(shouldAutoCloseUpvoteWindow(Array.from({ length: 24 }, (_, index) => validVote(`phone-${index}`)), challengeLocation, now)).toBe(false);
	});

	test('25 valid unique votes close the window', () => {
		expect(shouldAutoCloseUpvoteWindow(Array.from({ length: 25 }, (_, index) => validVote(`phone-${index}`)), challengeLocation, now)).toBe(true);
	});

	test('duplicate phone hashes do not count twice', () => {
		const votes = [...Array.from({ length: 24 }, (_, index) => validVote(`phone-${index}`)), validVote('phone-0')];
		expect(shouldAutoCloseUpvoteWindow(votes, challengeLocation, now)).toBe(false);
	});

	test('votes outside 30 km do not count', () => {
		const votes = Array.from({ length: 25 }, (_, index) => validVote(`phone-${index}`, now.toISOString(), 24.0, 85.3));
		expect(shouldAutoCloseUpvoteWindow(votes, challengeLocation, now)).toBe(false);
	});

	test('votes older than 24 hours do not count', () => {
		const votes = Array.from({ length: 25 }, (_, index) => validVote(`phone-${index}`, '2026-09-22T11:59:59Z'));
		expect(shouldAutoCloseUpvoteWindow(votes, challengeLocation, now)).toBe(false);
	});

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

describe('ADR-011 anti-speculation escalation', () => {
	test('does not penalize an 80% college match', () => {
		expect(applyIgnoredBidPenalty(80, 100, 3)).toBe(100);
	});

	test('penalizes an 81% college match by five per ignored bid', () => {
		expect(applyIgnoredBidPenalty(81, 100, 3)).toBe(85);
	});

	test('caps scope expansion at 25%', () => {
		expect(calculateExpandedBudget(350000)).toBe(437500);
	});

	test.each([
		[3, 1, 'BIDDING_PHASE_2'],
		[7, 2, 'ITI_POLYTECHNIC_ESCALATION'],
		[11, 3, 'DHTE_JCSTI_DIRECTIVE'],
		[12, 4, 'ESCALATED_PAN_INDIA_PRIORITY'],
		[20, 4, 'ESCALATED_PAN_INDIA_PRIORITY'],
	])('day %i selects stage %i', (days, stage, status) => {
		expect(advanceEscalationStage(days)).toEqual({ stage, status });
	});
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

	const mockedQueryResults = (trusteeYesVotes: number, totalVerifiedVotes: number, yesVotes: number) => ({
		trusteeBallots: ballots(trusteeYesVotes),
		publicVotes: { totalVerifiedVotes, yesVotes, villagePopulation: 50 },
	});

	test('14A: Key 1 and Key 2 pass', () => {
		const { trusteeBallots, publicVotes } = mockedQueryResults(4, 15, 11);
		const result = evaluateDualLock(trusteeBallots, publicVotes);
		expect(result.key1Passed).toBe(true);
		expect(result.key2Passed).toBe(true);
		expect(result.outcome).toBe('14A_SUCCESS');
	});

	test('14B: Key 1 passes and Key 2 fails', () => {
		const { trusteeBallots, publicVotes } = mockedQueryResults(4, 15, 10);
		const result = evaluateDualLock(trusteeBallots, publicVotes);
		expect(result.key1Passed).toBe(true);
		expect(result.key2Passed).toBe(false);
		expect(result.outcome).toBe('14B_PARTIAL');
	});

	test('14C: Key 1 and Key 2 fail', () => {
		const { trusteeBallots, publicVotes } = mockedQueryResults(3, 15, 10);
		const result = evaluateDualLock(trusteeBallots, publicVotes);
		expect(result.key1Passed).toBe(false);
		expect(result.key2Passed).toBe(false);
		expect(result.outcome).toBe('14C_FAILURE');
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

describe('public upvote window wiring', () => {
	afterEach(() => mockedQuery.mockReset());

	test('persists closure when a newly recorded vote reaches 25 valid votes', async () => {
		const now = new Date();
		mockedQuery
			.mockResolvedValueOnce({ rows: [{ upvotes: 25, vote_recorded: true, geofence_ok: true, window_closed: false, challenge_exists: true }] } as never)
			.mockResolvedValueOnce({ rows: Array.from({ length: 25 }, (_, index) => ({
				challenge_lat: 23.4,
				challenge_lon: 85.3,
				phoneHash: `phone-${index}`,
				verified: true,
				lat: 23.4,
				lon: 85.3,
				createdAt: now,
			})) } as never)
			.mockResolvedValueOnce({ rows: [] } as never);

		await recordChallengeSupport('challenge-id', 'phone-25', 23.4, 85.3);

		expect(mockedQuery).toHaveBeenCalledTimes(3);
		expect(mockedQuery.mock.calls[2][0]).toContain('accelerated_deadline');
	});

	test('ignores an upvote after the window is closed', async () => {
		mockedQuery.mockResolvedValueOnce({ rows: [{ upvotes: 25, vote_recorded: false, geofence_ok: true, window_closed: true, challenge_exists: true }] } as never);

		const result = await recordChallengeSupport('challenge-id', 'phone-26', 23.4, 85.3);

		expect(result.window_closed).toBe(true);
		expect(result.vote_recorded).toBe(false);
		expect(mockedQuery).toHaveBeenCalledTimes(1);
	});

	test('throws when the challenge does not exist', async () => {
		mockedQuery.mockResolvedValueOnce({ rows: [{ upvotes: 0, vote_recorded: false, geofence_ok: false, window_closed: false, challenge_exists: false }] } as never);

		await expect(recordChallengeSupport('missing-challenge', 'phone-1', 23.4, 85.3)).rejects.toThrow('Challenge not found.');
		expect(mockedQuery).toHaveBeenCalledTimes(1);
	});
});
