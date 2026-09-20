-- =====================================================================================
-- JAGRIT MASTER SEED DATA (v14.1.0-PROD)
-- Contains 4 Realistic Jharkhand Fixtures, Universities, Trustees, and Master Blueprints
-- =====================================================================================

-- 1. Seed Universities
INSERT INTO public.universities (id, name, domains_supported, certified_labs, max_project_capacity, active_projects, has_pesa_cell, h_score) VALUES
('b1111111-0000-0000-0000-000000000001', 'Birla Institute of Technology (BIT), Mesra', ARRAY['water_resources', 'chemical_engineering', 'environment'], ARRAY['NABL_water_lab', 'nanomaterials_center'], 10, 6, TRUE, 95),
('b2222222-0000-0000-0000-000000000002', 'Birsa Agricultural University (BAU), Ranchi', ARRAY['agriculture', 'rural_livelihoods', 'forestry'], ARRAY['soil_testing_lab', 'agro_processing_center'], 8, 7, TRUE, 100),
('b3333333-0000-0000-0000-000000000003', 'National Institute of Technology (NIT), Jamshedpur', ARRAY['energy', 'urban_infra', 'mechanical'], ARRAY['solar_microgrid_lab', 'high_voltage_lab'], 8, 5, FALSE, 100),
('b4444444-0000-0000-0000-000000000004', 'IIT (ISM) Dhanbad', ARRAY['mining', 'environment', 'geology'], ARRAY['acid_mine_drainage_lab', 'geo_spatial_center'], 12, 4, TRUE, 100)
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Users
INSERT INTO public.users (id, phone, email, full_name, role, institution_name, preferred_language) VALUES
('a0000000-0000-0000-0000-000000000001', '+919876543210', 'somra.oraon@jharkhand.in', 'Somra Oraon', 'CITIZEN', 'Kanke Gram Panchayat', 'sat'),
('a0000000-0000-0000-0000-000000000002', '+919876543211', 'dr.verma@bitmesra.ac.in', 'Dr. Alok Verma', 'FACULTY_PI', 'Birla Institute of Technology, Mesra', 'hi'),
('a0000000-0000-0000-0000-000000000003', '+919876543212', 'dr.k.singh@bau.ac.in', 'Dr. K. Singh', 'FACULTY_PI', 'Birsa Agricultural University', 'hi'),
('a0000000-0000-0000-0000-000000000004', '+919876543213', 'csr.lead@tatasteel.com', 'Dr. A. Sen', 'INDUSTRY_MENTOR', 'Tata Steel CSR Division', 'en'),
('a0000000-0000-0000-0000-000000000005', '+919876543214', 'evaluator.dhte@jharkhand.gov.in', 'State Evaluator (DHTE)', 'EVALUATOR', 'DHTE Government of Jharkhand', 'en')
ON CONFLICT (id) DO NOTHING;

-- 3. Seed Incident Clusters (Deduplication Master Groups)
INSERT INTO public.incident_clusters (id, cluster_code, title, thematic_domain, complexity_tier, centroid_location, district, report_velocity, priority_score, status) VALUES
('c1111111-0000-0000-0000-000000000001', 'CLUST-PLM-0082', 'High Fluoride Contamination in Borewell', 'water_resources', 'TIER_3_APPLIED_RND', ST_SetSRID(ST_Point(84.18, 24.04), 4326), 'Palamu', 19, 94.50, 'OPEN_FOR_PRIORITIZATION'),
('c2222222-0000-0000-0000-000000000002', 'CLUST-KHT-0014', 'Post-Harvest Lac Produce Spoilage', 'agriculture', 'TIER_2_MECHANICAL', ST_SetSRID(ST_Point(85.28, 23.07), 4326), 'Khunti', 34, 88.20, 'OPEN_FOR_PRIORITIZATION'),
('c3333333-0000-0000-0000-000000000003', 'CLUST-WSH-0031', 'Rural Dispensary Solar Battery Degradation', 'energy', 'TIER_2_MECHANICAL', ST_SetSRID(ST_Point(85.81, 22.55), 4326), 'West Singhbhum', 27, 85.00, 'OPEN_FOR_PRIORITIZATION'),
('c4444444-0000-0000-0000-000000000004', 'CLUST-DHN-0055', 'Acid Mine Drainage Contaminating Stream', 'environment', 'TIER_3_APPLIED_RND', ST_SetSRID(ST_Point(86.43, 23.79), 4326), 'Dhanbad', 52, 96.00, 'OPEN_FOR_PRIORITIZATION')
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Individual Challenges (Linked to Clusters)
INSERT INTO public.challenges (id, ticket_number, cluster_id, submitted_by, submission_channel, title, description, location, district, upvotes_count, status, allocated_pool_inr) VALUES
('d1111111-0000-0000-0000-000000000001', 'JAG-2026-PLM-0082', 'c1111111-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'WHATSAPP', 'High Fluoride Contamination in Borewell', 'Chapekal khon laal daah odok kan-a. Children developing dental and skeletal fluorosis across 3 tolas.', ST_SetSRID(ST_Point(84.18, 24.04), 4326), 'Palamu', 19, 'IN_PILOT', 350000.00),
('d2222222-0000-0000-0000-000000000002', 'JAG-2026-KHT-0014', 'c2222222-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'APP', 'Tribal Lac & Tussar Silk Spoilage', 'Heavy humidity causing fungal rot in harvested lac.', ST_SetSRID(ST_Point(85.28, 23.07), 4326), 'Khunti', 34, 'DYNAMIC_HACKATHON', 250000.00),
('d3333333-0000-0000-0000-000000000003', 'JAG-2026-WSH-0031', 'c3333333-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'WEB', 'Solar Microgrid Battery Failure at Clinic', 'Vaccine refrigerators failing due to voltage spikes.', ST_SetSRID(ST_Point(85.81, 22.55), 4326), 'West Singhbhum', 27, 'DIRECT_RND', 400000.00),
('d4444444-0000-0000-0000-000000000004', 'JAG-2026-DHN-0055', 'c4444444-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'WHATSAPP', 'Acid Mine Runoff in Drinking Stream', 'Coal washery effluent dropping pH to 3.8.', ST_SetSRID(ST_Point(86.43, 23.79), 4326), 'Dhanbad', 52, 'IN_PILOT', 500000.00)
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Projects (The Active Research Grants)
INSERT INTO public.projects (id, challenge_id, execution_mode, lead_university_id, lead_university_name, pi_faculty_id, total_budget_inr, tranche_1_disbursed, tranche_2_disbursed, tranche_3_disbursed, resolution_status) VALUES
('p1111111-0000-0000-0000-000000000001', 'd1111111-0000-0000-0000-000000000001', 'DYNAMIC_HACKATHON', 'b1111111-0000-0000-0000-000000000001', 'Birla Institute of Technology (BIT), Mesra', 'a0000000-0000-0000-0000-000000000002', 350000.00, TRUE, TRUE, TRUE, 'IN_PROGRESS'),
('p2222222-0000-0000-0000-000000000002', 'd2222222-0000-0000-0000-000000000002', 'DYNAMIC_HACKATHON', 'b2222222-0000-0000-0000-000000000002', 'Birsa Agricultural University (BAU), Ranchi', 'a0000000-0000-0000-0000-000000000003', 250000.00, TRUE, FALSE, FALSE, 'IN_PROGRESS')
ON CONFLICT (id) DO NOTHING;

-- 6. Seed Project Trustees (The 5 Designated Community Trustees for Palamu - Key 1)
INSERT INTO public.project_trustees (project_id, trustee_role, full_name, phone_hashed, verification_vote) VALUES
('p1111111-0000-0000-0000-000000000001', 'SCHOOL_HEADMASTER', 'Anand Kumar', 'hash1', NULL),
('p1111111-0000-0000-0000-000000000001', 'PRI_WARD_MEMBER', 'Manoj Tirkey', 'hash2', NULL),
('p1111111-0000-0000-0000-000000000001', 'INDEPENDENT_GRAM_SABHA_MEMBER', 'Ramesh Munda', 'hash3', NULL),
('p1111111-0000-0000-0000-000000000001', 'BENEFICIARY_SC_ST_1', 'Somra Oraon', 'hash4', NULL),
('p1111111-0000-0000-0000-000000000001', 'BENEFICIARY_CITIZEN_2', 'Budhni Devi', 'hash5', NULL)
ON CONFLICT DO NOTHING;

-- 7. Seed 1-Click Solution Blueprints
INSERT INTO public.verified_blueprints (blueprint_code, title, thematic_domain, developed_by_heis, bom_json, capital_cost_inr, mean_quorum_rating) VALUES
('BP-WTR-004', 'Gravity-Fed Solar Activated Alumina Defluoridation Unit', 'water_resources', ARRAY['BIT Mesra'], '{"items": [{"name": "Solar Pump", "cost": 45000}, {"name": "Activated Alumina", "cost": 70000}]}'::jsonb, 240000.00, 91.3)
ON CONFLICT (blueprint_code) DO NOTHING;