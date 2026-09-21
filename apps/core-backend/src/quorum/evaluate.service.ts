export const DESIGNATED_TRUSTEE_ROLES = [
	'HEADMASTER',
	'WARD_MEMBER',
	'INDEPENDENT_GRAM_SABHA_MEMBER',
	'SC_ST_BENEFICIARY_1',
	'SC_ST_BENEFICIARY_2',
] as const;

export type DesignatedTrusteeRole = typeof DESIGNATED_TRUSTEE_ROLES[number];

export interface TrusteeBallot {
	role: DesignatedTrusteeRole;
	vote: 'YES' | 'NO';
}

export interface PublicVoteSummary {
	totalVerifiedVotes: number;
	yesVotes: number;
	villagePopulation: number;
}

export interface DualLockEvaluation {
	key1Passed: boolean;
	key2Passed: boolean;
	trusteeYesVotes: number;
	quorumRequired: number;
	yesShare: number;
	outcome: '14A_SUCCESS' | '14B_PARTIAL' | '14C_FAILURE';
}

/** ADR-014: validates exactly the five designated trustees; Jal Sahiya cannot be a trustee. */
export function evaluateDualLock(trusteeBallots: TrusteeBallot[], publicVotes: PublicVoteSummary): DualLockEvaluation {
	const roles = trusteeBallots.map((ballot) => ballot.role);
	const hasExactlyDesignatedTrustees = roles.length === DESIGNATED_TRUSTEE_ROLES.length
		&& new Set(roles).size === DESIGNATED_TRUSTEE_ROLES.length
		&& DESIGNATED_TRUSTEE_ROLES.every((role) => roles.includes(role));
	const trusteeYesVotes = trusteeBallots.filter((ballot) => ballot.vote === 'YES').length;
	const key1Passed = hasExactlyDesignatedTrustees && trusteeYesVotes >= 4;

	if (!Number.isFinite(publicVotes.villagePopulation) || publicVotes.villagePopulation < 0
		|| !Number.isInteger(publicVotes.totalVerifiedVotes) || publicVotes.totalVerifiedVotes < 0
		|| !Number.isInteger(publicVotes.yesVotes) || publicVotes.yesVotes < 0 || publicVotes.yesVotes > publicVotes.totalVerifiedVotes) {
		throw new Error('Public vote summary is invalid.');
	}
	const quorumRequired = Math.max(15, Math.ceil(1.45 * Math.sqrt(publicVotes.villagePopulation)));
	const yesShare = publicVotes.totalVerifiedVotes === 0 ? 0 : (publicVotes.yesVotes / publicVotes.totalVerifiedVotes) * 100;
	const key2Passed = publicVotes.totalVerifiedVotes >= quorumRequired && yesShare >= 70;
	const outcome = key1Passed && key2Passed ? '14A_SUCCESS' : key1Passed !== key2Passed ? '14B_PARTIAL' : '14C_FAILURE';
	return { key1Passed, key2Passed, trusteeYesVotes, quorumRequired, yesShare, outcome };
}
