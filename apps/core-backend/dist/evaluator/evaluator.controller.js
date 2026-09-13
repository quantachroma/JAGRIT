"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluatorRouter = void 0;
const express_1 = require("express");
const client_1 = require("../db/client");
exports.evaluatorRouter = (0, express_1.Router)();
exports.evaluatorRouter.get('/queue', async (_request, response) => {
    try {
        const result = await (0, client_1.query)(`SELECT *
			 FROM public.challenges
			 WHERE status = 'PENDING_HITL'
			 ORDER BY created_at ASC;`);
        response.json(result.rows);
    }
    catch (error) {
        console.error('Evaluator queue query failed:', error);
        response.status(500).json({ error: 'Unable to load evaluator queue.' });
    }
});
exports.evaluatorRouter.post('/triage-action', async (request, response) => {
    const body = request.body;
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
            ? await (0, client_1.query)(`UPDATE public.challenges
					 SET status = 'ROUTED_CIVIC'
					 WHERE id::text = $1 OR ticket_number = $1
					 RETURNING id, ticket_number, status;`, [ticketId])
            : await (0, client_1.query)(`UPDATE public.challenges
					 SET status = 'OPEN_FOR_BIDS', allocated_pool_inr = $2,
						 bidding_deadline = NOW() + INTERVAL '10 days'
					 WHERE id::text = $1 OR ticket_number = $1
					 RETURNING id, ticket_number, status, allocated_pool_inr, bidding_deadline;`, [ticketId, poolAmount]);
        if (result.rowCount === 0) {
            response.status(404).json({ error: 'Challenge not found.' });
            return;
        }
        response.json(result.rows[0]);
    }
    catch (error) {
        console.error('Evaluator triage action failed:', error);
        response.status(500).json({ error: 'Unable to apply triage action.' });
    }
});
