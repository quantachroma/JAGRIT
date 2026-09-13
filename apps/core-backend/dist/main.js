"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("./db/client");
const challenges_controller_1 = require("./challenges/challenges.controller");
const evaluator_controller_1 = require("./evaluator/evaluator.controller");
const hackathon_controller_1 = require("./hackathon/hackathon.controller");
const escrow_controller_1 = require("./escrow/escrow.controller");
const quorum_controller_1 = require("./feedback-quorum/quorum.controller");
exports.app = (0, express_1.default)();
const port = Number(process.env.PORT || 5000);
exports.app.use(express_1.default.json());
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.options('*', (0, cors_1.default)(corsOptions));
exports.app.get('/health', async (_request, response) => {
    try {
        const result = await client_1.pool.query('SELECT NOW(), PostGIS_Version();');
        response.json({
            status: 'ok',
            service: 'jagrit-core-backend',
            timestamp: result.rows[0].now,
            postgis_version: result.rows[0].postgis_version,
        });
    }
    catch (error) {
        response.status(503).json({ status: 'error', message: error instanceof Error ? error.message : 'Database unavailable.' });
    }
});
exports.app.use('/api/v1/challenges', challenges_controller_1.challengesRouter);
exports.app.use('/api/v1/evaluator', evaluator_controller_1.evaluatorRouter);
exports.app.use('/api/v1/hackathon', hackathon_controller_1.hackathonRouter);
exports.app.use('/api/v1/escrow', escrow_controller_1.escrowRouter);
exports.app.use('/api/v1/quorum', quorum_controller_1.quorumRouter);
exports.app.get('/api/v1/test-all', async (_request, response) => {
    const client = await client_1.pool.connect();
    const tests = {};
    let challengeId;
    let projectId;
    try {
        await client.query('BEGIN');
        const health = await client.query('SELECT NOW(), PostGIS_Version();');
        tests.health = { passed: Boolean(health.rows[0]?.postgis_version), details: health.rows[0] };
        const point = { lat: 23.4001, lon: 85.3201 };
        const challenge = await client.query(`INSERT INTO public.challenges
				(ticket_number, title, description, location, district, block, status, submission_channel)
			 VALUES ('JAG-TEST-' || floor(random() * 100000000)::text, 'Automated backend test', 'Transactional test challenge', ST_SetSRID(ST_Point($1, $2), 4326), 'Ranchi', NULL, 'PENDING_HITL', 'APP')
			 RETURNING id, ticket_number;`, [point.lon, point.lat]);
        challengeId = challenge.rows[0].id;
        const duplicate = await client.query(`SELECT id FROM public.challenges
			 WHERE ST_DWithin(location::geography, ST_SetSRID(ST_Point($1, $2), 4326)::geography, 500)
			 LIMIT 1;`, [point.lon + 0.0005, point.lat]);
        tests.deduplication = { passed: duplicate.rows.some((row) => row.id === challengeId), details: { challenge_id: challengeId } };
        const bid = await client.query(`INSERT INTO public.projects
				(challenge_id, lead_university_name, total_budget_inr, execution_mode)
			 VALUES ($1, 'Automated Test University', 100000, 'DIRECT_RND') RETURNING id;`, [challengeId]);
        projectId = bid.rows[0].id;
        await client.query(`INSERT INTO public.projects
				(challenge_id, lead_university_name, total_budget_inr, execution_mode)
			 VALUES ($1, 'Automated Test University Two', 120000, 'DIRECT_RND');`, [challengeId]);
        const bidCount = await client.query('SELECT COUNT(*)::text AS count FROM public.projects WHERE challenge_id = $1;', [challengeId]);
        tests.bidding = { passed: Number(bidCount.rows[0].count) === 2, details: { bids_count: Number(bidCount.rows[0].count) } };
        await client.query("UPDATE public.challenges SET status = 'DYNAMIC_HACKATHON' WHERE id = $1;", [challengeId]);
        await client.query("UPDATE public.projects SET tranche_1_disbursed = TRUE WHERE id = $1;", [projectId]);
        await client.query("UPDATE public.projects SET tranche_2_disbursed = TRUE, nabl_cert_url = 'test://nabl' WHERE id = $1;", [projectId]);
        await client.query("UPDATE public.projects SET tranche_3_disbursed = TRUE, pesa_noc_url = 'test://pesa', maturation_ends_at = NOW() + INTERVAL '45 days' WHERE id = $1;", [projectId]);
        const escrow = await client.query('SELECT tranche_2_disbursed, tranche_3_disbursed FROM public.projects WHERE id = $1;', [projectId]);
        tests.escrow = { passed: escrow.rows[0].tranche_2_disbursed && escrow.rows[0].tranche_3_disbursed, details: escrow.rows[0] };
        await client.query(`INSERT INTO public.feedback_ledger
				(project_id, citizen_id, is_core_functional_pass, complaint_type, voter_location)
			 VALUES ($1, NULL, TRUE, 'NONE', ST_SetSRID(ST_Point($2, $3), 4326));`, [projectId, point.lon, point.lat]);
        const votes = await client.query('SELECT COUNT(*)::text AS count FROM public.feedback_ledger WHERE project_id = $1;', [projectId]);
        const quorumRequired = Math.max(15, Math.ceil(1.45 * Math.sqrt(850)));
        tests.voting = { passed: Number(votes.rows[0].count) === 1, details: { votes_logged: Number(votes.rows[0].count) } };
        tests.quorum = { passed: Number(votes.rows[0].count) < quorumRequired, details: { status: 'QUORUM_PENDING', quorum_required: quorumRequired } };
        await client.query('ROLLBACK');
        const allTestsPassed = Object.values(tests).every((test) => test.passed);
        response.status(allTestsPassed ? 200 : 500).json({ all_tests_passed: allTestsPassed, tests });
    }
    catch (error) {
        await client.query('ROLLBACK').catch(() => undefined);
        response.status(500).json({
            all_tests_passed: false,
            tests,
            error: error instanceof Error ? error.message : 'Automated backend test failed.',
        });
    }
    finally {
        client.release();
    }
});
exports.app.post('/api/v1/test/advance-clock', async (request, response, next) => {
    try {
        const body = request.body;
        const targetId = String(body.project_id || body.projectId || body.challenge_id || body.challengeId || '').trim();
        const rawDays = body.days_to_advance ?? body.daysToAdvance;
        const daysToAdvance = rawDays == null || rawDays === '' ? 46 : Number(rawDays);
        if (!targetId || !Number.isFinite(daysToAdvance) || daysToAdvance <= 0) {
            response.status(400).json({ success: false, error: { message: 'A project/challenge ID and positive days_to_advance are required.' } });
            return;
        }
        const result = await client_1.pool.query(`UPDATE public.projects
			 SET maturation_ends_at = NOW() - INTERVAL '1 day',
				 field_deployment_date = NOW() - ($2 * INTERVAL '1 day')
			 WHERE id::text = $1 OR challenge_id::text = $1
			 RETURNING id;`, [targetId, daysToAdvance]);
        if (result.rowCount === 0) {
            response.status(404).json({ success: false, error: { message: 'No project found for the supplied project/challenge ID.' } });
            return;
        }
        response.json({
            success: true,
            message: 'Time Machine activated! Project maturation buffer ended. 14-day citizen feedback quorum is now OPEN for voting.',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.app.use((_request, response) => {
    response.status(404).json({
        success: false,
        error: { message: 'Route not found.' },
    });
});
exports.app.use((error, _request, response, _next) => {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    response.status(500).json({
        success: false,
        error: { message },
    });
});
if (require.main === module) {
    exports.app.listen(port, () => {
        console.log(`[INFO] JAGRIT Backend running on http://localhost:${port}`);
    });
}
