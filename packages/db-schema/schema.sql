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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================================================
-- 3. Incident Clusters Table (ADR-003: Composite Deduplication D >= 0.72)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.incident_clusters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cluster_code VARCHAR(50) UNIQUE NOT NULL,
    centroid GEOMETRY(Point, 4326) NOT NULL,
    radius_meters NUMERIC(8, 2) DEFAULT 500.00,
    incident_count INT DEFAULT 1,
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'MERGED', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED')),
    primary_domain VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    block VARCHAR(100),
    panchayat VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_incident_clusters_spatial ON public.incident_clusters USING GIST(centroid);
CREATE INDEX IF NOT EXISTS idx_incident_clusters_district ON public.incident_clusters(district);
CREATE INDEX IF NOT EXISTS idx_incident_clusters_status ON public.incident_clusters(status);

-- ========================================================================
-- 4. Challenges Table (Ingestion, AI Embeddings & Bidding Window)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    cluster_id UUID REFERENCES public.incident_clusters(id) ON DELETE SET NULL,
    submitted_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    submission_channel VARCHAR(30) NOT NULL CHECK (submission_channel IN (
        'APP', 'WEB', 'WHATSAPP', 'INSTITUTIONAL_DOSSIER', 'FIELD_SURVEY'
    )),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    description_embedding vector(1536),
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
CREATE INDEX IF NOT EXISTS idx_challenges_cluster ON public.challenges(cluster_id);
CREATE INDEX IF NOT EXISTS idx_challenges_status ON public.challenges(status);
CREATE INDEX IF NOT EXISTS idx_challenges_district ON public.challenges(district);

-- HNSW Cosine Distance Index for pgvector 1536-dim embeddings
CREATE INDEX IF NOT EXISTS idx_challenges_embedding ON public.challenges 
USING hnsw (description_embedding vector_cosine_ops);

-- ========================================================================
-- 5. Projects Table (Tranche Escrow 30/40/30 & 45-Day Maturation Buffer)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
    execution_mode VARCHAR(30) NOT NULL CHECK (execution_mode IN (
        'DIRECT_RND', 'DYNAMIC_HACKATHON', 'CONSORTIUM'
    )),
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
    nabl_cert_url TEXT,
    pesa_noc_url TEXT,
    field_deployment_date TIMESTAMP WITH TIME ZONE,
    maturation_ends_at TIMESTAMP WITH TIME ZONE,
    clock_paused BOOLEAN DEFAULT FALSE,
    paused_at TIMESTAMP WITH TIME ZONE,
    breakdown_alerts_count INT DEFAULT 0,
    resolution_status VARCHAR(35) DEFAULT 'IN_PROGRESS' CHECK (resolution_status IN (
        'IN_PROGRESS', 'MATURING', 'UNDER_REPAIR', 'IN_QUORUM', 'RESOLVED', 'FAILED'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_challenge ON public.projects(challenge_id);
CREATE INDEX IF NOT EXISTS idx_projects_resolution_status ON public.projects(resolution_status);
CREATE INDEX IF NOT EXISTS idx_projects_pi_faculty ON public.projects(pi_faculty_id);

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

CREATE INDEX IF NOT EXISTS idx_failure_repo_project ON public.rnd_failure_repository(project_id);
CREATE INDEX IF NOT EXISTS idx_failure_repo_classification ON public.rnd_failure_repository(failure_classification);

-- ========================================================================
-- 10. Samvaad Community Threads Table
-- ========================================================================
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

CREATE INDEX IF NOT EXISTS idx_community_threads_parent ON public.community_threads(parent_thread_id);
CREATE INDEX IF NOT EXISTS idx_community_threads_author ON public.community_threads(author_id);

-- ========================================================================
-- 11. Row Level Security (RLS) Policies
-- ========================================================================

-- Enable RLS across all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_trustees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verified_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rnd_failure_repository ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_threads ENABLE ROW LEVEL SECURITY;

-- 11.1 Users RLS
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.users FOR UPDATE USING (auth.uid() = id);

-- 11.2 Incident Clusters RLS
CREATE POLICY "Incident clusters are viewable by everyone" 
ON public.incident_clusters FOR SELECT USING (true);

CREATE POLICY "Service role and evaluators can manage clusters" 
ON public.incident_clusters FOR ALL USING (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('EVALUATOR', 'ADMIN'))
);

-- 11.3 Challenges RLS
CREATE POLICY "Challenges are viewable by everyone" 
ON public.challenges FOR SELECT USING (true);

CREATE POLICY "Anyone can submit challenges" 
ON public.challenges FOR INSERT WITH CHECK (true);

CREATE POLICY "Evaluators and admins can update challenges" 
ON public.challenges FOR UPDATE USING (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('EVALUATOR', 'ADMIN'))
);

-- 11.4 Projects RLS
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects FOR SELECT USING (true);

CREATE POLICY "Project team and admins can update projects" 
ON public.projects FOR UPDATE USING (
    auth.role() = 'service_role' OR 
    pi_faculty_id = auth.uid() OR 
    auth.uid() = ANY(student_team_ids) OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('ADMIN', 'EVALUATOR'))
);

CREATE POLICY "Admins and evaluators can insert projects" 
ON public.projects FOR INSERT WITH CHECK (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('ADMIN', 'EVALUATOR'))
);

-- 11.5 Project Trustees RLS
CREATE POLICY "Trustees are viewable by project stakeholders" 
ON public.project_trustees FOR SELECT USING (true);

CREATE POLICY "Trustees can cast their own vote" 
ON public.project_trustees FOR UPDATE USING (
    trustee_user_id = auth.uid() OR auth.role() = 'service_role'
);

CREATE POLICY "Admins can manage project trustees" 
ON public.project_trustees FOR ALL USING (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'ADMIN')
);

-- 11.6 Feedback Ledger RLS
CREATE POLICY "Feedback is viewable by everyone" 
ON public.feedback_ledger FOR SELECT USING (true);

CREATE POLICY "Citizens can submit feedback" 
ON public.feedback_ledger FOR INSERT WITH CHECK (true);

-- 11.7 Verified Blueprints RLS
CREATE POLICY "Blueprints are viewable by everyone" 
ON public.verified_blueprints FOR SELECT USING (true);

CREATE POLICY "Admins and PIs can publish blueprints" 
ON public.verified_blueprints FOR INSERT WITH CHECK (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('FACULTY_PI', 'ADMIN'))
);

CREATE POLICY "Admins and PIs can update blueprints" 
ON public.verified_blueprints FOR UPDATE USING (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('FACULTY_PI', 'ADMIN'))
);

-- 11.8 R&D Failure Repository RLS
CREATE POLICY "Failure repository entries are viewable by everyone" 
ON public.rnd_failure_repository FOR SELECT USING (true);

CREATE POLICY "Evaluators, PIs, and admins can insert failure entries" 
ON public.rnd_failure_repository FOR INSERT WITH CHECK (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('FACULTY_PI', 'EVALUATOR', 'ADMIN'))
);

-- 11.9 Samvaad Community Threads RLS
CREATE POLICY "Threads are viewable by everyone" 
ON public.community_threads FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create threads" 
ON public.community_threads FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL OR auth.role() = 'service_role'
);

CREATE POLICY "Authors can update their own threads" 
ON public.community_threads FOR UPDATE USING (
    author_id = auth.uid() OR auth.role() = 'service_role'
);
