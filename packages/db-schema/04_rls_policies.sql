ALTER TABLE public.incident_clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_trustees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verified_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rnd_failure_repository ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_threads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read clusters" ON public.incident_clusters FOR SELECT USING (true);
CREATE POLICY "Public read challenges" ON public.challenges FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read blueprints" ON public.verified_blueprints FOR SELECT USING (true);
CREATE POLICY "Public read rnd repo" ON public.rnd_failure_repository FOR SELECT USING (true);
CREATE POLICY "Public read threads" ON public.community_threads FOR SELECT USING (true);

-- project_trustees has RLS enabled with NO public policy -- intentionally locked down, only accessible via service_role key from backend, not the browser anon key. Confirm this is intended before Stage 2's frontend work assumes it can read trustee data directly.

-- NOTE: This stage intentionally defines only the public read policies described in the PRD. There are no INSERT/UPDATE/DELETE policies in this file.
-- Stage 2 has the frontend inserting directly into challenges and community_threads via the anon key, which will fail under RLS with only SELECT policies defined unless later stages explicitly add write policies.
-- That is a security decision for Stage 2/3, not something to be silently "fixed" here.
