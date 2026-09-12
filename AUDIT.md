# JAGRIT — Token Optimization & Operational Audit Protocol
> **Enforcement Target:** Cline Autonomous Agent & Engineering Leads  
> **Primary Objective:** Maximize code quality while minimizing token consumption. Prevent context-window bloat, circular reasoning, and unbounded file dumps.

---

## 1. The Token Economy: Golden Rules for Cline

### Rule 1: Directory Jailing (Strict Scope Isolation)
* Cline must **never** scan or read files outside the active role's directory.
* When working on `Role 1`, access is restricted to `apps/web-citizen/` and `packages/contracts/`. Reading `apps/core-backend/` or `apps/ai-service/` is strictly forbidden. Use the type definitions in `packages/contracts/src/index.ts` instead.

### Rule 2: Surgical File Reading (No Full File Dumps)
* **Never** read an entire file if you only need a specific component or function.
* Use line range limits (`offset` and `limit`) when reading files exceeding 100 lines.
* When inspecting project state, **do not** run `ls -R` or recursive directory listings. Inspect only the target directory.

### Rule 3: Muted Terminal Outputs (No Log Floods)
* Raw terminal logs consume thousands of tokens. All commands must be silenced or trimmed:
  * ❌ `pnpm install` ➔ ✔️ `pnpm install --silent`
  * ❌ `pnpm run build` ➔ ✔️ `pnpm run build > /dev/null 2>&1 || pnpm run build` (only prints on failure)
  * ❌ `git log` ➔ ✔️ `git log -n 3 --oneline`
  * ❌ Running test suites raw ➔ ✔️ Pipe through `tail -n 20` or `--bail=1`

### Rule 4: Context Grounding via Compact Registry
* When resuming a session, **do not** re-read all code files to determine what has been implemented.
* Read **only** the last 3 entries of `AUDIT_LOG.md` and check the target task in `STAGES.md`. This consumes $<400$ tokens vs. $50,000+$ tokens for a full repo scan.

### Rule 5: Zero Speculative Coding
* Do not invent new database fields, new API endpoints, or change formulas.
* Every architectural constraint is frozen in `DECISION.md`. Consult `DECISION.md` instead of reasoning through alternatives.

---

## 2. Token Budget Allocation per Role & Stage

| Phase | Description | Max Token Budget / Task | Stop Condition / Circuit Breaker |
|:---|:---|:---|:---|
| **Stage 0** | Baseline & Scaffolding | ~15,000 tokens | Stop once dev server returns HTTP 200 |
| **Stage 1** | Ingestion, Deduplication, AI | ~30,000 tokens | Stop once unit payload passes verification |
| **Stage 2** | Dynamic Hackathon & Escrow | ~35,000 tokens | Stop once state machine transitions cleanly |
| **Stage 3** | Quorum, NEP & Failure Engine | ~25,000 tokens | Stop once quorum formula returns expected output |
| **Stage 4** | Integration & Demo Prep | ~20,000 tokens | Stop once build passes with 0 errors |

> **Emergency Circuit Breaker:** If a single task loop exceeds **40,000 tokens** without a successful commit, Cline must halt, roll back the active file changes via `git checkout -- .`, and request human guidance with a concise 3-line error summary.

---

## 3. Pre-Task & Post-Task Execution Checklist

Before running any Cline session, execute this verification loop:

### Pre-Execution (Cost: ~500 tokens)
- [ ] Read the current task description in `STAGES.md`.
- [ ] Read the last 2 entries of `AUDIT_LOG.md` to confirm system state.
- [ ] Check `DECISION.md` for relevant architectural constraints.

### Post-Execution (Cost: ~800 tokens)
- [ ] Run the task-specific verification command from `STAGES.md`.
- [ ] Ensure no changes were made outside your assigned role directory (`git status --porcelain`).
- [ ] Format and lint target files cleanly.
- [ ] Append a compact record to `AUDIT_LOG.md` using the exact template.
- [ ] Mark the task checkbox `[x]` in `STAGES.md`.
- [ ] Execute an atomic git commit: `feat(<role>): complete task X.X.X`.