-- Academic credit records issued under ADR-015.
CREATE TABLE IF NOT EXISTS public.credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    apaar_id TEXT NOT NULL,
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    verified_workhours NUMERIC NOT NULL CHECK (verified_workhours >= 30),
    academic_credits_earned INTEGER NOT NULL CHECK (academic_credits_earned >= 1),
    credit_category TEXT NOT NULL CHECK (credit_category IN (
        'COMMUNITY_ENGAGEMENT',
        'EXPERIENTIAL_LEARNING',
        'CAPSTONE_PROJECT'
    )),
    signed_payload_signature TEXT NOT NULL,
    payload_json JSONB NOT NULL,
    deposited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);