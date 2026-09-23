-- Schema for Jagrit Stage 0 core operational tables.
-- All timestamps are TIMESTAMPTZ to preserve timezone awareness across Jharkhand districts.

CREATE TABLE public.incident_clusters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cluster_code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    thematic_domain TEXT NOT NULL,
    complexity_tier TEXT NOT NULL CHECK (complexity_tier IN ('TYPE_A_CIVIC_ROUTINE', 'TYPE_A_LOW_CONFIDENCE', 'TYPE_B_APPLIED_RND')),
    centroid_location GEOMETRY(Point, 4326) NOT NULL,
    district TEXT NOT NULL,
    block TEXT,
    panchayat TEXT,
    report_velocity INTEGER NOT NULL DEFAULT 1,
    priority_score NUMERIC(5, 2),
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ownership / readers: incident_clusters and challenges are written by apps/ai-service triage/dedup output via Member 4's core-backend ingestion and are read by downstream Stage 2/3 reporting and map views.

CREATE TABLE public.challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number TEXT UNIQUE NOT NULL,
    cluster_id UUID REFERENCES public.incident_clusters(id),
    title TEXT NOT NULL,
    description TEXT,
    description_embedding vector(1536),
    raw_audio_url TEXT,
    media_urls TEXT[] NOT NULL DEFAULT '{}',
    location GEOMETRY(Point, 4326),
    district TEXT NOT NULL,
    block TEXT,
    upvotes_count INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'PENDING_TRIAGE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ownership / readers: challenge records are created/updated by Member 4's AI ingestion and Stage 2 civic submission workflow; projects later join on challenge_id for hackathon execution.

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES public.challenges(id),
    execution_mode TEXT NOT NULL CHECK (execution_mode IN ('HACKATHON', 'DIRECT_CLONE_FABRICATION')),
    lead_university_name TEXT,
    pi_faculty_name TEXT,
    student_team_ids UUID[] NOT NULL DEFAULT '{}',
    industry_mentor_name TEXT,
    current_hackathon_round INTEGER CHECK (current_hackathon_round BETWEEN 1 AND 3),
    total_budget_inr NUMERIC(12, 2),
    tranche_1_disbursed BOOLEAN NOT NULL DEFAULT false,
    tranche_2_disbursed BOOLEAN NOT NULL DEFAULT false,
    tranche_3_disbursed BOOLEAN NOT NULL DEFAULT false,
    nabl_cert_url TEXT,
    pesa_noc_url TEXT,
    deployed_at TIMESTAMPTZ,
    maturation_ends_at TIMESTAMPTZ,
    resolution_status TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ownership / readers: projects are written by Stage 1's seed data and later hackathon execution workflows; project_trustees and rnd_failure_repository are joined to them by the evaluation and governance flows.

CREATE TABLE public.project_trustees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id),
    trustee_role TEXT NOT NULL CHECK (trustee_role IN (
        'JAL_SAHIYA_CARETAKER',
        'SCHOOL_HEADMASTER',
        'PRI_WARD_MEMBER',
        'BENEFICIARY_SC_ST_1',
        'BENEFICIARY_CITIZEN_2'
    )),
    full_name TEXT NOT NULL,
    phone_hashed TEXT NOT NULL,
    verification_vote BOOLEAN,
    voted_at TIMESTAMPTZ
);

-- IMPORTANT: phone_hashed, not phone. Never add a raw phone number column to this table or anywhere in this schema. This matches the Role 5 privacy requirement that raw phone numbers are never persisted.
-- Ownership / readers: project_trustees are written by Stage 1 governance seed data and later trustee verification workflows; access is tightly controlled and should not be treated as a public read table.

CREATE TABLE public.verified_blueprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blueprint_code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    thematic_domain TEXT NOT NULL,
    developed_by_heis TEXT,
    bom_json JSONB NOT NULL DEFAULT '{}',
    cad_schematic_urls TEXT[] NOT NULL DEFAULT '{}',
    sop_vernacular_url TEXT,
    nabl_cert_url TEXT,
    capital_cost_inr NUMERIC(12, 2),
    mean_quorum_rating NUMERIC(3, 2),
    cloned_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ownership / readers: verified_blueprints are curated by Member 1/2 blueprint and governance flows and are read by Stage 2 clone/reuse and public catalog views.

CREATE TABLE public.rnd_failure_repository (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id),
    failure_classification TEXT NOT NULL CHECK (failure_classification IN ('MINOR_FAILURE', 'MAJOR_FAILURE')),
    root_cause_analysis TEXT,
    attempted_solution_summary TEXT,
    lessons_learned TEXT,
    escalated_to_national_hackathon BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ownership / readers: rnd_failure_repository is written by Member 5 evaluation and R&D review flows and read by Stage 2/3 reporting and national escalation workflows.

CREATE TABLE public.community_threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    author_role TEXT,
    content TEXT NOT NULL,
    media_urls TEXT[] NOT NULL DEFAULT '{}',
    tags TEXT[] NOT NULL DEFAULT '{}',
    likes_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ownership / readers: community_threads are written by Stage 2 civic forum submissions and read by public community/engagement surfaces.
