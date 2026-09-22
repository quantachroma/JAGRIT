# Jagrit DB Schema Stage 0

This directory contains the Stage 0 database setup for Member 6 (DBA, Integrator & Demo Lead). These are the SQL files to run manually in the Supabase SQL Editor in order.

## Run order

Paste and run these files in this exact sequence:

1. `00_extensions.sql`
2. `01_schema.sql`
3. `02_indexes.sql`
4. `03_storage_buckets.sql`
5. `04_rls_policies.sql`

Each file is intentionally split so it can be validated and debugged independently before moving to the next stage.

## Extensions enabled

The following PostgreSQL extensions are enabled and are required for the schema:

- `uuid-ossp`: used for `uuid_generate_v4()` primary-key generation.
- `postgis`: used for geospatial `GEOMETRY(Point, 4326)` columns and GIST indexing.
- `vector`: used for `pgvector` similarity search on `description_embedding`.

These are created in `00_extensions.sql` with `CREATE EXTENSION IF NOT EXISTS` so they are safe to re-run.

## Storage buckets

The raw SQL approach is included in `03_storage_buckets.sql`:

```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES
  ('challenge-media', 'challenge-media', true, 52428800),
  ('dpr-docs', 'dpr-docs', true, 52428800),
  ('governance-certs', 'governance-certs', true, 52428800)
ON CONFLICT (id) DO NOTHING;
```

This creates the buckets with a 50 MB limit each (`52428800` bytes).

If the SQL insert does not work in your Supabase environment, do this manually in the Supabase Dashboard:

1. Open Supabase Dashboard.
2. Go to Storage.
3. Click New Bucket.
4. Create these buckets exactly:
   - `challenge-media`
   - `dpr-docs`
   - `governance-certs`
5. Mark each bucket as public.
6. Set the file size limit to 50 MB (52428800 bytes).

This fallback is documented because raw SQL bucket creation can behave inconsistently depending on Supabase version and plan behavior.

## RLS policy note and known open item

`04_rls_policies.sql` enables RLS and adds the public read policies specified by the PRD. It intentionally does not add any write policies for `INSERT`, `UPDATE`, or `DELETE`.

This is important because the PRD's Stage 0 spec only calls for read access, while later Stage 2/3 work may insert directly into `public.challenges` and `public.community_threads` from the browser/anon key. Under the current setup, those writes would fail until a later stage explicitly adds the relevant write policies.

The file also explicitly calls out the security expectation for `project_trustees`:

> `project_trustees` has RLS enabled with NO public policy — intentionally locked down, only accessible via service_role key from backend, not the browser anon key. Confirm this is intended before Stage 2's frontend work assumes it can read trustee data directly.

This known gap should be reviewed before any Stage 2/3 front-end assumptions are made around public trustee reads or direct challenge/thread insert flows.

## Verification to run later

Once the SQL files are pasted into the Supabase SQL Editor, the expected smoke checks are:

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
SELECT extname FROM pg_extension;
SELECT id, public, file_size_limit FROM storage.buckets;
```

Expected output should include all 7 public tables, the extensions `uuid-ossp`, `postgis`, and `vector`, and the three public storage buckets with `file_size_limit = 52428800`.
