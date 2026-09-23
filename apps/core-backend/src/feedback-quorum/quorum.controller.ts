import { Request, Response, Router } from 'express';
import {
	castVote,
	evaluateQuorum,
	QuorumProjectNotFoundError,
	uploadPesaNoc,
} from './quorum.service';

export const quorumRouter = Router();

function requestTarget(body: Record<string, unknown>): string {
	return String(body.project_id || body.projectId || body.challenge_id || body.challengeId || body.targetId || '').trim();
}

function errorStatus(error: unknown): number {
	return error instanceof QuorumProjectNotFoundError ? 404 : 500;
}

const handleVote = async (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
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
		response.status(201).json(await castVote({
			targetId,
			citizenId: body.citizen_id == null ? (body.citizenId == null ? null : String(body.citizenId)) : String(body.citizen_id),
			isPass,
			complaintType: String(body.complaint_type || body.complaintType || 'NONE'),
			lat,
			lon,
			voiceUrl: body.voice_url == null ? (body.voiceUrl == null ? null : String(body.voiceUrl)) : String(body.voice_url),
		}));
	} catch (error) {
		response.status(errorStatus(error)).json({ error: error instanceof Error ? error.message : 'Unable to record citizen vote.' });
	}
};

quorumRouter.post('/vote', handleVote);
quorumRouter.post('/cast-vote', handleVote);

const handleEvaluate = async (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	const populationValue = body.settlement_population ?? body.settlementPopulation ?? request.query.population;
	const population = populationValue == null || populationValue === '' ? 850 : Number(populationValue);
	try {
		const targetId = String(request.params.id || body.project_id || body.projectId || body.challenge_id || body.challengeId || '').trim();
		if (!targetId) {
			response.status(400).json({ error: 'A project/challenge ID is required.' });
			return;
		}
		response.json(await evaluateQuorum(targetId, Number.isFinite(population) && population > 0 ? population : 850));
	} catch (error) {
		response.status(errorStatus(error)).json({ error: error instanceof Error ? error.message : 'Unable to evaluate citizen quorum.' });
	}
};

quorumRouter.post('/evaluate/:id', handleEvaluate);
quorumRouter.get('/evaluate/:id', handleEvaluate);
quorumRouter.post('/evaluate', handleEvaluate);

quorumRouter.post('/pesa-noc', async (request: Request, response: Response) => {
	const body = request.body as Record<string, unknown>;
	const id = requestTarget(body);
	const url = String(body.pesa_noc_url || body.pesaNocUrl || '').trim();
	if (!id || !url) {
		response.status(400).json({ error: 'A project/challenge ID and pesa_noc_url are required.' });
		return;
	}
	try {
		response.json(await uploadPesaNoc(id, url));
	} catch (error) {
		response.status(errorStatus(error)).json({ error: error instanceof Error ? error.message : 'Unable to verify PESA NOC.' });
	}
});
