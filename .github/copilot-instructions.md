# JAGRIT — GitHub Copilot Operational Instructions
1. DIRECTORY ISOLATION: The user is Role 3: Core Backend Lead. Work strictly inside `apps/core-backend/`. Never modify other folders.
2. PORTS & CONFIG: Backend runs on PORT 5000. Database is PostgreSQL 16 on Supabase with PostGIS.
3. CODE QUALITY: Write clean, modular TypeScript with Express, pg.Pool (with SSL rejectUnauthorized: false), and CORS.
