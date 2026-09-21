import { matchUniversities, wbsTimeline } from '../ai/ai.service';
import { getSupabaseClient } from '../db/supabase.service';

export interface BlueprintCloneInput {
	sourceProjectId: string;
	targetDistrict: string;
}

/** Clones a resolved project's challenge/project records for a target district. */
export async function cloneBlueprint(input: BlueprintCloneInput) {
	const supabase = getSupabaseClient();
	const sourceProjectResult = await supabase.from('projects').select('*').eq('id', input.sourceProjectId).single();
	if (sourceProjectResult.error || !sourceProjectResult.data) {
		throw new Error(`Unable to load source project: ${sourceProjectResult.error?.message || 'not found'}.`);
	}
	const sourceProject = sourceProjectResult.data as Record<string, unknown>;
	if (sourceProject.resolution_status !== 'COMPLETELY_SOLVED') {
		throw new Error('Only a successful project can be cloned.');
	}

	const sourceChallengeResult = await supabase.from('challenges').select('*').eq('id', sourceProject.challenge_id).single();
	if (sourceChallengeResult.error || !sourceChallengeResult.data) {
		throw new Error(`Unable to load source challenge: ${sourceChallengeResult.error?.message || 'not found'}.`);
	}
	const sourceChallenge = sourceChallengeResult.data as Record<string, unknown>;
	const challengeInsert = await supabase.from('challenges').insert({
		title: sourceChallenge.title,
		description: sourceChallenge.description,
		location: sourceChallenge.location,
		district: input.targetDistrict,
		block: sourceChallenge.block || null,
		panchayat: sourceChallenge.panchayat || null,
		status: 'OPEN_FOR_BIDS',
		submission_channel: 'INSTITUTIONAL_DOSSIER',
	}).select('*').single();
	if (challengeInsert.error || !challengeInsert.data) throw new Error(`Unable to create clone challenge: ${challengeInsert.error?.message || 'unknown error'}.`);
	const clonedChallenge = challengeInsert.data as Record<string, unknown>;

	const projectInsert = await supabase.from('projects').insert({
		challenge_id: clonedChallenge.id,
		lead_university_name: sourceProject.lead_university_name,
		total_budget_inr: sourceProject.total_budget_inr,
		pi_faculty_id: sourceProject.pi_faculty_id || null,
		execution_mode: sourceProject.execution_mode,
		resolution_status: 'IN_PROGRESS',
	}).select('*').single();
	if (projectInsert.error || !projectInsert.data) throw new Error(`Unable to create cloned project: ${projectInsert.error?.message || 'unknown error'}.`);

	const project = projectInsert.data as Record<string, unknown>;
	const [universityMatch, timeline] = await Promise.all([
		matchUniversities({ project_id: project.id, challenge_id: clonedChallenge.id }),
		wbsTimeline({ project_id: project.id, challenge_id: clonedChallenge.id }),
	]);
	return {
		project,
		challenge: clonedChallenge,
		ai: { university_match: universityMatch.data, wbs_timeline: timeline.data, fallback: universityMatch.fallback || timeline.fallback },
	};
}
