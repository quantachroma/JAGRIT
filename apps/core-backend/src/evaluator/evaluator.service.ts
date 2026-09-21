export type TriageCategory = 'TYPE_A_CIVIC' | 'TYPE_B_R_AND_D';
export type TriageDestination = 'ULB_WEBHOOK' | 'EVALUATOR_QUEUE';

export interface TriageInput {
	category: TriageCategory;
	isHighConfidence: boolean;
	ticketId: string;
}

export interface TriageRoute {
	destination: TriageDestination;
	ticketId: string;
	webhook?: { status: 'MOCK_DELIVERED'; target: 'JHAR_SEWA_ULB_API' };
}

/** ADR-005: only high-confidence routine civic reports bypass the evaluator queue. */
export function routeTriage(input: TriageInput): TriageRoute {
	const isHighConfidenceTypeA = input.category === 'TYPE_A_CIVIC' && input.isHighConfidence;
	if (isHighConfidenceTypeA) {
		return {
			destination: 'ULB_WEBHOOK',
			ticketId: input.ticketId,
			webhook: { status: 'MOCK_DELIVERED', target: 'JHAR_SEWA_ULB_API' },
		};
	}
	return { destination: 'EVALUATOR_QUEUE', ticketId: input.ticketId };
}
