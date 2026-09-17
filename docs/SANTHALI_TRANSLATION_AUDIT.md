# JAGRIT — Santhali (Ol Chiki & Latin Script) Linguistic Audit & Review Roster

> **Document Status**: PENDING NATIVE SANTHALI SPEAKER VERIFICATION  
> **Target Language**: Santhali (Santali / ᱥᱟᱱᱛᱟᱲᱤ)  
> **Official Script**: Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)  
> **Secondary Script**: Latin-script Romanization / Transliteration  
> **SIH Problem Statement**: SIH26043 — Jharkhand Societal Innovation Collaboration Portal (DHTE)  
> **Mandate**: Flag all Santhali strings across all portal dictionaries in a single table (`English Source` → `Current Santhali Translation`) with observed linguistic flags. Do not silently auto-correct or guess-fix individual words; surface every string for human review prior to production demo.

---

## 1. Executive Summary & Observed Linguistic Defects

A systematic audit of all Santhali localization dictionaries (`apps/web-citizen/src/app/page.tsx`, `apps/web-citizen/src/lib/translations.ts`, and `apps/web-citizen/public/locales/sat.json`) identified five distinct classes of translation anomalies:

1. **Script Inconsistency (Ol Chiki vs. Latin Transliteration)**:
   - In `apps/web-citizen/src/lib/translations.ts`, the navigation (`nav`) and dashboard keys are written in Latin-script transliteration (e.g. `"Aatu Hor"`, `"Lahanti Tracker"`), whereas SSO strings are written in Ol Chiki (`"ᱨᱟᱹᱥᱤᱭᱟᱹ"`, `"ᱵᱤᱨᱫᱟᱹᱜᱟᱲ"`).
   - In `apps/web-citizen/public/locales/sat.json`, strings are in Ol Chiki, creating an unharmonized visual and linguistic experience when toggling languages across different views.

2. **Untranslated English Left in Dictionaries**:
   - Multiple keys in `translations.ts` (`TRANSLATIONS.sat`) retain verbatim English strings: `"State Societal Innovation Portal"`, `"VERIFIED QUORUM"`, `"UNIVERSITY R&D"`, `"ESCROW LEDGER"`, `"Cards Feed"`, `"500m Radar Map"`, `"TIMELINE"`, `"AI MATCH"`, `"GRANT"`, `"HEI Partner:"`, `"Open for Bids"`, `"Field Testing"`, `"Sign Out"`.

3. **Untranslated English Acronyms Without Tribal Gloss**:
   - Acronyms like `"CSR"` (Corporate Social Responsibility), `"NEP 2020"`, `"DHTE"`, and `"AI"` appear without phonetic adaptation or explanatory gloss in Santhali context (e.g. stakeholder card says `"CSR ᱴᱟᱠᱟ ᱮᱢ ᱢᱮ"` without explaining what CSR entails for village stakeholders).

4. **Mixed Language / Loanword Inconsistencies**:
   - Strings such as `"JAGRIT re sagun daram"` mix Latin English name `"JAGRIT"`, grammatical postposition `"re"`, and transliterated Santhali greeting `"sagun daram"` without standardized orthography.
   - Heavy infiltration of Hindi loanwords with Santhali grammatical suffixes (e.g. `"Samasya"` instead of native Santhali `"ᱮᱴᱠᱮᱴᱚᱬᱮ"`, `"Bichar Darj Me"` instead of native verbalization).

5. **Critical Script Corruption Discovered in Codebase**:
   - In `apps/web-citizen/src/app/page.tsx` line 174 (Industry card description), a **Gujarati script token** (`ટેક્ᱱᱳᱞᱳᱡᱤ`) was accidentally inserted into the Ol Chiki sentence:
     `"ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱥᱚᱞᱦᱮ ᱞᱟᱹᱜᱤᱫ CSR ᱴᱟᱠᱟ ᱮᱢ ᱢᱮ ᱟᱨ ᱱᱟᱣᱟ ટેક્ᱱᱳᱞᱳᱡᱤ ᱦᱟᱛᱟᱣ ᱢᱮ᱾"`
     This is a classic signature of machine-translation hallucination/cross-script contamination that MUST be corrected through native human review.

---

## 2. Landing Page Strings (`apps/web-citizen/src/app/page.tsx`)

| Key / Context | English Source String | Current Santhali String | Script / Linguistic Issues Flagged | Native Speaker Review Status |
| :--- | :--- | :--- | :--- | :--- |
| `greetings.sat.greeting` | Johar & Namaste | `ᱡᱚᱦᱟᱨ (Johar)` | Mixed Ol Chiki and Latin parenthetical transliteration. | Flagged — Pending Review |
| `greetings.sat.sub` | Welcome to JAGRIT Collaboration Portal | `JAGRIT re sagun daram` | Latin script transliteration. Mixes English brand with transliterated greeting (`ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ`). | Flagged — Pending Review |
| `greetings.sat.title` | JAGRIT | `JAGRIT` | Latin script brand acronym. | Flagged — Pending Review |
| `greetings.sat.titleDevanagari` | जागृत | `ᱡᱟᱜᱽᱨᱤᱛ` | Phonetic Ol Chiki transcription of Hindi/Sanskrit name. | Flagged — Pending Review |
| `greetings.sat.subtitle` | Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society | `Jharkhand Academia Industry Gateway for Research, Innovation and Transformation` | 100% untranslated English string. Truncated ("of Society" omitted). | Flagged — Pending Review |
| `greetings.sat.description` | A closed-loop civic tech platform transforming grassroots village challenges in water, roads, and clean energy into university engineering hackathons and CSR-underwritten solutions. | `ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱫᱟᱜ, ᱦᱚᱨ ᱟᱨ ᱵᱤᱡᱞᱤ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱠᱚᱞᱮᱡᱽ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ ᱦᱮᱯᱨᱟᱣ ᱟᱨ ᱥᱚᱨᱠᱟᱨ ᱜᱚᱲᱚ ᱛᱮ ᱥᱚᱞᱦᱮ᱾` | Ol Chiki with English loanwords phonetically written (`ᱠᱚᱞᱮᱡᱽ` = College, `ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ` = Engineering). Needs native evaluation for appropriate academic vocabulary. | Flagged — Pending Review |
| `greetings.sat.enterPortal` | Enter Portal | `ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ` | Loanword `ᱯᱳᱨᱴᱟᱞ` (Portal) in Ol Chiki. | Flagged — Pending Review |
| `greetings.sat.reportWhatsapp` | Report via WhatsApp | `ᱣᱟᱴᱥᱟᱯ ᱛᱮ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ` | Phonetic `ᱣᱟᱴᱥᱟᱯ` (WhatsApp); literally "Write problem with WhatsApp". | Flagged — Pending Review |
| `greetings.sat.stakeholderHeading` | Choose Stakeholder Portal | `ᱨᱟᱹᱥᱤᱭᱟᱹ ᱯᱳᱨᱴᱟᱞ ᱵᱟᱪᱷᱟᱣ ᱢᱮ` | "ᱨᱟᱹᱥᱤᱭᱟᱹ" is used for "Stakeholder"; verify if tribal assembly/panchayat context has a more precise term. | Flagged — Pending Review |
| `greetings.sat.stakeholderSub` | Select your role or sign in with your official institutional identity | `ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱵᱟᱪᱷᱟᱣ ᱢᱮ ᱟᱨ ᱥᱟᱭᱤᱱ ᱤᱱ ᱢᱮ` | "ᱴᱷᱟᱶ" literally means place/locale, used here as "Role". "ᱥᱟᱭᱤᱱ ᱤᱱ ᱢᱮ" is phonetically rendered English "Sign in". | Flagged — Pending Review |
| `roles.citizen.label` | Citizen | `ᱨᱟᱹᱥᱤᱭᱟᱹ` | Used for Citizen. Check whether "ᱟᱹᱛᱩ ᱦᱚᱲ" (Village citizen/folk) or "ᱱᱟᱜᱟᱨᱤᱠ" is preferred. | Flagged — Pending Review |
| `roles.citizen.tag` | Rural Ingestion | `ᱟᱹᱛᱩ ᱟᱲᱟᱝ` | Literally "Village Voice". Figurative translation. | Flagged — Pending Review |
| `roles.citizen.name` | Citizen Portal | `ᱨᱟᱹᱥᱤᱭᱟᱹ ᱯᱳᱨᱴᱟᱞ` | English loanword `ᱯᱳᱨᱴᱟᱞ`. | Flagged — Pending Review |
| `roles.citizen.desc` | Report village issues via voice notes in Hindi & Santhali or GPS photos. Vote in the 45-day civic resolution quorum. | `ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱨᱚᱲ ᱠᱟᱛᱮ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱵᱷᱮᱡᱟ ᱠᱟᱛᱮ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ᱾ ᱔᱕ ᱢᱟᱦᱟᱸ ᱥᱚᱞᱦᱮ ᱵᱷᱳᱴ ᱨᱮ ᱥᱮᱞᱮᱫᱚᱜ ᱢᱮ᱾` | Loanword `ᱵᱷᱳᱴ` (Vote). Omitted Hindi mention. | Flagged — Pending Review |
| `roles.citizen.cta` | Access Citizen Desk | `ᱨᱟᱹᱥᱤᱭᱟᱹ ᱰᱮᱥᱠ ᱡᱷᱤᱡ ᱢᱮ` | Loanword `ᱰᱮᱥᱠ` (Desk). | Flagged — Pending Review |
| `roles.university.label` | University | `ᱵᱤᱨᱫᱟᱹᱜᱟᱲ` | "ᱵᱤᱨᱫᱟᱹᱜᱟᱲ" generally means school/college; "ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ" denotes university. | Flagged — Pending Review |
| `roles.university.tag` | R&D & NEP 2020 | `ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ ᱟᱨ ᱠᱨᱮᱰᱤᱴ` | "ᱠᱨᱮᱰᱤᱴ" is English loanword "Credit"; NEP 2020 reference dropped. | Flagged — Pending Review |
| `roles.university.name` | University & HEI | `ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ` | Higher Education Institutions (HEI) acronym omitted. | Flagged — Pending Review |
| `roles.university.desc` | Accept verified societal challenges, deploy faculty & student teams in 3-round hackathons, and earn academic credits. | `ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱦᱟᱛᱟᱣ ᱢᱮ, ᱓ ᱛᱷᱚᱠ ᱨᱮᱱᱟᱜ ᱦᱮᱯᱨᱟᱣ ᱨᱮ ᱡᱤᱛᱠᱟᱹᱨ ᱢᱮ ᱟᱨ ᱮᱠᱟᱰᱮᱢᱤᱠ ᱠᱨᱮᱰᱤᱴ ᱧᱟᱢ ᱢᱮ᱾` | English loanwords `ᱮᱠᱟᱰᱮᱢᱤᱠ ᱠᱨᱮᱰᱤᱴ` (Academic credit). | Flagged — Pending Review |
| `roles.university.cta` | Enter Academic Lab | `ᱮᱠᱟᱰᱮᱢᱤᱠ ᱞᱮᱵᱽ ᱵᱚᱞᱚᱱ ᱢᱮ` | English loanwords `ᱮᱠᱟᱰᱮᱢᱤᱠ ᱞᱮᱵᱽ` (Academic Lab). | Flagged — Pending Review |
| `roles.industry.label` | Industry | `ᱠᱟᱹᱨᱜᱟᱲ` | "ᱠᱟᱹᱨᱜᱟᱲ" (Industry/Manufactory). | Flagged — Pending Review |
| `roles.industry.tag` | Corporate CSR | `ᱠᱟᱹᱨᱜᱟᱲ ᱜᱚᱲᱚ` | Literally "Industry Help". Dropped Corporate / CSR distinction. | Flagged — Pending Review |
| `roles.industry.name` | Industry & CSR | `ᱠᱟᱹᱨᱜᱟᱲ ᱯᱳᱨᱴᱟᱞ` | Omitted CSR. | Flagged — Pending Review |
| `roles.industry.desc` | Sponsor district problem statements, co-fund milestone escrow tranches, and license verified student-built IP. | `ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱥᱚᱞᱦᱮ ᱞᱟᱹᱜᱤᱫ CSR ᱴᱟᱠᱟ ᱮᱢ ᱢᱮ ᱟᱨ ᱱᱟᱣᱟ ટેક્ᱱᱳᱞᱳᱡᱤ ᱦᱟᱛᱟᱣ ᱢᱮ᱾` | **CRITICAL BUG**: Contains Gujarati script `ટેક્ᱱᱳᱞᱳᱡᱤ` (Technology) mixed in Ol Chiki. CSR is unexplained. Escrow, tranches, and IP licensing omitted. | Flagged — High Priority Review |
| `roles.industry.cta` | Open Corporate Suite | `ᱠᱟᱹᱨᱜᱟᱲ ᱰᱮᱥᱠ ᱡᱷᱤᱡ ᱢᱮ` | Loanword `ᱰᱮᱥᱠ`. | Flagged — Pending Review |
| `roles.govt.label` | Government | `ᱥᱚᱨᱠᱟᱨ` | Loanword (Sarkar). | Flagged — Pending Review |
| `roles.govt.tag` | DHTE Governance | `ᱥᱚᱨᱠᱟᱨ ᱥᱟᱥᱚᱱ` | Omitted Department of Higher & Technical Education (DHTE). | Flagged — Pending Review |
| `roles.govt.name` | Government Admin | `ᱥᱚᱨᱠᱟᱨ ᱯᱳᱨᱴᱟᱞ` | Omitted Admin. | Flagged — Pending Review |
| `roles.govt.desc` | Oversee statewide problem distributions, verify milestone deliverables, and authorize escrow tranche releases. | `ᱯᱚᱱᱚᱛ ᱨᱮᱱᱟᱜ ᱡᱚᱛᱚ ᱠᱟᱹᱢᱤ ᱧᱮᱞ ᱢᱮ, ᱥᱚᱞᱦᱮ ᱯᱚᱨᱢᱟᱬ ᱢᱮ ᱟᱨ ᱯᱷᱟᱱᱰ ᱨᱤᱞᱤᱡᱽ ᱢᱮ᱾` | Loanwords `ᱯᱷᱟᱱᱰ ᱨᱤᱞᱤᱡᱽ` (Fund release) in Ol Chiki. | Flagged — Pending Review |
| `roles.govt.cta` | Govt Control Room | `ᱥᱚᱨᱠᱟᱨ ᱠᱚᱱᱴᱨᱳᱞ ᱨᱩᱢ` | Phonetic English `ᱠᱚᱱᱴᱨᱳᱞ ᱨᱩᱢ` (Control Room). | Flagged — Pending Review |

---

## 3. Core Dictionary & Sidebar Navigation (`apps/web-citizen/src/lib/translations.ts`)

### 3.1 Sidebar Navigation (`nav.*`)
| Key | English Source | Current Translation | Script & Linguistic Flags | Native Review Directive |
| :--- | :--- | :--- | :--- | :--- |
| `nav.citizen` | Citizen | `Aatu Hor` | Latin script transliteration. Literally "Village folk / Village people". | Verify if `Aatu Hor` (ᱟᱹᱛᱩ ᱦᱚᱲ) accurately reflects state-level civic identity or if `Rasiya` (ᱨᱟᱹᱥᱤᱭᱟᱹ) / `Nagrik` is preferred. |
| `nav.whatsapp` | WhatsApp Bot | `WhatsApp Bot` | Untranslated English in Latin script. | Surface whether Ol Chiki `ᱣᱟᱴᱥᱟᱯ ᱵᱳᱴ` should be used. |
| `nav.university` | University | `Birdausul` | Latin script transliteration. "Birda" (wisdom/learning) + "Usul" (high/apex). | Verify if `Birdausul` is an established neologism or if `Jeget Birdausul` (ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ) is standard. |
| `nav.industry` | Industry / CSR | `Karkhana/CSR` | Latin script transliteration. "Karkhana" (Hindi loan for factory) + untranslated English acronym "CSR". | Surface whether `Kargarh` (ᱠᱟᱹᱨᱜᱟᱲ) with CSR gloss is more accurate. |
| `nav.govt` | Govt DHTE | `Sarkar DHTE` | Latin script transliteration; untranslated acronym DHTE. | Surface whether `Sarkar` or `Ponant Sarkar DHTE` should be used. |
| `nav.samvaad` | Samvaad | `Galmarao` | Latin script transliteration. "Galmarao" (ᱜᱟᱞᱢᱟᱨᱟᱣ) = Conversation/Discussion. | Review if `Galmarao` fits the formal, structured multi-stakeholder deliberative assembly. |
| `nav.hackathon` | Hackathon | `Hal Heprao` | Latin script transliteration. "Hal" (Solution) + "Heprao" (Competition/Contest). | Review if `Hal Heprao` (ᱥᱚᱞᱦᱮ ᱦᱮᱯᱨᱟᱣ) accurately conveys an engineering hackathon. |
| `nav.rndFailures` | R&D Failures | `Bidaw Bạṛij Khata` | Latin script transliteration with diacritics. "Bidaw" (Experiment/Trial) + "Barij" (Bad/Defective) + "Khata" (Ledger). | Review whether this colloquial phrasing is suitable for an official state academic repository. |
| `nav.feedback` | Citizen Feedback | `Aatu Bichar` | Latin script transliteration. "Aatu" (Village) + "Bichar" (Opinion/Judgement/Deliberation). | Review whether `Aatu Bichar` conveys 45-day post-delivery technical feedback or village court arbitration. |
| `nav.progress` | Progress Tracker | `Lahanti Tracker` | **Mixed Transliteration**: "Lahanti" (Santhali for Progress) + English word "Tracker". | Review whether "Tracker" should be rendered natively (e.g. `Lahanti Panja` or `Lahanti Nel`). |

### 3.2 Main Dashboard Header & Metrics
| Key | English Source | Current Translation | Script & Linguistic Flags | Native Review Directive |
| :--- | :--- | :--- | :--- | :--- |
| `stateHeader` | STATE SOCIETAL INNOVATION PORTAL | `State Societal Innovation Portal` | 100% UNTRANSLATED English. | Flagged — Needs official state portal translation in Santhali. |
| `heading` | Local Issues & Solutions | `Aatu Reah Samasya ar Hal` | Latin transliteration; mixes Hindi loanword "Samasya". | Review against native Santhali `Etketonye ar Solhe` (ᱮᱴᱠᱮᱴᱚᱬᱮ ᱟᱨ ᱥᱚᱞᱦᱮ). |
| `subheading` | Grassroots Problems Connected to Academic Research & Tranche Grants. | `Grassroots Problems Connected to Academic Research` | 100% UNTRANSLATED English; omitted Tranche Grants. | Flagged — Needs full translation. |
| `reportBtn` | + Report New Issue | `+ Nawa Samasya Olme` | Latin transliteration; uses Hindi loan "Samasya". | Review against `Nawa Etketonye Olme` (ᱱᱟᱣᱟ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ). |
| `resolvedTitle` | VERIFIED QUORUM | `VERIFIED QUORUM` | 100% UNTRANSLATED English. | Flagged — Needs tribal quorum translation (`Aatu Baisi Sari`). |
| `resolvedSub` | Issues Resolved | `Hal Ena` | Latin transliteration. | Flagged — Review `Solhe Ena` vs `Hal Ena`. |
| `resolvedDesc` | Verified on Ground | `Sari Ena` | Latin transliteration. | Flagged — Review `Ot Re Sari Ena`. |
| `activeTitle` | UNIVERSITY R&D | `UNIVERSITY R&D` | 100% UNTRANSLATED English. | Flagged — Needs translation. |
| `activeSub` | Active Solutions | `Chalu Menah-a` | Latin transliteration. | Flagged — Review appropriateness. |
| `activeDesc` | In University Labs | `University Re` | Mixed English word "University" + Santhali postposition "Re". | Flagged — Mixed grammar defect. |
| `escrowTitle` | ESCROW LEDGER | `ESCROW LEDGER` | 100% UNTRANSLATED English. | Flagged — Needs translation. |
| `escrowSub` | Funds Allocated | `Paisa Taka` | Latin transliteration. Generic terms for money. | Review whether allocation/escrow has a recognized financial term. |
| `escrowDesc` | Milestone Grants | `Milestone Grants` | 100% UNTRANSLATED English. | Flagged — Needs translation. |
| `problemsTitle` | Problems in Your Area | `Sur Reah Samasya` | Latin transliteration; Hindi loan "Samasya". | Flagged — Review `Sur Tolat Etketonye`. |
| `problemsSub` | Vote to prioritize your village issues | `Vote emme` | Mixed English word "Vote" + Santhali verb. | Flagged — Mixed script/vocabulary. |
| `cardsFeed` | Cards Feed | `Cards Feed` | 100% UNTRANSLATED English. | Flagged — Needs UI translation. |
| `radarMap` | 500m Radar Map | `500m Radar Map` | 100% UNTRANSLATED English. | Flagged — Needs map/distance translation. |
| `rangeLabel` | Range: | `Range:` | 100% UNTRANSLATED English. | Flagged — Needs translation (`Sanginj:`). |
| `searchPlaceholder` | Search tickets or villages... | `Search tickets...` | 100% UNTRANSLATED English. | Flagged — Needs translation. |
| `allCategories` | All Categories | `Joto Lekan` | Latin transliteration. | Flagged — Review for category distinction. |
| `timeline` | TIMELINE | `TIMELINE` | 100% UNTRANSLATED English. | Flagged — Needs translation (`Oktokhor`). |
| `aiMatch` | AI MATCH | `AI MATCH` | 100% UNTRANSLATED English. | Flagged — Needs translation. |
| `grant` | GRANT | `GRANT` | 100% UNTRANSLATED English. | Flagged — Needs translation (`Goro Taka`). |
| `heiPartner` | HEI Partner: | `HEI Partner:` | 100% UNTRANSLATED English. | Flagged — Needs translation. |
| `openBids` | Open for University Bids | `Open for Bids` | 100% UNTRANSLATED English. | Flagged — Needs translation. |
| `fieldTesting` | Field Testing and Durability Pilot | `Field Testing` | 100% UNTRANSLATED English. | Flagged — Needs translation. |
| `aiAssistant` | AI Assistant | `AI Goroic` | Mixed English "AI" + Latin Santhali "Goroic". | Flagged — Review term for assistant. |
| `signOut` | Sign Out | `Sign Out` | 100% UNTRANSLATED English. | Flagged — Review `Odokoh Me` (ᱚᱰᱚᱠᱚᱜ ᱢᱮ). |
| `gridBadge` | Jharkhand State Innovation Grid | `Jharkhand Rajya Nawa Bhabna Grid` | Mixed English, Hindi, and Bengali/Santhali loanwords. | Flagged — Review for standardized state terminology. |
| `daysLeft` | Days Left | `Maha Baki` | Latin transliteration. | Flagged — Review `Maha Sarech`. |
| `aiFit` | AI Fit: | `AI Milaw:` | Mixed English + Hindi loan "Milaw". | Flagged — Review term. |
| `upvoteBtn` | Upvote | `Vote Emme` | Mixed English loan "Vote". | Flagged — Review `Goro Emme`. |
| `upvotedBtn` | Upvoted | `Vote Ena` | Mixed English loan "Vote". | Flagged — Review `Goro Ena`. |

### 3.3 45-Day Feedback Quorum (`feedback.*`)
| Key | English Source | Current Translation | Script & Linguistic Flags | Native Review Directive |
| :--- | :--- | :--- | :--- | :--- |
| `feedback.reviewBadge` | 45-Day Post-Implementation Review | `45-Maha Tayom Bichar` | Latin transliteration. | Review whether "Bichar" conveys technical review. |
| `feedback.title` | Citizen Quorum & Feedback Portal | `Aatu Quorum ar Bichar Portal` | Mixed English ("Quorum", "Portal") and Latin Santhali. | Flagged — Needs native phrasing for Quorum (`Baisi`). |
| `feedback.subtitle` | Review resolved projects after 45 days of unassisted use. Vote on efficacy and report lingering defects. | `45 maha beohar tayom hal reah bichar emme. Sari aakan se ban nelme.` | Latin transliteration. | Flagged — Review grammar. |
| `feedback.voteQuestion` | How is the solution performing after 45 days on the ground? | `45 maha beohar tayom noa hal cheleka chalu menah-a?` | Latin transliteration. | Flagged — Review phrasing. |
| `feedback.solvedBtn` | Fully Solved (Satisfactory) | `Pura Hal Ena (Bes Geya)` | Latin transliteration. | Flagged — Review `Pura Solhe Ena`. |
| `feedback.partialBtn` | Partially Solved (Minor Issues) | `Bạṛich Hal Ena (Katiñ Samasya)` | Latin transliteration with diacritics. Uses Hindi loan "Samasya". | Flagged — Review `Katinj Etketonye`. |
| `feedback.failedBtn` | Failed / Ineffective | `Bange Hal Ena / Bạṛij Ena` | Latin transliteration. | Flagged — Review accuracy. |
| `feedback.addIssueBtn` | Add New Issue / Report Defect to this Problem | `Nawa Samasya / Bạṛij Olme` | Latin transliteration; uses Hindi loan "Samasya". | Flagged — Review `Nawa Etketonye`. |
| `feedback.addIssueDesc` | Submitting here routes directly back to the assigned university R&D team for an iterative repair sprint. | `Nonde ol lekhankhan dohorate Birdausul team thech banaw laigi senoh-a.` | Latin transliteration; contains English loanword "team". | Flagged — Review phrasing. |
| `feedback.issueInputPlaceholder` | Describe the lingering defect or new problem in detail... | `Baki menah bạṛij se nawa samasya bistar te olme...` | Latin transliteration; uses Hindi loan "bistar". | Flagged — Review `Bistar te` vs native terms. |
| `feedback.submitFeedback` | Submit Quorum Vote & Feedback | `Quorum Vote ar Bichar Darj Me` | Mixed English ("Quorum Vote") + Latin Santhali + Hindi loan ("Darj"). | Flagged — Mixed language string. |

### 3.4 Single Sign-On Translations (`sso.*`)
*Note: In `translations.ts`, the `sso` section was drafted in Ol Chiki script, unlike `nav` and `dashboard`.*
| Key | English Source | Current Ol Chiki String | Linguistic Observations | Native Review Directive |
| :--- | :--- | :--- | :--- | :--- |
| `sso.back` | Back | `ᱨᱩᱣᱟᱹᱲ` | Ol Chiki. Standard return/back verb. | Verified as grammatically sound. |
| `sso.ssoTitle` | JAGRIT Single Sign-On | `ᱡᱟᱜᱽᱨᱤᱛ ᱢᱤᱫ ᱥᱟᱭᱤᱱ-ᱚᱱ` | Mixes Santhali "ᱢᱤᱫ" (Single) with transliterated English "ᱥᱟᱭᱤᱱ-ᱚᱱ" (Sign-on). | Review if "ᱵᱚᱞᱚᱱ" (Entry) is better than "ᱥᱟᱭᱤᱱ-ᱚᱱ". |
| `sso.tabs.citizen` | Citizen | `ᱨᱟᱹᱥᱤᱭᱟᱹ` | Ol Chiki. Used for member/citizen. | Check whether `ᱟᱹᱛᱩ ᱦᱚᱲ` is preferred by tribal speakers. |
| `sso.tabs.university` | University | `ᱵᱤᱨᱫᱟᱹᱜᱟᱲ` | Ol Chiki. General word for educational institution. | Check whether `ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ` is preferred for University. |
| `sso.tabs.industry` | Industry | `ᱠᱟᱹᱨᱜᱟᱲ` | Ol Chiki. Standard for manufactory/industry. | Appears standard; confirm. |
| `sso.tabs.govt` | Govt | `ᱥᱚᱨᱠᱟᱨ` | Ol Chiki. Loanword (Sarkar). | Standard in Santhali. |
| `sso.fieldLabels.citizen` | Phone / Voter ID / Aadhaar Virtual ID | `ᱯᱷᱳᱱ / ᱵᱷᱳᱴᱟᱨ ᱠᱟᱨᱰ / ᱟᱫᱷᱟᱨ ᱵᱷᱟᱨᱪᱩᱣᱟᱞ ᱟᱭᱰᱤ` | Phonetic English in Ol Chiki. | Check spelling of technical acronyms. |
| `sso.fieldLabels.university` | Campus + Faculty Employee or Student ID | `ᱠᱮᱢᱯᱟᱥ + ᱯᱨᱚᱯᱷᱮᱥᱟᱨ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱥᱮ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱟᱭᱰᱤ` | Mixed English loanwords (`ᱠᱮᱢᱯᱟᱥ`, `ᱯᱨᱚᱯᱷᱮᱥᱟᱨ`, `ᱟᱭᱰᱤ`). | Confirm institutional terminology. |
| `sso.fieldLabels.industry` | Corporate CIN / Form CSR-1 Registration No. | `ᱠᱚᱨᱯᱳᱨᱮᱴ CIN / ᱯᱷᱳᱨᱢ CSR-1 ᱨᱮᱡᱤᱥᱴᱨᱮᱥᱚᱱ ᱱᱚᱢᱵᱚᱨ` | English acronyms in Latin script mixed with Ol Chiki. | Review whether legal form titles should be Latin. |
| `sso.fieldLabels.govt` | State Department + Official Govt Service Code | `ᱯᱚᱱᱚᱛ ᱵᱤᱵᱷᱟᱜᱽ + ᱥᱚᱨᱠᱟᱨᱤ ᱥᱮᱵᱟ ᱠᱳᱰ` | Mix of Santhali `ᱯᱚᱱᱚᱛ` and Hindi loanwords `ᱵᱤᱵᱷᱟᱜᱽ`, `ᱥᱚᱨᱠᱟᱨᱤ ᱥᱮᱵᱟ ᱠᱳᱰ`. | Review against pure Santhali terms. |
| `sso.passwordLabel` | Security Password / Passcode | `ᱨᱩᱠᱷᱤᱭᱟᱹ ᱯᱟᱥᱣᱟᱨᱰ / ᱯᱟᱥᱠᱳᱰ` | English loanwords `ᱯᱟᱥᱣᱟᱨᱰ / ᱯᱟᱥᱠᱳᱰ`. | Confirm terminology. |
| `sso.signInBtn` | Sign In to Portal ➔ | `ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱥᱟᱭᱤᱱ ᱤᱱ ᱢᱮ ➔` | Phonetic English in Ol Chiki. | Review if `ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ` is clearer. |
| `sso.fastPassHeading` | ⚡ Quick Demo Fast-Pass (1-Click Login): | `⚡ ᱞᱚᱜᱚᱱ ᱰᱮᱢᱳ ᱯᱷᱟᱥᱴ-ᱯᱟᱥ (᱑-ᱠᱞᱤᱠ ᱵᱚᱞᱚᱱ):` | Phonetic English (`ᱰᱮᱢᱳ`, `ᱯᱷᱟᱥᱴ-ᱯᱟᱥ`, `ᱠᱞᱤᱠ`). | Acceptable for developer/demo helper text. |
| `sso.trackerBtn` | Statewide Progress & Resolution Tracker | `ᱯᱚᱱᱚᱛ ᱡᱟᱠᱟᱛ ᱞᱟᱦᱟᱱᱛᱤ ᱟᱨ ᱥᱚᱞᱦᱮ ᱴᱨᱮᱠᱟᱨ` | Mixes Ol Chiki with transliterated English `ᱴᱨᱮᱠᱟᱨ` (Tracker). | Review native term for tracking (`ᱯᱟᱱᱡᱟ`). |

---

## 4. Public Locales JSON Dictionary (`apps/web-citizen/public/locales/sat.json`)

*The JSON dictionary contains 85+ strings utilized by the mobile ingestion and reporting workflows.*

| Section / Key | English Source (`en.json`) | Current Santhali String (`sat.json`) | Observed Linguistic & Script Flags | Native Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| `common.appName` | JAGRIT | `ᱡᱟᱜᱽᱨᱤᱛ` | Phonetic Ol Chiki transcription. | Review pronunciation & tone. |
| `common.portalTitle` | Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society | `Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society` | 100% UNTRANSLATED English left in Santhali JSON. | Flagged — High Priority Review |
| `common.department` | Department of Higher & Technical Education, Govt. of Jharkhand | `ᱪᱮᱛᱟᱱ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ, ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨ` | Phonetic `ᱴᱮᱠᱱᱤᱠᱟᱞ` (Technical) and Hindi loan `ᱵᱤᱵᱷᱟᱜᱽ` (Department). | Review official government designation. |
| `common.deptShort` | Govt. of Jharkhand • Higher Education | `ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨ • ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ` | Hindi loan `ᱵᱤᱵᱷᱟᱜᱽ`. | Review official government designation. |
| `common.johar` | Johar Jharkhand | `ᱡᱚᱦᱟᱨ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ` | Ol Chiki. Authentic tribal greeting. | Verified as culturally authentic. |
| `common.home` | Home | `ᱢᱩᱬᱩᱛ` | Literally "Main / Primary". | Review whether `ᱢᱩᱬᱩᱛ` or `ᱚᱲᱟᱜ` is preferred for UI Home. |
| `common.report` | Report Issue | `ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ` | Authentic Santhali for "Write/Report Problem". | Verified as grammatically sound. |
| `common.dashboard` | My Tickets | `ᱤᱧᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ` | Literally "My problems/issues". | Review whether "Tickets" needs a loanword gloss. |
| `common.progress` | Progress | `ᱞᱟᱦᱟᱱᱛᱤ` | Authentic Santhali for "Development/Progress". | Verified as accurate. |
| `common.samvaad` | Jan Samvaad | `ᱦᱚᱲ ᱨᱚᱯᱚᱲ` | "ᱦᱚᱲ ᱨᱚᱯᱚᱲ" = People's Talk / Conversation. | Review whether this matches official "Jan Samvaad". |
| `common.timeMachine` | Time Machine | `ᱴᱟᱭᱤᱢ ᱢᱮᱥᱤᱱ` | Phonetic English in Ol Chiki. | Review whether a descriptive Santhali term exists. |
| `common.whatsappSim` | WhatsApp Service | `ᱣᱟᱴᱥᱟᱯ ᱥᱮᱵᱟ` | Phonetic English + Hindi loanword "ᱥᱮᱵᱟ". | Review. |
| `common.offlineNotice` | Working offline. Changes will sync automatically when network returns. | `ᱚᱯᱷᱞᱟᱭᱤᱱ ᱨᱮ ᱠᱟᱹᱢᱤ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ᱾ ᱱᱮᱴᱣᱟᱨᱠ ᱦᱮᱡ ᱞᱮᱱᱠᱷᱟᱱ ᱟᱡ ᱛᱮᱜᱮ ᱡᱚᱲᱟᱣᱜ-ᱟ᱾` | Loanwords `ᱚᱯᱷᱞᱟᱭᱤᱱ`, `ᱱᱮᱴᱣᱟᱨᱠ`. Phrasing is natural Santhali. | Verified as functional. |
| `submission.categoryLabel` | Problem Category | `ᱮᱴᱠᱮᱴᱚᱬᱮ ᱦᱟᱹᱴᱤᱧ` | "ᱦᱟᱹᱴᱤᱧ" = Division/Category. | Verified as accurate. |
| `submission.categories.drinking_water` | Handpump & Drinking Water | `ᱪᱟᱯᱟᱠᱚᱞ ᱟᱨ ᱫᱟᱜ` | "ᱪᱟᱯᱟᱠᱚᱞ" is Hindi loan for Handpump. | Review native Santhali term for tube well/handpump. |
| `submission.categories.road_drainage` | Village Road & Drainage | `ᱟᱹᱛᱩ ᱦᱚᱨ ᱟᱨ ᱱᱟᱞᱤ` | "ᱱᱟᱞᱤ" is Hindi loan for drain. | Review native term for drain/gutter. |
| `submission.categories.electricity` | Village Electricity & Solar | `ᱟᱹᱛᱩ ᱵᱤᱡᱞᱤ ᱟᱨ ᱥᱮᱸᱜᱮᱞ` | Literally "Village Electricity and Fire" (`ᱥᱮᱸᱜᱮᱞ`). "Solar" mistranslated as "Fire". | Flagged — Mistranslation of Solar energy. |
| `submission.voiceNoteHelp` | Speak in Santhali. Computer will transcribe automatically. | `ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱨᱚᱲ ᱢᱮ᱾ ᱠᱚᱢᱯᱤᱭᱩᱴᱟᱨ ᱟᱡ ᱛᱮᱜᱮ ᱚᱞ ᱠᱟᱛᱮ ᱫᱚᱦᱚᱭᱟᱭ᱾` | Natural conversational phrasing. | Verified as clear. |
| `dashboard.metricSolvingSubtitle` | BIT Mesra, IIT ISM, NIT Jamshedpur | `ᱵᱤᱟᱭᱤᱴᱤ ᱢᱮᱥᱨᱟ, ᱟᱭᱤᱟᱭᱤᱴᱤ, ᱮᱱᱟᱭᱤᱴᱤ` | Phonetic Ol Chiki acronyms. | Review readability. |
| `dashboard.metricEscrowSubtitle` | Milestone-based disbursement | `ᱠᱟᱹᱢᱤ ᱞᱮᱠᱟᱛᱮ ᱴᱟᱠᱟ ᱪᱟᱞ` | Good idiomatic translation: "Giving money according to work". | Verified as culturally appropriate. |
| `dashboard.statuses.PENDING_HITL` | Pending Review | `ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱛᱟᱺᱜᱤ ᱨᱮ` | "Waiting for examination". | Verified as sound. |
| `dashboard.statuses.OPEN_FOR_BIDS` | Open for College Bids | `ᱠᱚᱞᱮᱡᱽ ᱵᱤᱰ ᱞᱟᱹᱜᱤᱫ ᱡᱷᱤᱡ` | English loanwords in Ol Chiki. | Review if formal Santhali bidding term exists. |
| `feedback.defectTypes.COSMETIC_GRIEVANCE` | Minor defect (leakage, paint, loose bolt) | `ᱠᱟᱹᱴᱤᱡ ᱠᱷᱟᱹᱢᱤ (ᱫᱟᱜ ᱡᱚᱨᱚ, ᱯᱮᱱᱴ, ᱱᱟᱴ ᱞᱩᱡᱽ)` | Phonetic English in parentheses: `ᱯᱮᱱᱴ` (Paint), `ᱱᱟᱴ ᱞᱩᱡᱽ` (Nut loose). | Review loanword precision. |
| `feedback.defectTypes.CRITICAL_DEFECT` | Critical defect (no water, motor burnt) | `ᱢᱟᱨᱟᱝ ᱠᱷᱟᱹᱢᱤ (ᱫᱟᱜ ᱵᱚᱸᱫᱽ, ᱢᱳᱴᱚᱨ ᱵᱟᱹᱲᱤᱡ)` | Hindi loans `ᱵᱚᱸᱫᱽ` (Bandh), English loan `ᱢᱳᱴᱚᱨ` (Motor). | Review loanword precision. |
| `whatsapp.ticketIssued` | Ticket JAG-4102 generated successfully. | `ᱴᱤᱠᱮᱴ JAG-4102 ᱥᱟᱹᱛ ᱛᱮ ᱫᱟᱨᱡᱽ ᱮᱱᱟ᱾` | Hindi loan `ᱫᱟᱨᱡᱽ` (Registered/Recorded). | Review against pure Santhali `ᱚᱞ ᱮᱱᱟ`. |
| `progress.csrSponsor` | Corporate CSR Sponsor | `ᱠᱟᱨᱠᱷᱟᱱᱟ CSR ᱜᱚᱲᱚ` | Hindi loan `ᱠᱟᱨᱠᱷᱟᱱᱟ` + English `CSR` without gloss. | Flagged — Needs CSR gloss. |
| `progress.escrowLedger` | Escrow Account Ledger | `ᱥᱚᱨᱠᱟᱨ ᱯᱟᱭᱥᱟ ᱠᱷᱟᱛᱟ ᱞᱮᱰᱡᱟᱨ` | Hindi loan `ᱠᱷᱟᱛᱟ` + English loan `ᱞᱮᱰᱡᱟᱨ`. | Review financial terminology. |
| `progress.maturationBuffer` | 45-Day Maturation Buffer | `᱔᱕ ᱢᱟᱦᱟᱸ ᱟᱡ ᱛᱮ ᱪᱟᱞᱟᱣ ᱵᱤᱰᱟᱹᱣ` | "45 days self-running trial". Good functional phrasing. | Verified as functional. |

---

## 5. Review Guidelines for Native Santhali Linguistic Panel

Before finalizing translations for deployment or high-stakes judging demonstrations:

1. **Script Standardization**:
   - Confirm whether the platform should offer **Ol Chiki script (ᱚᱞ ᱪᱤᱠᱤ)** exclusively, or maintain a dual-mode toggle for **Ol Chiki** and **Latin-Script Romanization** (common among mobile phone users without Ol Chiki keyboard layouts).
   - If dual-mode is supported, Latin and Ol Chiki dictionaries must be separated cleanly into distinct locale files (`sat_olck` vs. `sat_latn`) rather than haphazardly mixed.

2. **Remediation of Critical Defects**:
   - Immediately replace the contaminated Gujarati token `ટેક્ᱱᱳᱞᱳᱡᱤ` in `apps/web-citizen/src/app/page.tsx` line 174 with native Ol Chiki (e.g. `ᱦᱩᱱᱟᱹᱨ` / `ᱴᱮᱠᱱᱳᱞᱳᱡᱤ` as advised by reviewers).
   - Provide a plain-language Santhali gloss for `"CSR"` (e.g. `ᱠᱟᱹᱨᱜᱟᱲ ᱠᱚᱣᱟᱜ ᱥᱟᱶᱛᱟ ᱩᱛᱱᱟᱹᱣ ᱜᱚᱲᱚ` — *Industry Social Development Assistance*).

3. **Technical Terms & Loanwords**:
   - Technical terms lacking native roots (e.g. *WhatsApp, Radar, GPS, Escrow, Quorum, Hackathon*) should follow standard Ol Chiki phonetic transliteration rules as codified by the **All India Santali Writers' Association (AISWA)** rather than improvised ad-hoc spellings.

4. **Sign-off Requirement**:
   - All proposed edits must be verified with a certified Santhali educator, native speaker, or representative of the Tribal Research Institute (TRI), Ranchi, Jharkhand.

