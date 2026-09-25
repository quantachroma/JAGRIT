import { query } from '../src/db/client';
import { dedupScore } from '../src/ai/ai.service';
import { evaluateDeduplication, normalizeDedupText } from '../src/ai/dedup.service';

jest.mock('../src/db/client', () => ({ query: jest.fn() }));
jest.mock('../src/ai/ai.service', () => ({
	dedupScore: jest.fn(),
}));

const mockedQuery = query as jest.MockedFunction<typeof query>;
const mockedDedupScore = dedupScore as jest.MockedFunction<typeof dedupScore>;

describe('evaluateDeduplication cross-script matching', () => {
	afterEach(() => jest.resetAllMocks());

	test('normalizes Hindi and Hinglish keywords', () => {
		expect(normalizeDedupText('काला पानी चापाकल महुआ पलामू')).toBe('kala pani chapakal mahua palamu');
	});

	test('forces the Palamu water issue composite score to at least 75', async () => {
		mockedQuery
			.mockResolvedValueOnce({
				rows: [{
					id: 'master-id',
					ticket_number: 'JAG-2026-PAL-3785',
					title: 'काला पानी चापाकल',
					description: 'महुआ पलामू में दूषित पानी',
					district: 'Palamu',
					upvotes_count: 6,
					distance_meters: 120,
				}],
			} as never)
			.mockResolvedValueOnce({ rows: [] } as never);
		mockedDedupScore.mockResolvedValue({ data: { duplicate: false, score: 0 }, fallback: true });

		const result = await evaluateDeduplication('Kala Pani handpump contamination', 24.0353, 84.0722);

		expect(result).toMatchObject({
			isDuplicate: true,
			is_duplicate: true,
			score: 75,
			master_ticket: 'JAG-2026-PAL-3785',
		});
		expect(mockedDedupScore).toHaveBeenCalledWith(expect.objectContaining({
			new_text: 'kala pani handpump contamination',
			existing_text: expect.stringContaining('kala pani chapakal'),
		}));
	});
});