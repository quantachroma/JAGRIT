INSERT INTO public.users (id, phone, email, full_name, role, institution_name, preferred_language) VALUES
('a0000000-0000-0000-0000-000000000001', '+919876543210', 'somra.oraon@jharkhand.in', 'Somra Oraon', 'CITIZEN', 'Kanke Gram Panchayat', 'sat'),
('a0000000-0000-0000-0000-000000000002', '+919876543211', 'dr.verma@bitmesra.ac.in', 'Dr. Alok Verma', 'FACULTY_PI', 'Birla Institute of Technology, Mesra', 'hi'),
('a0000000-0000-0000-0000-000000000003', '+919876543212', 'ananya.ug22@nitjsr.ac.in', 'Ananya Sharma', 'STUDENT', 'NIT Jamshedpur', 'en'),
('a0000000-0000-0000-0000-000000000004', '+919876543213', 'csr.lead@tatasteel.com', 'Dr. S. Roy', 'INDUSTRY_MENTOR', 'Tata Steel CSR & Sustainability Cell', 'en'),
('a0000000-0000-0000-0000-000000000005', '+919876543214', 'evaluator.dhte@jharkhand.gov.in', 'Director Technical Education', 'EVALUATOR', 'DHTE Government of Jharkhand', 'hi')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.challenges (
    id, ticket_number, submitted_by, submission_channel, title, description,
    location, district, block, panchayat, upvotes_count, status, category_type,
    matched_domains, allocated_pool_inr, bidding_deadline
) VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'JAG-2026-PLM-0042',
    'a0000000-0000-0000-0000-000000000001',
    'WHATSAPP',
    'High Fluoride & Arsenic Contamination in Rural Handpumps',
    'Chapekal khon laal daah oḍok kan-a. Children developing dental and skeletal fluorosis across 3 tolas.',
    ST_SetSRID(ST_Point(84.18, 24.04), 4326),
    'Palamu', 'Daltonganj', 'Chianki',
    18, 'IN_PILOT', 'HEI_RESEARCH',
    ARRAY['Water Resources', 'Public Health', 'Chemical Engineering'],
    350000.00,
    NOW() - INTERVAL '60 days'
) ON CONFLICT (id) DO NOTHING;
