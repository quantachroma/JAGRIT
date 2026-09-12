# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Product Name:** JAGRIT (*Jharkhand Academic & Grassroots Resolution Innovation Technology*)  
**Document Version:** 1.0.0-PROD  
**Target Organization:** Department of Higher & Technical Education (DHTE), Government of Jharkhand  
**Theme:** Smart Education / Societal Innovation / NEP 2020  
**Target Repository File:** `prd.md`  

---

## 1. Document Control & Metadata

| Attribute | Specification |
| :--- | :--- |
| **Document Owner** | Lead Systems Architect & Product Engineering Team |
| **Target Stakeholders** | DHTE (Govt of Jharkhand), State HEIs, Corporate CSR Cells, Gram Panchayats, Urban Local Bodies |
| **Status** | Production-Ready Architectural Baseline |
| **Compliance Mandates** | NEP 2020 (National Credit Framework - NCrF), Companies Act 2013 (Section 135 / Schedule VII), PESA Act 1996, DPDP Act 2023 |

---

## 2. Executive Summary & Problem Context

Communities across Jharkhand encounter chronic, localized challenges spanning drinking water contamination (arsenic, fluoride, iron), agricultural post-harvest decay, artisanal livelihood bottlenecks (lac, tussar silk, minor forest produce), and public sanitation. While citizens are the first to detect these breakdowns, no structured, accessible mechanism exists to capture and channel these challenges for systematic engineering and scientific resolution.

Higher Education Institutions (HEIs) possess research laboratories, academic faculty, and a large student population. However, academic research remains largely disconnected from grassroots community needs due to fragmented institutional collaboration. 

**JAGRIT** bridges this divide by delivering a closed-loop platform that:
1. Crowdsources challenges through low-barrier interfaces: Native App, Web, and a **WhatsApp Voice Bot in Hindi and Santhali** (Devanagari and Ol Chiki scripts).
2. Uses AI for computer vision defect detection, geospatial proximity deduplication, and triage (Civic Maintenance vs. Applied Innovation).
3. Routes research challenges to verified HEIs through an **Explainable AI (XAI)** capability matchmaker.
4. Activates a **3-Round Dynamic Hackathon** whenever two or more universities accept the same challenge.
5. Backs project execution through **tranche-based escrow funding** (Government Innovation Pool + Corporate CSR Co-funding under Schedule VII).
6. Deposits **NEP 2020 Academic Credits** into students' official APAAR / Academic Bank of Credits (ABC) accounts.
7. Validates field pilots via an unassisted **45-day maturation buffer** followed by a **statistically calculated, population-weighted citizen feedback quorum**.
8. Indexes failed projects into an **R&D Failure Repository** to preserve technical learnings, while routing systemic state failures to a **Bi-Annual Pan-India National Hackathon**.

---

## 3. Product Vision, Objectives & Success Metrics (KPIs)

### 3.1 Vision Statement
To establish a self-sustaining innovation engine for Jharkhand that transforms grassroots societal challenges into accredited academic research, deployable field technologies, student-led commercial startups, and accountable public administration.

### 3.2 Strategic Objectives & Target Metrics

code
Markdown
# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Product Name:** JAGRIT (*Jharkhand Academic & Grassroots Resolution Innovation Technology*)  
**Document Version:** 1.0.0-PROD  
**Target Organization:** Department of Higher & Technical Education (DHTE), Government of Jharkhand  
**Theme:** Smart Education / Societal Innovation / NEP 2020  
**Target Repository File:** `prd.md`  

---

## 1. Document Control & Metadata

| Attribute | Specification |
| :--- | :--- |
| **Document Owner** | Lead Systems Architect & Product Engineering Team |
| **Target Stakeholders** | DHTE (Govt of Jharkhand), State HEIs, Corporate CSR Cells, Gram Panchayats, Urban Local Bodies |
| **Status** | Production-Ready Architectural Baseline |
| **Compliance Mandates** | NEP 2020 (National Credit Framework - NCrF), Companies Act 2013 (Section 135 / Schedule VII), PESA Act 1996, DPDP Act 2023 |

---

## 2. Executive Summary & Problem Context

Communities across Jharkhand encounter chronic, localized challenges spanning drinking water contamination (arsenic, fluoride, iron), agricultural post-harvest decay, artisanal livelihood bottlenecks (lac, tussar silk, minor forest produce), and public sanitation. While citizens are the first to detect these breakdowns, no structured, accessible mechanism exists to capture and channel these challenges for systematic engineering and scientific resolution.

Higher Education Institutions (HEIs) possess research laboratories, academic faculty, and a large student population. However, academic research remains largely disconnected from grassroots community needs due to fragmented institutional collaboration. 

**JAGRIT** bridges this divide by delivering a closed-loop platform that:
1. Crowdsources challenges through low-barrier interfaces: Native App, Web, and a **WhatsApp Voice Bot in Hindi and Santhali** (Devanagari and Ol Chiki scripts).
2. Uses AI for computer vision defect detection, geospatial proximity deduplication, and triage (Civic Maintenance vs. Applied Innovation).
3. Routes research challenges to verified HEIs through an **Explainable AI (XAI)** capability matchmaker.
4. Activates a **3-Round Dynamic Hackathon** whenever two or more universities accept the same challenge.
5. Backs project execution through **tranche-based escrow funding** (Government Innovation Pool + Corporate CSR Co-funding under Schedule VII).
6. Deposits **NEP 2020 Academic Credits** into students' official APAAR / Academic Bank of Credits (ABC) accounts.
7. Validates field pilots via an unassisted **45-day maturation buffer** followed by a **statistically calculated, population-weighted citizen feedback quorum**.
8. Indexes failed projects into an **R&D Failure Repository** to preserve technical learnings, while routing systemic state failures to a **Bi-Annual Pan-India National Hackathon**.

---

## 3. Product Vision, Objectives & Success Metrics (KPIs)

### 3.1 Vision Statement
To establish a self-sustaining innovation engine for Jharkhand that transforms grassroots societal challenges into accredited academic research, deployable field technologies, student-led commercial startups, and accountable public administration.

### 3.2 Strategic Objectives & Target Metrics
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STRATEGIC SUCCESS KPIS │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ Core Metric Objective │ Baseline Target (Year 1) │ Verification Mechanism │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Problem Ingestion Volume │ ≥ 5,000 Verified Tickets │ PostGIS Deduplication DB │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Rural Voice Accessibility│ ≥ 45% Submissions via │ WhatsApp Gateway Logs │
│ │ Hindi/Santhali Voice Note │ (Whisper Inference Engine) │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ HEI Research Engagement │ ≥ 30 State & Central HEIs │ Institutional SSO Auth Logs │
│ │ with Active Teams │ │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Corporate CSR Mobilized │ ≥ ₹5.00 Crore Escrow Pool │ PFMS Bank Reconciliation / │
│ │ Committed │ Form CSR-1 Receipts Issued │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Student NEP Credits │ ≥ 10,000 Academic Credits │ Digilocker / ABC API Webhook │
│ │ Deposited │ Confirmation Tokens │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Field Resolution Rate │ ≥ 60% Validated "Solved" │ Day 45 AI Population Quorum │
│ │ after 45-Day Citizen Quorum │ Voting Engine │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘


code
Markdown
# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Product Name:** JAGRIT (*Jharkhand Academic & Grassroots Resolution Innovation Technology*)  
**Document Version:** 1.0.0-PROD  
**Target Organization:** Department of Higher & Technical Education (DHTE), Government of Jharkhand  
**Theme:** Smart Education / Societal Innovation / NEP 2020  
**Target Repository File:** `prd.md`  

---

## 1. Document Control & Metadata

| Attribute | Specification |
| :--- | :--- |
| **Document Owner** | Lead Systems Architect & Product Engineering Team |
| **Target Stakeholders** | DHTE (Govt of Jharkhand), State HEIs, Corporate CSR Cells, Gram Panchayats, Urban Local Bodies |
| **Status** | Production-Ready Architectural Baseline |
| **Compliance Mandates** | NEP 2020 (National Credit Framework - NCrF), Companies Act 2013 (Section 135 / Schedule VII), PESA Act 1996, DPDP Act 2023 |

---

## 2. Executive Summary & Problem Context

Communities across Jharkhand encounter chronic, localized challenges spanning drinking water contamination (arsenic, fluoride, iron), agricultural post-harvest decay, artisanal livelihood bottlenecks (lac, tussar silk, minor forest produce), and public sanitation. While citizens are the first to detect these breakdowns, no structured, accessible mechanism exists to capture and channel these challenges for systematic engineering and scientific resolution.

Higher Education Institutions (HEIs) possess research laboratories, academic faculty, and a large student population. However, academic research remains largely disconnected from grassroots community needs due to fragmented institutional collaboration. 

**JAGRIT** bridges this divide by delivering a closed-loop platform that:
1. Crowdsources challenges through low-barrier interfaces: Native App, Web, and a **WhatsApp Voice Bot in Hindi and Santhali** (Devanagari and Ol Chiki scripts).
2. Uses AI for computer vision defect detection, geospatial proximity deduplication, and triage (Civic Maintenance vs. Applied Innovation).
3. Routes research challenges to verified HEIs through an **Explainable AI (XAI)** capability matchmaker.
4. Activates a **3-Round Dynamic Hackathon** whenever two or more universities accept the same challenge.
5. Backs project execution through **tranche-based escrow funding** (Government Innovation Pool + Corporate CSR Co-funding under Schedule VII).
6. Deposits **NEP 2020 Academic Credits** into students' official APAAR / Academic Bank of Credits (ABC) accounts.
7. Validates field pilots via an unassisted **45-day maturation buffer** followed by a **statistically calculated, population-weighted citizen feedback quorum**.
8. Indexes failed projects into an **R&D Failure Repository** to preserve technical learnings, while routing systemic state failures to a **Bi-Annual Pan-India National Hackathon**.

---

## 3. Product Vision, Objectives & Success Metrics (KPIs)

### 3.1 Vision Statement
To establish a self-sustaining innovation engine for Jharkhand that transforms grassroots societal challenges into accredited academic research, deployable field technologies, student-led commercial startups, and accountable public administration.

### 3.2 Strategic Objectives & Target Metrics
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STRATEGIC SUCCESS KPIS │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ Core Metric Objective │ Baseline Target (Year 1) │ Verification Mechanism │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Problem Ingestion Volume │ ≥ 5,000 Verified Tickets │ PostGIS Deduplication DB │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Rural Voice Accessibility│ ≥ 45% Submissions via │ WhatsApp Gateway Logs │
│ │ Hindi/Santhali Voice Note │ (Whisper Inference Engine) │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ HEI Research Engagement │ ≥ 30 State & Central HEIs │ Institutional SSO Auth Logs │
│ │ with Active Teams │ │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Corporate CSR Mobilized │ ≥ ₹5.00 Crore Escrow Pool │ PFMS Bank Reconciliation / │
│ │ Committed │ Form CSR-1 Receipts Issued │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Student NEP Credits │ ≥ 10,000 Academic Credits │ Digilocker / ABC API Webhook │
│ │ Deposited │ Confirmation Tokens │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Field Resolution Rate │ ≥ 60% Validated "Solved" │ Day 45 AI Population Quorum │
│ │ after 45-Day Citizen Quorum │ Voting Engine │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
code
Code
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ROLE-BASED ACCESS CONTROL (RBAC) │
├─────────────────┬─────────────────┬────────────────────────────────────────────────────┤
│ User Role │ Auth Gateway │ Permitted Platform Operations │
├─────────────────┼─────────────────┼────────────────────────────────────────────────────┤
│ Citizen │ Phone OTP / │ Submit multimedia problems; upvote nearby issues │
│ │ WhatsApp Auth │ (<30 km); submit 45-day feedback votes. │
├─────────────────┼─────────────────┼────────────────────────────────────────────────────┤
│ PRI / Authority │ Jan Parichay / │ Upload Institutional Problem Dossiers (CSVs/PDFs); │
│ (Mukhiya/BDO) │ Gov Email │ upload Gram Sabha PESA NOCs; sign O&M handovers. │
├─────────────────┼─────────────────┼────────────────────────────────────────────────────┤
│ Student │ APAAR/ABC ID / │ Join HEI project teams; access R&D Copilot; submit │
│ Innovator │ Inst. SSO │ hackathon artifacts; view earned academic credits. │
├─────────────────┼─────────────────┼────────────────────────────────────────────────────┤
│ Faculty PI │ Institutional │ Form project teams; sign off workhours; authorize │
│ │ Email / SSO │ DPR budgets; receive UGC-CAS points. │
├─────────────────┼─────────────────┼────────────────────────────────────────────────────┤
│ Industry Mentor │ Corporate 2FA / │ Pledge CSR funds; conduct technical mentor reviews;│
│ / CSR Partner │ ROC Verified ID │ access talent recruitment pipelines and ROFR IP. │
├─────────────────┼─────────────────┼────────────────────────────────────────────────────┤
│ State Evaluator │ DHTE Govt SSO / │ Audit AI triage; override classifications; adjust │
│ │ Digital e-Sign │ escrow pools; approve milestone tranche payouts. │
└─────────────────┴─────────────────┴────────────────────────────────────────────────────┘

---

## 5. Master System State Machine & Lifecycle Flow
┌────────────────────────────────────────┐
                         │       MULTI-CHANNEL INGESTION          │
                         │ • Citizen App / Web                    │
                         │ • WhatsApp Voice (Hindi / Santhali)    │
                         │ • PRI / Govt Institutional Dossier     │
                         └───────────────────┬────────────────────┘
                                             │
                                             ▼
                         ┌────────────────────────────────────────┐
                         │       AI INGESTION & TRIAGE GATE       │
                         │ • Multilingual ASR Audio Parsing       │
                         │ • Vision Transformer (ViT) Scanner     │
                         │ • PostGIS Spatial Radar (500m Buffer)  │
                         └───────────────────┬────────────────────┘
                                             │
                                             ▼
                         ┌────────────────────────────────────────┐
                         │        HITL EVALUATOR CONSOLE          │
                         │ • Civic Routine ➔ Forward to ULB API   │
                         │ • Applied R&D   ➔ Allocate State + CSR │
                         │                   Escrow Pool (10 Days)│
                         └───────────────────┬────────────────────┘
                                             │
                                             ▼
                         ┌────────────────────────────────────────┐
                         │      INSTITUTIONAL MATCHING GATE       │
                         │ • Explainable AI Compatibility Score   │
                         │ • Solo Bid, Joint Consortium, or       │
                         │   Dynamic Hackathon (≥ 2 HEIs)         │
                         └───────────────────┬────────────────────┘
                                             │
                                             ▼
                         ┌────────────────────────────────────────┐
                         │         EXECUTION & MILESTONES         │
                         │ • 3-Stage Dynamic Hackathon Arena      │
                         │ • Escrow Releases: 30% ➔ 40% ➔ 30%     │
                         │ • Automated SLA Default & Clawback     │
                         │ • PESA Gram Sabha NOC & O&M Handover   │
                         └───────────────────┬────────────────────┘
                                             │
                                             ▼
                         ┌────────────────────────────────────────┐
                         │      NEP 2020 ACADEMIC INCENTIVES      │
                         │ • Workhours logged (30 hrs = 1 Credit) │
                         │ • 2–4 Credits pushed to APAAR/ABC      │
                         │ • Faculty UGC-CAS API points awarded   │
                         └───────────────────┬────────────────────┘
                                             │
                                             ▼
                         ┌────────────────────────────────────────┐
                         │        45-DAY MATURATION BUFFER        │
                         │ • Unassisted, continuous community use │
                         └───────────────────┬────────────────────┘
                                             │
                                             ▼
                         ┌────────────────────────────────────────┐
                         │     14-DAY CITIZEN FEEDBACK QUORUM     │
                         │ • AI Population-Weighted Quorum Met    │
                         │ • NLP separates Core vs Cosmetic       │
                         └───────────────────┬────────────────────┘
                                             │
                   ┌─────────────────────────┼─────────────────────────┐
                   ▼                         ▼                         ▼
          [ 100% SOLVED ]           [ PARTIALLY SOLVED ]       [ FAILED PROJECT ]
          • Ticket closed           • 45-day iterative repair  • Root-cause post-mortem
          • Startup Incubation        sprint for same team     • Minor ➔ R&D Repo
            & Seed Grants           • Re-tested after sprint   • Major ➔ National
          • Tripartite IPR Handover                              Pan-India Hackathon


          ---

## 6. End-to-End User Flows (Step-by-Step Journeys)

### 6.1 Journey 1: Citizen Ingestion via WhatsApp (Multilingual Voice)
1. The citizen sends a voice message or photo to the JAGRIT WhatsApp Cloud API endpoint.
2. The conversational agent auto-detects language preference (Hindi, Santhali, English).
3. Inbound audio binary is forwarded to the fine-tuned Whisper/Bhashini ASR pipeline.
4. Citizen is prompted via automated WhatsApp message to drop their live GPS location pin.
5. The system performs a $500\text{ m}$ spatial radius check against existing tickets.
6. If unique: Creates Ticket `#JAG-YYYY-DIST-XXXX` and returns an SMS/WhatsApp tracking URL.
7. If duplicate ($\ge 85\%$ semantic similarity within $500\text{ m}$): Automatically merges the media into the existing ticket, increments the upvote counter by 1, and notifies the citizen.

### 6.2 Journey 2: Evaluator Audit & University Allocation
1. The submission enters the Evaluator Triage Queue.
2. The evaluator views the AI confidence gauge and classification:
   * **Civic Routine:** Dispatched via webhook to ULB/JharSewa; ticket closed on JAGRIT.
   * **Applied R&D:** Evaluator authorizes the state innovation grant pool ceiling (e.g., ₹3,50,000) and unlocks corporate CSR co-sponsorship.
3. The matching engine broadcasts the challenge to qualified institutions based on lab facilities, faculty patents, and department specializations.
4. A **10-day bidding window** countdown initiates.

### 6.3 Journey 3: University Bidding & Dynamic Hackathon Mode
1. **Condition A: Exactly 1 HEI Bids:**
   * The challenge transitions to **Direct R&D Track**.
   * Work Breakdown Structure (WBS) locked; Tranche 1 ($30\%$) is disbursed to the university project account.
2. **Condition B: Two or More HEIs Bid:**
   * The challenge automatically upgrades to **Dynamic Hackathon Track**.
   * **Round 1 (Ideation):** Teams submit a 5-slide pitch deck (PDF) and video approach summary within 14 days. Evaluators review and shortlist the top 3–5 teams.
   * **Round 2 (Mentoring & Prototype):** Teams collaborate with an assigned Industry Mentor, document two virtual review sprints, and submit bench-scale test telemetry. Evaluators advance the top 2 teams.
   * **Round 3 (DPR & Physical Defense):** Teams submit a Detailed Project Report (DPR) with a Bill of Materials (BOM), line-item cost justifications, and an operational risk matrix. Teams present physically at DHTE headquarters in Ranchi.
3. The jury evaluates teams on **Feasibility (40%)**, **Sustainability (30%)**, and **Cost (30%)**. The winning team takes over project execution and unlocks Tranche 1 funding.

### 6.4 Journey 4: Field Pilot Deployment, O&M Handover & PESA Compliance
1. The team completes bench prototype fabrication (Tranche 2 disbursed after NABL test validation).
2. For Scheduled Area deployments, the Panchayat Secretary (Sachiv) uploads the signed **Gram Sabha Resolution / NOC** under the PESA Act 1996.
3. The team installs the physical hardware on site.
4. The team executes the **O&M Handover Protocol**: trains at least two local Village Level Entrepreneurs (VLEs) or Jal Sahiyas, provides an illustrated vernacular SOP, and hands over a 12-month spare parts kit (Tranche 3 disbursed).
5. Student hours are certified by the Faculty PI; **2 to 4 NEP Credits** are pushed to students' APAAR / ABC transcripts.

### 6.5 Journey 5: 45-Day Maturation Buffer & Citizen Feedback Loop
1. System initiates an unassisted **45-day operational maturation buffer**.
2. On Day 46, a 14-day feedback window opens for citizens within a $1.5\text{ km}$ radius.
3. The AI estimates local settlement population density to enforce the required minimum quorum ($\text{Quorum}_{\min}$).
4. Citizens vote on two tiers: Core Operational Functionality (`YES` / `NO`) and qualitative feedback.
5. Qualitative feedback is processed by an NLP sentiment engine:
   * **$\ge 70\%$ Pass Rate:** Marked `COMPLETELY_SOLVED`. Project enters the Startup Incubation Pipeline.
   * **$\ge 30\%$ Critical Defects:** Marked `PARTIALLY_SOLVED`. A **45-day maintenance sprint** is assigned to the original team.
   * **Total Operational Failure:** Marked `FAILED`. Project routes to the R&D Post-Mortem Engine:
     * *Minor Failures:* Indexed in the R&D Failure Repository.
     * *Major Failures:* Escalated to the Bi-Annual Pan-India National Hackathon.

---

## 7. Comprehensive Functional Requirements (Module-by-Module)

### Module 1: Ingestion Engine (Citizen & Institutional)

* **FR-1.1 (WhatsApp Conversational Bot):**
  * Must interface with the Meta WhatsApp Cloud API via a dedicated webhook endpoint.
  * Must support conversational interactions in English, Hindi, and Santhali (Devanagari script and Latin/Ol Chiki phonetic transliterations).
  * Must parse inbound audio notes ($<2\text{ MB}$), forward binaries to the speech engine, and extract live location coordinates.
* **FR-1.2 (Web/Mobile Submission Studio):**
  * File upload supports up to 4 compressed JPEG/PNG images ($\le 5\text{ MB}$ each) and 1 MP4 video ($\le 30\text{ s}$, $\le 25\text{ MB}$).
  * Auto-geotagging uses HTML5 Geolocation API with interactive MapmyIndia/Leaflet pin adjustment.
* **FR-1.3 (Institutional Problem Dossier Mode):**
  * Authenticated interface for PRIs, BDOs, and Urban Local Bodies.
  * Allows bulk data attachments (CSV, XLSX, PDF) for water test histories, crop failure epidemiology data, and demographic surveys.
  * Bypasses the 14-day community upvoting period and routes directly to the Evaluator Queue.

### Module 2: AI Triage, Ingestion & Deduplication

* **FR-2.1 (Speech Recognition - ASR):**
  * Uses a fine-tuned Whisper-large-v3 / Bhashini pipeline to process Hindi and Santhali voice notes.
  * Converts audio to standardized English and Hindi text descriptions with a Word Error Rate (WER) $\le 14\%$ on regional dialects.
* **FR-2.2 (Visible Computer Vision Scanner):**
  * Client-side UI shows an animated green scanning line over uploaded media for $1.5\text{ s}$.
  * YOLOv8 / ViT inference identifies damage bounding boxes (e.g., *“Corroded Casing: 92%”*, *“Algal Bloom: 87%”*).
* **FR-2.3 (Geospatial & Semantic Deduplication Radar):**
  * Computes $1536$-dimension text embeddings using `text-embedding-3-large`.
  * Queries PostGIS for open tickets within a $500\text{ m}$ radius:
    ```sql
    ST_DWithin(location, ST_SetSRID(ST_Point(:lon, :lat), 4326), 500)
    ```
  * Computes cosine similarity between description embeddings:
    $$\text{Similarity} = 1 - (\vec{A} \cdot \vec{B})$$
  * If $\text{Distance} \le 500\text{ m}$ and $\text{Similarity} \ge 0.85$, the incoming report is marked a duplicate.
  * The system merges the new media into the master ticket, increments its upvote counter by 1, and sends a notification to the user:  
    *"Your issue has been merged into Ticket #XYZ and prioritized."*
* **FR-2.4 (Civic vs R&D Triage):**
  * Zero-shot DeBERTa-v3 classifier categorizes issues into:
    * **Type A: Civic Routine:** Forwarded via webhook to the Urban Local Body or JharSewa municipal maintenance portal.
    * **Type B: Applied Innovation R&D:** Flagged for Human-in-the-Loop Evaluator review and assigned to the HEI research pool.

### Module 3: Evaluator Command & Institutional Allocation

* **FR-3.1 (HITL Evaluator Deck):**
  * Split-screen interface showing citizen media, audio transcripts, OCR-extracted text, and AI confidence rings.
  * Allows 1-click confirmation or override of classification and suggested budgets.
* **FR-3.2 (Explainable AI Matchmaker):**
  * Evaluates institutional metadata (NABL accredited labs, faculty patent history, NIRF rank, geographic proximity) using cosine matching against challenge requirements.
  * Displays an interactive 5-axis spider/radar chart justifying the match on the university's dashboard.
* **FR-3.3 (Bidding Window & Dynamic Branching Engine):**
  * Validated challenges display an active **10-day countdown timer**.
  * **Branch 1 (Solo Acceptance):** Exactly 1 HEI accepts $\rightarrow$ Routes to **Direct R&D Track**.
  * **Branch 2 (Multi-HEI Acceptance):** $\ge 2$ HEIs accept $\rightarrow$ Routes to **Dynamic Hackathon Track**.
  * **Branch 3 (Consortium Bid):** Two complementary colleges (e.g., Engineering + Agronomy) submit a joint bid with custom work-share percentages.

### Module 4: Dynamic Hackathon Execution Engine

* **FR-4.1 (Round 1: Ideation & Architecture):**
  * Competing teams submit a 5-slide pitch deck (PDF) and a 2-minute video overview within 14 days.
  * Evaluators review and score submissions, shortlisting the top 3–5 teams based on technical feasibility and innovation.
* **FR-4.2 (Round 2: Mentoring & Functional Prototyping):**
  * Teams are paired with an assigned Industry Mentor (from Tata Steel, CCL, etc.).
  * Requires at least two documented virtual mentoring sessions and submission of lab bench test data.
  * Evaluators advance the top 2 teams to the final round.
* **FR-4.3 (Round 3: DPR, BOM & Physical Defense):**
  * Teams submit a Detailed Project Report (DPR) itemizing component costs, a Bill of Materials (BOM), and an operational risk matrix.
  * Teams physically present their working prototypes at DHTE headquarters in Ranchi.
  * Final jury scores submissions: **Feasibility (40%)**, **Sustainability (30%)**, and **Cost Effectiveness (30%)**.
  * The winning team assumes primary responsibility for field deployment and unlocks Tranche 1 funding.

### Module 5: Tranche Funding & Escrow Governance

* **FR-5.1 (Consortium Escrow Pool):**
  * Projects are funded through a combined escrow account backed by the DHTE State Innovation Fund and corporate CSR matching grants (Schedule VII, Section 135 compliant).
* **FR-5.2 (Milestone-Based Tranche Disbursement):**
  * **Tranche 1 (30%):** Disbursed upon DPR approval for equipment, raw materials, and sensor acquisition.
  * **Tranche 2 (40%):** Disbursed upon upload of verified bench prototype test data and NABL-accredited laboratory safety certification.
  * **Tranche 3 (30%):** Disbursed upon successful field installation, local operator training, and upload of the signed Gram Sabha PESA NOC.
* **FR-5.3 (SLA Default & Escrow Clawback Protocol):**
  * Automated cron jobs check milestone delivery dates daily.
  * If a milestone is unfulfilled past the deadline:
    * *Day +7:* Warning alert sent to Faculty PI and student leads.
    * *Day +14:* Escalation notice sent to the Dean of R&D and Vice-Chancellor's office.
    * *Day +30:* Project is placed in `DEFAULT` status. The institution is suspended from platform bidding for 1 academic year, unspent Tranche 1 funds are clawed back to the state escrow, and the challenge returns to the open bidding pool.

### Module 6: NEP 2020 Academic Credit Integration

* **FR-6.1 (APAAR / ABC Integration):**
  * Students register using their 12-digit APAAR / ABC ID.
  * System tracks verified work hours: **$30\text{ hours of verified effort} = 1\text{ Academic Credit}$**.
* **FR-6.2 (Automated Credit Issuance):**
  * Upon successful field deployment sign-off, the system generates an official XML/JSON credit award payload.
  * Automatically pushes 2 to 4 credits into the student's National Academic Depository (NAD) / DigiLocker transcript under *Experiential Learning / Community Engagement*.
* **FR-6.3 (Faculty UGC-CAS API Calculation):**
  * Generates an official state-signed certificate awarding the Faculty PI formal API points for sponsored R&D and community extension, as recognized for career advancement under UGC rules.

### Module 7: Field Maturation, AI Quorum & Citizen Feedback

* **FR-7.1 (45-Day Maturation Buffer):**
  * An automated 45-day timer starts on the day field deployment is confirmed.
  * The system remains open to continuous community use during this period to surface any issues caused by environmental wear or heavy utilization.
* **FR-7.2 (AI Population-Weighted Quorum):**
  * System extracts population estimates ($N$) within a $1.5\text{ km}$ radius of the site using GIS Census/Panchayat data:
    $$\text{Quorum}_{\min} = \max\left(15, \; \text{Ceil}\left(k \cdot \sqrt{N}\right)\right)$$
  * Feedback voting is restricted to citizens located within that geo-fenced radius.
* **FR-7.3 (Structured Feedback & NLP Filtering):**
  * Citizens vote via WhatsApp or the mobile app across two tiers:
    1. *Primary Functionality:* "Is the installation working and safe to use?" (`YES` / `NO`).
    2. *Voice/Text Feedback:* Categorized by a RoBERTa NLP model into:
       * **Critical Defects:** Component failures, water toxicity, electrical hazards.
       * **Cosmetic Grievances:** Paint chipping, tight valves, preferred alternative placement.
* **FR-7.4 (Lifecycle Routing based on Feedback):**
  * **Completely Solved:** $\ge 70\%$ positive votes with no critical defects. Ticket is closed and enters the Incubation Pipeline.
  * **Partially Solved:** Critical defect reports exceed $30\%$. An automated **45-day maintenance sprint** is assigned to the original team.
  * **Failed:** Complete operational failure. Project is routed to the R&D Post-Mortem Engine.

### Module 8: Post-Resolution, Failure Repository & Incubation

* **FR-8.1 (Incubation & Startup Spinoff Pipeline):**
  * Teams with completely solved projects receive direct placement into the nearest Atal Incubation Centre (AIC) or University Entrepreneurship Development Cell (EDC).
  * Automatically submits pre-filled applications for seed funding under the Jharkhand State Startup Policy (up to ₹10 Lakhs).
* **FR-8.2 (Model Tripartite IPR Concordat):**
  * Students and faculty retain exclusive moral rights as Inventors and hold majority equity ($\ge 60\%$) in any resulting spinoffs.
  * The university holds patent custody with a $20\text{--}30\%$ royalty share.
  * The industry CSR co-sponsor receives a Right of First Refusal (ROFR) for commercialization rights.
  * The Government of Jharkhand retains an irrevocable, royalty-free license for public deployments statewide.
* **FR-8.3 (R&D Failure Knowledge Base):**
  * Generates post-mortem records documenting attempted technical approaches, material failure modes, and lessons learned.
  * **Minor Failures:** Indexed in a searchable repository to warn future student teams against repeating ineffective designs.
  * **Major Failures:** High-stakes, unresolved challenges are tagged and promoted as official Problem Statements for the **Bi-Annual Pan-India National Hackathon**.
* **FR-8.4 ("Samvaad" Community Forum):**
  * A collaborative discussion feed where researchers, students, and citizens can share technical findings, propose design modifications, and request shared lab access across campuses.
  * Features an **AI Thread Summarizer** that condenses discussions into three key takeaways, along with real-time translation between English, Hindi, and Santhali.

---

## 8. Visible Frontend AI & Interactive UI/UX Specifications
┌────────────────────────────────────────────────────────────────────────┐
│ VISIBLE FRONTEND AI COMPONENTS │
├──────────────────────────┬─────────────────────────────────────────────┤
│ Component Name │ UI Wireframe & Visual Micro-Interaction │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 1. Live Multimodal │ Image upload triggers an animated laser │
│ Scanner │ sweep line for 1.5s, rendering green CV │
│ │ bounding boxes over detected defects with │
│ │ confidence tags (e.g., "Corrosion: 91%"). │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 2. Deduplication Radar │ Map renders a pulsing 500m radius ring │
│ │ around the user's pin. If a match is found, │
│ │ slides up a comparison card with a live │
│ │ semantic similarity score bar. │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 3. Explainable AI (XAI) │ Recharts-powered 5-axis spider/radar chart │
│ Match Scorecard │ displaying fit metrics (Labs, Patents, │
│ │ Distance, Faculty) with hover tooltips. │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 4. Student R&D Copilot │ Sidebar drawer in the proposal studio that │
│ Sidebar │ suggests regional alternative materials and │
│ │ cross-checks the R&D Failure Repository. │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 5. Evaluator Risk Meter │ Circular SVG gauge displaying AI confidence │
│ │ with color-coded boundaries: Red (<60%), │
│ │ Amber (60–85%), Green (>85%). │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 6. Quorum Progress Ring │ Real-time circular progress ring displaying │
│ │ verified citizen votes gathered against the │
│ │ statistically required minimum quorum. │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 7. Samvaad AI Summary & │ Accordion at the top of discussion threads │
│ Translation Pills │ showing a 3-bullet AI recap, with one-tap │
│ │ translation into Hindi and Santhali. │
└──────────────────────────┴─────────────────────────────────────────────┘

---

## 9. Role-Based Dashboard Wireframes & Interface Layouts

### 9.1 Citizen Submission Studio & Live Scanner Interface
┌────────────────────────────────────────────────────────────────────────┐
│ JAGRIT: NAGRIK SEVA PORTAL [ 📍 Kanke, Ranchi ] [ हिन्दी ⛛ ]│
├────────────────────────────────────────────────────────────────────────┤
│ 📷 UPLOAD PROBLEM EVIDENCE │
│ ┌─────────────────────────────────┐ │
│ │ [ GEO-TAGGED BOREWELL PHOTO ] │ ◄── CV Laser Sweep Scanning: │
│ │ ┌─────────────────────────┐ │ Bounding box drawn around │
│ │ │ 🟢 Iron Effluent: 94% │ │ corroded pump base. │
│ │ └─────────────────────────┘ │ │
│ └─────────────────────────────────┘ │
│ 🎙️ Transcribed (Santhali): "Chapekal khon laal daah oḍok kan-a..." │
│ 🏷️ Detected Domain: Groundwater Contamination / Fluorosis Risk │
│ │
│ 📍 GEOSPATIAL DEDUPLICATION RADAR (Scanning 500m radius...) │
│ ⚠️ Match Found: Ticket #JAG-4102 (140m away, 18 Citizen Upvotes) │
│ Semantic Similarity Score: [██████████████████░░] 89% Match │
│ │
│ [ Merge & Upvote Master Ticket (+1) ] [ Submit as New Ticket ] │
└────────────────────────────────────────────────────────────────────────┘

### 9.2 University Discovery Feed & Explainable AI (XAI) Matrix

┌────────────────────────────────────────────────────────────────────────┐
│ 🏛️ BIT MESRA — INNOVATION WORKSPACE [ Active Grants: ₹14.5 Lakh ]│
├────────────────────────────────────────────────────────────────────────┤
│ OPEN CHALLENGES IN YOUR DOMAIN (AI RECOMMENDED) │
│ ┌────────────────────────────────────────────────────────────────────┐│
│ │ 🏷️ High Fluoride Contamination in Palamu District | ⏱️ 4 Days Left ││
│ │ State + CSR Funding Pool: ₹3,50,000 | Match Score: 94% ││
│ ├────────────────────────────────────────────────────────────────────┤│
│ │ 🧠 WHY THE AI MATCHED YOUR CAMPUS: ││
│ │ • 🔬 NABL Accredited Environmental Chemistry Lab +35% ││
│ │ • 👨‍🏫 Dr. Verma (4 Patents in Fluoride Adsorption Media) +30% ││
│ │ • 📍 Geographic Proximity: Palamu Regional Basin (<120 km) +15% ││
│ │ • 🏆 Track Record: 2 Successfully Deployed Projects +14% ││
│ │ ││
│ │ [ Accept Solo & Form Team ] [ Propose Joint Consortium ]││
│ └────────────────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────────┘

### 9.3 Dynamic Hackathon Arena & Embedded R&D Copilot
┌────────────────────────────────────────────────────────────────────────┐
│ 🏆 DYNAMIC HACKATHON ARENA: ROUND 3 (DPR DEFENSE) │
├──────────────────────────────────┬─────────────────────────────────────┤
│ SUBMISSION WORKSPACE │ 🤖 JAGRIT R&D COPILOT (ACTIVE) │
│ │ │
│ Project: Solar Fluoride Filter │ Student Query: │
│ Competing: BIT Mesra vs NIT Jsr │ "Activated alumina is costly. What │
│ │ local materials can we use?" │
│ 📑 Upload DPR & Bill of Materials│ │
│ • Cost Justification (PDF) │ Copilot Suggestion: │
│ • Operational Risk Matrix (XLS) │ • Lac-waste biochar from Khunti: │
│ • Jal Sahiya Training SOP (PDF) │ high surface area, 80% cheaper. │
│ │ ⚠️ WARNING FROM FAILURE REPO: │
│ [ Schedule Physical Defense at │ Team #412 attempted untreated │
│ DHTE Headquarters in Ranchi ] │ biochar; leached color. Must acid│
│ │ wash at pH 4.5 first. │
└──────────────────────────────────┴─────────────────────────────────────┘

### 9.4 45-Day Maturation Buffer & Citizen Feedback Interface

┌────────────────────────────────────────────────────────────────────────┐
│ 📍 FIELD VERIFICATION: PALAMU COMMUNITY WATER PROJECT │
├────────────────────────────────────────────────────────────────────────┤
│ [ DEMO TIME MACHINE: Advance Clock to Day 46 (Simulate Post-45 Days) ]│
│ │
│ AI POPULATION-WEIGHTED QUORUM MONITOR │
│ Settlement Population: ~850 | Target Quorum: 42 Verified Local Votes │
│ Current Quorum Status: [████████████████████████] 45/42 Votes (100%) │
│ │
│ 1. CORE OPERATIONAL FUNCTION CHECK │
│ "Kya chapekal se ab peene yogya saaf paani mil raha hai?" │
│ [ ✅ HAAN / YES (88%) ] [ ❌ NAHI / NO (12%) ] │
│ │
│ 2. QUALITATIVE NLP SENTIMENT FILTER │
│ • Critical System Defects Reported: 2% (Well below 30% threshold) │
│ • Cosmetic Grievances: 10% ("Nalke ka handle thoda tight hai") │
│ │
│ STATUS: 100% COMPLETELY SOLVED ➔ PUSH TO INCUBATION PIPELINE │
└────────────────────────────────────────────────────────────────────────┘

---

## 10. Operational Governance & Legal Frameworks

### 10.1 NEP 2020 Academic Bank of Credits (ABC) & APAAR Engine
* **Conversion Standard:** 30 hours of verified field/lab effort = 1 Academic Credit under UGC / NCrF norms.
* **Curricular Mapping:**
  1. *Community Engagement & Service (Mandatory under NEP):* 2 Credits.
  2. *Summer Internship / Field Project:* 4 Credits.
  3. *Multidisciplinary Capstone Innovation Project:* 4 Credits.
* **Verification Pipeline:** Faculty PI logs and verifies student contribution hours on the platform. The platform dispatches an encrypted XML/JSON payload to the **National Academic Depository (NAD) / DigiLocker / ABC API**, depositing credits directly onto the student's official transcript.
* **Faculty Incentives:** Guiding a completed project awards the Faculty PI verified **Research & Consultancy API points** for career progression under the UGC Career Advancement Scheme (CAS).

### 10.2 Tripartite IPR Concordat & Startup Incubation Pipeline
* **Student & Faculty Inventors:** Retain 100% of moral rights as Inventors and maintain majority equity ($\ge 60\%$) in any resulting spinoff startup.
* **University Custody:** The university holds institutional custody of the patent and receives a $20\text{--}30\%$ royalty share on commercial licensing to support departmental research funds.
* **Corporate CSR Partner:** Receives a Right of First Refusal (ROFR) to commercially manufacture or license the technology, along with a perpetual royalty-free license for internal operational use.
* **State Government:** Retains an irrevocable, royalty-free license to deploy the design across public schools, healthcare centers, and rural bodies statewide.
* **Incubation Handover:** Projects achieving `COMPLETELY_SOLVED` status receive fast-track admission into state-supported incubators (Atal Incubation Centres / University EDCs) and pre-filled grant applications for seed funding under the Jharkhand State Startup Policy (up to ₹10 Lakhs).

### 10.3 SLA Enforcement, Default & Escrow Fund Clawback
* **Milestone Enforcement:** Automated daily cron monitors track project progress against locked WBS schedules.
* **Escalation Protocol:**
  * *Day +7 past deadline:* Automated warning issued to the Faculty PI and student team.
  * *Day +14 past deadline:* Formal breach notice escalated to the Dean of R&D and Vice-Chancellor's office.
  * *Day +30 past deadline:* The project is declared in `DEFAULT`. The institution is suspended from platform bidding for 12 months, unspent Tranche 1 funds are clawed back to the state escrow, and the challenge returns to the open bidding feed.

### 10.4 Long-Term Operations & Maintenance (O&M) Handover
* Prevents infrastructure abandonment by requiring an operational transition before final project sign-off.
* The project DPR must include a documented **Operations & Maintenance (O&M) Plan**.
* Prior to Tranche 3 fund release, the university team must conduct on-ground operational training for at least two local **Village Level Entrepreneurs (VLEs), Jal Sahiyas, or ASHA workers**, provide an illustrated SOP in Hindi/Santhali, and deliver a 12-month spare parts kit.
* Ongoing maintenance after Year 1 transitions to the Gram Panchayat, funded through untied **15th Finance Commission** rural allocations.

### 10.5 Tribal Governance & PESA Act 1996 Compliance
* More than half of Jharkhand consists of Fifth Schedule Areas governed by the **PESA Act 1996** (Panchayats Extension to Scheduled Areas) and the Forest Rights Act (FRA).
* For projects requiring physical installation in Scheduled Areas, the local Panchayat Secretary (Sachiv) must conduct a formal Gram Sabha consultation.
* The Sachiv uploads the signed, stamped **Gram Sabha Resolution / NOC** directly through the platform. Hardware installation cannot proceed without this uploaded clearance.

### 10.6 Corporate CSR Consortium Mechanics (Section 135 / Schedule VII)
* Enables companies operating in Jharkhand (Tata Steel, CCL, BCCL, SAIL) to meet their mandatory 2% profit spend under **Section 135 of the Companies Act 2013**.
* Contributions map directly to **Schedule VII, Item (ix)**, which permits spending on technology incubators and R&D projects in science, technology, medicine, and agriculture within approved academic institutions.
* The platform automatically issues **Form CSR-1 compliance certificates**, allowing corporations to track the direct community impact of their contributions.

---

## 11. Technical Architecture, Database Schemas & API Contracts
┌────────────────────────────────────────────────────────────────────────┐
│ CORE APPLICATION TECH STACK │
├───────────────────┬────────────────────────────────────────────────────┤
│ Web Presentation │ Next.js 14+ (App Router, Server Actions), Tailwind │
│ │ CSS, Shadcn UI, Framer Motion. │
├───────────────────┼────────────────────────────────────────────────────┤
│ Mobile & PWA │ Progressive Web App (PWA) with Workbox offline- │
│ │ first service workers. │
├───────────────────┼────────────────────────────────────────────────────┤
│ Core Backend │ Python FastAPI (AI/ML inference microservices) + │
│ │ Node.js NestJS (Enterprise Business Logic). │
├───────────────────┼────────────────────────────────────────────────────┤
│ Database Engine │ PostgreSQL 16 with PostGIS (Spatial GIS) and │
│ │ pgvector (1536-dim embeddings). │
├───────────────────┼────────────────────────────────────────────────────┤
│ AI/ML Stack │ Whisper-large-v3, YOLOv8/ViT, DeBERTa-v3, bge-m3. │
├───────────────────┼────────────────────────────────────────────────────┤
│ Messaging Gateway │ Meta WhatsApp Cloud API via FastAPI webhooks. │
└───────────────────┴────────────────────────────────────────────────────┘

### 11.1 PostgreSQL + PostGIS + pgvector Complete DDL

```sql
-- Enable PostgreSQL Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Users Master Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(15) UNIQUE,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(35) CHECK (role IN ('CITIZEN', 'PRI_OFFICER', 'STUDENT', 'FACULTY_PI', 'INDUSTRY_MENTOR', 'EVALUATOR', 'ADMIN')),
    apaar_id VARCHAR(20) UNIQUE, -- For Students (NEP 2020)
    institution_id UUID,
    preferred_language VARCHAR(10) DEFAULT 'hi',
    is_phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Master Challenge Ticket
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    submitted_by UUID REFERENCES users(id),
    submission_channel VARCHAR(25) CHECK (submission_channel IN ('APP', 'WEB', 'WHATSAPP', 'INSTITUTIONAL_DOSSIER')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    description_embedding vector(1536), -- For Semantic Deduplication
    raw_audio_url TEXT,
    media_urls TEXT[],
    location GEOMETRY(Point, 4326) NOT NULL,
    district VARCHAR(100) NOT NULL,
    block VARCHAR(100),
    panchayat VARCHAR(100),
    upvotes_count INT DEFAULT 1,
    status VARCHAR(50) DEFAULT 'PENDING_HITL',
    -- 'PENDING_HITL', 'ROUTED_CIVIC', 'OPEN_FOR_BIDS', 'IN_HACKATHON', 
    -- 'DIRECT_RND', 'IN_PILOT', 'RESOLVED', 'PARTIAL_MAINTENANCE', 'FAILED'
    category_type VARCHAR(30), -- 'CIVIC_ROUTINE', 'HEI_RESEARCH'
    matched_domains TEXT[],
    allocated_pool_inr NUMERIC(12, 2) DEFAULT 0.00,
    bidding_deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_challenges_spatial ON challenges USING GIST(location);

-- 3. Projects Execution & Escrow Ledger
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    execution_mode VARCHAR(25) CHECK (execution_mode IN ('DIRECT_RND', 'DYNAMIC_HACKATHON', 'CONSORTIUM')),
    lead_university_id UUID NOT NULL,
    partner_university_id UUID, -- For joint consortiums
    pi_faculty_id UUID REFERENCES users(id),
    student_team_ids UUID[],
    industry_mentor_id UUID REFERENCES users(id),
    current_hackathon_round INT DEFAULT 1, -- 1: Pitch, 2: Prototype, 3: DPR
    total_budget_inr NUMERIC(12, 2) NOT NULL,
    tranche_1_disbursed BOOLEAN DEFAULT FALSE,
    tranche_2_disbursed BOOLEAN DEFAULT FALSE,
    tranche_3_disbursed BOOLEAN DEFAULT FALSE,
    pesa_noc_url TEXT,
    field_deployment_date TIMESTAMP WITH TIME ZONE,
    maturation_ends_at TIMESTAMP WITH TIME ZONE,
    resolution_status VARCHAR(35) DEFAULT 'IN_PROGRESS',
    -- 'IN_PROGRESS', 'COMPLETELY_SOLVED', 'PARTIALLY_SOLVED', 'MINOR_FAILURE', 'MAJOR_FAILURE'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 45-Day Feedback & Quorum Log
CREATE TABLE feedback_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    citizen_id UUID REFERENCES users(id),
    voter_location GEOMETRY(Point, 4326) NOT NULL,
    is_core_functional_pass BOOLEAN NOT NULL,
    complaint_type VARCHAR(30) CHECK (complaint_type IN ('NONE', 'COSMETIC_GRIEVANCE', 'CRITICAL_DEFECT')),
    raw_voice_url TEXT,
    transcribed_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_feedback_spatial ON feedback_ledger USING GIST(voter_location);

-- 5. R&D Failure Post-Mortem Repository
CREATE TABLE rnd_failure_repository (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    failure_classification VARCHAR(25) CHECK (failure_classification IN ('MINOR_FAILURE', 'MAJOR_FAILURE')),
    root_cause_analysis TEXT NOT NULL,
    attempted_solution_summary TEXT NOT NULL,
    lessons_learned TEXT NOT NULL,
    escalated_to_national_hackathon BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Samvaad Community Forum Threads
CREATE TABLE community_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES users(id),
    parent_thread_id UUID REFERENCES community_threads(id),
    content TEXT NOT NULL,
    media_attachments TEXT[],
    tags TEXT[],
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               RESTful API ROUTE CONTRACTS                              │
├────────┬───────────────────────────────────────┬───────────────────────────────────────┤
│ Method │ Endpoint Path                         │ Functionality & Access Control        │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ POST   │ /api/v1/auth/otp/request              │ Issues verification OTP to citizen.   │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ POST   │ /api/v1/challenges/submit             │ Multipart submission endpoint         │
│        │                                       │ (images, voice notes, geo-coords).    │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ POST   │ /api/v1/webhooks/whatsapp             │ Inbound Meta Cloud API webhook handler│
│        │                                       │ for conversational voice interactions.│
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ GET    │ /api/v1/evaluator/queue               │ Retrieves pending HITL triage queue.  │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ POST   │ /api/v1/evaluator/verify              │ Authorizes categorization and escrow. │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ POST   │ /api/v1/universities/bids             │ Submits solo or consortium proposals. │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ POST   │ /api/v1/hackathon/round-submit        │ Uploads Round 1, 2, or 3 deliverables.│
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ POST   │ /api/v1/projects/:id/tranche-release  │ Authorizes milestone escrow payouts.  │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ POST   │ /api/v1/projects/:id/nep-credits      │ Dispatches credit payload to APAAR.   │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ POST   │ /api/v1/projects/:id/feedback         │ Records 45-day citizen feedback vote. │
├────────┼───────────────────────────────────────┼───────────────────────────────────────┤
│ GET    │ /api/v1/rnd/failures                  │ Searchable query engine for failures. │
└────────┴───────────────────────────────────────┴───────────────────────────────────────┘

import os
import httpx
from fastapi import FastAPI, Request, BackgroundTasks
from sqlalchemy import text
from database import async_session_maker

app = FastAPI(title="JAGRIT WhatsApp Ingestion Service")

WHATSAPP_TOKEN = os.getenv("WHATSAPP_CLOUD_API_TOKEN")
GRAPH_API_URL = "https://graph.facebook.com/v18.0"

async def download_media(media_id: str) -> bytes:
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{GRAPH_API_URL}/{media_id}",
            headers={"Authorization": f"Bearer {WHATSAPP_TOKEN}"}
        )
        media_url = res.json().get("url")
        binary_res = await client.get(
            media_url,
            headers={"Authorization": f"Bearer {WHATSAPP_TOKEN}"}
        )
        return binary_res.content

async def process_whatsapp_submission(from_number: str, message: dict):
    msg_type = message.get("type")
    
    async with async_session_maker() as session:
        if msg_type == "audio":
            audio_bytes = await download_media(message["audio"]["id"])
            
            # Forward to ASR service (Hindi/Santhali speech recognition)
            async with httpx.AsyncClient() as client:
                transcription_res = await client.post(
                    "http://ai-service:8000/transcribe-local",
                    files={"file": audio_bytes}
                )
                transcribed_text = transcription_res.json().get("text")
                detected_lang = transcription_res.json().get("language")

            # Compute embeddings
            embedding_res = await client.post(
                "http://ai-service:8000/generate-embeddings",
                json={"text": transcribed_text}
            )
            embedding_vector = embedding_res.json().get("vector")

            await session.execute(
                text("""
                    INSERT INTO user_sessions (phone, draft_description, draft_embedding, draft_lang)
                    VALUES (:phone, :desc, :emb, :lang)
                    ON CONFLICT (phone) DO UPDATE 
                    SET draft_description = :desc, draft_embedding = :emb, draft_lang = :lang
                """),
                {"phone": from_number, "desc": transcribed_text, "emb": str(embedding_vector), "lang": detected_lang}
            )
            await session.commit()

            reply = "Aapki aawaz darj kar li gayi hai. Kripya samasya ka Live Location share karein." if detected_lang == "hi" else "Voice note received. Please share the live location pin."
            await send_whatsapp_message(from_number, reply)

        elif msg_type == "location":
            lat = message["location"]["latitude"]
            lon = message["location"]["longitude"]

            # Query nearby duplicates within 500m
            query = text("""
                SELECT id, ticket_number, 
                       (description_embedding <=> (SELECT draft_embedding FROM user_sessions WHERE phone = :phone)) AS distance
                FROM challenges
                WHERE ST_DWithin(location, ST_SetSRID(ST_Point(:lon, :lat), 4326), 500)
                ORDER BY distance ASC LIMIT 1;
            """)
            result = await session.execute(query, {"phone": from_number, "lat": lat, "lon": lon})
            matched = result.fetchone()

            if matched and matched.distance < 0.15: # >= 85% similarity
                await session.execute(
                    text("UPDATE challenges SET upvotes_count = upvotes_count + 1 WHERE id = :id"),
                    {"id": matched.id}
                )
                await session.commit()
                msg = f"Yeh samasya pehle se darj hai (Ticket #{matched.ticket_number}). Aapka vote jod diya gaya hai!"
            else:
                new_ticket = f"JAG-{os.urandom(2).hex().upper()}"
                await session.execute(
                    text("""
                        INSERT INTO challenges (ticket_number, description, location, district, status, submission_channel)
                        VALUES (:ticket, (SELECT draft_description FROM user_sessions WHERE phone = :phone),
                                ST_SetSRID(ST_Point(:lon, :lat), 4326), 'Ranchi', 'PENDING_HITL', 'WHATSAPP')
                    """),
                    {"ticket": new_ticket, "phone": from_number, "lat": lat, "lon": lon}
                )
                await session.commit()
                msg = f"Aapki nayi samasya darj kar li gayi hai! Ticket ID: #{new_ticket}. University portal par jald karwayi shuru hogi."

            await send_whatsapp_message(from_number, msg)

async def send_whatsapp_message(to: str, text_body: str):
    async with httpx.AsyncClient() as client:
        await client.post(
            f"{GRAPH_API_URL}/{os.getenv('WHATSAPP_PHONE_NUMBER_ID')}/messages",
            headers={"Authorization": f"Bearer {WHATSAPP_TOKEN}"},
            json={
                "messaging_product": "whatsapp",
                "to": to,
                "type": "text",
                "text": {"body": text_body}
            }
        )

@app.post("/api/v1/webhooks/whatsapp")
async def whatsapp_webhook(request: Request, background_tasks: BackgroundTasks):
    data = await request.json()
    try:
        entry = data["entry"][0]["changes"][0]["value"]
        if "messages" in entry:
            message = entry["messages"][0]
            from_number = message["from"]
            background_tasks.add_task(process_whatsapp_submission, from_number, message)
    except (KeyError, IndexError):
        pass
    return {"status": "ok"}


    12. Non-Functional Requirements (NFRs) & Compliance
NFR-1 (Language Support): Full platform localization in English, Hindi, and Santhali (Devanagari script and Latin/Ol Chiki phonetic systems).
NFR-2 (DPDP Act 2023 Compliance):
On-device Computer Vision automatically redacts faces of minors and bystanders before photos are published to public feeds.
Public challenge listings display masked phone numbers (e.g., +91-98XXXX1234).
Citizen onboarding includes explicit vernacular audio/visual consent prompts regarding location tracking and public data usage.
NFR-3 (Performance & Low Bandwidth Optimization):
The web client maintains an initial bundle size under 
8
 MB
8 MB
 to ensure usability over 2G/3G connections.
Images are automatically compressed to under 
500
 KB
500 KB
 using client-side WebP conversion prior to upload.
NFR-4 (Security & Tamper Resistance):
Geo-location submissions require device hardware GPS verification to prevent coordinate spoofing.
Milestone Utilization Certificates (UCs) and fund release authorizations require cryptographic digital signatures.

13. Phased Implementation Roadmap: MVP vs. Future Scope

┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              PHASED IMPLEMENTATION ROADMAP                             │
├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│ MVP: PILOT DEMO BUILD (WEEKS 1 – 6)      │ FUTURE SCOPE: PRODUCTION ROADMAP (MONTHS 6+)│
├──────────────────────────────────────────┼─────────────────────────────────────────────┤
│ 1. Trilingual Web App & Citizen Studio   │ 1. Bi-Annual Pan-India National Hackathon   │
│    (Hindi, Santhali, English).           │    Orchestration Platform.                  │
│                                          │                                             │
│ 2. WhatsApp Ingestion Simulator          │ 2. Direct GeM (Govt e-Marketplace) Single-  │
│    (Voice transcription & GPS capture).  │    Source Procurement API Integration.      │
│                                          │                                             │
│ 3. Visible Frontend AI Scanner &         │ 3. Automated NAAC & NIRF Institutional      │
│    Spatial Deduplication Radar.          │    Direct XML Data Pipelines.               │
│                                          │                                             │
│ 4. HITL Evaluator Deck                   │ 4. Autonomous IoT Sensor Telemetry Feeds    │
│    (Civic vs R&D bifurcation controls).  │    for Water Purity & Operational Uptime.   │
│                                          │                                             │
│ 5. Explainable AI Matchmaker Scorecard   │ 5. Smart-Contract Autonomous Escrow Payouts │
│    (Interactive radar chart).            │    Triggered Directly by IoT Telemetry.     │
│                                          │                                             │
│ 6. 3-Stage Dynamic Hackathon Workspace   │ 6. In-Browser WebGL CAD Simulation Sandbox  │
│    and Embedded Student R&D Copilot.     │    for Pre-Fabrication Testing.             │
│                                          │                                             │
│ 7. Tranche Funding Escrow Manager        │ 7. Store-and-Forward Satellite Relay Mesh   │
│    (30% - 40% - 30% release controls).   │    for Connectivity Dark Zones.             │
│                                          │                                             │
│ 8. Automated NEP Credit Certificate      │ 8. Biometric On-Ground PESA Authentication  │
│    Generator (APAAR / ABC format).       │    for Digital Gram Sabha Resolutions.      │
│                                          │                                             │
│ 9. 45-Day Feedback Simulation System     │                                             │
│    (Time Machine toggle & Quorum logic). │                                             │
│                                          │                                             │
│ 10. Searchable R&D Failure Repository    │                                             │
│     and "Samvaad" Community Feed.        │                                             │
└──────────────────────────────────────────┴─────────────────────────────────────────────┘

14. Acceptance Criteria & Pre-Flight Launch Checklist
Before production release or competitive evaluation, the build must pass the following verification tests:

Vernacular Voice Processing: The system ingests an audio note in Hindi or Santhali via WhatsApp, transcribes it, and populates a ticket with 
≥
85
%
≥85%
 transcription accuracy.

Spatial Deduplication: Submitting a second ticket within 
500
 m
500 m
 containing similar keywords automatically flags the duplicate and increments the master ticket's upvote count.

HITL Triage Bifurcation: The Evaluator can route civic tasks to the municipal endpoint and approve innovation challenges for the university bidding feed.

Dynamic Hackathon Switching: When two universities accept the same ticket, the system automatically transitions the challenge into Hackathon Mode and opens the Round 1 portal.

Explainable AI Visualization: The university challenge feed displays a 5-axis spider chart breaking down the institutional compatibility score.

Tranche-Based Escrow: Tranches 1, 2, and 3 disburse sequentially only after the required milestone documentation has been uploaded and approved.

NEP Credit Issuance: Validated project completion generates an APAAR/ABC-formatted credit award certificate showing the correct workhour-to-credit conversion.

Citizen Feedback Quorum: Feedback validation enforces the calculated population-weighted minimum quorum and uses NLP to separate critical defects from cosmetic grievances.

R&D Post-Mortem Logging: Marking a project as failed generates a structured post-mortem entry in the R&D Failure Repository with clear documentation of lessons learned.