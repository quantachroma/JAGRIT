import { Request, Response, Router } from 'express';
import {
	auditSLA,
	EscrowProjectNotFoundError,
	releaseTranche2,
	releaseTranche3,
} from './escrow.service';

export const escrowRouter = Router();

function targetId(request: Request): string {
	const body = request.body as Record<string, unknown>;
	return String(body.project_id || body.projectId || body.challenge_id || body.challengeId || request.params.id || '').trim();
}

function statusFor(error: unknown): number {
	if (error instanceof EscrowProjectNotFoundError) return 404;
	if (error instanceof Error && error.message.startsWith('Tranche')) return 409;
	return 500;
}

escrowRouter.get('/audit-sla', async (_request, response) => {
	try {
		response.json(await auditSLA());
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to audit project SLA.' });
	}
});

escrowRouter.post('/:id/tranche-2/release', async (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	const url = String(body.nabl_cert_url || body.nablCertUrl || '').trim();
	if (!targetId(request) || !url) {
		response.status(400).json({ error: 'A project/challenge ID and nabl_cert_url are required.' });
		return;
	}
	try {
		response.json(await releaseTranche2(targetId(request), url));
	} catch (error) {
		response.status(statusFor(error)).json({ error: error instanceof Error ? error.message : 'Unable to release Tranche 2.' });
	}
});

escrowRouter.post('/:id/tranche-3/release', async (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	const url = String(body.pesa_noc_url || body.pesaNocUrl || '').trim();
	if (!targetId(request) || !url) {
		response.status(400).json({ error: 'A project/challenge ID and pesa_noc_url are required.' });
		return;
	}
	try {
		response.json(await releaseTranche3(targetId(request), url));
	} catch (error) {
		response.status(statusFor(error)).json({ error: error instanceof Error ? error.message : 'Unable to release Tranche 3.' });
	}
});
