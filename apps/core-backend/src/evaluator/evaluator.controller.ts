import { Router } from 'express';
import { query } from '../db/client';

export const evaluatorRouter = Router();

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
	const {
		ticket_id: ticketId,
		action,
		allocated_pool: allocatedPool,
	} = request.body as {
		ticket_id?: string;
		action?: 'APPROVE_HEI' | 'REROUTE_CIVIC';
		allocated_pool?: number;
	};

	if (!ticketId || !['APPROVE_HEI', 'REROUTE_CIVIC'].includes(action || '')) {
		response.status(400).json({ error: 'Invalid ticket_id or action.' });
		return;
	}

	try {
		const result = action === 'REROUTE_CIVIC'
			? await query(
					`UPDATE public.challenges
					 SET status = 'ROUTED_CIVIC'
					 WHERE id = $1
					 RETURNING id, ticket_number, status;`,
					[ticketId],
				)
			: await query(
					`UPDATE public.challenges
					 SET status = 'OPEN_FOR_BIDS', allocated_pool_inr = $2,
						 bidding_deadline = NOW() + INTERVAL '10 days'
					 WHERE id = $1
					 RETURNING id, ticket_number, status, allocated_pool_inr, bidding_deadline;`,
					[ticketId, allocatedPool || 0],
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
