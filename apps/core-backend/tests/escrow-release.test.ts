jest.mock('../src/db/client', () => ({ query: jest.fn() }));

import { query } from '../src/db/client';
import { releaseTranche1, releaseTranche2, releaseTranche3 } from '../src/escrow/escrow.service';

const mockedQuery = query as jest.MockedFunction<typeof query>;
const createdAt = new Date('2026-09-20T00:00:00Z');

beforeEach(() => mockedQuery.mockReset());

describe('escrow release persistence gates', () => {
	test('releases tranche 1 and rejects a repeated release', async () => {
		mockedQuery
			.mockResolvedValueOnce({ rows: [{ id: 'project-1' }], rowCount: 1 } as never)
			.mockResolvedValueOnce({ rows: [{ tranche_1_disbursed: false }], rowCount: 1 } as never)
			.mockResolvedValueOnce({ rows: [{ id: 'project-1', tranche_1_disbursed: true }], rowCount: 1 } as never);

		expect(await releaseTranche1('project-1', true)).toEqual({ project_id: 'project-1', tranche_1_disbursed: true, percentage: 30 });
		mockedQuery
			.mockResolvedValueOnce({ rows: [{ id: 'project-1' }], rowCount: 1 } as never)
			.mockResolvedValueOnce({ rows: [{ tranche_1_disbursed: true }], rowCount: 1 } as never);
		await expect(releaseTranche1('project-1', true)).rejects.toThrow('already disbursed');
	});

	test('releases tranche 2 only after tranche 1 and rejects a repeat', async () => {
		mockedQuery
			.mockResolvedValueOnce({ rows: [{ id: 'project-2' }], rowCount: 1 } as never)
			.mockResolvedValueOnce({ rows: [{ tranche_1_disbursed: true, tranche_2_disbursed: false, created_at: createdAt }], rowCount: 1 } as never)
			.mockResolvedValueOnce({ rows: [{ id: 'project-2', tranche_2_disbursed: true }], rowCount: 1 } as never);

		expect((await releaseTranche2('project-2', 'nabl://certificate', true)).tranche_2_disbursed).toBe(true);
		mockedQuery
			.mockResolvedValueOnce({ rows: [{ id: 'project-2' }], rowCount: 1 } as never)
			.mockResolvedValueOnce({ rows: [{ tranche_1_disbursed: true, tranche_2_disbursed: true, created_at: createdAt }], rowCount: 1 } as never);
		await expect(releaseTranche2('project-2', 'nabl://certificate', true)).rejects.toThrow('already disbursed');
	});

	test('releases tranche 3 only after tranche 2 and rejects a repeat', async () => {
		const evidence = {
			nocUrl: 'noc://document',
			sparesKitProofUrl: 'spares://proof',
			omHandoverVerified: true,
			installationVerified: true,
			jalSahiyasTrained: 2,
		};
		mockedQuery
			.mockResolvedValueOnce({ rows: [{ id: 'project-3' }], rowCount: 1 } as never)
			.mockResolvedValueOnce({ rows: [{ tranche_2_disbursed: true, tranche_3_disbursed: false, created_at: createdAt }], rowCount: 1 } as never)
			.mockResolvedValueOnce({ rows: [{ id: 'project-3', tranche_3_disbursed: true, maturation_ends_at: createdAt }], rowCount: 1 } as never);

		expect((await releaseTranche3('project-3', evidence)).tranche_3_disbursed).toBe(true);
		mockedQuery
			.mockResolvedValueOnce({ rows: [{ id: 'project-3' }], rowCount: 1 } as never)
			.mockResolvedValueOnce({ rows: [{ tranche_2_disbursed: true, tranche_3_disbursed: true, created_at: createdAt }], rowCount: 1 } as never);
		await expect(releaseTranche3('project-3', evidence)).rejects.toThrow('already disbursed');
	});
});
