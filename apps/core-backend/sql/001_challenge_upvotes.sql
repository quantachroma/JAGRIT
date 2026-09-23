CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS public.challenge_upvotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    phone_hash TEXT NOT NULL,
    voter_location GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT challenge_upvotes_ticket_phone_unique UNIQUE (ticket_id, phone_hash)
);
