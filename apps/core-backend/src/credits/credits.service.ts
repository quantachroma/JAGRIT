import type { AcademicCreditRecord } from '@jagrit/contracts';
import { createHmac } from 'crypto';
import { getSupabaseClient } from '../db/supabase.service';

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

export interface CreditIssueInput {
	studentUserId: string;
	apaarId: string;
	projectId: string;
	challengeTitle: string;
	institutionName: string;
	verifiedWorkhours: number;
	creditCategory: AcademicCreditRecord['creditCategory'];
}

/** ADR-015: every 30 verified hours yields one academic credit. */
export async function issueCredit(input: CreditIssueInput): Promise<AcademicCreditRecord> {
	if (!Number.isFinite(input.verifiedWorkhours) || input.verifiedWorkhours < 30) {
		throw new Error('At least 30 verified workhours are required to issue an academic credit.');
	}
	const signingSecret = process.env.APAAR_SIGNING_SECRET;
	if (!signingSecret) throw new Error('APAAR_SIGNING_SECRET must be configured.');
	const unsignedPayload = {
		...input,
		academicCreditsEarned: Math.floor(input.verifiedWorkhours / 30),
		depositedAt: new Date().toISOString(),
	};
	const signedPayloadSignature = createHmac('sha256', signingSecret).update(JSON.stringify(unsignedPayload)).digest('hex');
	const record: AcademicCreditRecord = { ...unsignedPayload, signedPayloadSignature };
	const result = await getSupabaseClient().from('credits').insert({
		student_user_id: record.studentUserId,
		apaar_id: record.apaarId,
		project_id: record.projectId,
		verified_workhours: record.verifiedWorkhours,
		academic_credits_earned: record.academicCreditsEarned,
		credit_category: record.creditCategory,
		signed_payload_signature: record.signedPayloadSignature,
		payload_json: record,
	}).select('*').single();
	if (result.error) throw new Error(`Supabase credit insert failed: ${result.error.message}`);
	return record;
}
