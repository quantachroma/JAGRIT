CREATE INDEX IF NOT EXISTS idx_clusters_geom ON public.incident_clusters USING GIST (centroid_location);
CREATE INDEX IF NOT EXISTS idx_challenges_geom ON public.challenges USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_challenges_vector ON public.challenges USING hnsw (description_embedding vector_cosine_ops);

-- added beyond PRD spec for query performance on documented access patterns
CREATE INDEX IF NOT EXISTS idx_challenges_cluster_id ON public.challenges (cluster_id);
CREATE INDEX IF NOT EXISTS idx_challenges_ticket_number ON public.challenges (ticket_number);
CREATE INDEX IF NOT EXISTS idx_projects_challenge_id ON public.projects (challenge_id);
CREATE INDEX IF NOT EXISTS idx_clusters_district ON public.incident_clusters (district);
