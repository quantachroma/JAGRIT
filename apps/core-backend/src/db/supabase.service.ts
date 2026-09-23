/**
 * Lazily creates the Supabase client so local mock-mode startup does not need
 * database credentials. Install `@supabase/supabase-js` in this workspace
 * before calling `getSupabaseClient` in a live environment.
 */
export interface SupabaseClientLike {
	from(table: string): SupabaseQueryLike;
}

export interface SupabaseResult<T> {
	data: T | null;
	error: { message: string } | null;
}

export interface SupabaseQueryLike extends PromiseLike<SupabaseResult<unknown>> {
	select(columns?: string): SupabaseQueryLike;
	insert(values: Record<string, unknown> | Record<string, unknown>[]): SupabaseQueryLike;
	update(values: Record<string, unknown>): SupabaseQueryLike;
	eq(column: string, value: unknown): SupabaseQueryLike;
	single(): SupabaseQueryLike;
}

type CreateClient = (url: string, key: string) => SupabaseClientLike;

let client: SupabaseClientLike | undefined;

export function getSupabaseClient(): SupabaseClientLike {
	if (client) return client;

	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
	if (!url || !key) {
		throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY must be configured.');
	}

	let createClient: CreateClient;
	try {
		({ createClient } = require('@supabase/supabase-js') as { createClient: CreateClient });
	} catch {
		throw new Error('@supabase/supabase-js is not installed in core-backend.');
	}

	client = createClient(url, key);
	return client;
}
