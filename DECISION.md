---

### File 3: `DECISION.md`

Save this file as **`DECISION.md`** in your root directory. This document prevents debates, hallucinations, and refactoring by locking all architectural decisions upfront:

```markdown
# JAGRIT — Architectural Decision Records (ADR)
> **Notice for Cline:** All technical decisions recorded here are final. Do not suggest or implement alternatives (e.g., do not switch PostGIS to MongoDB, do not use GraphQL instead of REST, do not change escrow percentages). Always align implementation with these records.

---

## ADR-001: Monorepo Architecture & Directory Isolation
* **Status:** APPROVED
* **Context:** A 4-person team using autonomous AI tools risks constant merge conflicts and package-lock collisions.
* **Decision:** We use a pnpm-workspaces monorepo with 4 decoupled apps (`web-citizen`, `web-institution`, `core-backend`, `ai-service`) and 2 shared packages (`contracts`, `db-schema`). 
* **Constraint:** No developer or AI session may modify a directory outside their assigned role without consensus.

---

## ADR-002: Geospatial & Semantic Deduplication Engine
* **Status:** APPROVED
* **Context:** Citizens submit redundant issues within close physical proximity.
* **Decision:** PostGIS handles spatial proximity via a 500-meter spherical buffer (`ST_DWithin(location, ..., 500)`). Semantic text similarity uses OpenAI `text-embedding-3-large` 1536-dimensional vectors.
* **Rule:** If a ticket is within 500m AND semantic cosine similarity is $\ge 0.85$, it is automatically merged into the master ticket and upvotes are incremented by 1. No new ticket is created.

---

## ADR-003: Triage Classification (Civic Routine vs Applied R&D)
* **Status:** APPROVED
* **Context:** Higher Education Institutions (HEIs) must not receive routine municipal maintenance tasks (potholes, garbage, broken streetlights).
* **Decision:** Zero-shot classification (DeBERTa-v3) categorizes incoming issues:
  * **Type A (Civic Routine):** Dispatched via webhook to Urban Local Body / JharSewa APIs; closed on JAGRIT.
  * **Type B (Applied R&D):** Routed to the HITL Evaluator Queue for university allocation.

---

## ADR-004: 10-Day Bidding Window & Dynamic Hackathon Switch
* **Status:** APPROVED
* **Context:** Need a deterministic mechanism to assign problems to universities.
* **Decision:** Every R&D challenge remains in an `OPEN_FOR_BIDS` state for exactly 10 days.
  * If **exactly 1 HEI** accepts: transitions to `DIRECT_RND` mode.
  * If **$\ge 2$ HEIs** accept: transitions automatically to `DYNAMIC_HACKATHON` mode.
  * If **0 HEIs** accept: budget increases by 20% and eligibility expands.

---

## ADR-005: 3-Stage Dynamic Hackathon Structure
* **Status:** APPROVED
* **Context:** Competitions must yield actionable, vetted engineering solutions.
* **Decision:** Multi-university challenges run a 3-round sprint:
  * **Round 1 (Ideation):** 5-slide pitch deck (PDF) + 2-min video approach. Evaluators shortlist top 3–5.
  * **Round 2 (Mentoring & Prototype):** Paired with Industry/CSR mentors. Upload bench-scale test data. Top 2 advance.
  * **Round 3 (DPR & Physical Defense):** Detailed Project Report (DPR) with complete Bill of Materials (BOM). Physical presentation at Ranchi. Jury scores: Feasibility (40%), Sustainability (30%), Cost (30%).

---

## ADR-006: Tranche-Based Escrow Release Structure (30% - 40% - 30%)
* **Status:** APPROVED
* **Context:** Protect government and CSR funds from abandonment or substandard work.
* **Decision:** Funds disburse strictly across 3 milestones:
  * **Tranche 1 (30%):** Disbursed upon proposal approval for component/lab procurement.
  * **Tranche 2 (40%):** Disbursed only upon uploading a valid NABL bench test certificate.
  * **Tranche 3 (30%):** Disbursed only upon physical installation AND Gram Sabha PESA Act NOC upload.

---

## ADR-007: 45-Day Maturation Buffer & Quorum Formula
* **Status:** APPROVED
* **Context:** Solutions require real-world durability testing; a single citizen's vote should not determine project success or failure.
* **Decision:**
  * After deployment, an unassisted 45-day operational maturation buffer runs before voting opens.
  * The 14-day voting window enforces an AI population-weighted quorum:
    $$\text{Quorum}_{\min} = \max(15, \lceil k \cdot \sqrt{N} \rceil)$$
  * NLP parses feedback into **Critical Defects** (triggers a 45-day iterative repair sprint for the same team) vs **Cosmetic Grievances** (ticket marked `RESOLVED`).

---

## ADR-008: NEP 2020 Academic Credit Valuation
* **Status:** APPROVED
* **Context:** Translating engineering problem solving into university degree credits.
* **Decision:** Standardized at **30 verified workhours = 1 Academic Credit** (NCrF norms). Upon project sign-off, system generates signed JSON payloads transferring 2–4 credits directly to students' APAAR / DigiLocker transcripts under *Community Engagement* or *Capstone Project*.

---

## ADR-009: R&D Failure Engine Bifurcation
* **Status:** APPROVED
* **Context:** Preventing repeated failures while addressing chronic unsolved challenges.
* **Decision:**
  * **Minor Failures:** Documented in the searchable `rnd_failure_repository` (original problem, attempted method, root cause of failure, and lessons learned).
  * **Major Failures & Failed Govt Projects:** Automatically escalated to become problem statements for the bi-annual Pan-India National Hackathon.