# JAGRIT — Token Optimization & Operational Audit Protocol

> **Enforcement target:** all members (M1-M6) and all AI agents (Cline, Copilot, Cursor, Antigravity)
> **Owner:** M6 (Lead DBA & Systems Integrator) | **Version:** v14.1.0-PROD (Consistency-Reviewed Baseline)
> **Goal:** zero-conflict parallel development, contract-first integrity, no leaked secrets, and low token use.

**Order of authority (if documents disagree, stop and ask M6):** PRD v14.1 Appendix A → `DECISION.md` → `STAGES.md` → code comments.

---

## 1. The 8 Golden Rules

### Rule 1: Directory Jailing
Never inspect, create or modify files outside your jail.

| Member | Role | May write |
|:---|:---|:---|
| **M1** | Citizen Frontend Lead | `apps/web-citizen/src/app/`: `page.tsx` (`/`), `report/`, `whatsapp-simulator/`, `time-machine/`; `src/components/citizen/`; `public/locales/` |
| **M2** | University Portal Lead | `apps/web-citizen/src/app/university/`; `src/components/university/` |
| **M3** | Admin, Progress, CSR & Repository Lead | `apps/web-citizen/src/app/`: `progress/`, `admin/` (Evaluator), `repository/`, `samvaad/`, `industry/` (CSR); matching folders in `src/components/` |
| **M4** | Core Backend Lead | `apps/core-backend/src/` (NestJS: escrow, quorum, bidding, priority score, alarms) |
| **M5** | AI Service Lead | `apps/ai-service/` (ASR, ViT, DeBERTa, embeddings, dedup score, matcher) and the WhatsApp webhook |
| **M6** | Lead DBA & Integrator | `packages/` (`db-schema/`, `contracts/`, `ui-kit/`), root config and lockfiles, `.github/`, governance files, and the shared web shell: `apps/web-citizen/src/app/layout.tsx`, `dashboard/page.tsx`, `globals.css`, Tailwind/Next config |

* **You may read:** the root governance files, `packages/contracts`, and API docs. Nothing else outside your jail.
* **Shared web shell:** each portal is one exported component (`CitizenDashboard`, `UniversityDashboard`, `EvaluatorDashboard`, `IndustryDashboard`) that M6's `/dashboard?role=` switch imports. Need a change in an M6 file (nav link, global style, shared component)? Open an issue for M6.
* Cross-domain data shapes come only from `@jagrit/contracts`.

### Rule 2: Installs, Lockfiles & Python
* **NEVER** run a bare `pnpm install` or `npm install` in the repo root. Add packages per workspace: `pnpm --filter <workspace> add <package>`.
* **Never hand-merge `pnpm-lock.yaml`.** On a conflict, run `git checkout origin/dev -- pnpm-lock.yaml`, then repeat your `pnpm --filter ... add`.
* **M5 (Python):** use a virtual environment, pin dependencies in `apps/ai-service/requirements.txt`, never commit `venv/`.

### Rule 3: Contract-First Lockdown
* Shared shapes, enums and canonical constants live in `packages/contracts/src/` (`index.ts`, `rules.ts`). For M1-M5 it is **READ-ONLY**.
* **Need a change?** Open a `contract-request` issue with the exact fields. M6 answers additive requests fast (target: 30 minutes) and bumps the version.
* All business numbers come from `DECISION.md` through one constants file per service (`rules.ts`, and `apps/ai-service/core/rules.py`). No magic numbers in feature code.

### Rule 4: Secrets Never Enter Git
* `.env` is gitignored. `.env.example` has **placeholders only**.
* Never commit database passwords, Supabase anon/service-role keys, JWT secrets, or Google/OpenAI/Meta/Bhashini keys.
* Before each commit run `git diff --cached | grep -iE "(key|secret|password|token)\s*="` and confirm nothing real appears.
* **If a secret leaks:** tell M6 at once and rotate it. Deleting the line does not remove it from git history.

### Rule 5: Branching & Rebase
* Branch from `origin/dev` as `feat/<member>/<phase>-<topic>` (for example `feat/m4/p1-escrow`).
* Sync with `git fetch origin dev && git rebase origin/dev`. Never `git merge dev` into your branch.
* Use `git push --force-with-lease` only on your own feature branch. **Never** rebase, force-push or commit directly to `dev`.
* Merge by pull request with **Rebase and merge**. Commit format: `<type>(<member>): <task-id> <summary>` (for example `feat(m4): P1-M4-7 tranche escrow state machine`).

### Rule 6: Governance Files & Reporting
* Only **M6** edits `AUDIT.md`, `DECISION.md`, `STAGES.md` and `AUDIT_LOG.md`. M1-M5 must NOT.
* **Report each finished task in the PR description** using the template below. M6 ticks the task in `STAGES.md` when merging and copies the record to `AUDIT_LOG.md`.
* To request a rule or ADR change, open a `decision-request` issue.

### Rule 7: Zero Speculative Coding
* Do not invent schemas, endpoints or formulas. If `DECISION.md` does not define it, ask M6.
* Use the naming conventions from `DECISION.md` (Sprint Phase vs Bidding Phase vs Hackathon Round; MPS, D, Score(U, P), H).

### Rule 8: Mock Discipline
* Mocks are allowed but must be visible: mark `[MOCK]` in the PR description; M6 records it as `[~]` in `STAGES.md`.
* A mock must still honour the real contract (for example, mock embeddings give similar vectors for similar text).
* In P4 every remaining mock is listed in the release notes.

**PR description template (5 lines):**
```
Task: P1-M4-7 <title>
Files: <paths inside your jail>
Verify: `<command>` -> <result, e.g. 12 tests passing>
Mocks: none | [MOCK] <what>
Tokens (est.): <number>
```

---

## 2. Token Conservation Protocol

1. **Surgical reading:** read files by line range; never dump directories or huge files. No unbounded `ls -R`, `find` or `grep`; always exclude `node_modules/`, `venv/`, `.next/`, `.git/`.
2. **Quiet terminals:** `pnpm install --silent`, capture only a summary of long output, `git log -n 3 --oneline`.
3. **Context from the registry:** to learn the state of the project read `STAGES.md` and the summary in `AUDIT_LOG.md`. Do not rescan the repository.
4. **Check the ADR first** for any rule or number.
5. **One task per loop:** finish, verify and commit one task before starting the next.

## 3. Token Budget per Sprint Phase (per member)

| Phase | Description | Max budget | Circuit breaker |
|:---|:---|:---|:---|
| **P0** (0-2 h) | Baseline, DDL, contracts | ~15,000 | Build passes with exit code 0 |
| **P1** (2-8 h) | Independent module build | ~30,000 | Payloads validate against contracts; unit tests pass |
| **P2** (8-14 h) | Engine wiring & fixtures | ~35,000 | State transitions run without regression |
| **P3** (14-20 h) | Full system un-mocking | ~25,000 | Alarm, quorum and credit tests pass (14A/14B/14C) |
| **P4** (20-24 h) | Build gate & demo | ~20,000 | Zero console errors across the app |

> **Emergency circuit breaker:** if one task loop passes **40,000 tokens** without a verifiable commit, stop. Save your work with `git stash -u` (it keeps new files; do not use `git checkout -- .`). Then write a 3-line diagnostic (task, what failed, what you tried) in your PR or message to M6.

---

## 4. Pre- and Post-Task Checklists

**Before you start**
- [ ] Find your task ID in `STAGES.md` and confirm the previous phase gate is met.
- [ ] Confirm the files you will touch are inside your jail (Rule 1).
- [ ] Read the ADRs that apply.
- [ ] `git fetch origin dev && git rebase origin/dev`

**After you finish**
- [ ] Run the task's verification command from `STAGES.md`.
- [ ] `git status --porcelain` shows changes only inside your jail.
- [ ] Secret check passed (Rule 4).
- [ ] Commit atomically (Rule 5), open a PR into `dev`, fill in the PR template.

---

## 5. M6 Repository Setup (do in P0)

1. **Protect `dev`:** require pull requests and CODEOWNERS review, allow **Rebase and merge** only, block force-pushes. Turn on GitHub **secret scanning** and push protection.
2. **`.github/CODEOWNERS`** (replace handles):
```
/apps/web-citizen/src/app/report/               @m1-handle
/apps/web-citizen/src/app/whatsapp-simulator/   @m1-handle
/apps/web-citizen/src/app/time-machine/         @m1-handle
/apps/web-citizen/src/components/citizen/       @m1-handle
/apps/web-citizen/src/app/university/           @m2-handle
/apps/web-citizen/src/components/university/   @m2-handle
/apps/web-citizen/src/app/progress/             @m3-handle
/apps/web-citizen/src/app/admin/                @m3-handle
/apps/web-citizen/src/app/repository/           @m3-handle
/apps/web-citizen/src/app/samvaad/              @m3-handle
/apps/web-citizen/src/app/industry/             @m3-handle
/apps/core-backend/                             @m4-handle
/apps/ai-service/                               @m5-handle
/packages/                                      @m6-handle
/AUDIT.md /DECISION.md /STAGES.md /AUDIT_LOG.md /.github/ @m6-handle
```
3. **`.github/pull_request_template.md`:** paste the PR description template from Rule 6.
4. **`.gitignore`** must cover `.env`, `venv/`, `node_modules/`, `.next/`.
5. Move the earlier AI-service log entries labelled "Role 4" into `AUDIT_LOG.md` as M5.
