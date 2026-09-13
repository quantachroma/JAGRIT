"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.challengesRouter = void 0;
const express_1 = require("express");
const client_1 = require("../db/client");
const challenges_service_1 = require("./challenges.service");
exports.challengesRouter = (0, express_1.Router)();
exports.challengesRouter.post('/submit', async (request, response) => {
    try {
        const body = request.body;
        const lat = Number(body.lat);
        const lon = Number(body.lon);
        const title = String(body.title || '').trim();
        const description = String(body.description || '').trim();
        const district = String(body.district || 'JHK').trim();
        const block = body.block == null || body.block === '' ? null : String(body.block);
        const panchayat = body.panchayat == null || body.panchayat === '' ? null : String(body.panchayat);
        if (!title || !description || !Number.isFinite(lat) || !Number.isFinite(lon)) {
            response.status(400).json({ error: 'title, description, lat, and lon are required.' });
            return;
        }
        const submission = {
            title,
            description,
            lat,
            lon,
            district,
            block,
            panchayat,
        };
        const result = await (0, challenges_service_1.createOrDeduplicateChallenge)(submission);
        response.status(result.is_duplicate ? 200 : 201).json(result);
    }
    catch (error) {
        console.error('Challenge submission failed:', error);
        response.status(500).json({ error: 'Unable to submit challenge.' });
    }
});
exports.challengesRouter.get('/trending', async (_request, response) => {
    try {
        const result = await (0, client_1.query)(`SELECT id, ticket_number, title, district, upvotes_count, status,
					ST_Y(location::geometry) as lat, ST_X(location::geometry) as lon
			 FROM public.challenges
			 ORDER BY upvotes_count DESC LIMIT 10;`);
        response.json(result.rows);
    }
    catch (error) {
        console.error('Trending challenges query failed:', error);
        response.status(500).json({ error: 'Unable to load trending challenges.' });
    }
});
exports.challengesRouter.post('/:id/upvote', async (request, response) => {
    try {
        const result = await (0, client_1.query)(`UPDATE public.challenges
			 SET upvotes_count = upvotes_count + 1
			 WHERE id = $1
			 RETURNING id, ticket_number, upvotes_count;`, [String(request.params.id)]);
        if (result.rowCount === 0) {
            response.status(404).json({ error: 'Challenge not found.' });
            return;
        }
        response.json(result.rows[0]);
    }
    catch (error) {
        console.error('Challenge upvote failed:', error);
        response.status(500).json({ error: 'Unable to upvote challenge.' });
    }
});
