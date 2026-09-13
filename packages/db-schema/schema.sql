-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(15) UNIQUE,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(35) NOT NULL CHECK (role IN (
        'CITIZEN', 'PRI_OFFICER', 'STUDENT', 'FACULTY_PI',
        'INDUSTRY_MENTOR', 'EVALUATOR', 'ADMIN'
    )),
    apaar_id VARCHAR(20) UNIQUE,
    institution_name VARCHAR(255),
    preferred_language VARCHAR(10) DEFAULT 'hi',
    is_phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Challenges Table
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    submitted_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    submission_channel VARCHAR(25) NOT NULL CHECK (submission_channel IN ('APP', 'WEB', 'WHATSAPP', 'INSTITUTIONAL_DOSSIER')),
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
    status VARCHAR(50) DEFAULT 'PENDING_HITL',
    category_type VARCHAR(30),
    matched_domains TEXT[] DEFAULT '{}',
    allocated_pool_inr NUMERIC(12, 2) DEFAULT 0.00,
    bidding_deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_challenges_spatial ON public.challenges USING GIST(location);

-- 4. Projects & Escrow Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
    execution_mode VARCHAR(25) NOT NULL,
    lead_university_name VARCHAR(255) NOT NULL,
    partner_university_name VARCHAR(255),
    pi_faculty_id UUID REFERENCES public.users(id),
    student_team_ids UUID[] DEFAULT '{}',
    industry_mentor_id UUID REFERENCES public.users(id),
    current_hackathon_round INT DEFAULT 1,
    total_budget_inr NUMERIC(12, 2) NOT NULL,
    tranche_1_disbursed BOOLEAN DEFAULT FALSE,
    tranche_2_disbursed BOOLEAN DEFAULT FALSE,
    tranche_3_disbursed BOOLEAN DEFAULT FALSE,
    nabl_cert_url TEXT,
    pesa_noc_url TEXT,
    field_deployment_date TIMESTAMP WITH TIME ZONE,
    maturation_ends_at TIMESTAMP WITH TIME ZONE,
    resolution_status VARCHAR(35) DEFAULT 'IN_PROGRESS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Feedback & Quorum Table
CREATE TABLE IF NOT EXISTS public.feedback_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    citizen_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    voter_location GEOMETRY(Point, 4326) NOT NULL,
    is_core_functional_pass BOOLEAN NOT NULL,
    complaint_type VARCHAR(30) NOT NULL,
    raw_voice_url TEXT,
    transcribed_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_spatial ON public.feedback_ledger USING GIST(voter_location);

-- 6. R&D Failure Repository Table
CREATE TABLE IF NOT EXISTS public.rnd_failure_repository (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    failure_classification VARCHAR(25) NOT NULL,
    root_cause_analysis TEXT NOT NULL,
    attempted_solution_summary TEXT NOT NULL,
    lessons_learned TEXT NOT NULL,
    escalated_to_national_hackathon BOOLEAN DEFAULT FALSE,
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
