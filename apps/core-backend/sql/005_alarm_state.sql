CREATE TABLE IF NOT EXISTS public.project_alarm_states (
    project_id UUID PRIMARY KEY REFERENCES public.projects(id) ON DELETE CASCADE,
    clock_started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    frozen_at TIMESTAMP WITH TIME ZONE,
    repair_deadline TIMESTAMP WITH TIME ZONE,
    reports JSONB NOT NULL DEFAULT '[]'::jsonb,
    repaired_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);