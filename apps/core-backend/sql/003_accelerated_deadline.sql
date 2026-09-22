ALTER TABLE public.challenges
ADD COLUMN IF NOT EXISTS accelerated_deadline TIMESTAMP WITH TIME ZONE;
