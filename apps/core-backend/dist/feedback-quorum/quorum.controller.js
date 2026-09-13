"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quorumRouter = void 0;
const express_1 = require("express");
const quorum_service_1 = require("./quorum.service");
exports.quorumRouter = (0, express_1.Router)();
function requestTarget(body) {
    return String(body.project_id || body.projectId || body.challenge_id || body.challengeId || body.targetId || '').trim();
}
function errorStatus(error) {
    return error instanceof quorum_service_1.QuorumProjectNotFoundError ? 404 : 500;
}
const handleVote = async (request, response) => {
    const body = request.body;
    const targetId = requestTarget(body);
    const rawPass = body.is_pass ?? body.isPass;
    const isPass = typeof rawPass === 'string' ? rawPass.toLowerCase() === 'true' : Boolean(rawPass);
    const lat = Number(body.lat);
    const lon = Number(body.lon);
    if (!targetId || !Number.isFinite(lat) || !Number.isFinite(lon) || rawPass == null) {
        response.status(400).json({ error: 'A project/challenge ID, is_pass, lat, and lon are required.' });
        return;
    }
    try {
        response.status(201).json(await (0, quorum_service_1.castVote)({
            targetId,
            citizenId: body.citizen_id == null ? (body.citizenId == null ? null : String(body.citizenId)) : String(body.citizen_id),
            isPass,
            complaintType: String(body.complaint_type || body.complaintType || 'NONE'),
            lat,
            lon,
            voiceUrl: body.voice_url == null ? (body.voiceUrl == null ? null : String(body.voiceUrl)) : String(body.voice_url),
        }));
    }
    catch (error) {
        response.status(errorStatus(error)).json({ error: error instanceof Error ? error.message : 'Unable to record citizen vote.' });
    }
};
exports.quorumRouter.post('/vote', handleVote);
exports.quorumRouter.post('/cast-vote', handleVote);
const handleEvaluate = async (request, response) => {
    const body = request.body;
    const populationValue = body.settlement_population ?? body.settlementPopulation ?? request.query.population;
    const population = populationValue == null || populationValue === '' ? 850 : Number(populationValue);
    try {
        response.json(await (0, quorum_service_1.evaluateQuorum)(String(request.params.id), Number.isFinite(population) && population > 0 ? population : 850));
    }
    catch (error) {
        response.status(errorStatus(error)).json({ error: error instanceof Error ? error.message : 'Unable to evaluate citizen quorum.' });
    }
};
exports.quorumRouter.post('/evaluate/:id', handleEvaluate);
exports.quorumRouter.get('/evaluate/:id', handleEvaluate);
exports.quorumRouter.post('/pesa-noc', async (request, response) => {
    const body = request.body;
    const id = requestTarget(body);
    const url = String(body.pesa_noc_url || body.pesaNocUrl || '').trim();
    if (!id || !url) {
        response.status(400).json({ error: 'A project/challenge ID and pesa_noc_url are required.' });
        return;
    }
    try {
        response.json(await (0, quorum_service_1.uploadPesaNoc)(id, url));
    }
    catch (error) {
        response.status(errorStatus(error)).json({ error: error instanceof Error ? error.message : 'Unable to verify PESA NOC.' });
    }
});
