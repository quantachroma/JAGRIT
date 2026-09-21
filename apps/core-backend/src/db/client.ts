import 'dotenv/config';
import { Pool, QueryResult, QueryResultRow } from 'pg';
import { getSupabaseClient } from './supabase.service';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values?: unknown[],
): Promise<QueryResult<T>> {
  return pool.query<T>(text, values);
}

function throwSupabaseError(error: { message: string } | null): void {
	if (error) throw new Error(`Supabase query failed: ${error.message}`);
}

/** P2 real-data helpers. These use Supabase rather than process-local mock arrays. */
export async function fetchChallenges<T extends Record<string, unknown> = Record<string, unknown>>(): Promise<T[]> {
	const result = await getSupabaseClient().from('challenges').select('*');
	throwSupabaseError(result.error);
	return (result.data || []) as T[];
}

export async function updateProject<T extends Record<string, unknown> = Record<string, unknown>>(
	projectId: string,
	changes: Record<string, unknown>,
): Promise<T> {
	const result = await getSupabaseClient().from('projects').update(changes).eq('id', projectId).select('*').single();
	throwSupabaseError(result.error);
	if (!result.data) throw new Error('Supabase did not return the updated project.');
	return result.data as T;
}

export async function countUpvotes(challengeId: string): Promise<number> {
	const result = await getSupabaseClient().from('upvotes').select('id').eq('challenge_id', challengeId);
	throwSupabaseError(result.error);
	return Array.isArray(result.data) ? result.data.length : 0;
}
