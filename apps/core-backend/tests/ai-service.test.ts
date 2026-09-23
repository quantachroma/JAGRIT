import { matchUniversities, wbsTimeline } from '../src/ai/ai.service';

describe('AI adapter fallback and live responses', () => {
	const originalFetch = global.fetch;

	afterEach(() => {
		global.fetch = originalFetch;
	});

	test('returns deterministic fallback data when M5 is unavailable', async () => {
		global.fetch = jest.fn().mockRejectedValue(new Error('M5 offline')) as typeof fetch;
		const result = await wbsTimeline({ project_id: 'project-1', challenge_id: 'challenge-1' });
		expect(result.fallback).toBe(true);
		expect(result.data).toEqual(expect.objectContaining({ mode: 'DETERMINISTIC_FALLBACK' }));
	});

	test('returns live M5 data without fallback', async () => {
		global.fetch = jest.fn().mockResolvedValue(new Response(JSON.stringify({ mode: 'M5_DETERMINISTIC_ENGINE' }), { status: 200 })) as typeof fetch;
		const result = await matchUniversities({ project_id: 'project-1', challenge_id: 'challenge-1', description: 'water project' });
		expect(result).toEqual({ data: { mode: 'M5_DETERMINISTIC_ENGINE' }, fallback: false });
	});
});
