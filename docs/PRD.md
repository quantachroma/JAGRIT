# Product Requirement Document (PRD)

**Project Name:** Jharkhand Societal Innovation Collaboration Portal  
**Problem Statement ID:** SIH26043  
**Sponsoring Organization:** Department of Higher & Technical Education, Government of Jharkhand  
**Category:** Software | **Theme:** Smart Education / Open Innovation  

---

## 1. Strategic Overview & Objectives

### 1.1 Executive Summary
The Jharkhand Societal Innovation Collaboration Portal is a technology ecosystem designed to crowdsource localized community challenges across Jharkhand (ranging from water management and healthcare to rural infrastructure) and connect them with academic expertise across Higher Education Institutions (HEIs) and industry resources. The platform automates problem ingestion, semantic root-cause analysis, dynamic university allocation via hackathons, milestone-driven execution, and transparent citizen verification.

### 1.2 Key Stakeholders & Target User Personas
* **Citizens / Local Bodies (PRIs & ULBs):** Submit local issues via Web, Mobile (Offline-First), or WhatsApp Voice Bot in regional dialects (Hindi/Santhali).
* **AI Engine & System Admin:** Automated routing, semantic clustering, deduplication, and quality control.
* **Higher Education Institutions (Faculty & Students):** Claim problems, form multidisciplinary teams, participate in dynamic hackathons, and earn NEP 2020 Academic Bank of Credits (ABC).
* **Industry, Startups & CSR Partners:** Provide cash/in-kind funding, hardware labs, and mentorship in exchange for Jharkhand State Digital CSR Badges.
* **Government Officials (District/State Level) [UPDATED]:** Act as "Human-in-the-Loop" to monitor problem heatmaps, assign themselves to specific projects, approve tranche-based funding, and conduct live testing of solutions.

---

## 2. Technical Stack & Infrastructure Architecture

### 2.1 Tech Stack Matrix

| Architectural Layer | Technology Selected | Strategic Purpose & Justification |
| :--- | :--- | :--- |
| **Frontend (Web)** | Next.js (React), Tailwind CSS, Shadcn UI | High-performance, SEO-optimized SSR dashboards for analytics, university workspaces, and administrative controls. |
| **Mobile App** | Flutter + Hive / SQLite | Single codebase (Android/iOS) with local offline storage and background queue sync for erratic 2G/3G connectivity. |
| **Voice Bot Gateway** | Meta WhatsApp API + Bhashini API | Bhashini (Government of India AI stack) enables native Speech-to-Text & Text-to-Speech in Santhali (sat_Olck) and Hindi. |
| **Backend Framework** | FastAPI (Python) | High-throughput asynchronous REST/WebSocket APIs with native AI/ML pipeline integration. |
| **Primary Database & GIS**| PostgreSQL + PostGIS Extension | Spatial database capabilities to calculate district/block boundaries, geofencing, and proximity clusters. |
| **Vector Engine** | pgvector (PostgreSQL Extension) | Native vector embedding storage and fast cosine similarity searches without external vector DB dependencies. |
| **AI / NLP Models** | SentenceTransformers (bge-small-en-v1.5), PyTorch | Local vector embedding generation for semantic root-cause clustering and problem deduplication. |
| **Task Queue & Workers** | Celery + Redis | Asynchronous handling of file compression, AI inference, notification broadcasts, and offline batch uploads. |
| **Object Storage** | AWS S3 / MinIO (Self-Hosted) | Distributed object storage for media evidence, blueprint repositories, and project deliverables. |

---

## 3. Detailed Feature Specifications

### 3.1 Baseline PS Features

**1. Multi-Stakeholder Ingestion**
* Web and mobile interfaces supporting citizens, Panchayati Raj Institutions (PRIs), Urban Local Bodies (ULBs), and government officers.
* Captures GPS coordinates, photos, videos, audio notes, and supporting documents.

**2. AI Problem Management & Routing Engine**
* **Classification:** Automatically tags problems into 10+ thematic domains (Agriculture, Water, Healthcare, Sanitation, Infrastructure, Livelihood, etc.).
* **Smart Routing:** Algorithmically matches validated issues to university profiles based on academic disciplines, lab infrastructure, and faculty specializations.

**3. University Collaboration & Team Workspace [UPDATED]**
* **Unstop-Style Interface:** Role-based interfaces for HEIs to view Problem Statements (PS), Execution (EX), and R&D categories, allowing them to easily "Accept" or "Reject" challenges similar to the *Unstop* platform.
* Integrated proposal editor and project proposal submission workflow.

**4. Industry & Ecosystem Partnership Module**
* Onboarding portal for Startups, MSMEs, CSR units, and research labs.
* Facilitates financial sponsorship, mentorship, hardware sandbox access, and technology transfer contracts.

**5. Project Lifecycle & Workflow Management [NEW 3-ROUND ARCHITECTURE]**
* **Round 1 (Ideation & Shortlisting):** Teams submit initial ideas and PPTs. Mentors shortlist sustainable, highly feasible solutions.
* **Round 2 (Funding & Development):** Shortlisted teams submit detailed component reports. A designated Government Official (Human-in-the-Loop) reviews the report and approves funding. **Funding is released in tranches (parts)** to ensure capital is not wasted and is sufficient for model building.
* **Round 3 (Live Testing & Deployment):** Government officials conduct live, on-ground testing of the solution to verify appropriateness and feasibility.
* **Rewards:** Winning solutions are awarded NEP 2020 course credits, startup grants, and official Government recognition.

**6. Portal Architecture [NEW]**
The platform is divided into 4 core portals/modules:
1. **Introduction:** Public landing page explaining the initiative.
2. **Auth Module:** Login and Sign-up for Users, Universities, and Administration.
3. **Core Dashboard:**
   * *Problem Intake & Listing:* Viewing and upvoting community issues.
   * *Failure/R&D:* Repository of failed projects open for reverse-engineering.
   * *Solution Status Verification:* Tracking deployment success.
   * *Threads:* Contextual communication and mentorship.

### 3.2 Unique Selling Propositions (USPs) & Advanced Innovations

**1. Voice-to-Voice Multilingual Bot (WhatsApp + Bhashini)**
* **Description:** A zero-literacy interface allowing citizens to send voice messages in Santhali or Hindi via WhatsApp.
* **Mechanism:** Converts audio input to text via Bhashini Speech-To-Text (STT), processes complaint metadata, extracts GPS, and returns audio responses (Text-To-Speech) confirming registration and status.

**2. Semantic Root-Cause AI Engine**
* **Description:** Groups disparate community complaints sharing an underlying cause into a single actionable project.
* **Mechanism:** Converts problem text into 384-dimensional vector embeddings using SentenceTransformers. Uses pgvector cosine distance calculation to group symptom reports.

**3. AI Complexity & Timeline Allocation Model**
* **Description:** Prevents blanket deadlines by analyzing text complexity, required physical testing, and domain challenges to output dynamic hackathon and development durations.

**4. Low-Bandwidth Adaptive Media Pipeline (LAMP)**
* **Description:** Enables operation over weak 2G/3G networks via client-side and server-side compression (WebP, AAC/Opus).

**5. Dynamic Mini-Hackathons & Bi-Annual Mega Hackathons [UPDATED]**
* **Description:** Converts multi-university claims for a single problem into a structured hackathon using standardized submission templates. Additionally, **2 Mega Hackathons will be conducted annually** where major state-wide problems are opened as Problem Statements (PS) to all universities.

**6. Ground-Feasibility, Maintainability & Adverse Impact Audit**
* **Description:** A mandatory evaluation stage prior to deployment that scores a prototype on component availability, local maintenance capabilities, and potential environmental or social side-effects.

**7. Impact-to-Cost Optimizer Engine**
* **Description:** Provides government administrators with an objective evaluation score comparing competing university proposals.

**8. Accountability & Iteration Loop [UPDATED]**
* **Description:** If a deployed solution fails or is only partially effective during real-world use, the system intelligently routes it based on citizen feedback.
* **Mechanism:** If marked *Partially Resolved*, the issue is routed **back to the exact same university's portal**. The team is provided with the previous solution's data, specific dropdown/paragraph feedback on what failed, and tasked with iterating on it effectively.

**9. AI Funding Estimator & Tranche Manager [NEW]**
* **Description:** AI automatically lists and estimates the required funding components for a proposed solution, assisting the Government Official in approving accurate, waste-free tranche-based funding for Round 2.

**10. Pan-India CSR In-Kind Resource Matcher**
* **Description:** Enables corporate entities nationwide to donate equipment, lab access, software cloud credits, or raw materials.

**11. NEP 2020 Academic Bank of Credits (ABC) Sync**
* **Description:** Automatically submits verified hackathon achievements and successful deployments to DigiLocker/ABC REST APIs.

**12. Failed Project R&D Revival Engine**
* **Description:** Re-packages stalled or abandoned government initiatives into structured academic case studies for university reverse-engineering and redesign.

**13. One-Click Blueprint Cloning Engine**
* **Description:** A centralized open-source repository where technical blueprints, CAD files, and code for a solution implemented in one district can be "cloned" and deployed by a university in another district.

**14. Citizen Verification Loop [UPDATED]**
* **Description:** Replaces static closed tickets with a citizen verification feedback screen triggered the moment a government solution is implemented.
* **Routing Logic:**
  * 🟢 **Successful (Resolved):** Project closed, ABC credits finalized.
  * 🟡 **Partially Resolved:** Routed back to the original university with detailed feedback for iteration.
  * 🔴 **Failed (Not Resolved):** Routed to the *Failed Project R&D Revival Engine* for other universities to research.
* **Community Upvoting:** Citizens can upvote feedback across all three statuses. Feedback is sortable by date and total votes to prioritize urgent maintenance.

**15. Gamified Institutional Leaderboard [UPDATED]**
* **Description:** Real-time weekly and monthly university rankings based on problems accepted, prototypes validated, solutions deployed, and **total Citizen Impact points** (derived from successful citizen verifications).

**16. Transparent Citizen Status Tracker [UPDATED]**
* **Description:** Generates a lightweight tracking link giving citizens step-by-step progress updates via a **Visual Flowchart UI** (e.g., Submitted $\rightarrow$ AI Merged $\rightarrow$ Claimed by Ranchi University $\rightarrow$ Round 2 Funding $\rightarrow$ In Field Test $\rightarrow$ Resolved).

---

## 4. Operational End-to-End System Flow

```text
Citizen Submission ] ---> (WhatsApp Voice / Mobile Offline Queue)
                                |
                                v
Processing Layer ]   ---> (LAMP Compression + Bhashini STT)
                                |
                                v
AI Engine ]          ---> (pgvector Semantic Root-Cause Clustering & Deduplication)
                                |
                                v
Verification ]       ---> (Govt Admin Approval & Automated Routing to University)
                                |
                                v
Execution Mode ]     ---> (Single HEI Claim OR Dynamic Multi-University Hackathon)
                                |
                                v
Matchmaking ]        ---> (Pan-India CSR In-Kind Hardware/Compute Funding Match)
                                |
                                v
Evaluation ]         ---> (Ground-Feasibility Audit + Impact-to-Cost Optimization)
                                |
                                v
Deployment ]         ---> (Citizen Verification Loop + ABC Credits Push + Startup Gateway)





## 5. Algorithmic Models & Mathematical Formulas

### 5.1 Semantic Vector Similarity & Deduplication
To compute similarity between a new submission embedding vector $\vec{A}$ and an existing problem embedding vector $\vec{B}$:

$$ \text{Cosine Similarity} = \frac{\vec{A} \cdot \vec{B}}{\|\vec{A}\| \|\vec{B}\|} = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \sqrt{\sum_{i=1}^{n} B_i^2}} $$

* **Deduplication Threshold:** If $\text{Cosine Similarity} \ge 0.85$ within a 5 km geographical radius (via PostGIS), auto-merge as an upvote.
* **Root-Cause Cluster Threshold:** If $0.65 \le \text{Cosine Similarity} < 0.85$ across disparate domain tags, group under a shared parent root-cause ID.

### 5.2 Impact-to-Cost Optimization Ratio
To score and rank competing university solution proposals ($Score_i$) for government reviewers:

$$ \text{Proposal Score } (Score_i) = \frac{\text{Estimated Impact}}{\text{Total Cost}} = \frac{B_i \times S_i}{C_i \times (1 + M_i)} $$

Where:
* $B_i$: Projected number of direct beneficiaries.
* $S_i$: Scalability index ($0.1 \le S_i \le 1.0$).
* $C_i$: Total implementation cost in INR (₹).
* $M_i$: Maintenance complexity index ($0.1 \le M_i \le 1.0$).

---

## 6. Security, Governance & Compliance
* **Data Privacy:** Sensitive citizen identifiers are masked; location details are rounded to block levels on public dashboards.
* **Auditable Communication:** All cross-stakeholder messaging is permanently logged under specific Project IDs to prevent unauthorized off-platform communications or harassment.
* **CSR Compliance:** Automated generation of Section 135 compliant CSR expenditure audit trails for participating enterprise entities.
* **NEP 2020 & ABC Compliance:** Direct OAuth2 integration with DigiLocker and National Academic Depository (NAD) frameworks.