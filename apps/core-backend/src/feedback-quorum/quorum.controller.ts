import { Router } from 'express';
import {
	castVote,
	evaluateQuorum,
	uploadPesaNoc,
} from './quorum.service';

export const quorumRouter = Router();

quorumRouter.post('/vote', async (request, response) => {
	const {
		project_id: projectId,
		citizen_id: citizenId,
		is_pass: isPass,
		complaint_type: complaintType,
		lat,
		lon,
		voice_url: voiceUrl,
	} = request.body as {
		project_id?: string;
		citizen_id?: string;
		is_pass?: boolean;
		complaint_type?: string;
		lat?: number;
		lon?: number;
		voice_url?: string;
	};

	if (!projectId || typeof isPass !== 'boolean' || !complaintType || typeof lat !== 'number' || typeof lon !== 'number') {
		response.status(400).json({ error: 'project_id, is_pass, complaint_type, lat, and lon are required.' });
		return;
	}

	try {
		response.status(201).json(await castVote(projectId, citizenId || null, isPass, complaintType, lat, lon, voiceUrl));
	} catch (error) {
		console.error('Citizen vote failed:', error);
		response.status(500).json({ error: 'Unable to record citizen vote.' });
	}
});

quorumRouter.post('/evaluate/:projectId', async (request, response) => {
	try {
		response.json(await evaluateQuorum(request.params.projectId));
	} catch (error) {
		console.error('Quorum evaluation failed:', error);
		response.status(500).json({ error: 'Unable to evaluate citizen quorum.' });
	}
});

quorumRouter.post('/pesa-noc', async (request, response) => {
	const {
		project_id: projectId,
		pesa_noc_url: pesaNocUrl,
		sachiv_name: sachivName,
		aadhaar_hash: aadhaarHash,
	} = request.body as {
		project_id?: string;
		pesa_noc_url?: string;
		sachiv_name?: string;
		aadhaar_hash?: string;
	};

	if (!projectId || !pesaNocUrl || !sachivName || !aadhaarHash) {
		response.status(400).json({ error: 'project_id, pesa_noc_url, sachiv_name, and aadhaar_hash are required.' });
		return;
	}

	try {
		response.json(await uploadPesaNoc(projectId, pesaNocUrl, sachivName, aadhaarHash));
	} catch (error) {
		console.error('PESA NOC upload failed:', error);
		response.status(500).json({ error: 'Unable to verify PESA NOC.' });
	}
});
