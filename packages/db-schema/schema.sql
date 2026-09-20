-- ========================================================================
-- JAGRIT — Supabase PostgreSQL Production DDL Schema
-- Authority: Department of Higher & Technical Education, Government of Jharkhand
-- Extensions: PostGIS 3.4+, pgvector, uuid-ossp
-- ========================================================================

-- 1. Enable Required Database Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ========================================================================
-- 2. Core Users Table
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(15) UNIQUE,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(35) NOT NULL CHECK (role IN (
        'CITIZEN', 'PRI_OFFICER', 'STUDENT', 'FACULTY_PI',
        'INDUSTRY_MENTOR', 'EVALUATOR', 'ADMIN', 'TRUSTEE'
    )),
    apaar_id VARCHAR(20) UNIQUE,
    institution_name VARCHAR(255),
    h_score INT DEFAULT 100 CHECK (h_score BETWEEN 0 AND 100),
    preferred_language VARCHAR(10) DEFAULT 'hi',
    is_phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- [NEW] Universities Table (For H-Score and Institutional Matching)
CREATE TABLE IF NOT EXISTS public.universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    domains_supported TEXT[] DEFAULT '{}',
    certified_labs TEXT[] DEFAULT '{}',
    max_project_capacity INT DEFAULT 5,
    active_projects INT DEFAULT 0,
    has_pesa_cell BOOLEAN DEFAULT FALSE,
    h_score INT DEFAULT 100, -- Base H-score (deduct 5 for ignored bids)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- [NEW] Incident Clusters Table (For Composite Deduplication D >= 0.72)
CREATE TABLE IF NOT EXISTS public.incident_clusters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cluster_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    thematic_domain VARCHAR(50),
    centroid_location GEOMETRY(Point, 4326) NOT NULL,
    district VARCHAR(100),
    report_velocity INT DEFAULT 1,
    priority_score NUMERIC(5,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'OPEN_FOR_PRIORITIZATION',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Challenges Table (Updated to link to clusters and vector embeddings)
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    cluster_id UUID REFERENCES public.incident_clusters(id) ON DELETE SET NULL, -- Linked to Cluster
    submitted_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    submission_channel VARCHAR(30) NOT NULL CHECK (submission_channel IN (
        'APP', 'WEB', 'WHATSAPP', 'INSTITUTIONAL_DOSSIER', 'FIELD_SURVEY'
    )),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    description_embedding vector(1536), -- Vector embeddings for pgvector deduplication
    raw_audio_url TEXT,
    media_urls TEXT[] DEFAULT '{}',
    location GEOMETRY(Point, 4326) NOT NULL,
    district VARCHAR(100) NOT NULL,
    block VARCHAR(100),
    panchayat VARCHAR(100),
    upvotes_count INT DEFAULT 1,
    status VARCHAR(50) DEFAULT 'PENDING_HITL' CHECK (status IN (
        'PENDING_HITL', 'ROUTED_CIVIC', 'OPEN_FOR_BIDS', 'DYNAMIC_HACKATHON',
        'DIRECT_RND', 'IN_PILOT', 'RESOLVED', 'FAILED'
    )),
    category_type VARCHAR(30) CHECK (category_type IN (
        'CIVIC_ROUTINE', 'HEI_RESEARCH', 'TYPE_A', 'TYPE_B'
    )),
    matched_domains TEXT[] DEFAULT '{}',
    allocated_pool_inr NUMERIC(12, 2) DEFAULT 0.00,
    bidding_deadline TIMESTAMP WITH TIME ZONE,
    accelerated_upvote_active BOOLEAN DEFAULT FALSE,
    accelerated_deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_challenges_spatial ON public.challenges USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_challenges_vector ON public.challenges USING hnsw (description_embedding vector_cosine_ops);

-- 4. Projects & Escrow Table (Updated with spares_kit_months)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
    execution_mode VARCHAR(25) NOT NULL,
    lead_university_id UUID REFERENCES public.universities(id) ON DELETE SET NULL,
    lead_university_name VARCHAR(255) NOT NULL,
    partner_university_name VARCHAR(255),
    pi_faculty_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    student_team_ids UUID[] DEFAULT '{}',
    industry_mentor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    current_hackathon_round INT DEFAULT 1 CHECK (current_hackathon_round BETWEEN 1 AND 3),
    total_budget_inr NUMERIC(12, 2) NOT NULL,
    tranche_1_disbursed BOOLEAN DEFAULT FALSE,
    tranche_2_disbursed BOOLEAN DEFAULT FALSE,
    tranche_3_disbursed BOOLEAN DEFAULT FALSE,
    spares_kit_months INT DEFAULT 12, -- 12 months, or 24 if Stage 1 escalation expands scope
    nabl_cert_url TEXT,
    pesa_noc_url TEXT,
    field_deployment_date TIMESTAMP WITH TIME ZONE,
    maturation_ends_at TIMESTAMP WITH TIME ZONE,
    resolution_status VARCHAR(35) DEFAULT 'IN_PROGRESS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- [NEW] Project Trustees Table (For Key 1: 5 Designated Community Trustees)
CREATE TABLE IF NOT EXISTS public.project_trustees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    trustee_role VARCHAR(50) NOT NULL CHECK (trustee_role IN (
        'SCHOOL_HEADMASTER', 
        'PRI_WARD_MEMBER', 
        'INDEPENDENT_GRAM_SABHA_MEMBER', 
        'BENEFICIARY_SC_ST_1', 
        'BENEFICIARY_CITIZEN_2'
    )),
    full_name VARCHAR(150) NOT NULL,
    phone_hashed VARCHAR(64) NOT NULL, -- DPDP Act Compliance
    verification_vote BOOLEAN DEFAULT NULL, -- NULL = Pending, TRUE = YES, FALSE = NO
    voted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(project_id, trustee_role)
);

-- ========================================================================
-- 6. Project Trustees Table (ADR-006: Dual-Lock Key 1 - 4 of 5 Quorum)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.project_trustees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    trustee_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    designation VARCHAR(100) NOT NULL, -- Mukhiya, Jal Sahiya, Headmaster, SHG Leader, Elder
    has_voted BOOLEAN DEFAULT FALSE,
    vote_status VARCHAR(25) DEFAULT 'PENDING' CHECK (vote_status IN (
        'PENDING', 'AFFIRMATIVE', 'REJECTED', 'ABSTAIN'
    )),
    vote_remarks TEXT,
    voted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT uq_project_trustee UNIQUE (project_id, trustee_user_id)
);

CREATE INDEX IF NOT EXISTS idx_project_trustees_project ON public.project_trustees(project_id);
CREATE INDEX IF NOT EXISTS idx_project_trustees_user ON public.project_trustees(trustee_user_id);

-- ========================================================================
-- 7. Feedback Ledger Table (ADR-006: Dual-Lock Key 2 - Public Quorum)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.feedback_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    citizen_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    voter_location GEOMETRY(Point, 4326) NOT NULL,
    is_core_functional_pass BOOLEAN NOT NULL,
    complaint_type VARCHAR(30) NOT NULL CHECK (complaint_type IN (
        'NONE', 'COSMETIC_GRIEVANCE', 'CRITICAL_DEFECT'
    )),
    raw_voice_url TEXT,
    transcribed_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_spatial ON public.feedback_ledger USING GIST(voter_location);
CREATE INDEX IF NOT EXISTS idx_feedback_project ON public.feedback_ledger(project_id);

-- ========================================================================
-- 8. Verified Blueprints Table (ADR-009: 1-Click Solution Blueprint Cloning)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.verified_blueprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    domain VARCHAR(100) NOT NULL,
    bom_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    cad_schematics_url TEXT,
    vernacular_sop_url TEXT,
    estimated_replication_cost_inr NUMERIC(12, 2) NOT NULL,
    replication_days INT DEFAULT 14,
    clone_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blueprints_domain ON public.verified_blueprints(domain);
CREATE INDEX IF NOT EXISTS idx_blueprints_project ON public.verified_blueprints(project_id);

-- ========================================================================
-- 9. R&D Failure Repository Table (ADR-010: Failure Knowledge Base)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.rnd_failure_repository (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    failure_classification VARCHAR(50) NOT NULL CHECK (failure_classification IN (
        'MATERIAL_FATIGUE', 'CHEMICAL_CLOGGING', 'BIO_FOULING',
        'POWER_INSTABILITY', 'CIVIC_TAMPERING', 'DESIGN_FLAW', 'OTHER'
    )),
    root_cause_analysis TEXT NOT NULL,
    attempted_solution_summary TEXT NOT NULL,
    lessons_learned TEXT NOT NULL,
    escalated_to_national_hackathon BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- [NEW] Verified Blueprints Table (For 1-Click Solution Blueprint Cloning)
CREATE TABLE IF NOT EXISTS public.verified_blueprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blueprint_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    thematic_domain VARCHAR(50) NOT NULL,
    developed_by_heis TEXT[] NOT NULL,
    bom_json JSONB NOT NULL,
    cad_schematic_urls TEXT[] DEFAULT '{}',
    sop_vernacular_url TEXT,
    nabl_cert_url TEXT,
    capital_cost_inr NUMERIC(12,2) NOT NULL,
    mean_quorum_rating NUMERIC(4,2) NOT NULL,
    cloned_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Samvaad Community Threads Table
CREATE TABLE IF NOT EXISTS public.community_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    parent_thread_id UUID REFERENCES public.community_threads(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_attachments TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);