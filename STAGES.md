# JAGRIT — Master Engineering Task Checklist (v14.1.0-PROD)

> **Managed by M6 on the `dev` branch.** M1-M5 report finished tasks in their **PR description** (template in `AUDIT.md`, Rule 6). M6 ticks the box on merge.
> **Rules:** `AUDIT.md` | **Decisions:** `DECISION.md` (ADR-001 to ADR-021) | **Values:** PRD v14.1 Appendix A
> **Legend:** `[ ]` not started | `[~]` stub or mock merged (contract works, real logic pending) | `[x]` done and verified with the command shown.
> **Task IDs:** `P<phase>-M<member>-<n>` (for example `P1-M4-7` = Sprint Phase 1, member 4, task 7). *Sprint Phase* means the 24-hour schedule below, not Bidding Phase 1 or 2.
> **Note:** the `[x]` and `[~]` marks on M5's tasks come from the titles of merged PRs #1 and #4. M5 should confirm them in the next PR.

---

## Sprint Clock (24 hours) and Phase Gates

| Phase | Hours | Goal | Gate (must be true before the next phase) |
|:---|:---|:---|:---|
| **P0** | 0-2 | Database and contracts lockdown | `pnpm run build` passes; contracts frozen; leaked keys rotated; health routes return 200 |
| **P1** | 2-8 | Independent module build (each member works against contracts and mocks) | Each member's unit tests or screens pass; two reports within 100 m merge in the M4 test |
| **P2** | 8-14 | Engine wiring and database fixtures | M4 and M5 talk to Supabase and to each other; the four fixtures are seeded |
| **P3** | 14-20 | Full system un-mocking | `/report` creates a real ticket; all three quorum outcomes (14A/14B/14C) pass |
| **P4** | 20-24 | Production build gate and demo | Zero TypeScript and hydration errors; end-to-end demo journey works |

**Members:** M1 Citizen Web | M2 University Portal | M3 Govt, CSR, Progress & Repository | M4 Core Backend & Escrow | M5 AI/ML & WhatsApp Webhook | M6 DBA, Integrator & Demo.

---

## P0: Baseline & Contracts Lockdown (Hours 0-2)

### M6
- [ ] **P0-M6-1** Deploy Supabase DDL in `packages/db-schema/schema.sql`: PostGIS, `vector(1536)`, RLS, enums for every state machine. Tables cover at least: users, institutions (with `h_score`), challenges, incident_clusters, upvotes, bids, hackathon_rounds, seed_allowances, projects, tranches, project_trustees, votes, breakdown_alarms, h_score_events, credits, verified_blueprints, rnd_failure_repository, lab_bookings, csr_pledges, notifications.
- [ ] **P0-M6-2** Create Storage buckets `challenge-media`, `dpr-docs`, `governance-certs`.
- [ ] **P0-M6-3** Freeze `packages/contracts` v1.1: `ChallengePayload`, `ClusterIncident`, `PriorityScore`, `Bid`, `XAISpiderScores` (6 axes), `EscrowTranche`, `TrusteeVote` (5 trustee roles), `BreakdownAlarm`, `CreditPayload`, `Blueprint`. Add `rules.ts` with the canonical constants from `DECISION.md`.
- [ ] **P0-M6-4** **Security:** rotate every credential that was ever in `.env.example` (Supabase DB password, anon and service-role keys, JWT secret, Google AI key). Replace `.env.example` with placeholders only.
- [ ] **P0-M6-5** Protect `dev`, add `CODEOWNERS` and the PR template, turn on secret scanning (`AUDIT.md`, section 5). Remove `apps/web-institution` if it exists.
- [ ] **P0-M6-6** Run the root build and commit the baseline to `dev`.
- *Verify:* `pnpm run build`

### M1
- [ ] **P0-M1-1** Pull `dev`; confirm `apps/web-citizen` builds with Tailwind and Lucide.
- [ ] **P0-M1-2** Add locale files `public/locales/{en,hi,sat}.json` and a language switcher.
- [ ] **P0-M1-3** Add providers for citizen session, offline queue and location.
- *Verify:* `pnpm --filter web-citizen run build`

### M2
- [ ] **P0-M2-1** Scaffold `src/app/university/` layout with a persona switcher (Faculty PI, Student Lead, Industry Mentor) and an exported `UniversityDashboard`.
- [ ] **P0-M2-2** Add mock JSON for the bidding feed and the 6-axis radar, typed from contracts.
- *Verify:* `pnpm --filter web-citizen run build`

### M3
- [ ] **P0-M3-1** Scaffold routes `/progress`, `/repository`, `/admin` (Evaluator), `/industry` (CSR), `/samvaad`.
- [ ] **P0-M3-2** Export `EvaluatorDashboard` and `IndustryDashboard`; add mock data for the tranche ledger, CSR pool and 24-district table.
- *Verify:* `pnpm --filter web-citizen exec tsc --noEmit`

### M4
- [ ] **P0-M4-1** Initialise the NestJS app in `apps/core-backend/` (port 5000) with the Supabase client, env validation and a standard error format.
- [ ] **P0-M4-2** Add `/health`, CORS (localhost 3000 and 5000) and module folders: `challenges`, `evaluator`, `bids`, `hackathon`, `escrow`, `projects`, `credits`, `blueprints`.
- [ ] **P0-M4-3** Stub every planned route with typed mock data so M1-M3 can integrate early.
- *Verify:* `pnpm --filter core-backend run build` and `curl -s http://localhost:5000/health`

### M5
- [x] **P0-M5-1** Python venv, `requirements.txt`, FastAPI app with CORS and modular routers.
- [x] **P0-M5-2** `/health` returning a `mock_mode` flag.
- [ ] **P0-M5-3** Move **all** AI routes under `/api/v1/ai/*` (`embed` and `copilot-query` currently have no prefix); keep old paths as aliases only. Embedding dimension must be 1536.
- [ ] **P0-M5-4** Add `apps/ai-service/core/rules.py` mirroring the constants in `DECISION.md`.
- *Verify:* `curl -s http://localhost:8000/health` and `curl -s -X POST http://localhost:8000/api/v1/ai/embed -H "Content-Type: application/json" -d '{"text":"test"}'`

**P0 gate:** build green, contracts frozen, keys rotated.

---

## P1: Independent Module Build (Hours 2-8)

### M1 (Citizen)
- [ ] **P1-M1-1** Namaste typographic splash reveal and a clean navbar with a top-right WhatsApp button.
- [ ] **P1-M1-2** Homepage editorial hero carousel and 3D card flips.
- [ ] **P1-M1-3** `/report` studio: photo/video capture, audio recorder with live waveform, Leaflet GPS picker, client-side compression to ≤ 500 KB WebP, offline queue, laser-scan bounding-box animation.
- [ ] **P1-M1-4** `/whatsapp-simulator`: voice note, photo, location beacon, instant ticket and dedup confirmation card.
- [ ] **P1-M1-5** `CitizenDashboard`: action bar, 5-node grievance stepper, Hot Challenges feed (distance, thumbnail, category, +1 upvote), pulsing 500 m radar map.
- *Verify:* walk the flow on `/report` and `/whatsapp-simulator`; `pnpm --filter web-citizen run build`

### M2 (University)
- [ ] **P1-M2-1** Institutional header: verified lab badges, active grants total, H-Score.
- [ ] **P1-M2-2** Bidding feed: title, domain, match score, step-based countdown (3/5/7/10 days), Solo advantage badge, `Accept Solo Challenge` vs `Propose Joint Consortium`.
- [ ] **P1-M2-3** XAI **6-axis** spider chart (Domain Expertise 25, Faculty Availability 20, NABL Lab 20, Proximity 15, Campus Capacity 10, Track Record 10).
- [ ] **P1-M2-4** 3-stage hackathon workspace: Round 1 (pitch + BOM, ₹0), Round 2 (telemetry, video, mentor notes, ₹20,000 seed allowance), Round 3 (DPR builder with BOM table: Part, Source, Unit Cost, Qty, Total, Spares Escrow of 12 or 24 months).
- [ ] **P1-M2-5** NEP 2020 credit widget (30 h = 1 credit, APAAR sync status) and the Lab Equipment Sharing tab (SEM, XRD, Gas Chromatography).
- *Verify:* spider chart shows 6 axes; BOM totals compute; `pnpm --filter web-citizen run build`

### M3 (Govt, CSR, Progress & Repository)
- [ ] **P1-M3-1** `/progress`: public 6-step lifecycle explainer, 4 macro counters, active pipeline cards, 24-district table.
- [ ] **P1-M3-2** 1-Click Solution Blueprint Cloning modal on resolved projects.
- [ ] **P1-M3-3** `/industry`: CSR pledge slider (₹50,000 to ₹10 Lakhs, 1:1 match) with **JAGRIT CSR Contribution Certificate** button (not a tax receipt), mentorship hub, ROFR catalog.
- [ ] **P1-M3-4** `EvaluatorDashboard`: AI Triage Approval Queue (hides high-confidence Type A), Milestone Escrow Gatekeeper (Tranche 2 and 3 `Authorize`), State Mandate console.
- [ ] **P1-M3-5** `/repository`: failure cards with problem, attempt, root cause, anti-repetition directives.
- *Verify:* queue renders pending tickets with both action buttons; `pnpm --filter web-citizen exec tsc --noEmit`

### M4 (Core Backend & Escrow): pure logic with unit tests, using mocks for the database and the AI service
- [ ] **P1-M4-1** `POST /api/v1/challenges/submit` (multipart: media, voice, lat/lon, source) with DTO validation, HMAC-SHA-256 phone hashing and 50 m coordinate blurring.
- [ ] **P1-M4-2** Priority score service (ADR-006): preliminary (upvotes = 0) and final MPS, S-value rules table in `rules.ts`.
- [ ] **P1-M4-3** Upvote window scheduler (0/12/24/48/72 h, auto-close at 25 votes in 24 h) and vote rules (1 per hashed phone, 30 km geofence).
- [ ] **P1-M4-4** Dedup pipeline (ADR-004): database gate, call M5 `dedup-score`, merge (+1 upvote) or create a new ticket; recurring-breakdown rule for Δt > 45 days.
- [ ] **P1-M4-5** Triage routing and `/api/v1/evaluator` endpoints: high-confidence Type A to the ULB, Type B and low confidence to the queue, approve/reroute, grant ceiling.
- [ ] **P1-M4-6** Bidding state engine (window by final MPS; `DIRECT_RND` / `DYNAMIC_HACKATHON` / escalation) and the hackathon round state machine with tier durations, exam buffer and the ₹20,000 seed-allowance ledger.
- [ ] **P1-M4-7** Escrow state machine (30/40/30): T1 on kickoff, T2 needs NABL certificate plus Evaluator authorization, T3 needs Gram Sabha NOC (PESA NOC in Scheduled Areas) plus O&M handover plus spares kit; idempotent, audit-logged; SLA monitor (+7/+14/+30 days) and drawdown freeze.
- [ ] **P1-M4-8** H-score penalty daemon (-5 per ignored Phase 1 invite, invited and match > 80%, floor 0) and the escalation daemon (Stages 1-4, +25% with scope expansion).
- *Verify:* `pnpm --filter core-backend test` covers: T2 refused without certificate, T3 refused without NOC, bid outcomes for 0, 1 and 2 bids, penalty floor, window tables.

### M5 (AI/ML & WhatsApp)
- [~] **P1-M5-1** `POST /api/v1/ai/transcribe`: Whisper-large-v3/Bhashini for Hindi, Santhali, English. Real inference needed.
- [~] **P1-M5-2** `POST /api/v1/ai/defect-scan`: ViT-H/14, 40 classes, bounding boxes. Real inference needed.
- [~] **P1-M5-3** `POST /api/v1/ai/triage-classify`: DeBERTa-v3, 10 domains, Type A/B, confidence, defect class, hazard flags.
- [~] **P1-M5-4** `POST /api/v1/ai/embed`: `text-embedding-3-large`, 1536 dimensions. Similar text must give similar vectors.
- [ ] **P1-M5-5** `POST /api/v1/ai/dedup-score`: computes D for a new report against candidates (ADR-004).
- [ ] **P1-M5-6** `POST /api/v1/ai/match-universities`: Score(U, P) with 6 axes and the XAI breakdown (M4 sends pre-filtered institutions).
- [ ] **P1-M5-7** Live `POST /api/v1/webhooks/whatsapp`: return 200 within 250 ms, fetch media from the Meta Graph API, transcribe, reply "Aawaz darj ho gayi hai!", read the location pin, then call M4's submit endpoint.
- [ ] **P1-M5-8** `POST /api/v1/ai/wbs-timeline`: tier, round durations, exam buffer, scope-expansion logic.
- *Verify:* sample audio and image return output; two similar complaint texts give cosine ≥ 0.85; `curl` each endpoint.

### M6
- [ ] **P1-M6-1** GIST spatial index on `challenges` and `incident_clusters`; pgvector HNSW index (gate query: cosine distance ≤ 0.15).
- [ ] **P1-M6-2** Constraints and triggers: tranche amounts (30/40/30 of the budget), release flags, hashed-phone vote uniqueness, `h_score` bounds (0-100).
- [ ] **P1-M6-3** Write `packages/db-schema/verify-constraints.js`.
- *Verify:* `node packages/db-schema/verify-constraints.js` and `pnpm run build`

**P1 gate:** each member's screens or tests pass on mocks.

---

## P2: Engine Wiring & Database Fixtures (Hours 8-14)

### M4 and M5: connect to the database and to each other
- [ ] **P2-M4-1** Replace database mocks with real Supabase queries (PostGIS gate, pgvector gate, upvotes, bids, tranches).
- [ ] **P2-M4-2** Call the real M5 endpoints (`triage-classify`, `embed`, `dedup-score`, `match-universities`, `wbs-timeline`) with timeouts and fallbacks.
- [ ] **P2-M4-3** Institution loading with the 4 hard gates, invitations to Score ≥ 70%.
- [ ] **P2-M4-4** Maturation clock, Breakdown Alarm (≥ 3 verified citizens in 24 h freezes the clock; 48 h inspection, 7-day repair, reset to Day 1; alerts to team, Jal Sahiya, BDO) and the `time-machine` endpoint.
- [ ] **P2-M4-5** Dual-lock quorum: Key 1 needs ≥ 4 of 5 trustees (Jal Sahiya public-only); Key 2 needs `max(15, ceil(1.45·√N))` votes and ≥ 70% YES; outcomes 14A/14B/14C (exactly one key fails = 14B).
- [ ] **P2-M4-6** Credit banking (30 h = 1 credit, signed APAAR/DigiLocker payload, 10 UGC-CAS points, ₹10 Lakh seed-grant flag), blueprint generator, CSR pledges with 1:1 match and certificate.
- *Verify:* `pnpm --filter core-backend test` (quorum: both keys = 14A; trustees fail + public pass = 14B; public < 40% = 14C)

- [ ] **P2-M5-1** Read from Supabase/pgvector (candidate embeddings, institution profiles).
- [ ] **P2-M5-2** `POST /api/v1/ai/parse-nabl`: lab accreditation number and validity from a certificate PDF.
- [ ] **P2-M5-3** `POST /api/v1/ai/bom-anomaly`: flag inflated vendor prices.
- [~] **P2-M5-4** `POST /api/v1/ai/parse-feedback` and `generate-postmortem` (feedback parser is keyword-based today; feeds the alarm/Partial Success path and never closes tickets).
- [~] **P2-M5-5** `POST /api/v1/ai/copilot-query` (hard-coded answers today) and the blueprint cost optimizer (≥ 60% savings estimate).
- *Verify:* NABL sample parses; sentiment test strings return the expected class.

### M6
- [ ] **P2-M6-1** Seed the 4 Jharkhand fixtures: Palamu, Khunti, Chaibasa, Dhanbad.
- [ ] **P2-M6-2** Quorum aggregation procedure with atomic locks; RLS on `project_trustees`, `votes`, `breakdown_alarms`, `verified_blueprints`, `rnd_failure_repository`.
- [ ] **P2-M6-3** Integration test: M4 dedup gate plus M5 embeddings and `dedup-score`.
- [ ] **P2-M6-4** Contract audit: `@jagrit/contracts` vs M4 and M5 payloads.
- *Verify:* `pnpm run build && node packages/db-schema/verify-constraints.js`

### M1, M2, M3 (UI for the remaining features; still on typed mocks)
- [ ] **P2-M1-1** Upvote-window widget (0/12/24/48/72 h, progress to 25 votes) and Early Breakdown Alarm button (Days 1-45, one tap with photo/voice).
- [ ] **P2-M1-2** Citizen quorum voting UI with geofence eligibility, Dual-Lock badge and Day 46 progress ring.
- [ ] **P2-M1-3** `/time-machine` demo page; polish micro-interactions, touch targets ≥ 48 px, strict language isolation.
- [ ] **P2-M2-1** 48-hour breakdown SLA modal with 7-day repair plan; O&M handover packager (caretaker logs, vernacular SOPs, spares kit record).
- [ ] **P2-M2-2** Student R&D Copilot drawer; jury presentation mode.
- [ ] **P2-M3-1** Round 3 jury panel (Feasibility 40 / Sustainability 30 / Cost 30) with live ranking; Anti-Speculation monitor (H-Scores, penalties).
- [ ] **P2-M3-2** Pan-India escalation panel; `/samvaad` community discussion feed; repository search and State Post-Mortem console.
- *Verify:* `pnpm --filter web-citizen run build`

**P2 gate:** the backend runs on real data; fixtures seeded.

---

## P3: Full System Integration (Hours 14-20)

- [ ] **P3-M1-1** Wire `/report` to upload real media to Supabase Storage and call the backend; wire `/whatsapp-simulator`, alarm button, quorum vote and citizen dashboard to live endpoints.
- [ ] **P3-M2-1** Wire the bidding feed, accept/consortium actions, hackathon deliverables and BOM table to the backend controllers.
- [ ] **P3-M3-1** Wire 1-Click Blueprint Cloning, the escrow gatekeeper, CSR pledges and the evaluator queue to live endpoints and database records.
- [ ] **P3-M4-1** Publish OpenAPI docs; fix contract mismatches reported by M1-M3; on 14C write `rnd_failure_repository` and request M5's post-mortem.
- [ ] **P3-M4-2** Performance: main endpoints under 200 ms with light concurrent load.
- [ ] **P3-M5-1** Turn mocks off where real models are available and list what remains; measure ASR and ViT latency; run the WhatsApp webhook end to end with M4.
- [ ] **P3-M6-1** Verify each wiring end to end and record issues; keep contracts in sync.
- *Verify:* `pnpm run build`; submit a report in `/report` and see the ticket in the Evaluator queue.

**P3 gate:** a real report travels from `/report` to the Evaluator queue; all quorum outcomes pass.

---

## P4: Production Build & Lock (Hours 20-24)

- [ ] **P4-M1-1** Accessibility pass (contrast, vernacular typography); zero console errors in English, Hindi and Santhali; mobile-responsive polish. *Verify:* `pnpm --filter web-citizen run build`
- [ ] **P4-M2-1** Verify all three hackathon rounds and the APAAR credit preview with live data. *Verify:* `pnpm --filter web-citizen run build`
- [ ] **P4-M3-1** Live counters on `/progress`; audit repository search and blueprint modals; export of state summary. *Verify:* `pnpm --filter web-citizen exec tsc --noEmit`
- [ ] **P4-M4-1** End-to-end suite: report → dedup → priority → bid → hackathon → escrow → alarm → quorum → credit; unit tests for MPS, D, bidding windows and quorum using Appendix A numbers. *Verify:* `pnpm --filter core-backend test`
- [ ] **P4-M4-2** Confirm CORS, SSL and that no secrets exist in the repo (`AUDIT.md`, Rule 4).
- [ ] **P4-M5-1** Run the fixture suite (Scenarios A-D) against the v14.1 rules; production Uvicorn multi-worker config; list remaining mocks. *Verify:* `python apps/ai-service/scripts/seed_ai_fixtures.py`
- [ ] **P4-M6-1** Full clean build with zero TypeScript and hydration errors. *Verify:* `pnpm run build && git status --porcelain`
- [ ] **P4-M6-2** End-to-end user journey across all 4 portals (Citizen, University, Industry, Evaluator).
- [ ] **P4-M6-3** RLS and security audit on all tables; confirm no secrets remain reachable in the repository.
- [ ] **P4-M6-4** Tag the release `v1.0.0-demo`, merge to `main`, write release notes listing remaining mocks, and finalize `AUDIT_LOG.md`.

**P4 gate (release):** build green, demo journey works, mocks disclosed.

---

*Post-sprint roadmap:* native Flutter app (offline SQLite queue), toll-free IVR, Pragya Kendra kiosks.
