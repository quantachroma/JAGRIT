"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hackathonRouter = void 0;
const express_1 = require("express");
const hackathon_service_1 = require("./hackathon.service");
exports.hackathonRouter = (0, express_1.Router)();
exports.hackathonRouter.post('/bid', async (request, response) => {
    const body = request.body;
    const challengeId = String(body.challenge_id || body.challengeId || '').trim();
    const universityName = String(body.university_name || body.universityName || '').trim();
    const facultyValue = body.faculty_id || body.facultyId;
    const facultyId = facultyValue == null || facultyValue === '' ? null : String(facultyValue);
    const budget = Number(body.budget);
    if (!challengeId || !universityName || !Number.isFinite(budget)) {
        response.status(400).json({ error: 'challenge_id, university_name, budget, and faculty_id are required.' });
        return;
    }
    try {
        const project = await (0, hackathon_service_1.placeBid)(challengeId, universityName, budget, facultyId);
        response.status(201).json(project);
    }
    catch (error) {
        console.error('Hackathon bid failed:', error);
        response.status(500).json({ error: 'Unable to place bid.' });
    }
});
exports.hackathonRouter.post('/:challengeId/evaluate-bids', async (request, response) => {
    try {
        const result = await (0, hackathon_service_1.evaluateBids)(String(request.params.challengeId));
        response.json(result);
    }
    catch (error) {
        console.error('Bid evaluation failed:', error);
        response.status(500).json({ error: 'Unable to evaluate bids.' });
    }
});
