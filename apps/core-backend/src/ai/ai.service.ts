const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000/api/v1/ai';
const AI_TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS || 3_000);

export interface AIServiceResult<T> {
	data: T | null;
	fallback: boolean;
}

async function callAi<T>(path: string, payload: Record<string, unknown>, fallbackData: T): Promise<AIServiceResult<T>> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
	try {
		const response = await fetch(`${AI_SERVICE_URL}/${path}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
			signal: controller.signal,
		});
		if (!response.ok) throw new Error(`AI service returned ${response.status}.`);
		return { data: await response.json() as T, fallback: false };
	} catch {
		return { data: fallbackData, fallback: true };
	} finally {
		clearTimeout(timeout);
	}
}

export const triageClassify = (payload: Record<string, unknown>) => callAi('triage-classify', payload, { category_type: 'CIVIC_ROUTINE', resolution_tier: 'TIER_2_STANDARD_ENGINEERING', suggested_action: 'ROUTE_TO_ULB_JHARSEWA_API' });
export const embed = (payload: Record<string, unknown>) => callAi('embed', payload, { model: 'local-deterministic-fallback', dimension: 0, vector: [] });
export const dedupScore = (payload: Record<string, unknown>) => callAi('dedup-score', payload, { duplicate: false, score: 0 });
export const matchUniversities = (payload: Record<string, unknown>) => callAi('match-universities', payload, {
	matched_universities: [],
	mode: 'DETERMINISTIC_FALLBACK',
});
export const wbsTimeline = (payload: Record<string, unknown>) => callAi('wbs-timeline', payload, {
	phases: [
		{ phase: 'DESIGN', duration_days: 14 },
		{ phase: 'BUILD', duration_days: 30 },
		{ phase: 'FIELD_TEST', duration_days: 45 },
	],
	mode: 'DETERMINISTIC_FALLBACK',
});
