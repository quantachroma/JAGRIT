import type { AcademicCreditRecord } from '@jagrit/contracts';

export function issueCreditMock(projectId: string): AcademicCreditRecord {
	return {
		studentUserId: 'mock-student-001',
		apaarId: 'MOCK-APAAR-001',
		projectId,
		challengeTitle: '[MOCK] Challenge',
		institutionName: '[MOCK] JAGRIT Partner Institution',
		verifiedWorkhours: 120,
		academicCreditsEarned: 4,
		creditCategory: 'CAPSTONE_PROJECT',
		signedPayloadSignature: '[MOCK] unsigned-baseline-record',
		depositedAt: new Date(0).toISOString(),
	};
}
