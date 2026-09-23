INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES
    ('challenge-media', 'challenge-media', true, 52428800),
    ('dpr-docs', 'dpr-docs', true, 52428800),
    ('governance-certs', 'governance-certs', true, 52428800)
ON CONFLICT (id) DO NOTHING;
