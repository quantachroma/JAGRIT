"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escrowRouter = void 0;
const express_1 = require("express");
const escrow_service_1 = require("./escrow.service");
exports.escrowRouter = (0, express_1.Router)();
function targetId(request) {
    const body = request.body;
    return String(body.project_id || body.projectId || body.challenge_id || body.challengeId || request.params.id || '').trim();
}
function statusFor(error) {
    if (error instanceof escrow_service_1.EscrowProjectNotFoundError)
        return 404;
    if (error instanceof Error && error.message.startsWith('Tranche'))
        return 409;
    return 500;
}
exports.escrowRouter.get('/audit-sla', async (_request, response) => {
    try {
        response.json(await (0, escrow_service_1.auditSLA)());
    }
    catch (error) {
        response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to audit project SLA.' });
    }
});
exports.escrowRouter.post('/:id/tranche-2/release', async (request, response) => {
    const body = request.body;
    const url = String(body.nabl_cert_url || body.nablCertUrl || '').trim();
    if (!targetId(request) || !url) {
        response.status(400).json({ error: 'A project/challenge ID and nabl_cert_url are required.' });
        return;
    }
    try {
        response.json(await (0, escrow_service_1.releaseTranche2)(targetId(request), url));
    }
    catch (error) {
        response.status(statusFor(error)).json({ error: error instanceof Error ? error.message : 'Unable to release Tranche 2.' });
    }
});
exports.escrowRouter.post('/:id/tranche-3/release', async (request, response) => {
    const body = request.body;
    const url = String(body.pesa_noc_url || body.pesaNocUrl || '').trim();
    if (!targetId(request) || !url) {
        response.status(400).json({ error: 'A project/challenge ID and pesa_noc_url are required.' });
        return;
    }
    try {
        response.json(await (0, escrow_service_1.releaseTranche3)(targetId(request), url));
    }
    catch (error) {
        response.status(statusFor(error)).json({ error: error instanceof Error ? error.message : 'Unable to release Tranche 3.' });
    }
});
