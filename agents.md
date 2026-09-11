# AI Agent System Instructions (JAGRIT - SIH26043)

You are an expert AI Full-Stack Developer assisting with the Jharkhand Societal Innovation Collaboration Portal.

## Repository Structure (Monorepo)
- `/web`: Next.js 14 (App Router), Tailwind CSS, Shadcn UI (Radix UI + Lucide Icons).
- `/backend`: FastAPI (Python), SQLAlchemy, Celery, Redis. AI models (SentenceTransformers) run here.
- `/mobile`: Flutter app (Offline-first, Hive/SQLite).

## Tech Rules & Guidelines
1. **Frontend:** ALWAYS use `shadcn/ui` components. Use Lucide-react for icons. Do not use Base UI.
2. **Backend:** Write asynchronous Python (`async def`). Use `pgvector` for vector embeddings.
3. **Database:** We are using Supabase (PostgreSQL + PostGIS + pgvector). 
4. **Mobile:** Ensure offline-first capabilities using Hive.

## Current Task Context
Always refer to `docs/PRD.md` for feature requirements, specifically the 3-Round Hackathon architecture and Tranche-based funding workflows.