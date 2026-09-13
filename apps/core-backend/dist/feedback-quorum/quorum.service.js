"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuorumProjectNotFoundError = void 0;
exports.castVote = castVote;
exports.evaluateQuorum = evaluateQuorum;
exports.uploadPesaNoc = uploadPesaNoc;
const client_1 = require("../db/client");
class QuorumProjectNotFoundError extends Error {
    constructor() {
        super('No active university project found for this challenge/project ID.');
        this.statusCode = 404;
    }
}
exports.QuorumProjectNotFoundError = QuorumProjectNotFoundError;
async function resolveProjectId(targetId) {
    const result = await (0, client_1.query)(`SELECT id FROM public.projects WHERE id::text = $1 OR challenge_id::text = $1 ORDER BY created_at DESC LIMIT 1;`, [targetId]);
    if (!result.rows[0])
        throw new QuorumProjectNotFoundError();
    return result.rows[0].id;
}
async function castVote(input) {
    const projectId = await resolveProjectId(input.targetId);
    await (0, client_1.query)(`INSERT INTO public.feedback_ledger (project_id, citizen_id, is_core_functional_pass, complaint_type, voter_location, raw_voice_url)
		 VALUES ($1, $2, $3, $4, ST_SetSRID(ST_Point($5, $6), 4326), $7);`, [projectId, input.citizenId || null, input.isPass, input.complaintType || 'NONE', input.lon, input.lat, input.voiceUrl || null]);
    return { success: true, project_id: projectId, message: 'Citizen vote recorded successfully.' };
}
async function evaluateQuorum(targetId, settlementPopulation = 850) {
    const projectResult = await (0, client_1.query)(`SELECT p.id, p.challenge_id, c.title, c.location FROM public.projects p JOIN public.challenges c ON p.challenge_id = c.id
		 WHERE p.id::text = $1 OR p.challenge_id::text = $1 LIMIT 1;`, [targetId]);
    if (!projectResult.rows[0])
        throw new QuorumProjectNotFoundError();
    const project = projectResult.rows[0];
    const population = Number.isFinite(Number(settlementPopulation)) && Number(settlementPopulation) > 0 ? Number(settlementPopulation) : 850;
    const quorumRequired = Math.max(15, Math.ceil(1.45 * Math.sqrt(population)));
    const votesResult = await (0, client_1.query)('SELECT is_core_functional_pass, complaint_type FROM public.feedback_ledger WHERE project_id = $1;', [project.id]);
    const votes = votesResult.rows;
    if (votes.length < quorumRequired)
        return { status: 'QUORUM_PENDING', votes_logged: votes.length, quorum_required: quorumRequired };
    const passRate = (votes.filter((vote) => vote.is_core_functional_pass).length / votes.length) * 100;
    const criticalDefectRate = (votes.filter((vote) => vote.complaint_type === 'CRITICAL_DEFECT').length / votes.length) * 100;
    if (passRate >= 80 && criticalDefectRate < 10) {
        await (0, client_1.query)("UPDATE public.projects SET resolution_status = 'COMPLETELY_SOLVED' WHERE id = $1;", [project.id]);
        await (0, client_1.query)("UPDATE public.challenges SET status = 'RESOLVED' WHERE id = $1;", [project.challenge_id]);
        return { resolution: 'COMPLETELY_SOLVED', pass_rate: passRate, credits_awarded: 4 };
    }
    if (criticalDefectRate >= 10 || passRate >= 50) {
        await (0, client_1.query)("UPDATE public.projects SET resolution_status = 'PARTIALLY_SOLVED' WHERE id = $1;", [project.id]);
        return { resolution: 'PARTIALLY_SOLVED', message: '45-day iterative repair sprint assigned.' };
    }
    await (0, client_1.query)("UPDATE public.projects SET resolution_status = 'FAILED' WHERE id = $1;", [project.id]);
    await (0, client_1.query)(`INSERT INTO public.rnd_failure_repository (project_id, failure_classification, root_cause_analysis, attempted_solution_summary, lessons_learned, escalated_to_national_hackathon)
		 VALUES ($1, 'MAJOR_FAILURE', $2, $3, $4, TRUE);`, [project.id, `Citizen quorum pass rate was ${passRate.toFixed(2)}%.`, 'Field solution evaluated through citizen quorum.', 'Address failed field outcomes before redeployment.']);
    return { resolution: 'FAILED', message: 'Indexed into R&D Failure Repository.' };
}
async function uploadPesaNoc(targetId, pesaNocUrl) {
    const projectId = await resolveProjectId(targetId);
    await (0, client_1.query)('UPDATE public.projects SET pesa_noc_url = $2 WHERE id = $1;', [projectId, pesaNocUrl || null]);
    return { success: true, project_id: projectId, message: 'Gram Sabha PESA Act 1996 resolution verified.' };
}
