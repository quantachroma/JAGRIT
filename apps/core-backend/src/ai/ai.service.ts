const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000/api/v1/ai';
const AI_TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS || 3_000);

export interface AIServiceResult<T> {
	data: T | null;
	fallback: boolean;
}

async function callAi<T>(path: string, payload: Record<string, unknown>): Promise<AIServiceResult<T>> {
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
		return { data: null, fallback: true };
	} finally {
		clearTimeout(timeout);
	}
}

export const triageClassify = (payload: Record<string, unknown>) => callAi('triage-classify', payload);
export const embed = (payload: Record<string, unknown>) => callAi('embed', payload);
export const dedupScore = (payload: Record<string, unknown>) => callAi('dedup-score', payload);
export const matchUniversities = (payload: Record<string, unknown>) => callAi('match-universities', payload);
export const wbsTimeline = (payload: Record<string, unknown>) => callAi('wbs-timeline', payload);
