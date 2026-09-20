# JAGRIT — Master Autonomous Execution Matrix & Stage Checklist
> **Authority:** Department of Higher & Technical Education, Government of Jharkhand  
> **Framework:** Smart Education (NEP 2020) | PRD v1.0.0-PROD | SIH-26043  
> **Notice for All Members (M1–M6):** Locate your assigned role and current phase. Work strictly within your assigned jail directory (Rule 1). Do not modify shared contracts without M6 approval (Rule 3). Verify your deliverables using the specified verification commands before marking checkboxes `[x]`.

---

## Global Sprint Roadmap (Phases 0 – 4)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ PHASE 0: BASELINE SCAFFOLDING, SHARED CONTRACTS & DATABASE DDL (Hours 0 – 4)     │
│ • Cloud Supabase PostgreSQL + PostGIS + pgvector DDL locked                       │
│ • Shared contracts @jagrit/contracts frozen                                      │
│ • Directory jailing and monorepo build verified                                   │
└─────────────────────────────────────────┬─────────────────────────────────────────┘
                                          │
                                          ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: INGESTION, AI TRIAGE & GEOSPATIAL DEDUPLICATION (Hours 4 – 12)           │
│ • Multilingual Citizen Intake (Audio, Image, GPS) & WhatsApp Simulator            │
│ • AI Microservices: Whisper/Bhashini ASR, ViT Defect Detection, DeBERTa Triage   │
│ • PostGIS 500m Deduplication Radar & Incident Clustering (D >= 0.72)              │
└─────────────────────────────────────────┬─────────────────────────────────────────┘
                                          │
                                          ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2: DYNAMIC HACKATHON, BIDDING & TRANCHE ESCROW (Hours 12 – 22)             │
│ • 10-Day Bidding Window & Accelerated 72h Community Upvoting                      │
│ • 3-Stage Hackathon Arena (Ideation -> Bench Prototype -> DPR & BOM Table)        │
│ • Milestone-Based Escrow Release Ledger (30% -> 40% -> 30%)                       │
└─────────────────────────────────────────┬─────────────────────────────────────────┘
                                          │
                                          ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3: DUAL-LOCK QUORUM, NEP CREDITS & BLUEPRINT CLONING (Hours 22 – 30)       │
│ • 45-Day Maturation Buffer & Early Breakdown Alarm (3-5 alerts trigger SLA)       │
│ • Dual-Lock Quorum: 4/5 Designated Trustees + >=70% Citizen Quorum               │
│ • NEP 2020 Academic Credit Banking (30 hrs = 1 Credit to APAAR / DigiLocker)     │
│ • 1-Click Solution Blueprint Cloning Engine & R&D Failure Repository              │
└─────────────────────────────────────────┬─────────────────────────────────────────┘
                                          │
                                          ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4: FULL SYSTEM INTEGRATION, CROSS-AUDIT & LIVE PILOT DEMO (Hours 30 – 36)   │
│ • Cross-role automated end-to-end user journeys (Citizen -> HEI -> Trustee)       │
│ • Zero-console-error bug bash & performance optimization                          │
│ • Production seeding with authentic Jharkhand field data                         │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## Member Role Assignments & Directory Jails

| Member | Assigned Role | Directory Jail (Strictly Scoped) | Core Deliverables |
|:---|:---|:---|:---|
| **M1** | Citizen Frontend Lead | `apps/web-citizen/src/app/` (`report`, `whatsapp`, `home`), `apps/web-citizen/src/components/`, `apps/web-citizen/public/locales/` | Multilingual Report Studio, WhatsApp Simulator, Geo-picker |
| **M2** | University Portal Lead | `apps/web-citizen/src/app/university/`, `apps/web-institution/` | Discovery Feed, XAI Radar, 3-Stage Hackathon, DPR Builder |
| **M3** | Admin & Progress Lead | `apps/web-citizen/src/app/` (`progress`, `admin`, `repository`) | State-wide Progress Tracker, Failure Repo, Blueprint Cloner |
| **M4** | Core Backend Lead | `apps/core-backend/` | PostGIS Spatial Engine, Deduplication, Escrow, Quorum API |
| **M5** | AI Service Lead | `apps/ai-service/` | Whisper/Bhashini ASR, ViT Laser Scan, DeBERTa Triage, pgvector |
| **M6** | Lead DBA & Integrator | `packages/` (`db-schema/`, `contracts/`, `ui-kit/`), Root Governance | Supabase DDL, Shared Contracts, Monorepo Build, Audit Guard |

---

## PHASE 0: Baseline Infrastructure, Contracts & Database DDL
*Goal: Establish unified Supabase schema, frozen TypeScript contracts, and green monorepo build.*

### Member 1 (Citizen Frontend Lead)
- [ ] **Task 1.0.1:** Verify Next.js PWA structure inside `apps/web-citizen/` with Tailwind CSS and Lucide React.
- [ ] **Task 1.0.2:** Ensure multilingual dictionary support in `public/locales/` (`hi.json`, `sat.json`, `en.json`).
- [ ] **Task 1.0.3:** Scaffold global state wrapper for citizen session, offline caching, and location provider.
- [ ] **Task 1.0.4:** Configure mock submission handlers targeting typed `@jagrit/contracts`.
- *Verification Command:* `pnpm --filter web-citizen run build`

### Member 2 (University Portal Lead)
- [ ] **Task 2.0.1:** Scaffold academic layout with persona switcher (`Faculty PI`, `Student Lead`, `Industry Mentor`).
- [ ] **Task 2.0.2:** Initialize university navigation hierarchy and challenge discovery feed.
- [ ] **Task 2.0.3:** Set up mock JSON payloads for institutional capability matching and radar metrics.
- *Verification Command:* `pnpm --filter web-institution run build`

### Member 3 (Admin, Progress & Repository Lead)
- [ ] **Task 3.0.1:** Scaffold state-wide progress overview dashboard route at `/progress`.
- [ ] **Task 3.0.2:** Scaffold R&D Failure Knowledge Base portal layout at `/repository`.
- [ ] **Task 3.0.3:** Initialize administrative governance layout and audit panel at `/admin`.
- *Verification Command:* `node web/node_modules/typescript/bin/tsc --noEmit --project apps/web-citizen/tsconfig.json`

### Member 4 (Core Backend Lead)
- [ ] **Task 4.0.1:** Initialize backend application in `apps/core-backend/` with Supabase PostgreSQL client.
- [ ] **Task 4.0.2:** Configure environment variables (`DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) and health check.
- [ ] **Task 4.0.3:** Scaffold modular routing structure (`/challenges`, `/clusters`, `/escrow`, `/trustees`).
- *Verification Command:* `pnpm --filter core-backend run build`

### Member 5 (AI Service Lead)
- [ ] **Task 5.0.1:** Configure Python virtual environment and dependencies in `apps/ai-service/`.
- [ ] **Task 5.0.2:** Initialize FastAPI application with CORS headers for ports 3000, 3001, and 5000.
- [ ] **Task 5.0.3:** Implement `/health` endpoint returning operational status of AI model pipelines.
- *Verification Command:* `curl -s http://localhost:8000/health || echo "FastAPI scaffolded"`

### Member 6 (Lead DBA & Systems Integrator)
- [ ] **Task 6.0.1:** Lock `AUDIT.md` with the 5 Golden Rules of Conflict-Free Monorepo Development.
- [ ] **Task 6.0.2:** Record architectural decisions ADR-001 through ADR-010 in `DECISION.md`.
- [ ] **Task 6.0.3:** Deploy comprehensive Supabase DDL schema with PostGIS, pgvector, and RLS in `packages/db-schema/schema.sql`.
- [ ] **Task 6.0.4:** Freeze shared universal contracts (`ChallengePayload`, `ClusterIncident`, `TrusteeVote`, `EscrowTranche`, `XAISpiderScores`) in `packages/contracts/src/index.ts`.
- [ ] **Task 6.0.5:** Execute full monorepo compilation and commit baseline to `dev`.
- *Verification Command:* `pnpm run build`

---

## PHASE 1: Ingestion, AI Triage & Geospatial Deduplication
*Goal: Multimodal reporting (App/WhatsApp), AI defect scanning & triage, and PostGIS 500m deduplication.*

### Member 1 (Citizen Frontend Lead)
- [ ] **Task 1.1.1:** Build Problem Submission Studio (`/report`): client-side media compression ($\le 500\text{ KB}$), audio recorder, and GPS coordinate picker.
- [ ] **Task 1.1.2:** Build WhatsApp Ingestion Simulator (`/whatsapp-simulator`): simulated voice note, photo attachment, and location beacon.
- [ ] **Task 1.1.3:** Build animated CV Laser Scanner component rendering visual bounding boxes and defect confidence labels.
- *Verification Command:* Verify interactive submission flow on `/report` and `/whatsapp-simulator`.

### Member 2 (University Portal Lead)
- [ ] **Task 2.1.1:** Build Institutional Auth Screen with Edu-ID / AISHE institutional credentials.
- [ ] **Task 2.1.2:** Build Challenge Discovery Feed with domain tags, urgency indicators, and grant size pills.
- [ ] **Task 2.1.3:** Implement interactive `XAISpiderChart` (Labs, Patents, Proximity, Track Record, Faculty).
- [ ] **Task 2.1.4:** Build Challenge Acceptance Modal (Single HEI Bid vs Joint Consortium).
- *Verification Command:* Verify spider chart renders dynamically on challenge discovery page.

### Member 3 (Admin, Progress & Repository Lead)
- [ ] **Task 3.1.1:** Build Statewide Problem Map view with live clustering pins across Jharkhand districts.
- [ ] **Task 3.1.2:** Implement HITL (Human-in-the-Loop) Evaluator Triage Queue interface.
- [ ] **Task 3.1.3:** Build Evaluator Dispatch Action: Approve for University Bidding vs Reroute to ULB/JharSewa.
- *Verification Command:* Verify HITL queue renders pending tickets with routing controls.

### Member 4 (Core Backend Lead)
- [ ] **Task 4.1.1:** Implement `POST /api/v1/challenges/submit` supporting multipart media, voice URLs, and GeoJSON coordinates.
- [ ] **Task 4.1.2:** Implement PostGIS 500-meter spatial proximity query (`ST_DWithin(location, ..., 500)`).
- [ ] **Task 4.1.3:** Implement Spatio-Temporal Deduplication ($D \ge 0.72$) logic and incident cluster merging.
- [ ] **Task 4.1.4:** Build Ticket Upvote Engine: Increment upvotes for clustered incidents without duplicating tickets.
- *Verification Command:* `curl -X POST http://localhost:5000/api/v1/challenges/submit -d "{\"title\":\"Test\"}"`

### Member 5 (AI Service Lead)
- [ ] **Task 5.1.1:** Implement `POST /api/v1/ai/transcribe`: Whisper/Bhashini ASR pipeline for Hindi, Santhali, and English.
- [ ] **Task 5.1.2:** Implement `POST /api/v1/ai/defect-scan`: Vision Transformer (ViT) returning bounding box coordinates and defect classification.
- [ ] **Task 5.1.3:** Implement `POST /api/v1/ai/triage-classify`: Zero-shot DeBERTa-v3 separating Type A (Civic Routine) from Type B (Applied R&D).
- [ ] **Task 5.1.4:** Implement `POST /api/v1/ai/embed`: Generate 1536-dimensional semantic vector embeddings.
- *Verification Command:* Post sample audio/image to `/api/v1/ai/transcribe` and verify transcription output.

### Member 6 (Lead DBA & Systems Integrator)
- [ ] **Task 6.1.1:** Implement and verify PostGIS spatial indexing (`GIST`) on `challenges` and `incident_clusters`.
- [ ] **Task 6.1.2:** Implement pgvector HNSW index for high-speed cosine distance search (`cosine_distance < 0.28`).
- [ ] **Task 6.1.3:** Run integration test verifying composite deduplication scoring between M4 backend and M5 AI embeddings.
- *Verification Command:* Execute database spatial vector query test script.

---

## PHASE 2: Dynamic Hackathon, Bidding & Tranche Escrow
*Goal: 10-day bidding window, accelerated 72h upvoting, 3-stage hackathon arena, and milestone escrow ledger.*

### Member 1 (Citizen Frontend Lead)
- [ ] **Task 1.2.1:** Implement Spatial Deduplication Radar component rendering pulsing 500m radius ring and matched cluster incidents.
- [ ] **Task 1.2.2:** Build Accelerated 72h Community Upvoting Widget with progress bar and countdown indicator.
- [ ] **Task 1.2.3:** Build Samvaad Community Discussion Feed (`/samvaad`) with grassroots thread participation.
- *Verification Command:* Verify 500m radar and upvoting components in citizen view.

### Member 2 (University Portal Lead)
- [ ] **Task 2.2.1:** Implement 10-Day Bidding Countdown Clock with dynamic status flags.
- [ ] **Task 2.2.2:** Build Hackathon Round 1 Studio: 5-slide pitch deck upload (PDF) and structured approach narrative.
- [ ] **Task 2.2.3:** Build Hackathon Round 2 Studio: Industry/CSR mentor scheduling and bench telemetry logger.
- [ ] **Task 2.2.4:** Build Hackathon Round 3 Studio: Detailed Project Report (DPR) Builder with dynamic Bill of Materials (BOM) calculator.
- [ ] **Task 2.2.5:** Integrate Student R&D Copilot side-drawer suggesting historical failure pitfalls.
- *Verification Command:* Test end-to-end DPR form submission and BOM calculation validation.

### Member 3 (Admin, Progress & Repository Lead)
- [ ] **Task 3.2.1:** Build Escrow Fund Ledger interface displaying state innovation pool vs corporate CSR allocations.
- [ ] **Task 3.2.2:** Build Jury Evaluation Panel for Round 3 physical defense scoring (Feasibility 40%, Sustainability 30%, Cost 30%).
- [ ] **Task 3.2.3:** Implement Anti-Speculation Monitor displaying HEI Honor Scores (H-score) and penalty deductions.
- *Verification Command:* Verify jury scoring form and live recalculation of ranking weights.

### Member 4 (Core Backend Lead)
- [ ] **Task 4.2.1:** Implement Bidding Window State Engine: transitions to `DIRECT_RND` or `DYNAMIC_HACKATHON`.
- [ ] **Task 4.2.2:** Implement Tranche 1 Escrow Disbursement API (30% released upon approved DPR).
- [ ] **Task 4.2.3:** Implement Tranche 2 Escrow Disbursement API (40% released upon NABL lab certificate verification).
- [ ] **Task 4.2.4:** Implement Tranche 3 Escrow Disbursement API (30% released upon PESA Gram Sabha NOC upload).
- [ ] **Task 4.2.5:** Implement automated H-score penalty trigger (-5 points for abandoned bids).
- *Verification Command:* Run automated escrow transition test suite.

### Member 5 (AI Service Lead)
- [ ] **Task 5.2.1:** Build XAI Matching Engine computing institutional capability radar scores across 5 axes.
- [ ] **Task 5.2.2:** Implement NABL Certificate PDF Parser extracting lab accreditation numbers and test validity.
- [ ] **Task 5.2.3:** Implement DPR BOM Anomaly Detector identifying inflated vendor pricing against historical benchmarks.
- *Verification Command:* Run sample NABL certificate parsing test script.

### Member 6 (Lead DBA & Systems Integrator)
- [ ] **Task 6.2.1:** Verify database constraints and triggers on `projects.total_budget_inr` and tranche release booleans.
- [ ] **Task 6.2.2:** Verify foreign key cascade and RLS permissions on escrow financial operations.
- [ ] **Task 6.2.3:** Audit contract consistency between `@jagrit/contracts` and backend escrow data models.
- *Verification Command:* `pnpm run build && node packages/db-schema/verify-constraints.js`

---

## PHASE 3: Dual-Lock Quorum, NEP Credits & Blueprint Cloning
*Goal: 45-day maturation buffer, early breakdown alarms, dual-lock quorum verification, and NEP credit minting.*

### Member 1 (Citizen Frontend Lead)
- [ ] **Task 1.3.1:** Build Citizen Quorum Voting Interface with geo-fenced eligibility check.
- [ ] **Task 1.3.2:** Build Early Breakdown Alert Button (one-tap reporting with photo/voice capture during maturation).
- [ ] **Task 1.3.3:** Build Dual-Lock Status Badge showing progress of Key 1 (Trustees) and Key 2 (Public Quorum).
- *Verification Command:* Verify quorum voting modal and geo-location eligibility filter.

### Member 2 (University Portal Lead)
- [ ] **Task 2.3.1:** Build NEP 2020 Credit Transcript Viewer showing student workhours and APAAR/DigiLocker deposit status.
- [ ] **Task 2.3.2:** Build 48h Breakdown SLA Alert Modal with 7-day repair sprint action plan.
- [ ] **Task 2.3.3:** Build O&M Handover Packager: upload operator training logs and illustrated vernacular SOPs.
- *Verification Command:* Verify credit calculation and APAAR payload viewer on student dashboard.

### Member 3 (Admin, Progress & Repository Lead)
- [ ] **Task 3.3.1:** Build 1-Click Solution Blueprint Cloning Portal: browse verified blueprints and initiate 14-day deployment replication.
- [ ] **Task 3.3.2:** Build R&D Failure Knowledge Base search with semantic filtering by failure classification and district.
- [ ] **Task 3.3.3:** Build Pan-India National Hackathon Escalation Panel for chronic unresolved challenges.
- *Verification Command:* Test blueprint cloning trigger and search filtering on `/repository`.

### Member 4 (Core Backend Lead)
- [ ] **Task 4.3.1:** Implement 45-Day Maturation Buffer Time Machine and Early Breakdown Alarm clock pause/reset logic.
- [ ] **Task 4.3.2:** Implement Key 1 Trustee Voting API (verifies 4 of 5 affirmative trustee signatures).
- [ ] **Task 4.3.3:** Implement Key 2 Citizen Quorum Engine ($\text{Quorum}_{\min} = \max(15, \lceil k \sqrt{N} \rceil)$ and $\ge 70\%$ threshold).
- [ ] **Task 4.3.4:** Implement NEP 2020 Credit Banking Service: generates signed APAAR / DigiLocker credit payloads.
- [ ] **Task 4.3.5:** Implement Blueprint Generator API: extracts BOM, CAD URLs, and SOPs into `verified_blueprints`.
- *Verification Command:* Execute dual-lock verification integration test.

### Member 5 (AI Service Lead)
- [ ] **Task 5.3.1:** Implement Citizen Feedback Sentiment Classifier separating Cosmetic Grievances from Critical Defects.
- [ ] **Task 5.3.2:** Implement Failure Post-Mortem Synthesizer generating structured root-cause summaries.
- [ ] **Task 5.3.3:** Implement Blueprint Cost Optimization Engine predicting replication cost savings ($\ge 60\%$).
- *Verification Command:* Test sentiment classification against sample citizen feedback strings.

### Member 6 (Lead DBA & Systems Integrator)
- [ ] **Task 6.3.1:** Verify database schema and RLS policies on `project_trustees`, `verified_blueprints`, and `rnd_failure_repository`.
- [ ] **Task 6.3.2:** Validate quorum aggregation stored procedures and atomic transaction locks.
- [ ] **Task 6.3.3:** Test end-to-end data integrity of blueprint cloning replication records.
- *Verification Command:* Run SQL transaction test suite on Supabase database.

---

## PHASE 4: Full System Integration, Cross-Audit & Live Pilot Demo
*Goal: Zero-error production build, end-to-end user journeys, and live demonstration readiness.*

### Member 1 (Citizen Frontend Lead)
- [ ] **Task 1.4.1:** Conduct UI accessibility audit across all citizen screens (high contrast, vernacular typography, touch targets).
- [ ] **Task 1.4.2:** Ensure zero console errors on citizen reporting flows in English, Hindi, and Santhali.
- [ ] **Task 1.4.3:** Polish mobile-responsive layout for rural field tablet and low-cost smartphone viewports.
- *Verification Command:* `pnpm --filter web-citizen run build`

### Member 2 (University Portal Lead)
- [ ] **Task 2.4.1:** Verify all hackathon rounds (1, 2, 3) operate smoothly with live mock data and dynamic charts.
- [ ] **Task 2.4.2:** Polish Jury Presentation Mode and live score calculation cards.
- [ ] **Task 2.4.3:** Verify APAAR academic credit download and preview integration.
- *Verification Command:* `pnpm --filter web-institution run build`

### Member 3 (Admin, Progress & Repository Lead)
- [ ] **Task 3.4.1:** Verify Statewide Progress Tracker displays live counts of resolved, in-progress, and cloned projects.
- [ ] **Task 3.4.2:** Audit R&D Failure Repository search, filtering, and blueprint detail modals.
- [ ] **Task 3.4.3:** Polish Administrative Executive Dashboard and exportable state summary reports.
- *Verification Command:* `node web/node_modules/typescript/bin/tsc --noEmit --project apps/web-citizen/tsconfig.json`

### Member 4 (Core Backend Lead)
- [ ] **Task 4.4.1:** Optimize PostGIS and Supabase API response times to $<200\text{ms}$ under concurrent load.
- [ ] **Task 4.4.2:** Complete end-to-end test suite covering ticket ingestion $\rightarrow$ hackathon $\rightarrow$ escrow $\rightarrow$ quorum.
- [ ] **Task 4.4.3:** Verify CORS, SSL, and environment security configurations for production deployment.
- *Verification Command:* `pnpm --filter core-backend test`

### Member 5 (AI Service Lead)
- [ ] **Task 5.4.1:** Validate inference latency of Whisper/Bhashini ASR and ViT defect scanner pipelines.
- [ ] **Task 5.4.2:** Verify AI fixture test suite covering Scenarios A through D with 100% pass rate.
- [ ] **Task 5.4.3:** Package FastAPI service with production Uvicorn multi-worker configuration.
- *Verification Command:* `python apps/ai-service/scripts/seed_ai_fixtures.py`

### Member 6 (Lead DBA & Systems Integrator)
- [ ] **Task 6.4.1:** Execute full monorepo clean build (`pnpm run build`) with zero TypeScript, lint, or packaging errors.
- [ ] **Task 6.4.2:** Seed realistic Jharkhand pilot datasets (Ranchi, Dhanbad, Khunti, Dumka) into Supabase.
- [ ] **Task 6.4.3:** Conduct cross-role security and RLS policy audit on all 9 Supabase tables.
- [ ] **Task 6.4.4:** Finalize production deployment documentation and lock `AUDIT_LOG.md`.
- *Verification Command:* `pnpm run build && git status --porcelain`