import { Router } from 'express';
import { query } from '../db/client';
import { routeTriage, TriageCategory } from './evaluator.service';

export const evaluatorRouter = Router();

evaluatorRouter.post('/triage', (request, response) => {
	try {
		const body = request.body as Record<string, unknown>;
		const ticketId = String(body.ticket_id || body.ticketId || '').trim();
		const category = String(body.category || '').trim() as TriageCategory;
		const isHighConfidence = body.is_high_confidence === true || body.isHighConfidence === true;
		if (!ticketId || !['TYPE_A_CIVIC', 'TYPE_B_R_AND_D'].includes(category)) {
			response.status(400).json({ error: 'ticket_id and a valid category are required.' });
			return;
		}
		response.json(routeTriage({ ticketId, category, isHighConfidence }));
	} catch (error) {
		response.status(400).json({ error: error instanceof Error ? error.message : 'Invalid triage request.' });
	}
});

evaluatorRouter.get('/queue', async (_request, response) => {
	try {
		const result = await query(
			`SELECT *
			 FROM public.challenges
			 WHERE status = 'PENDING_HITL'
			 ORDER BY created_at ASC;`,
		);
		response.json(result.rows);
	} catch (error) {
		console.error('Evaluator queue query failed:', error);
		response.status(500).json({ error: 'Unable to load evaluator queue.' });
	}
});

evaluatorRouter.post('/triage-action', async (request, response) => {
	const body = request.body as Record<string, unknown>;
	const ticketId = String(body.ticket_id || body.ticketId || '').trim();
	const action = String(body.action || '').trim();
	const allocatedPool = body.allocated_pool ?? body.allocatedPool;
	const poolAmount = allocatedPool == null || allocatedPool === '' ? 0 : Number(allocatedPool);

	if (!ticketId || !['APPROVE_HEI', 'REROUTE_CIVIC'].includes(action) || !Number.isFinite(poolAmount)) {
		response.status(400).json({ error: 'Invalid ticket_id or action.' });
		return;
	}

	try {
		const result = action === 'REROUTE_CIVIC'
			? await query(
					`UPDATE public.challenges
					 SET status = 'ROUTED_CIVIC'
					 WHERE id::text = $1 OR ticket_number = $1
					 RETURNING id, ticket_number, status;`,
					[ticketId],
				)
			: await query(
					`UPDATE public.challenges
					 SET status = 'OPEN_FOR_BIDS', allocated_pool_inr = $2,
						 bidding_deadline = NOW() + INTERVAL '10 days'
					 WHERE id::text = $1 OR ticket_number = $1
					 RETURNING id, ticket_number, status, allocated_pool_inr, bidding_deadline;`,
					[ticketId, poolAmount],
				);

		if (result.rowCount === 0) {
			response.status(404).json({ error: 'Challenge not found.' });
			return;
		}

		response.json(result.rows[0]);
	} catch (error) {
		console.error('Evaluator triage action failed:', error);
		response.status(500).json({ error: 'Unable to apply triage action.' });
	}
});
