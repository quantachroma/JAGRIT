import { transcribeAudioBuffer } from './ai/transcription.service';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { CORE_BACKEND_ENV_PATH, pool, query } from './db/client';
import { challengesRouter } from './challenges/challenges.controller';
import { evaluatorRouter } from './evaluator/evaluator.controller';
import { hackathonRouter } from './hackathon/hackathon.controller';
import { escrowRouter } from './escrow/escrow.controller';
import { quorumRouter } from './feedback-quorum/quorum.controller';
import { bidsRouter } from './bids/bids.controller';
import { projectsRouter } from './projects/projects.controller';
import { creditsRouter } from './credits/credits.controller';
import { blueprintsRouter } from './blueprints/blueprints.controller';


dotenv.config({ path: CORE_BACKEND_ENV_PATH });

export const app = express();
const port = Number(process.env.PORT || 5000);

app.use(express.json());
const corsOptions = {
	origin: ['http://localhost:3000', 'http://localhost:3001'],
	credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.get('/health', async (_request: Request, response: Response) => {
	try {
		const result = await pool.query('SELECT NOW(), PostGIS_Version();');
		response.json({
			status: 'ok',
			service: 'jagrit-core-backend',
			timestamp: result.rows[0].now,
			postgis_version: result.rows[0].postgis_version,
		});
	} catch (error) {
		response.status(503).json({ status: 'error', message: error instanceof Error ? error.message : 'Database unavailable.' });
	}
});

app.use('/api/v1/challenges', challengesRouter);
app.use('/api/v1/evaluator', evaluatorRouter);
app.use('/api/v1/hackathon', hackathonRouter);
app.use('/api/v1/escrow', escrowRouter);
app.use('/api/v1/quorum', quorumRouter);
app.use('/api/v1/bids', bidsRouter);
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/credits', creditsRouter);
app.use('/api/v1/blueprints', blueprintsRouter);

type UniversitySeed = {
	shortCode: string;
	name: string;
	district: string;
	longitude: number;
	latitude: number;
	nablCertified: boolean;
	nablDomain: string;
	patentsCount: number;
	facultyAvailablePct: number;
	campusCapacityPct: number;
	hScore: number;
	specializations: string[];
};

const TOP_10_UNIVERSITIES: UniversitySeed[] = [
	{ shortCode: 'BIT_MESRA', name: 'Birla Institute of Technology (BIT) Mesra', district: 'Ranchi', longitude: 85.4399, latitude: 23.4123, nablCertified: true, nablDomain: 'Water & Environmental Chemistry', patentsCount: 4, facultyAvailablePct: 88, campusCapacityPct: 78, hScore: 95, specializations: ['water', 'fluoride', 'arsenic', 'filtration', 'iot', 'काला पानी'] },
	{ shortCode: 'IIT_ISM', name: 'IIT (ISM) Dhanbad', district: 'Dhanbad', longitude: 86.4412, latitude: 23.8144, nablCertified: true, nablDomain: 'Mining & Groundwater Geotechnology', patentsCount: 7, facultyAvailablePct: 92, campusCapacityPct: 85, hScore: 98, specializations: ['mining', 'acid_mine', 'coal_wash', 'heavy_metals', 'hydrology'] },
	{ shortCode: 'NIT_JSR', name: 'National Institute of Technology (NIT) Jamshedpur', district: 'East Singhbhum', longitude: 86.1437, latitude: 22.7756, nablCertified: true, nablDomain: 'Metallurgy & Advanced Materials', patentsCount: 3, facultyAvailablePct: 80, campusCapacityPct: 82, hScore: 89, specializations: ['metallurgy', 'kharkai', 'industrial_runoff', 'solar_microgrid', 'mechanical_pumps'] },
	{ shortCode: 'BAU_RANCHI', name: 'Birsa Agricultural University (BAU)', district: 'Ranchi', longitude: 85.3176, latitude: 23.4358, nablCertified: true, nablDomain: 'Soil & Agricultural Biochemistry', patentsCount: 2, facultyAvailablePct: 85, campusCapacityPct: 70, hScore: 88, specializations: ['agriculture', 'lac', 'crop_rot', 'spoilage', 'cold_storage', 'post_harvest'] },
	{ shortCode: 'BIT_SINDRI', name: 'Birsa Institute of Technology (BIT) Sindri', district: 'Dhanbad', longitude: 86.5173, latitude: 23.6548, nablCertified: false, nablDomain: 'Chemical Engineering', patentsCount: 1, facultyAvailablePct: 70, campusCapacityPct: 75, hScore: 82, specializations: ['chemical_processing', 'wastewater', 'pipe_assembly', 'industrial_effluent'] },
	{ shortCode: 'NPU_MEDININAGAR', name: 'Nilamber-Pitamber University (NPU)', district: 'Palamu', longitude: 84.0722, latitude: 24.0353, nablCertified: false, nablDomain: 'Regional Studies & Community Science', patentsCount: 0, facultyAvailablePct: 68, campusCapacityPct: 65, hScore: 74, specializations: ['palamu', 'local_water', 'rural_livelihoods', 'chianki', 'daltonganj'] },
	{ shortCode: 'AIIMS_DEO', name: 'AIIMS Deoghar', district: 'Deoghar', longitude: 86.7, latitude: 24.4826, nablCertified: true, nablDomain: 'Clinical Pathology & Community Health', patentsCount: 2, facultyAvailablePct: 75, campusCapacityPct: 80, hScore: 92, specializations: ['fluorosis', 'dental_health', 'toxicology', 'public_health'] },
	{ shortCode: 'CUJ_RANCHI', name: 'Central University of Jharkhand (CUJ)', district: 'Ranchi', longitude: 85.1667, latitude: 23.3667, nablCertified: false, nablDomain: 'Renewable Energy & Tribal Studies', patentsCount: 1, facultyAvailablePct: 72, campusCapacityPct: 74, hScore: 80, specializations: ['renewable_energy', 'solar', 'tribal_extension', 'microgrid'] },
	{ shortCode: 'SKMU_DUMKA', name: 'Sido Kanhu Murmu University (SKMU)', district: 'Dumka', longitude: 87.2517, latitude: 24.2677, nablCertified: false, nablDomain: 'Santhal Pargana Forest Produce', patentsCount: 0, facultyAvailablePct: 64, campusCapacityPct: 62, hScore: 75, specializations: ['dumka', 'santhal', 'tribal_agro', 'bhashini'] },
	{ shortCode: 'KOLHAN_UNIV', name: 'Kolhan University', district: 'West Singhbhum', longitude: 85.8124, latitude: 22.5508, nablCertified: false, nablDomain: 'Sanitation & Peri-Urban Bio-Waste', patentsCount: 0, facultyAvailablePct: 65, campusCapacityPct: 68, hScore: 76, specializations: ['chaibasa', 'sanitation', 'bio_waste', 'composting', 'rural_schools'] },
];

export async function ensureTop10UniversitiesSeeded(): Promise<void> {
	await query(`
		CREATE EXTENSION IF NOT EXISTS postgis;
		CREATE EXTENSION IF NOT EXISTS pgcrypto;
		CREATE TABLE IF NOT EXISTS public.universities (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(), short_code TEXT UNIQUE NOT NULL, name TEXT NOT NULL,
			district TEXT NOT NULL, location GEOMETRY(Point, 4326), nabl_certified BOOLEAN DEFAULT false,
			nabl_domain TEXT, patents_count INT DEFAULT 0, faculty_available_pct INT DEFAULT 80,
			campus_capacity_pct INT DEFAULT 75, h_score INT DEFAULT 85, specializations TEXT[]
		);
	`);
	for (const university of TOP_10_UNIVERSITIES) {
		await query(
			`INSERT INTO public.universities
				(short_code, name, district, location, nabl_certified, nabl_domain, patents_count, faculty_available_pct, campus_capacity_pct, h_score, specializations)
			 VALUES ($1, $2, $3, ST_SetSRID(ST_Point($4, $5), 4326), $6, $7, $8, $9, $10, $11, $12)
			 ON CONFLICT (short_code) DO UPDATE SET name = EXCLUDED.name, district = EXCLUDED.district,
				location = EXCLUDED.location, nabl_certified = EXCLUDED.nabl_certified, nabl_domain = EXCLUDED.nabl_domain,
				patents_count = EXCLUDED.patents_count, faculty_available_pct = EXCLUDED.faculty_available_pct,
				campus_capacity_pct = EXCLUDED.campus_capacity_pct, h_score = EXCLUDED.h_score,
				specializations = EXCLUDED.specializations;`,
			[university.shortCode, university.name, university.district, university.longitude, university.latitude, university.nablCertified, university.nablDomain, university.patentsCount, university.facultyAvailablePct, university.campusCapacityPct, university.hScore, university.specializations],
		);
	}
}

app.get('/api/v1/challenges/:id/match', async (request: Request, response: Response) => {
	try {
		const challengeResult = await query<{
			id: string; ticket_number: string; title: string; description: string; district: string; lat: number; lon: number;
		}>(
			`SELECT id, ticket_number, title, description, district, ST_Y(location::geometry) AS lat, ST_X(location::geometry) AS lon
			 FROM public.challenges WHERE id::text = $1 OR ticket_number = $1 LIMIT 1;`,
			[request.params.id],
		);
		if (!challengeResult.rows[0]) {
			response.status(404).json({ error: 'Challenge not found.' });
			return;
		}
		const challenge = challengeResult.rows[0];
		const universities = await query<{
			short_code: string; name: string; district: string; nabl_certified: boolean; nabl_domain: string;
			patents_count: number; faculty_available_pct: number; campus_capacity_pct: number; h_score: number;
			specializations: string[]; dist_km: number;
		}>(
			`SELECT u.short_code, u.name, u.district, u.nabl_certified, u.nabl_domain, u.patents_count,
					u.faculty_available_pct, u.campus_capacity_pct, u.h_score, u.specializations,
					ROUND((ST_Distance(u.location::geography, c.location::geography) / 1000.0)::numeric, 1) AS dist_km
			 FROM public.universities u CROSS JOIN public.challenges c WHERE c.id = $1 ORDER BY u.short_code;`,
			[challenge.id],
		);
		const challengeText = `${challenge.title} ${challenge.description} ${challenge.district}`.toLowerCase();
		const allUniversities = universities.rows.map((university) => {
			const specializations = university.specializations || [];
			const matchedSpecializations = specializations.filter((specialization) => challengeText.includes(specialization.toLowerCase()));
			const domainMatches = university.nabl_domain.split(/[^a-z0-9]+/i).filter((word) => word.length > 3).some((word) => challengeText.includes(word.toLowerCase()));
			const domainExpertise = Math.min(100, matchedSpecializations.length * 20 + university.patents_count * 5 + (domainMatches ? 25 : 0));
			const nablLab = university.nabl_certified ? (domainMatches || matchedSpecializations.length > 0 ? 100 : 70) : 40;
			const proximity = Math.max(0, Math.min(100, Math.round(100 - Number(university.dist_km) / 2)));
			const overallMatchScore = Math.round(0.25 * domainExpertise + 0.2 * university.faculty_available_pct + 0.2 * nablLab + 0.15 * proximity + 0.1 * university.campus_capacity_pct + 0.1 * university.h_score);
			return {
				universityCode: university.short_code, universityName: university.name, district: university.district,
				realDistanceKm: Number(university.dist_km), domainExpertise, facultyAvailability: university.faculty_available_pct,
				nablLab, proximity, campusCapacity: university.campus_capacity_pct, trackRecord: university.h_score,
				overallMatchScore, isEligible: overallMatchScore >= 70,
			};
		}).sort((left, right) => right.overallMatchScore - left.overallMatchScore);
		response.json({ challenge, topMatch: allUniversities[0], allUniversities });
	} catch (error) {
		response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to calculate university matches.' });
	}
});
// ==========================================
// Meta WhatsApp Cloud API Webhook
// ==========================================
app.get('/api/v1/webhooks/whatsapp', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'jagrit_sih_2024';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ [WhatsApp Webhook] Handshake verified successfully!');
    return res.status(200).send(challenge);
  } else {
    console.warn('❌ [WhatsApp Webhook] Verification token mismatch!');
    return res.sendStatus(403);
  }
});

export async function sendWhatsAppReply(to: string, messageText: string): Promise<void> {
	const phoneNumberId = process.env.META_PHONE_NUMBER_ID || '1386185431237992';
	const accessToken = process.env.META_WHATSAPP_TOKEN || '';

	const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			to,
			type: 'text',
			text: { body: messageText },
		}),
	});

	if (!response.ok) {
		throw new Error(`WhatsApp reply failed with status ${response.status}: ${await response.text()}`);
	}

	console.log('📤 [WhatsApp Reply Sent to ' + to + ']');
}
// Helper to download raw audio bytes from Meta WhatsApp servers
// Helper to download raw audio bytes from Meta WhatsApp servers
async function downloadMetaMedia(mediaId: string, directUrl?: string): Promise<Buffer> {
  const token = process.env.META_WHATSAPP_TOKEN;
  let downloadUrl = directUrl;

  // If direct URL is not present, fetch it from Graph API
  if (!downloadUrl) {
    const metaRes = await fetch(`https://graph.facebook.com/v20.0/${mediaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!metaRes.ok) throw new Error(`Failed to get media URL: ${metaRes.statusText}`);
    const metaData = (await metaRes.json()) as { url: string };
    downloadUrl = metaData.url;
  }

  // Download raw audio bytes from Meta's secure lookaside server
  const downloadRes = await fetch(downloadUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!downloadRes.ok) throw new Error(`Failed to download audio binary: ${downloadRes.statusText}`);

  const arrayBuffer = await downloadRes.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
async function ingestWhatsAppMessage(value: Record<string, any>): Promise<void> {
	const message = value.messages?.[0];
	if (!message) return;

	const from = String(message.from || '').trim();
	if (!from) return;

	const messageType = message.type;
	let description: string;
	let title: string;
	let latitude = 24.0353;
	let longitude = 84.0722;

	if (messageType === 'text') {
		description = String(message.text?.body || '').trim();
		title = 'WhatsApp citizen report';
	} else if (messageType === 'audio') {
		const audioId = message.audio?.id;
		const directUrl = message.audio?.url;
		console.log(`🎙️ [WhatsApp Audio Received] Fetching media ID: ${audioId}...`);
		try {
			const audioBuffer = await downloadMetaMedia(audioId, directUrl);
			description = await transcribeAudioBuffer(audioBuffer, 'voice_note.ogg', 'audio/ogg');
			title = `आवाज़ शिकायत: ${description.substring(0, 35)}...`;
		} catch (err) {
			console.error('⚠️ [Audio Fetch/Transcribe Failed]:', err);
			description = 'Voice note submitted in Hindi (Transcription pending)';
			title = 'WhatsApp voice note report';
		}
	} else if (messageType === 'location') {
		const rawLatitude = Number(message.location?.latitude);
		const rawLongitude = Number(message.location?.longitude);
		latitude = Number.isFinite(rawLatitude) ? rawLatitude : latitude;
		longitude = Number.isFinite(rawLongitude) ? rawLongitude : longitude;
		description = `Live GPS Pin: ${latitude}, ${longitude}`;
		title = 'WhatsApp location report';
	} else {
		return;
	}

	if (!description) return;

	const ticketNumber = `JAG-${new Date().getFullYear()}-PAL-${Math.floor(1000 + Math.random() * 9000)}`;
	await query(
		`INSERT INTO public.challenges
			(ticket_number, title, description, location, district, block, status, submission_channel)
		 VALUES ($1, $2, $3, ST_SetSRID(ST_Point($4, $5), 4326), $6, $7, $8, $9);`,
		[ticketNumber, title, description, longitude, latitude, 'Palamu', null, 'PENDING_TRIAGE', 'WHATSAPP'],
	);

	const replyText = `जोहार! आपकी समस्या JAGRIT पोर्टल पर दर्ज कर ली गई है।\n\n📌 टिकट संख्या: ${ticketNumber}\n📍 जिला: पलामू\n🏛️ स्थिति: ए.आई. सत्यापन एवं विश्वविद्यालय आवंटन प्रगति पर है।\n\n🔗 स्टेटस ट्रैक करें: http://localhost:3000/progress`;
	await sendWhatsAppReply(from, replyText);
}

app.post('/api/v1/webhooks/whatsapp', (req: Request, res: Response) => {
	console.log('🔔 [WhatsApp Webhook Hit]:', JSON.stringify(req.body, null, 2));
	res.status(200).send('EVENT_RECEIVED');

	const value = req.body?.entry?.[0]?.changes?.[0]?.value;
	if (value?.messages) {
		void ingestWhatsAppMessage(value).catch((error: unknown) => {
			console.error('❌ [WhatsApp Ingestion Error]:', error instanceof Error ? error.message : error);
		});
	}
});

app.get('/api/v1/test-all', async (_request: Request, response: Response) => {
	const client = await pool.connect();
	const tests: Record<string, { passed: boolean; details?: unknown }> = {};
	let challengeId: string | undefined;
	let projectId: string | undefined;

	try {
		await client.query('BEGIN');
		const health = await client.query('SELECT NOW(), PostGIS_Version();');
		tests.health = { passed: Boolean(health.rows[0]?.postgis_version), details: health.rows[0] };

		const point = { lat: 23.4001, lon: 85.3201 };
		const challenge = await client.query<{ id: string; ticket_number: string }>(
			`INSERT INTO public.challenges
				(ticket_number, title, description, location, district, block, status, submission_channel)
			 VALUES ('JAG-TEST-' || floor(random() * 100000000)::text, 'Automated backend test', 'Transactional test challenge', ST_SetSRID(ST_Point($1, $2), 4326), 'Ranchi', NULL, 'PENDING_HITL', 'APP')
			 RETURNING id, ticket_number;`,
			[point.lon, point.lat],
		);
		challengeId = challenge.rows[0].id;
		const duplicate = await client.query<{ id: string }>(
			`SELECT id FROM public.challenges
			 WHERE ST_DWithin(location::geography, ST_SetSRID(ST_Point($1, $2), 4326)::geography, 500)
			 LIMIT 1;`,
			[point.lon + 0.0005, point.lat],
		);
		tests.deduplication = { passed: duplicate.rows.some((row) => row.id === challengeId), details: { challenge_id: challengeId } };

		const bid = await client.query<{ id: string }>(
			`INSERT INTO public.projects
				(challenge_id, lead_university_name, total_budget_inr, execution_mode)
			 VALUES ($1, 'Automated Test University', 100000, 'DIRECT_RND') RETURNING id;`,
			[challengeId],
		);
		projectId = bid.rows[0].id;
		await client.query(
			`INSERT INTO public.projects
				(challenge_id, lead_university_name, total_budget_inr, execution_mode)
			 VALUES ($1, 'Automated Test University Two', 120000, 'DIRECT_RND');`,
			[challengeId],
		);
		const bidCount = await client.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM public.projects WHERE challenge_id = $1;', [challengeId]);
		tests.bidding = { passed: Number(bidCount.rows[0].count) === 2, details: { bids_count: Number(bidCount.rows[0].count) } };

		await client.query("UPDATE public.challenges SET status = 'DYNAMIC_HACKATHON' WHERE id = $1;", [challengeId]);
		await client.query("UPDATE public.projects SET tranche_1_disbursed = TRUE WHERE id = $1;", [projectId]);
		await client.query("UPDATE public.projects SET tranche_2_disbursed = TRUE, nabl_cert_url = 'test://nabl' WHERE id = $1;", [projectId]);
		await client.query("UPDATE public.projects SET tranche_3_disbursed = TRUE, pesa_noc_url = 'test://pesa', maturation_ends_at = NOW() + INTERVAL '45 days' WHERE id = $1;", [projectId]);
		const escrow = await client.query<{ tranche_2_disbursed: boolean; tranche_3_disbursed: boolean }>('SELECT tranche_2_disbursed, tranche_3_disbursed FROM public.projects WHERE id = $1;', [projectId]);
		tests.escrow = { passed: escrow.rows[0].tranche_2_disbursed && escrow.rows[0].tranche_3_disbursed, details: escrow.rows[0] };

		await client.query(
			`INSERT INTO public.feedback_ledger
				(project_id, citizen_id, is_core_functional_pass, complaint_type, voter_location)
			 VALUES ($1, NULL, TRUE, 'NONE', ST_SetSRID(ST_Point($2, $3), 4326));`,
			[projectId, point.lon, point.lat],
		);
		const votes = await client.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM public.feedback_ledger WHERE project_id = $1;', [projectId]);
		const quorumRequired = Math.max(15, Math.ceil(1.45 * Math.sqrt(850)));
		tests.voting = { passed: Number(votes.rows[0].count) === 1, details: { votes_logged: Number(votes.rows[0].count) } };
		tests.quorum = { passed: Number(votes.rows[0].count) < quorumRequired, details: { status: 'QUORUM_PENDING', quorum_required: quorumRequired } };

		await client.query('ROLLBACK');
		const allTestsPassed = Object.values(tests).every((test) => test.passed);
		response.status(allTestsPassed ? 200 : 500).json({ all_tests_passed: allTestsPassed, tests });
	} catch (error) {
		await client.query('ROLLBACK').catch(() => undefined);
		response.status(500).json({
			all_tests_passed: false,
			tests,
			error: error instanceof Error ? error.message : 'Automated backend test failed.',
		});
	} finally {
		client.release();
	}
});

app.post('/api/v1/test/advance-clock', async (request: Request, response: Response, next) => {
	try {
		const body = request.body as Record<string, unknown>;
		const targetId = String(body.project_id || body.projectId || body.challenge_id || body.challengeId || '').trim();
		const rawDays = body.days_to_advance ?? body.daysToAdvance;
		const daysToAdvance = rawDays == null || rawDays === '' ? 46 : Number(rawDays);

		if (!targetId || !Number.isFinite(daysToAdvance) || daysToAdvance <= 0) {
			response.status(400).json({ success: false, error: { message: 'A project/challenge ID and positive days_to_advance are required.' } });
			return;
		}

		const result = await pool.query(
			`UPDATE public.projects
			 SET maturation_ends_at = NOW() - INTERVAL '1 day',
				 field_deployment_date = NOW() - ($2 * INTERVAL '1 day')
			 WHERE id::text = $1 OR challenge_id::text = $1
			 RETURNING id;`,
			[targetId, daysToAdvance],
		);

		if (result.rowCount === 0) {
			response.status(404).json({ success: false, error: { message: 'No project found for the supplied project/challenge ID.' } });
			return;
		}

		response.json({
			success: true,
			message: 'Time Machine activated! Project maturation buffer ended. 14-day citizen feedback quorum is now OPEN for voting.',
		});
	} catch (error) {
		next(error);
	}
});

app.use((_request: Request, response: Response) => {
	response.status(404).json({
		success: false,
		error: { message: 'Route not found.' },
	});
});

app.use((error: unknown, _request: Request, response: Response, _next: express.NextFunction) => {
	const message = error instanceof Error ? error.message : 'Internal Server Error';
	response.status(500).json({
		success: false,
		error: { message },
	});
});

if (require.main === module) {
	void ensureTop10UniversitiesSeeded()
		.then(() => {
			app.listen(port, () => {
				console.log(`[INFO] JAGRIT Backend running on http://localhost:${port}`);
			});
		})
		.catch((error: unknown) => {
			console.error('[ERROR] University seed failed:', error instanceof Error ? error.message : error);
			process.exitCode = 1;
		});
}
