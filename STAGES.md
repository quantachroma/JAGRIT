# JAGRIT — Autonomous Execution Stages & Implementation Matrix
> **Framework Mandates:** DHTE Jharkhand | Smart Education (NEP 2020) | PRD v1.0.0-PROD  
> **Instruction for Cline:** Read this file before initiating any work session. Locate your assigned Role and current Stage. Work **strictly** within your assigned directory. Do not alter `packages/contracts` without team consensus. Once a task is completed and verified with its verification command, check the box `[x]`.

---

## Global Sprint Architecture (4-Stage Phased Rollout)
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 0: BASELINE INFRASTRUCTURE, CONTRACTS & DATA MOCKS (Hours 0 – 4) │
│ • Docker PostGIS & pgvector up • Universal Type Contracts locked • Mock API routes operational │
└────────────────────────────────┬────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: INGESTION, AI TRIAGE & GEOSPATIAL DEDUPLICATION (Hours 4 – 12) │
│ • Multilingual Ingestion UI & WhatsApp Simulator • ASR/ViT microservice • HITL Evaluator Queue │
└────────────────────────────────┬────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: HEI BIDDING, DYNAMIC HACKATHON & TRANCHE ESCROW (Hours 12 – 22) │
│ • 10-Day Bidding Window • 3-Stage Hackathon Arena • Escrow 30/40/30 Ledger • XAI Spider Chart │
└────────────────────────────────┬────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 3: 45-DAY MATURATION, QUORUM & R&D FAILURE ENGINE (Hours 22 – 30) │
│ • Population-Weighted Quorum • 45-Day Time Machine • APAAR NEP Credits • Failure Repository │
└────────────────────────────────┬────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 4: END-TO-END INTEGRATION, CROSS-AUDIT & DEMO POLISH (Hours 30 – 36) │
│ • End-to-end user journeys • Zero-console-error bug bash • Seeding live Jharkhand demo data │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

---

## STAGE 0: Baseline Infrastructure, Contracts & Data Mocks
*Goal: Ensure the database, contracts, and development servers are running before writing business logic.*

### Role 1 (Citizen Experience Lead)
- [x] **Task 1.0.1:** Initialize Next.js PWA app inside `apps/web-citizen/` with Tailwind CSS and Lucide React.
- [x] **Task 1.0.2:** Configure `next-intl` localization dictionaries in `public/locales/` (`hi.json`, `sat.json`, `en.json`).
- [x] **Task 1.0.3:** Scaffold global state wrapper for user authentication and location context.
- [x] **Task 1.0.4:** Set up mock API handlers for submission endpoints (`/api/mock/submit`).
- *Cline Verification:* `cd apps/web-citizen && pnpm run dev` (Ensure HTTP 200 at `http://localhost:3000`).

### Role 2 (University & Hackathon Lead)
- [ ] **Task 2.0.1:** Initialize Next.js app inside `apps/web-institution/` with Tailwind CSS and Recharts.
- [ ] **Task 2.0.2:** Scaffold persistent Layout with role switcher (`Faculty PI`, `Student Lead`, `Industry Mentor`).
- [ ] **Task 2.0.3:** Set up mock JSON payloads for university capability match and challenge discovery feed.
- *Cline Verification:* `cd apps/web-institution && pnpm run dev` (Ensure HTTP 200 at `http://localhost:3001`).

### Role 3 (Core Backend & Escrow Lead)
- [ ] **Task 3.0.1:** Create free Supabase project, enable `postgis` and `vector` extensions via Supabase SQL Editor.
- [ ] **Task 3.0.2:** Paste and execute `packages/db-schema/schema.sql` in the Supabase SQL Editor to create all 5 tables and indexes.
- [ ] **Task 3.0.3:** Initialize NestJS / Express application in `apps/core-backend/` with connection string from `DATABASE_URL`.
- [ ] **Task 3.0.4:** Paste and execute `packages/db-schema/seed.sql` in the Supabase SQL Editor to hydrate test fixtures.
- *Cline Verification:* `cd apps/core-backend && pnpm run start:dev` (Verifies successful database connection log).

### Role 4 (AI/ML & Microservices Lead)
- [ ] **Task 4.0.1:** Set up Python virtual environment in `apps/ai-service/` and install `requirements.txt`.
- [ ] **Task 4.0.2:** Initialize FastAPI instance in `main.py` with CORS headers allowing localhost ports 3000, 3001, and 5000.
- [ ] **Task 4.0.3:** Implement `/health` and mock endpoints returning stubbed responses for ASR, Vision, and Triage.
- *Cline Verification:* `cd apps/ai-service && uvicorn main:app --port 8000 --reload` (Ensure HTTP 200 at `http://localhost:8000/health`).

---

## STAGE 1: Ingestion, AI Triage & Geospatial Deduplication
*Goal: Working multimodal intake via App and WhatsApp, auto-deduplication, and HITL verification.*

### Role 1 (Citizen Experience Lead)
- [x] **Task 1.1.1:** Build Screen 1 (Splash Screen) with Namaste animation and language selector pills.
- [x] **Task 1.1.2:** Build Screen 4 (Problem Submission Studio):
  - Client-side image compression ($\le 500\text{ KB}$).
  - Audio recording hook with live microphone visualization.
  - Interactive Leaflet/MapmyIndia GPS picker.
- [x] **Task 1.1.3:** Build the WhatsApp Ingestion Simulator (`/whatsapp-simulator`):
  - Simulated chat interface (audio upload, image upload, live location sharing).
- [x] **Task 1.1.4:** Build `cv-laser-scanner.tsx`: Animated canvas drawing bounding boxes with confidence labels.
- *Cline Verification:* Run `web-citizen` and perform a dummy submission with a recorded voice note and image.

### Role 2 (University & Hackathon Lead)
- [ ] **Task 2.1.1:** Build Screen 2 (Academic Auth) with institutional SSO / Edu-ID login interface.
- [ ] **Task 2.1.2:** Build University Discovery Feed (`apps/web-institution/src/app/dashboard/`):
  - List challenges with urgency badges (`⏱️ Days Left`) and domain tags.
- [ ] **Task 2.1.3:** Build `xai-spider-chart.tsx` using Recharts:
  - 5 axes: Labs, Patents, Proximity, Track Record, Faculty.
- [ ] **Task 2.1.4:** Build Challenge Acceptance Modal (Single Bid vs Joint Consortium selection).
- *Cline Verification:* Open `http://localhost:3001/dashboard` and verify the radar chart renders for Ticket #JAG-4102.

### Role 3 (Core Backend & Escrow Lead)
- [ ] **Task 3.1.1:** Implement `POST /api/v1/challenges/submit` to handle multipart uploads (media, voice, lat/lon).
- [ ] **Task 3.1.2:** Implement PostGIS 500m spatial buffer query:
  - `ST_DWithin` spatial radar query against existing records.
- [ ] **Task 3.1.3:** Implement Ticket Upvote Engine: Increment upvotes for duplicates and return ticket reference.
- [ ] **Task 3.1.4:** Build HITL Evaluator Controller (`/api/v1/evaluator`):
  - Triage queue pagination.
  - Approve as R&D (open bidding window) vs Reroute as Civic Routine (dispatch ULB webhook).
- *Cline Verification:* `curl -X POST http://localhost:5000/api/v1/challenges/submit -F "title=Test Water" -F "lat=23.34" -F "lon=85.30"`

### Role 4 (AI/ML & Microservices Lead)
- [ ] **Task 4.1.1:** Implement `POST /api/v1/ai/transcribe`:
  - Whisper/Bhashini pipeline processing incoming audio binary, returning transcribed text and detected language (`hi`/`sat`).
- [ ] **Task 4.1.2:** Implement `POST /api/v1/ai/defect-scan`:
  - Vision Transformer (ViT) returning bounding box coordinates `[ymin, xmin, ymax, xmax]` and defect label (e.g., `Iron Effluent: 94%`).
- [ ] **Task 4.1.3:** Implement `POST /api/v1/ai/triage-classify`:
  - Zero-shot DeBERTa-v3 separating Type A (Civic Routine) from Type B (Applied R&D).
- [ ] **Task 4.1.4:** Implement `POST /api/v1/ai/embed`:
  - Generates 1536-dim embeddings for challenge descriptions for PostGIS storage.
- *Cline Verification:* Send a test `.wav` file to `/api/v1/ai/transcribe` and verify transcription JSON output.

---

## STAGE 2: HEI Bidding, Dynamic Hackathon & Tranche Escrow
*Goal: 10-day bidding window, dynamic switching to 3-stage hackathon, and milestone tranche escrow.*

### Role 1 (Citizen Experience Lead)
- [ ] **Task 1.2.1:** Build `spatial-radar-map.tsx`:
  - Mapbox map with pulsing 500m radius circle and nearby matched tickets.
- [ ] **Task 1.2.2:** Build Screen 3 (Citizen Dashboard):
  - Metric counters (Resolved, In Progress, Escrow Disbursed).
  - Trending challenges list sorted by upvote count.
- [ ] **Task 1.2.3:** Build Screen 11 (Samvaad / Threads Community Feed):
  - Feed list, thread creation modal, tag filtering (`Agritech`, `Water`, `Livelihoods`).
- *Cline Verification:* Navigate to `/samvaad`, create a test thread, and verify optimistic UI update.

### Role 2 (University & Hackathon Lead)
- [ ] **Task 2.2.1:** Implement the 10-Day Bidding Countdown Timer (`countdown-timer.tsx`).
- [ ] **Task 2.2.2:** Build Dynamic Hackathon Workspace (`apps/web-institution/src/app/hackathon/[id]/`):
  - **Round 1:** Pitch deck (PDF) upload and approach narrative form.
  - **Round 2:** Mentor booking calendar, sprint action items, and prototype telemetry log.
  - **Round 3:** Structured DPR Builder with interactive Bill of Materials (BOM) table (`dpr-table.tsx`).
- [ ] **Task 2.2.3:** Build `student-rd-copilot.tsx`:
  - Slide-out drawer querying the R&D Failure Repository for historical pitfalls.
- *Cline Verification:* Fill out the Round 3 DPR form and verify the BOM calculations sum correctly.

### Role 3 (Core Backend & Escrow Lead)
- [ ] **Task 3.2.1:** Implement Bidding Window State Engine:
  - Automated cron/trigger checking when deadline expires:
  - If bids == 1 $\rightarrow$ transition to `DIRECT_RND`.
  - If bids $\ge 2$ $\rightarrow$ transition to `DYNAMIC_HACKATHON`.
- [ ] **Task 3.2.2:** Implement Escrow Ledger Service (`/api/v1/escrow`):
  - Tranche 1 (30%) disbursement upon project initialization.
  - Tranche 2 (40%) locked pending NABL certificate file upload.
  - Tranche 3 (30%) locked pending PESA Gram Sabha NOC upload.
- [ ] **Task 3.2.3:** Implement SLA Breach Monitor:
  - Automated escalation flags on Day +7, +14, and +30.
- *Cline Verification:* Trigger escrow release via API and verify database boolean flag updates.

### Role 4 (AI/ML & Microservices Lead)
- [ ] **Task 4.2.1:** Implement Institutional Matching Engine (`POST /api/v1/ai/match-universities`):
  - Computes institutional compatibility scores using faculty metadata, patents, and campus distance.
- [ ] **Task 4.2.2:** Implement Semantic Search for R&D Copilot (`POST /api/v1/ai/copilot-query`):
  - Vector similarity search against past failed attempts to supply warnings to student proposals.
- *Cline Verification:* Post a natural language query to `/api/v1/ai/copilot-query` and verify matched past failure records.

---

## STAGE 3: 45-Day Maturation, Quorum & R&D Failure Engine
*Goal: Closed-loop resolution via 45-day maturation buffer, citizen quorum, APAAR credits, and failure indexing.*

### Role 1 (Citizen Experience Lead)
- [ ] **Task 1.3.1:** Build Screen 8.3 (45-Day Feedback Quorum & Time Machine Simulator):
  - Clock advance toggle (`Advance Clock to Day 46`).
  - Core Operational Check buttons: `✅ HAAN / YES` vs `❌ NAHI / NO`.
- [ ] **Task 1.3.2:** Build `quorum-gauge.tsx`:
  - Circular progress ring showing verified votes against calculated minimum quorum threshold.
- [ ] **Task 1.3.3:** Add feedback audio recording prompt for partially solved or failed issues.
- *Cline Verification:* Toggle the Time Machine to Day 46 and verify the verification voting card activates.

### Role 2 (University & Hackathon Lead)
- [ ] **Task 2.3.1:** Build NEP 2020 Academic Credit Generator (`/credits`):
  - Convert verified project workhours (30 hrs = 1 Credit).
  - Display exportable APAAR / Academic Bank of Credits (ABC) compliant JSON payload.
- [ ] **Task 2.3.2:** Build Screen 10 (R&D Failure Knowledge Base UI):
  - Categorized directory: Minor Failures vs Major Pan-India Challenges.
  - Failure root cause card with "What Was Attempted" and "Why It Failed" callouts.
- [ ] **Task 2.3.3:** Implement Tripartite IPR Agreement acceptance modal (Student 60%, HEI 20%, CSR ROFR).
- *Cline Verification:* Generate an APAAR credit record and verify workhours divide into exact whole credits.

### Role 3 (Core Backend & Escrow Lead)
- [ ] **Task 3.3.1:** Implement AI Population-Weighted Quorum calculation:
  $$\text{Quorum}_{\min} = \max(15, \lceil k \cdot \sqrt{N} \rceil)$$
- [ ] **Task 3.3.2:** Implement Resolution State Machine:
  - **Solved (100%):** Mark ticket `RESOLVED`, trigger APAAR credit deposit event.
  - **Partially Solved:** Auto-generate 45-day iterative repair ticket routed to the same university team.
  - **Failed:** Route to `rnd_failure_repository` table and classify failure severity.
- [ ] **Task 3.3.3:** Implement PESA Act 1996 Compliance validation: require Gram Sabha NOC document before Tranche 3 settlement.
- *Cline Verification:* Execute the quorum evaluation API with test votes and observe state transition.

### Role 4 (AI/ML & Microservices Lead)
- [ ] **Task 4.3.1:** Implement Quorum NLP Sentiment Parser (`POST /api/v1/ai/parse-feedback`):
  - Classify vernacular feedback into *Critical System Defects* vs *Cosmetic Grievances*.
- [ ] **Task 4.3.2:** Implement Post-Mortem Root Cause Synthesizer (`POST /api/v1/ai/generate-postmortem`):
  - Synthesize DPR, citizen feedback, and evaluator notes into a concise failure summary.
- *Cline Verification:* Send test citizen complaint text to `/api/v1/ai/parse-feedback` and verify JSON classification.

---

## STAGE 4: End-to-End Integration, Cross-Audit & Demo Polish
*Goal: Flawless system demo, seed data hydration, zero console warnings, and presentation readiness.*

### Joint Cross-Role Checklist
- [ ] **Task 4.4.1 (All Roles):** Run complete integration sweep:
  1. Citizen submits issue in Santhali via WhatsApp Simulator.
  2. AI transcribes, runs ViT laser scan, and flags 500m deduplication.
  3. HITL Evaluator approves problem for university bidding.
  4. University views Explainable AI spider chart and bids on challenge.
  5. Second university bids $\rightarrow$ Dynamic Hackathon opens.
  6. Finalist DPR submitted and Escrow Tranche 1 released.
  7. Time Machine advances to Day 46.
  8. Citizen quorum votes "Solved" $\rightarrow$ NEP 2020 APAAR credits awarded.
- [ ] **Task 4.4.2 (Role 3 & Role 4):** Seed database with realistic Jharkhand test fixtures (Palamu groundwater fluorosis, Khunti lac storage, Chaibasa solar pump).
- [ ] **Task 4.4.3 (Role 1 & Role 2):** Fix responsive UI layout issues on mobile and desktop viewports.
- [ ] **Task 4.4.4 (Lead):** Execute monorepo production build: `pnpm run build`.

---

## Cline Execution Rules & Safety Safeguards
1. **Directory Sandbox:** Cline sessions must only edit files within the directory assigned to that role.
2. **Commit Atomicity:** Commit after each task checkbox with message format: `feat(<role>): complete task X.X.X - <summary>`.
3. **Never modify package-lock / pnpm-lock directly.** Run `pnpm --filter <workspace> add <package>`.
4. **All endpoints must validate against `packages/contracts` types.**