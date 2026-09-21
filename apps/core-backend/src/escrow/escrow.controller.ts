import { Request, Response, Router } from 'express';
import {
	auditSLA,
	EscrowProjectNotFoundError,
	releaseTranche1,
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
	if (error instanceof Error && /^(Tranche|Drawdown|NABL|PESA|Spares|verified|two trained)/.test(error.message)) return 409;
	return 500;
}

escrowRouter.get('/audit-sla', async (_request, response) => {
	try {
		response.json(await auditSLA());
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to audit project SLA.' });
	}
});

escrowRouter.post('/:id/tranche-1/release', async (request: Request, response: Response) => {
	try {
		const body = request.body as Record<string, unknown>;
		if (!targetId(request) || body.kickoff_confirmed !== true) {
			response.status(400).json({ error: 'A project/challenge ID and kickoff_confirmed=true are required.' });
			return;
		}
		response.json(await releaseTranche1(targetId(request), true));
	} catch (error) {
		response.status(statusFor(error)).json({ error: error instanceof Error ? error.message : 'Unable to release Tranche 1.' });
	}
});

escrowRouter.post('/:id/tranche-2/release', async (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	const url = String(body.nabl_cert_url || body.nablCertUrl || '').trim();
	const evaluatorApproved = body.evaluator_approved === true || body.evaluatorApproved === true;
	if (!targetId(request) || !url || !evaluatorApproved) {
		response.status(400).json({ error: 'A project/challenge ID, nabl_cert_url, and evaluator_approved=true are required.' });
		return;
	}
	try {
		response.json(await releaseTranche2(targetId(request), url, evaluatorApproved));
	} catch (error) {
		response.status(statusFor(error)).json({ error: error instanceof Error ? error.message : 'Unable to release Tranche 2.' });
	}
});

escrowRouter.post('/:id/tranche-3/release', async (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	const nocUrl = String(body.pesa_noc_url || body.pesaNocUrl || body.noc_url || body.nocUrl || '').trim();
	const sparesKitProofUrl = String(body.spares_kit_proof_url || body.sparesKitProofUrl || '').trim();
	const omHandoverVerified = body.om_handover_verified === true || body.omHandoverVerified === true;
	const installationVerified = body.installation_verified === true || body.installationVerified === true;
	const jalSahiyasTrained = Number(body.jal_sahiyas_trained ?? body.jalSahiyasTrained);
	if (!targetId(request) || !nocUrl || !sparesKitProofUrl || !omHandoverVerified || !installationVerified || jalSahiyasTrained < 2) {
		response.status(400).json({ error: 'A project/challenge ID, NOC, spares kit proof, verified O&M handover, verified installation, and two trained Jal Sahiyas are required.' });
		return;
	}
	try {
		response.json(await releaseTranche3(targetId(request), { nocUrl, sparesKitProofUrl, omHandoverVerified, installationVerified, jalSahiyasTrained }));
	} catch (error) {
		response.status(statusFor(error)).json({ error: error instanceof Error ? error.message : 'Unable to release Tranche 3.' });
	}
});
