# JAGRIT — Architectural Decision Records (ADRs)

> **Version:** v14.1.0-PROD (Consistency-Reviewed Baseline) | **Owner:** M6 (Lead DBA & Systems Integrator)
> **Source of truth:** PRD v14.1 (Appendix A, Canonical Values). If this file and the PRD differ, the PRD wins and M6 fixes this file.
> **Notice for AI agents:** All decisions here are FINAL. Do not suggest or implement alternatives, and do not hard-code numbers that are defined here. To request a change, open a `decision-request` issue for M6.

**Naming conventions (never mix these):**
| Term | Meaning |
|:---|:---|
| **Sprint Phase P0-P4** | The 24-hour build schedule in `STAGES.md` |
| **Bidding Phase 1 / Phase 2** | University bidding windows (Phase 2 = Escalation Stage 1) |
| **Hackathon Round 1 / 2 / 3** | Ideation, Prototype & Mentorship, DPR Defense. Nothing else |
| **MPS / D / Score(U, P) / H** | Priority Score / Deduplication Identity / Institutional Match Score / University Responsiveness (0-100) |

---

## ADR-001: Monorepo, Stack & Scope
* **Context:** Six members build in parallel for 24 hours. Clear boundaries prevent collisions.
* **Decision:** One `pnpm-workspaces` monorepo:
  * `apps/web-citizen`: the **only** web app (Next.js 15, Tailwind, shadcn/ui, Lucide, Recharts, Leaflet). It hosts all four portals (Citizen, University, Industry/CSR, Government/Evaluator) plus public `/progress` and `/repository`. `apps/web-institution` is retired.
  * `apps/core-backend`: **NestJS (TypeScript)**, REST under `/api/v1`, port **5000**.
  * `apps/ai-service`: **Python FastAPI**, port **8000**.
  * `packages/contracts` (types, enums, `rules.ts` constants), `packages/db-schema`, `packages/ui-kit`.
* **Scope:** the citizen experience is a responsive **PWA** in Next.js. The native **Flutter** app is a post-sprint roadmap item with no owner in this sprint.

## ADR-002: Cloud Supabase & Secrets
* **Decision:** Supabase Cloud (PostgreSQL 16) with `postgis`, `vector` (pgvector), `uuid-ossp`; native `auth.users`; Storage buckets `challenge-media`, `dpr-docs`, `governance-certs`. RLS on every table. No local Docker database.
* **Secrets:** real credentials never enter git. `.env.example` has placeholders only.

## ADR-003: Privacy (DPDP Act 2023)
* Phone numbers are stored only as **HMAC-SHA-256** hashes. Public map coordinates are blurred by **50 m**. Votes: **1 per hashed phone**, only from verified residents within **30 km**.

## ADR-004: Two-Step Deduplication & Incident Clustering
* **Context:** Deleting duplicates loses evidence. We cluster instead.
* **Decision:**
  1. **Candidate gate (M4, in the database):** distance **≤ 500 m** (`ST_DWithin`) AND text cosine similarity **≥ 0.85** (pgvector cosine distance ≤ 0.15).
  2. **Merge decision (M5 computes D, M4 acts on it):**
     `D = 0.30·S_text + 0.25·K_geo + 0.15·K_time + 0.15·S_media + 0.15·S_entity`
     * `S_text`: cosine of 1536-dim embeddings. `K_geo = exp(-d²/(2·75²))` (d in metres; d > 500 → D = 0). `K_time = exp(-Δt/14)` (Δt in days; Δt > 45 → classified as a recurring breakdown, not a duplicate). `S_media`: ViT-H/14 feature similarity. `S_entity`: Jaccard overlap of extracted entities.
     * **D ≥ 0.72** → merge into the Master Incident (+1 upvote, evidence appended). **D < 0.72** → new Master Ticket. Duplicates are never deleted.

## ADR-005: Civic vs R&D Triage Gate
* DeBERTa-v3 zero-shot classifies **10 domains**: Water, Agriculture, Energy, Health, Livelihoods, Environment, Urban Infra, Accessibility, Education, Public Admin.
* **Type A** (routine municipal) with high confidence → auto-routed to the ULB (JharSewa) API. **Type B** (applied R&D) and low-confidence Type A → the Evaluator queue (`Approve as Applied R&D` / `Reroute to Municipal ULB`). The queue hides high-confidence Type A tickets.

## ADR-006: Multi-Factor Priority Score (MPS)
* **Context:** Raw upvotes favour urban areas. Objective severity carries 90% of the weight.
* **Decision:**
  * `BaseScore = 0.25·S_health + 0.20·S_econ + 0.15·S_vuln + 0.15·S_decay + 0.15·S_pop + 0.10·S_upvotes`; `MPS = min(100, BaseScore × M_equity)`.
  * **S_health:** arsenic > 50 ppb or fluoride > 1.5 mg/L = 95-100; structural collapse risk 70-85; basic civic defect ≤ 25. **S_econ:** tribal lac/silk spoilage 85-100; irrigation canal failure 75-84. **S_vuln:** school children +40, pregnant women at Anganwadi +35, elderly/disabled +25 (cap 100). **S_decay** `= 100·(1 − exp(−Days/14))`. **S_pop** `= min(100, 20·log10(1 + N))`. **S_upvotes** `= min(100, Votes/50 × 100)`.
  * **M_equity:** PVTG (Birhor, Asur) 1.30; Fifth Schedule/PESA 1.20; Aspirational Block 1.15; all other areas 1.00.
  * **Two computations:** a **preliminary MPS** (`S_upvotes = 0`) right after triage sets the upvote window. A **final MPS** at window close drives evaluator ranking and the bidding window.
  * M4 derives the S inputs from M5's triage output (domain, defect class, hazard flags) and submitted fields, using one rules table in `rules.ts`.

## ADR-007: Community Upvote Window
* Window by preliminary MPS: **S_health ≥ 90 → 0 h** (emergency bypass; evaluators notified within 2 h); **MPS ≥ 85 → 12 h**; **65-84 → 24 h**; **45-64 → 48 h**; **< 45 → 72 h**.
* **Auto-close:** ≥ 25 verified local upvotes within 24 h closes the window. Then the Evaluator approves the grant ceiling (for example ₹3,50,000), pooled with CSR matching funds.

## ADR-008: XAI Institutional Matcher (6-Axis)
* **Formula:** `Score(U, P) = 0.25·E + 0.20·F + 0.20·I + 0.15·G + 0.10·C + 0.10·H`. **E** Domain Expertise (cosine match on lab, patent and faculty-specialization profile); **F** Faculty Availability; **I** NABL Lab (100 accredited, 40 standard); **G** Proximity `max(0, 100 − km/2)`; **C** Campus Capacity; **H** Track Record (H-Score). The Recharts spider chart shows these **6 axes**.
* **Hard gates (before scoring):** domain supported; lab infrastructure exists; capacity available (else defer); Tribal Extension Cell exists (PESA areas).
* **Invitation rule:** only institutions scoring **≥ 70%** are invited.
* **Ownership:** M4 loads institutions and applies the hard gates; M5 computes the score and axis breakdown; M4 sends the invitations.

## ADR-009: Bidding Windows & Allocation Mode
* **Bidding window (a lookup table, not a formula), by final MPS:** ≥ 85 → **3 days**; 65-84 → **5 days**; 45-64 → **7 days**; < 45 → **10 days**.
* **Bidding Phase 1:** an invited college within **120 km** that accepts alone gets a **Guaranteed Direct Solo Win**.
* **On expiry:** 1 bid → `DIRECT_RND`; ≥ 2 bids → `DYNAMIC_HACKATHON`; 0 bids → Escalation (ADR-011).

## ADR-010: Hackathon Rounds, Tiers & Money
* **Rounds:** Round 1 Ideation (5-slide pitch + preliminary BOM); Round 2 Prototype & Mentorship (bench telemetry, test video, mentor notes); Round 3 DPR Defense in Ranchi (DPR + BOM).
* **Durations (sum of rounds):** Tier 1 Digital/Process 7+14+7 = **28 days**; Tier 2 Mechanical/Agro 10+30+10 = **50 days**; Tier 3 Deep Tech/Water Hardware 14+45+14 = **73 days**. **Exam buffer:** up to **14 days** when milestones overlap semester exams (a Ph.D./M.Tech co-anchor keeps lab continuity).
* **Money:** Round 1 costs the government **₹0**. Shortlisted Round 2 teams receive a **capped ₹20,000 seed allowance** against verified invoices. The Round 3 winner unlocks the main escrow.
* **Round 3 jury weights (operational default; M6 adds to PRD Appendix A):** Feasibility 40%, Sustainability 30%, Cost 30%.

## ADR-011: Anti-Speculation & 4-Stage Escalation
* **Five rules:** (1) loss of the local guaranteed solo win, (2) scope expansion instead of free cash, (3) H-score penalty, (4) ITI/Polytechnic threat, (5) evaluator discretion.
* **Penalty:** an invited college with match **> 80%** that ignores Bidding Phase 1 without valid technical reason: `H = H_base − 5 × Ignored_Bids` (floor 0).
* **Scope expansion:** up to **+25%** budget (₹3,50,000 → ₹4,37,500) at evaluator discretion, requiring at least **+50% deliverables**: 2 hamlets, IoT sensors, **24-month** spares kit; NEP credits rise from 4 to 6.
* **Stage 1** (Days 1-5 after the window = Bidding Phase 2): statewide open to all 42+ HEIs, 120 km geofence removed. **Stage 2** (Days 6-10): fabrication tasks to ITIs/Polytechnics. **Stage 3** (Day 11): DHTE/JCSTI directive to state-empanelled institutions (Agri/Soil → BAU; Water/Chemical → BIT Sindri/BIT Mesra; Mining/Metals → IIT ISM/NIT Jamshedpur) as a funded Ph.D./M.Tech thesis. **Stage 4:** `ESCALATED_PAN_INDIA_PRIORITY` → Pan-India National Hackathon with a mandatory local Jharkhand partner.

## ADR-012: Tranche Escrow (30-40-30)
* **Decision:** Funds move through State Nodal Single Virtual Accounts (SNA/PFMS). No lump sums to university accounts.
  * **T1 30%** on kickoff. **T2 40%** after an NABL certificate is uploaded and the Evaluator authorizes. **T3 30%** after installation, 2 Jal Sahiyas trained, spares kit deposited, and the **Gram Sabha NOC** (**PESA NOC** in Scheduled Areas, ordinary NOC elsewhere) plus O&M handover are verified.
  * Example for ₹3,50,000: ₹1,05,000 / ₹1,40,000 / ₹1,05,000. **Spares kit:** 12 months (24 months under scope expansion).
  * **NABL Green Corridor:** pre-paid Speed Post barcodes, 5-day testing SLA, ₹0 to students.
  * **SLA monitor:** Day +7, +14, +30 defaults; default freezes drawdown. Every state change is idempotent and audit-logged.

## ADR-013: 45-Day Field Test & Early Breakdown Alarm
* The test runs **45 days** unassisted from installation. The Breakdown Alarm is active **Days 1-45**.
* **Trigger:** ≥ **3 verified citizens** within 24 h (configurable up to 5 for larger villages) freezes the clock. Then a **48-hour inspection**, a **7-day repair**, and the clock **resets to Day 1**. Alerts go to the team, Jal Sahiya and BDO. The vote is on **Day 46**.
* **Demo tool:** a `time-machine` endpoint and page advance the clock for the jury demo.

## ADR-014: Dual-Lock Citizen Quorum & Resolution
* **Key 1:** at least **4 of 5 Designated Community Trustees** vote YES: Headmaster, Ward Member, an independent Gram Sabha member (not related to the Mukhiya, not tied to the university team), and 2 SC/ST beneficiaries. The **Jal Sahiya** votes in the public vote only (conflict-of-interest rule).
* **Key 2:** total verified votes ≥ `max(15, ceil(1.45 × sqrt(N_village)))` AND YES share ≥ **70%**.
* **Outcomes:** **14A Complete Success** (both keys): credits to APAAR/DigiLocker, 10 UGC-CAS points, ₹10 Lakh state seed grant, blueprint stored. **14B Partial Success** (public YES 40-69%, or exactly one key fails): 45-day Iterative Repair Ticket to the same team, clock resets, second vote. **14C Full Failure** (< 40% or unfixable): AI root-cause post-mortem to the R&D Failure Knowledge Base; chronic cases escalate to the Pan-India Hackathon.

## ADR-015: NEP 2020 Credit Banking
* **30 verified workhours = 1 Academic Credit** (a 120-hour project = 4 credits; 6 under scope expansion). A signed JSON credential is deposited to APAAR/DigiLocker on resolution. The Faculty PI receives 10 UGC-CAS points.

## ADR-016: CSR Funding & Tripartite IPR Concordat
* CSR pledges (₹50,000 to ₹10 Lakhs) are matched **1:1 by the State**, up to each project's grant ceiling. JAGRIT issues a **JAGRIT CSR Contribution Certificate** (an audit-ready record for the company's own CSR reporting, **not** a tax receipt).
* **Tripartite (Academia-Industry-State) concordat, four rights-holders:** Student team & Faculty PI ≥ **60%** of the commercializing startup; University **20-30%** of royalties plus the patent document; CSR partner **ROFR** to manufacture; State royalty-free permanent licence for government schools and hospitals.

## ADR-017: Blueprint Cloning, Failure Knowledge Base & Pan-India Escalation
* Each 14A project stores a **Solution Blueprint** in `verified_blueprints` (BOM, CAD, Hindi/Santhali SOPs, deployment notes). Cloning targets a **14-day** deployment at about **60% lower cost**.
* Failed attempts log a root-cause post-mortem in `rnd_failure_repository`. The Student R&D Copilot checks proposals against it. A chronic challenge, or one failing twice in a row, is promoted to the bi-annual Pan-India National Hackathon.

## ADR-018: WhatsApp Ingestion & 5-Tier Weak Connectivity
* **Live webhook** `POST /api/v1/webhooks/whatsapp` (owned by **M5**): return 200 within 250 ms, process media asynchronously (OGG/Opus → Whisper-large-v3/Bhashini, ≤ 14% WER, Hindi and Santhali), read the location pin, then call M4's `POST /api/v1/challenges/submit`. The `/whatsapp-simulator` page mirrors the same flow for jury demos.
* **Five connectivity tiers:** client-side WebP/Opus compression (≤ 500 KB); transactional offline queue; store-and-forward sync; toll-free IVR; Pragya Kendra (CSC) proxy kiosks.

## ADR-019: Inter-University Lab Equipment Sharing
* Researchers book slots for SEM, XRD and Gas Chromatography at empanelled central labs (BIT Mesra, NIT Jamshedpur, CSIR-NML). Bookings are a first-class table with RLS.

## ADR-020: AI Service Contract & Mock Discipline
* **All AI endpoints live under `/api/v1/ai/*`:** `transcribe`, `defect-scan`, `triage-classify`, `embed`, `dedup-score`, `match-universities`, `wbs-timeline`, `parse-nabl`, `bom-anomaly`, `parse-feedback`, `generate-postmortem`, `copilot-query`. Old unprefixed paths may remain as aliases only.
* **Embeddings:** `text-embedding-3-large` with output dimension **1536**.
* **Mocks are allowed** (`MOCK_INFERENCE=true`) but must exercise the real contract. Mock embeddings must return **similar vectors for similar text** so dedup can be demonstrated. Every mock is flagged `[MOCK]` in the PR description and `[~]` in `STAGES.md`.
* `parse-feedback` feeds the Breakdown Alarm / Partial Success path (ADR-013/014). It never closes a ticket by itself.

## ADR-021: Demo Fixtures
* Seed districts: **Palamu, Khunti, Chaibasa, Dhanbad** (M6). Dashboard counters (State pool ₹4.2 Cr, CSR matched, 384 projects, ₹1.4 Cr escrow) are illustrative; keep CSR matched at or below the State pool so 1:1 matching reads correctly.
