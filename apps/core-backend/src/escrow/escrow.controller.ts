import { Router } from 'express';
import {
	auditSLA,
	releaseTranche2,
	releaseTranche3,
} from './escrow.service';

export const escrowRouter = Router();

escrowRouter.get('/audit-sla', async (_request, response) => {
	try {
		response.json(await auditSLA());
	} catch (error) {
		console.error('SLA audit failed:', error);
		response.status(500).json({ error: 'Unable to audit project SLA.' });
	}
});

escrowRouter.post('/:projectId/tranche-2/release', async (request, response) => {
	const { nabl_cert_url: nablCertUrl } = request.body as { nabl_cert_url?: string };
	if (!nablCertUrl) {
		response.status(400).json({ error: 'nabl_cert_url is required.' });
		return;
	}

	try {
		response.json(await releaseTranche2(request.params.projectId, nablCertUrl));
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to release Tranche 2.';
		const statusCode = message === 'Project not found' ? 404 : message.startsWith('Tranche') ? 409 : 500;
		response.status(statusCode).json({ error: message });
	}
});

escrowRouter.post('/:projectId/tranche-3/release', async (request, response) => {
	const { pesa_noc_url: pesaNocUrl } = request.body as { pesa_noc_url?: string };
	if (!pesaNocUrl) {
		response.status(400).json({ error: 'pesa_noc_url is required.' });
		return;
	}

	try {
		response.json(await releaseTranche3(request.params.projectId, pesaNocUrl));
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to release Tranche 3.';
		const statusCode = message === 'Project not found' ? 404 : message.startsWith('Tranche') ? 409 : 500;
		response.status(statusCode).json({ error: message });
	}
});
