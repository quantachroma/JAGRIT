# JAGRIT — Token Optimization & Operational Audit Protocol
> **Enforcement Target:** All Autonomous Agents (M1–M6) & Systems Engineering Leads  
> **Authority:** Department of Higher & Technical Education, Government of Jharkhand  
> **Primary Objective:** Enforce zero-conflict parallel development, strict token conservation, contract-first integrity, and automated accountability across the monorepo.

---

## 1. The 5 Golden Rules of Conflict-Free Monorepo Development

### Rule 1: Strict Directory Jailing (Scope Isolation)
Agents and engineers must **never** inspect, create, or modify files outside their strictly assigned role workspace:
* **Member 1 (M1 - Citizen Frontend Lead):** Restricted to `apps/web-citizen/src/app/` (`report`, `whatsapp`, `home`), `apps/web-citizen/src/components/`, `apps/web-citizen/public/locales/`.
* **Member 2 (M2 - University Portal Lead):** Restricted to `apps/web-citizen/src/app/university/` and `apps/web-institution/` (HEI hackathon arena, challenge acceptance, DPR builder).
* **Member 3 (M3 - Admin, Progress & Repository Lead):** Restricted to `apps/web-citizen/src/app/` (`progress`, `admin`, `repository`) and associated progress/repository components.
* **Member 4 (M4 - Core Backend Lead):** Restricted to `apps/core-backend/` (FastAPI/NestJS core APIs, PostGIS spatial queries, Escrow ledger, Supabase client).
* **Member 5 (M5 - AI Service Lead):** Restricted to `apps/ai-service/` (Whisper/Bhashini ASR, ViT defect scanner, DeBERTa-v3 triage, pgvector embeddings).
* **Member 6 (M6 - Lead DBA & Systems Integrator):** Restricted to `packages/` (`db-schema/`, `contracts/`, `ui-kit/`), root governance, lockfiles, and end-to-end build integration.

> **Enforcement:** If a role requires interfaces or data contracts from another domain, it must import exclusively from `@jagrit/contracts` (`packages/contracts/src/index.ts`). Cross-directory reads are strictly forbidden.

### Rule 2: Lockfile Immunity
* **NEVER** execute a bare `pnpm install` or `npm install` in the root repository directory.
* Root-level installations corrupt workspace boundaries and invalidate lockfiles.
* All package installations must be strictly workspace-scoped using targeted filtering:
  ```bash
  pnpm --filter <workspace-name> add <package-name>
  # Example:
  pnpm --filter web-citizen add lucide-react
  pnpm --filter core-backend add @supabase/supabase-js
  ```

### Rule 3: Contract-First Lockdown
* All shared data shapes, domain enums, payload contracts, and database entity models are declared in `packages/contracts/src/index.ts`.
* For Members M1 through M5, `packages/contracts/src/index.ts` is **strictly READ-ONLY**.
* No field additions, renames, or type alterations may occur without explicit architectural sign-off and version bumping by Member 6 (Lead Systems Integrator).

### Rule 4: Rebase over Merge
* Never create non-linear merge commits or pull without rebasing when syncing with the upstream development branch.
* Always rebase feature branches cleanly on top of `origin/dev`:
  ```bash
  git fetch origin dev && git rebase origin/dev
  ```
* Fast-forward commits preserve an atomic, legible audit trail for every sprint phase.

### Rule 5: Root Governance Protection
* Root governance and audit files are strictly locked under the administration of Member 6:
  - `AUDIT.md` (Operational protocol and golden rules)
  - `DECISION.md` (Architectural Decision Records)
  - `STAGES.md` (Master task checklist and phase tracking)
  - `AUDIT_LOG.md` (Official system execution registry)
* Members M1 through M5 **must NOT** modify these root governance files. Each role updates only its assigned workspace code and logs completion via the standard audit entry template upon task verification.

---

## 2. Token Conservation & Efficiency Protocol

1. **Surgical File Reading:**
   * Never read entire directories or dump multi-thousand-line files into the agent context.
   * Read files with explicit line-range offsets (`StartLine` and `EndLine`).
   * Never run unbounded recursive searches (`ls -R`, unbounded `find`, or unexcluded `grep`). Always exclude `node_modules/`, `venv/`, `.next/`, and `.git/`.

2. **Muted Terminal Outputs:**
   * Raw terminal outputs flood context windows and waste tokens.
   * Suppress verbose logs:
     * ❌ `pnpm install` ➔ ✔️ `pnpm install --silent`
     * ❌ `pnpm run build` (raw) ➔ ✔️ Run silent or capture targeted summary logs
     * ❌ `git log` (raw) ➔ ✔️ `git log -n 3 --oneline`

3. **Context Grounding via Registry:**
   * To determine previous state, read only the **System Progress Summary** and the **Last 3 Entries** of `AUDIT_LOG.md`.
   * Check task status directly in `STAGES.md`.
   * Do not rescan the entire repository tree to figure out what has been built.

4. **Zero Speculative Coding:**
   * Never invent ad-hoc database schemas, speculative API endpoints, or unapproved business formulas.
   * Consult `DECISION.md` (ADR-001 through ADR-010) for approved constraints and algorithms.

---

## 3. Token Budget Allocation per Phase

| Phase | Description | Max Budget / Role | Circuit Breaker Condition |
|:---|:---|:---|:---|
| **Phase 0** | Baseline Scaffolding & Shared Contracts | ~15,000 tokens | Build passes cleanly with exit code 0 |
| **Phase 1** | Multimodal Ingestion, Triage & PostGIS Radar | ~30,000 tokens | Unit payloads validate against contracts |
| **Phase 2** | Dynamic Hackathon, Bidding & Tranche Escrow | ~35,000 tokens | State transitions run without regression |
| **Phase 3** | Dual-Lock Quorum, NEP Credits & Blueprint Engine | ~25,000 tokens | Dual-key quorum & credit formulas verify |
| **Phase 4** | End-to-End Integration, Live Data & Demo Polish | ~20,000 tokens | Zero-console errors across all apps |

> **Emergency Circuit Breaker:** If an agent loop consumes **> 40,000 tokens** without a verifiable commit, it must immediately halt, revert dirty changes (`git checkout -- .`), and provide a concise 3-line diagnostic error report.

---

## 4. Pre-Task & Post-Task Execution Checklist

### Pre-Execution Verification
- [ ] Inspect the active task ID in `STAGES.md`.
- [ ] Confirm your assigned role directory under Rule 1.
- [ ] Read the last 2 entries of `AUDIT_LOG.md` to confirm system state.
- [ ] Verify applicable ADR constraints in `DECISION.md`.

### Post-Execution Verification
- [ ] Run the assigned role verification command (e.g., `pnpm run build` or `tsc --noEmit`).
- [ ] Confirm zero modifications outside your assigned jail directory (`git status --porcelain`).
- [ ] Append a 5-line completion record to `AUDIT_LOG.md` using the standard template.
- [ ] Mark the task `[x]` in `STAGES.md`.
- [ ] Execute an atomic commit: `git commit -m "<role>(<scope>): complete task <task-id>"`.