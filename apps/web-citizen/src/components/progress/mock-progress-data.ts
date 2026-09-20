import { ProjectProgressData } from './types';

export const MOCK_PROGRESS_PROJECT: ProjectProgressData = {
  ticketId: 'JAG-PLM-0082',
  titleEn: 'Solar-Powered Defluoridation Unit for Community Borewell',
  titleHi: 'सामुदायिक बोरवेल हेतु सौर ऊर्जा संचालित डी-फ्लोराइडेशन इकाई',
  titleSat: 'ᱟᱹᱛᱩ ᱪᱟᱯᱟᱠᱚᱞ ᱞᱟᱹᱜᱤᱫ ᱥᱮᱸᱜᱮᱞ ᱫᱟᱲᱮ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ',
  domainEn: 'Water & Fluorosis Prevention',
  domainHi: 'पेयजल एवं फ्लोरोसिस निवारण',
  domainSat: 'ᱫᱟᱜ ᱟᱨ ᱯᱷᱞᱳᱨᱳᱥᱤᱥ ᱥᱚᱞᱦᱮ',
  locationEn: '📍 Village Lesliganj, Palamu District',
  locationHi: '📍 ग्राम लेसलीगंज, पलामू ज़िला',
  locationSat: '📍 ᱟᱹᱛᱩ ᱞᱮᱥᱞᱤᱜᱚᱸᱡᱽ, ᱯᱟᱞᱟᱢᱩ ᱡᱤᱞᱟᱹ',
  institutionEn: 'BIT Mesra (Environmental Chemistry & Water Lab)',
  institutionHi: 'बीआईटी मेसरा (पर्यावरण रसायन एवं जल प्रयोगशाला)',
  institutionSat: 'ᱵᱤ.ᱟᱭᱤ.ᱴᱤ ᱢᱮᱥᱨᱟ (ᱥᱟᱪᱟᱨᱦᱮ ᱠᱮᱢᱤᱥᱴᱨᱤ ᱟᱨ ᱫᱟᱜ ᱞᱮᱵᱽ)',
  nablTagEn: '✓ NABL Accredited R&D Partner',
  nablTagHi: '✓ एनएबीएल मान्यता प्राप्त अनुसंधान संस्थान',
  nablTagSat: '✓ ᱮᱱ.ᱮ.ᱵᱤ.ᱮᱞ ᱥᱟᱹᱨᱤᱭᱟᱹᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ',
  facultyPi: 'Dr. R. Verma',
  facultyDeptEn: 'Professor, Dept. of Civil & Environmental Engineering',
  facultyDeptHi: 'प्रोफेसर, सिविल एवं पर्यावरण इंजीनियरिंग विभाग',
  facultyDeptSat: 'ᱯᱨᱚᱯᱷᱮᱥᱚᱨ, ᱥᱤᱵᱷᱤᱞ ᱟᱨ ᱥᱟᱪᱟᱨᱦᱮ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ ᱦᱟᱹᱴᱤᱧ',
  studentScholarsCount: 4,
  csrSponsorEn: 'Tata Steel CSR Division',
  csrSponsorHi: 'टाटा स्टील सीएसआर प्रभाग',
  csrSponsorSat: 'ᱴᱟᱴᱟ ᱥᱴᱤᱞ ᱥᱤ.ᱮᱥ.ᱟᱨ ᱦᱟᱹᱴᱤᱧ',
  csrAmount: '₹1,50,000',
  dhteGrantAmount: '₹2,00,000',
  totalBudget: '₹3,50,000',
  currentDay: 32,
  totalMaturationDays: 45,
  maturationPercentage: 71,
  stages: [
    {
      id: 1,
      titleEn: 'Submitted',
      titleHi: 'नागरिक शिकायत दर्ज',
      titleSat: 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱫᱟᱨᱡᱽ',
      subtitleEn: 'Submitted 15 Jul 2026',
      subtitleHi: 'दर्ज १५ जुलाई २०२६',
      subtitleSat: '᱑᱕ ᱡᱩᱞᱟᱭ ᱒᱐᱒᱖ ᱨᱮ ᱫᱟᱨᱡᱽ',
      status: 'COMPLETED',
      completedDate: '15 Jul 2026',
      deliverablesEn: [
        'Decentralized citizen report logged via WhatsApp & Portal #JAG-PLM-0082',
        'Detailed geological fluoride mapping of Lesliganj aquifer (8.2 mg/L baseline)',
        'Comprehensive Work Breakdown Structure (WBS) with 3-tranche milestone triggers'
      ],
      deliverablesHi: [
        'व्हाट्सएप एवं पोर्टल द्वारा विकेंद्रीकृत नागरिक शिकायत दर्ज #JAG-PLM-0082',
        'लेसलीगंज भूजल स्तर का फ्लोराइड मानचित्रण (८.२ मिलीग्राम/लीटर बेसलाइन)',
        '३-किस्त मील के पत्थर ट्रिगर्स के साथ विस्तृत कार्य विभाजन संरचना (WBS)'
      ],
      deliverablesSat: [
        'WhatsApp ᱟᱨ ᱯᱳᱨᱴᱟᱞ ᱛᱮ ᱦᱚᱲ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱫᱟᱨᱡᱽ #JAG-PLM-0082',
        'ᱞᱮᱥᱞᱤᱜᱚᱸᱡᱽ ᱫᱟᱜ ᱨᱮ ᱘.᱒ mg/L ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱢᱮᱯᱤᱝ',
        '᱓-ᱠᱤᱥᱛᱤ ᱞᱮᱠᱟᱛᱮ ᱠᱟᱹᱢᱤ ᱦᱟᱹᱴᱤᱧ ᱯᱚᱨᱛᱚᱱ (WBS)'
      ],
      signOffAuthorityEn: 'Citizen Grievance Ingestion Node & Gram Panchayat Lesliganj',
      signOffAuthorityHi: 'नागरिक शिकायत नोड एवं ग्राम पंचायत लेस्लीगंज',
      signOffAuthoritySat: 'ᱦᱚᱲ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱱᱳᱰ ᱟᱨ ᱟᱹᱛᱩ ᱯᱟᱸᱪᱟᱭᱚᱛ ᱞᱮᱥᱞᱤᱜᱚᱸᱡᱽ',
      auditRef: 'AUD-SUB-PLM-01'
    },
    {
      id: 2,
      titleEn: 'AI Triaged',
      titleHi: 'एआई छंटाई एवं सत्यापन',
      titleSat: 'ᱮ.ᱟᱭᱤ ᱵᱟᱪᱷᱟᱣ ᱟᱨ ᱥᱟᱹᱨᱤ',
      subtitleEn: 'Triaged 20 Jul 2026',
      subtitleHi: 'सत्यापित २० जुलाई २०२६',
      subtitleSat: '᱒᱐ ᱡᱩᱞᱟᱭ ᱒᱐᱒᱖ ᱨᱮ ᱥᱟᱹᱨᱤ',
      status: 'COMPLETED',
      completedDate: '20 Jul 2026',
      deliverablesEn: [
        'FastAPI SentenceTransformer similarity score 0.94 validated against DHTE registry',
        'De-duplication clearance against existing PHE borewells in Palamu district',
        'State Higher & Technical Education technical committee sanction #DHTE-RND-2026-114'
      ],
      deliverablesHi: [
        'डीएचटीई रजिस्ट्री के विरुद्ध ०.९४ समानता स्कोर का एआई सत्यापन',
        'पलामू ज़िले में पीएचई के मौजूदा बोरवेल के साथ दोहराव-रहित जांच पूर्ण',
        'उच्च एवं तकनीकी शिक्षा विभाग तकनीकी समिति स्वीकृति #DHTE-RND-2026-114'
      ],
      deliverablesSat: [
        'DHTE ᱨᱮᱡᱤᱥᱴᱨᱤ ᱨᱮ ᱐.᱙᱔ AI ᱥᱟᱹᱨᱤ ᱧᱮᱞ',
        'ᱯᱟᱞᱟᱢᱩ ᱡᱤᱞᱟᱹ ᱨᱮ ᱵᱟᱨ ᱫᱷᱟᱣ ᱵᱟᱝ ᱦᱩᱭᱩᱜ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ',
        'ᱪᱮᱛᱟᱱ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ ᱢᱟᱹᱱ #DHTE-RND-2026-114'
      ],
      signOffAuthorityEn: 'DHTE AI Triage Pipeline & State Nodal Officer',
      signOffAuthorityHi: 'डीएचटीई एआई ट्राइएज पाइपलाइन एवं राज्य नोडल अधिकारी',
      signOffAuthoritySat: 'DHTE AI ᱵᱟᱪᱷᱟᱣ ᱯᱟᱭᱤᱯᱞᱟᱭᱤᱱ ᱟᱨ ᱱᱳᱰᱟᱞ ᱚᱯᱷᱤᱥᱟᱨ',
      auditRef: 'AI-TRIAGE-PLM-082'
    },
    {
      id: 3,
      titleEn: 'University Assigned',
      titleHi: 'विश्वविद्यालय आवंटित',
      titleSat: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱪᱟᱞ',
      subtitleEn: 'Assigned 05 Aug 2026',
      subtitleHi: 'आवंटित ०५ अगस्त २०२६',
      subtitleSat: '᱐᱕ ᱚᱜᱚᱥᱴ ᱒᱐᱒᱖ ᱨᱮ ᱪᱟᱞ',
      status: 'COMPLETED',
      completedDate: '05 Aug 2026',
      deliverablesEn: [
        'Awarded to BIT Mesra (Water Resilient Lab) under Stage 2 competitive bidding',
        'Escrow Tranche 1 (30% / ₹1,05,000) disbursed to institutional PFMS account',
        'NABL testing certificate #NABL-2026-WTR-992 benchmark clearance'
      ],
      deliverablesHi: [
        'चरण २ प्रतिस्पर्धी निविदा के तहत बीआईटी मेसरा को कार्य सौंपा गया',
        'संस्थागत पीएफएमएस खाते में प्रथम किस्त (३०% / ₹१,०५,०००) संवितरित',
        'एनएबीएल परीक्षण प्रमाणपत्र #NABL-2026-WTR-992 बेंचमार्क स्वीकृति'
      ],
      deliverablesSat: [
        'ᱵᱤ.ᱟᱭ.ᱴᱤ ᱢᱮᱥᱨᱟ ᱴᱮᱱᱰᱟᱨ ᱡᱤᱛᱠᱟᱹᱨ ᱠᱟᱛᱮ ᱠᱟᱹᱢᱤ ᱧᱟᱢ ᱠᱮᱫᱟ',
        'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱷᱟᱛᱟ ᱨᱮ ᱯᱩᱭᱞᱩ ᱠᱤᱥᱛᱤ (᱓᱐% / ₹᱑,᱐᱕,᱐᱐᱐) ᱮᱢ ᱮᱱᱟ',
        'NABL ᱴᱮᱥᱴ ᱥᱟᱹᱨᱤ ᱠᱟᱜᱚᱡᱽ #NABL-2026-WTR-992 ᱧᱟᱢ ᱮᱱᱟ'
      ],
      signOffAuthorityEn: 'DHTE Technical Review Board & BIT Mesra Dean R&D',
      signOffAuthorityHi: 'डीएचटीई तकनीकी समीक्षा बोर्ड एवं डीन (अनुसंधान), बीआईटी मेसरा',
      signOffAuthoritySat: 'ᱰᱤ.ᱮᱭᱤᱪ.ᱴᱤ.ᱤ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱵᱳᱨᱰ ᱟᱨ ᱰᱤᱱ, ᱵᱤ.ᱟᱭᱤ.ᱴᱤ ᱢᱮᱥᱨᱟ',
      auditRef: 'NABL-2026-WTR-992'
    },
    {
      id: 4,
      titleEn: 'Live Pilot',
      titleHi: 'क्षेत्रीय लाइव पायलट',
      titleSat: 'ᱴᱷᱟᱶ ᱞᱟᱭᱤᱵᱽ ᱯᱟᱭᱞᱚᱴ',
      subtitleEn: 'Day 32 of 45 (In Progress)',
      subtitleHi: 'दिन ३२ / ४५ (सक्रिय)',
      subtitleSat: '᱓᱒ ᱢᱟᱦᱟᱸ / ᱔᱕ (ᱪᱟᱹᱞᱩ)',
      status: 'IN_PROGRESS',
      deliverablesEn: [
        'Rugged solar skid installed on Community Borewell #4 at Village Lesliganj, Palamu',
        'Statutory PESA Section 4(d) Gram Sabha approval resolution #GS-PLM-44',
        '45-Day unassisted maturation: 32 days uninterrupted flow with zero downtime'
      ],
      deliverablesHi: [
        'लेसलीगंज के सामुदायिक बोरवेल संख्या ४ पर सौर डिफ्लोराइडेशन स्किड स्थापित',
        'पेसा अधिनियम १९९६ धारा ४(घ) ग्राम सभा वैधानिक अनापत्ति प्रस्ताव #GS-PLM-44',
        '४५ दिवसीय स्वायत्त स्थिरीकरण: ३२ दिन अविरल प्रवाह एवं शून्य तकनीकी व्यवधान'
      ],
      deliverablesSat: [
        'ᱞᱮᱥᱞᱤᱜᱚᱸᱡᱽ ᱟᱹᱛᱩ ᱨᱮ ᱔ ᱟᱱᱟᱜ ᱪᱟᱯᱟᱠᱚᱞ ᱨᱮ ᱥᱮᱸᱜᱮᱞ ᱢᱮᱥᱤᱱ ᱵᱮᱥᱟᱣ',
        'ᱯᱮᱥᱟ ᱟᱹᱱ ᱑᱙᱙᱖ ᱞᱮᱠᱟᱛᱮ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱢᱟᱹᱱ #GS-PLM-44',
        '᱔᱕ ᱢᱟᱦᱟᱸ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ: ᱓᱒ ᱢᱟᱦᱟᱸ ᱞᱮᱛᱟᱲ ᱪᱟᱹᱞᱩ, ᱪᱮᱫ ᱵᱟᱹᱲᱤᱡ ᱵᱟᱝ'
      ],
      signOffAuthorityEn: 'Active Real-Time Monitoring by Village Water Committee (VWSC)',
      signOffAuthorityHi: 'ग्राम जल एवं स्वच्छता समिति (VWSC) द्वारा वास्तविक समय निगरानी',
      signOffAuthoritySat: 'ᱟᱹᱛᱩ ᱫᱟᱜ ᱟᱨ ᱥᱟᱯᱷᱟ ᱠᱩᱢᱩᱴ (VWSC) ᱦᱚᱛᱮᱛᱮ ᱧᱮᱞ',
      auditRef: 'TELEMETRY-PLM-32'
    },
    {
      id: 5,
      titleEn: 'Quorum Passed',
      titleHi: 'ग्राम सभा कोरम उत्तीर्ण',
      titleSat: 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱠᱳᱨᱟᱢ ᱯᱟᱥ',
      subtitleEn: 'Scheduled for Day 46',
      subtitleHi: '४६वें दिन निर्धारित',
      subtitleSat: '᱔᱖ ᱟᱱᱟᱜ ᱢᱟᱦᱟᱸ ᱨᱮ ᱛᱟᱺᱜᱤ',
      status: 'SCHEDULED',
      deliverablesEn: [
        'Automated Gram Sabha quorum verification (Minimum 43 local voter quorum)',
        'Permanent archival of compliance certificates into Jharkhand Innovation Registry',
        'Direct transfer of 4 Academic Credits to student APAAR / DigiLocker transcripts'
      ],
      deliverablesHi: [
        'स्वचालित ग्राम सभा कोरम सत्यापन (न्यूनतम ४३ स्थानीय नागरिक वोट)',
        'झारखंड नवाचार रजिस्ट्री में अनुपालन प्रमाणपत्रों का स्थायी डिजिटलीकरण',
        'छात्रों के अपार / डिजिलॉकर ट्रांसक्रिप्ट में ४ अकादमिक क्रेडिट का सीधा अंतरण'
      ],
      deliverablesSat: [
        'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱠᱳᱨᱟᱢ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ (ᱠᱚᱢ ᱠᱷᱚᱱ ᱠᱚᱢ ᱔᱓ ᱦᱚᱲ ᱵᱷᱳᱴ)',
        'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨ ᱨᱮᱡᱤᱥᱴᱨᱤ ᱨᱮ ᱥᱟᱹᱨᱤ ᱠᱟᱜᱚᱡᱽ ᱫᱚᱦᱚ',
        'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ APAAR / DigiLocker ᱨᱮ ᱔ ᱠᱨᱮᱰᱤᱴ ᱵᱷᱮᱡᱟ'
      ],
      signOffAuthorityEn: 'Jharkhand State Innovation Council & UGC Nodal Authority',
      signOffAuthorityHi: 'झारखंड राज्य नवाचार परिषद एवं यूजीसी नोडल प्राधिकरण',
      signOffAuthoritySat: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱯᱚᱱᱚᱛ ᱱᱟᱣᱟ ᱵᱷᱟᱵᱽᱱᱟ ᱵᱟᱹᱭᱥᱤ ᱟᱨ UGC ᱚᱯᱷᱤᱥ',
      auditRef: 'CLOSURE-PLM-PENDING'
    }
  ],
  escrowTranches: [
    {
      trancheNumber: 1,
      percentage: 30,
      amount: '₹1,05,000',
      milestoneTitleEn: 'Kickoff & Component Sourcing',
      milestoneTitleHi: 'परियोजना प्रारंभ एवं उपकरण खरीद',
      milestoneTitleSat: 'ᱠᱟᱹᱢᱤ ᱮᱦᱚᱵ ᱟᱨ ᱢᱮᱥᱤᱱ ᱥᱟᱢᱟᱱ ᱠᱤᱨᱤᱧ',
      status: 'DISBURSED',
      disbursedDate: '12 Aug 2026',
      verificationBadgeEn: 'DHTE Nodal Officer Authorization Verified',
      verificationBadgeHi: 'डीएचटीई नोडल अधिकारी सत्यापन पूर्ण',
      verificationBadgeSat: 'ᱰᱤ.ᱮᱭᱤᱪ.ᱴᱤ.ᱤ ᱚᱯᱷᱤᱥᱟᱨ ᱥᱟᱹᱨᱤ ᱠᱮᱫᱟ',
      attachmentRef: 'TR1-DHTE-APPROVAL-08'
    },
    {
      trancheNumber: 2,
      percentage: 40,
      amount: '₹1,40,000',
      milestoneTitleEn: 'Bench Prototype Validation',
      milestoneTitleHi: 'प्रयोगशाला प्रोटोटाइप सत्यापन',
      milestoneTitleSat: 'ᱞᱮᱵᱽ ᱯᱨᱳᱴᱳᱴᱟᱭᱤᱯ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ',
      status: 'DISBURSED',
      disbursedDate: '20 Aug 2026',
      verificationBadgeEn: 'NABL Certificate #NABL-2026-WTR-992 Verified',
      verificationBadgeHi: 'एनएबीएल प्रमाणपत्र #NABL-2026-WTR-992 सत्यापित',
      verificationBadgeSat: 'ᱮᱱ.ᱮ.ᱵᱤ.ᱮᱞ ᱥᱟᱹᱨᱤ ᱠᱟᱜᱚᱡᱽ #NABL-2026-WTR-992',
      attachmentRef: 'NABL-2026-WTR-992'
    },
    {
      trancheNumber: 3,
      percentage: 30,
      amount: '₹1,05,000',
      milestoneTitleEn: 'Live Installation & O&M Handover',
      milestoneTitleHi: 'क्षेत्रीय स्थापना एवं संचालन व रखरखाव सुपुर्दगी',
      milestoneTitleSat: 'ᱟᱹᱛᱩ ᱨᱮ ᱵᱮᱥᱟᱣ ᱟᱨ ᱥᱟᱢᱵᱽᱲᱟᱣ ᱪᱟᱞ',
      status: 'DISBURSED',
      disbursedDate: '28 Aug 2026',
      verificationBadgeEn: 'Gram Sabha PESA Resolution #GS-PLM-44 Attached',
      verificationBadgeHi: 'ग्राम सभा पेसा प्रस्ताव #GS-PLM-44 संलग्न',
      verificationBadgeSat: 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ PESA ᱢᱟᱹᱱ #GS-PLM-44',
      attachmentRef: 'GS-PLM-44'
    }
  ],
  auditVault: [
    {
      id: 'doc-nabl',
      cardLetter: 'A',
      titleEn: 'NABL Lab Purity Report',
      titleHi: 'एनएबीएल प्रयोगशाला शुद्धता परीक्षण रिपोर्ट',
      titleSat: 'ᱮᱱ.ᱮ.ᱵᱤ.ᱮᱞ ᱞᱮᱵᱽ ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱨᱤᱯᱳᱨᱴ',
      badgeEn: 'ISO/IEC 17025 Accredited',
      badgeHi: 'आईएसओ/आईईसी १७०२५ मान्यता प्राप्त',
      badgeSat: 'ISO/IEC 17025 ᱥᱟᱹᱨᱤ ᱢᱟᱹᱱ',
      summaryEn: 'Certified lab analysis proves Fluoride reduced from toxic 8.2 mg/L to safe 0.8 mg/L (Safe WHO Standard: < 1.0 mg/L).',
      summaryHi: 'प्रमाणित परीक्षण सिद्ध करता है कि फ्लोराइड विषाक्त ८.२ से घटकर सुरक्षित ०.८ मिलीग्राम/लीटर हो गया है (डब्ल्यूएचओ मानक: < १.०)।',
      summarySat: 'ᱞᱮᱵᱽ ᱵᱤᱰᱟᱹᱣ ᱞᱮᱠᱟᱛᱮ ᱵᱤᱥ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱘.᱒ mg/L ᱠᱷᱚᱱ ᱠᱚᱢ ᱠᱟᱛᱮ ᱐.᱘ mg/L ᱦᱩᱭ ᱮᱱᱟ (WHO ᱢᱟᱹᱱ: < ᱑.᱐ mg/L)᱾',
      documentNumber: 'NABL-2026-WTR-992',
      issueDate: '05 Aug 2026',
      signatoryEn: 'Dr. S. K. Mukherjee, Chief Environmental Assessor (NABL Auditor)',
      signatoryHi: 'डॉ. एस. के. मुखर्जी, मुख्य पर्यावरण परीक्षक (एनएबीएल ऑडिटर)',
      signatorySat: 'ᱰᱨ. ᱮᱥ. ᱠᱮ. ᱢᱩᱠᱷᱟᱨᱡᱤ, ᱥᱟᱪᱟᱨᱦᱮ ᱯᱟᱹᱨᱠᱷᱟᱹᱣᱤᱭᱟᱹ (NABL)',
      details: {
        type: 'LAB_REPORT',
        metrics: [
          {
            parameterEn: 'Fluoride Concentration (F⁻)',
            parameterHi: 'फ्लोराइड सांद्रता (F⁻)',
            parameterSat: 'ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱦᱟᱹᱴᱤᱧ (F⁻)',
            rawGroundwater: '8.2 mg/L',
            treatedWater: '0.8 mg/L',
            whoStandard: '< 1.0 mg/L',
            status: 'SAFE'
          },
          {
            parameterEn: 'Total Dissolved Solids (TDS)',
            parameterHi: 'कुल घुलित ठोस (TDS)',
            parameterSat: 'ᱜᱩᱞᱟᱹᱴ ᱫᱟᱜ ᱥᱟᱢᱟᱱ (TDS)',
            rawGroundwater: '680 mg/L',
            treatedWater: '240 mg/L',
            whoStandard: '< 500 mg/L',
            status: 'SAFE'
          },
          {
            parameterEn: 'Turbidity',
            parameterHi: 'गंदलापन (Turbidity)',
            parameterSat: 'ᱵᱳᱫᱮ ᱫᱟᱜ (Turbidity)',
            rawGroundwater: '4.8 NTU',
            treatedWater: '0.4 NTU',
            whoStandard: '< 1.0 NTU',
            status: 'SAFE'
          },
          {
            parameterEn: 'Arsenic (As)',
            parameterHi: 'आर्सेनिक (As)',
            parameterSat: 'ᱟᱨᱥᱮᱱᱤᱠ (As)',
            rawGroundwater: '0.04 mg/L',
            treatedWater: '< 0.005 mg/L',
            whoStandard: '< 0.01 mg/L',
            status: 'SAFE'
          },
          {
            parameterEn: 'Potential of Hydrogen (pH)',
            parameterHi: 'पीएच मान (pH)',
            parameterSat: 'pH ᱢᱟᱹᱱ',
            rawGroundwater: '6.8 pH',
            treatedWater: '7.2 pH',
            whoStandard: '6.5 - 8.5 pH',
            status: 'SAFE'
          },
          {
            parameterEn: 'Coliform Pathogens',
            parameterHi: 'कोलीफॉर्म रोगाणु',
            parameterSat: 'ᱡᱤᱣᱤ ᱠᱤᱴᱟᱱᱩ (Coliform)',
            rawGroundwater: '18 CFU/100ml',
            treatedWater: '0 CFU/100ml',
            whoStandard: '0 CFU/100ml',
            status: 'SAFE'
          }
        ]
      }
    },
    {
      id: 'doc-pesa',
      cardLetter: 'B',
      titleEn: 'PESA Act 1996 Gram Sabha NOC',
      titleHi: 'पेसा अधिनियम १९९६ ग्राम सभा अनापत्ति प्रमाण पत्र',
      titleSat: 'ᱯᱮᱥᱟ (PESA) ᱟᱹᱱ ᱑᱙᱙᱖ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱢᱟᱹᱱ ᱠᱟᱜᱚᱡᱽ',
      badgeEn: 'Fifth Schedule Statutory Compliance',
      badgeHi: 'पाँचवीं अनुसूची वैधानिक अनुपालन',
      badgeSat: '᱕ ᱟᱱᱟᱜ ᱟᱹᱱ ᱞᱮᱠᱟᱛᱮ ᱥᱟᱹᱨᱤ',
      summaryEn: 'Signed by Panchayat Secretary Rajeshwar Mahto for Fifth Schedule tribal compliance, verifying unanimous village consent.',
      summaryHi: 'पाँचवीं अनुसूची जनजातीय अनुपालन हेतु पंचायत सचिव राजेश्वर महतो द्वारा हस्ताक्षरित, सर्वसम्मत ग्राम सहमति प्रमाणित।',
      summarySat: 'ᱯᱟᱸᱪᱟᱭᱚᱛ ᱥᱩᱛᱨᱮᱛ ᱨᱟᱡᱮᱥᱣᱚᱨ ᱢᱟᱦᱛᱳ ᱦᱚᱛᱮᱛᱮ ᱥᱩᱦᱤ ᱟᱠᱟᱱ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱟᱹᱱ ᱞᱮᱠᱟᱛᱮ ᱡᱚᱛᱚ ᱦᱚᱲᱟᱜ ᱨᱮᱵᱮᱱ ᱢᱟᱹᱱ᱾',
      documentNumber: 'GS-PLM-44/2026',
      issueDate: '12 Aug 2026',
      signatoryEn: 'Rajeshwar Mahto (Panchayat Secretary) & Budhan Munda (Gram Pradhan)',
      signatoryHi: 'राजेश्वर महतो (पंचायत सचिव) एवं बुधन मुंडा (ग्राम प्रधान/मुखिया)',
      signatorySat: 'ᱨᱟᱡᱮᱥᱣᱚᱨ ᱢᱟᱦᱛᱳ (ᱯᱟᱸᱪᱟᱭᱚᱛ ᱥᱩᱛᱨᱮᱛ) ᱟᱨ ᱵᱩᱫᱷᱚᱱ ᱢᱩᱱᱰᱟ (ᱢᱩᱠᱷᱤᱭᱟᱹ)',
      details: {
        type: 'PESA_NOC',
        pesaData: {
          villagePanchayatEn: 'Lesliganj Gram Panchayat, Palamu District, Jharkhand',
          villagePanchayatHi: 'लेसलीगंज ग्राम पंचायत, पलामू ज़िला, झारखंड',
          villagePanchayatSat: 'ᱞᱮᱥᱞᱤᱜᱚᱸᱡᱽ ᱟᱹᱛᱩ ᱯᱟᱸᱪᱟᱭᱚᱛ, ᱯᱟᱞᱟᱢᱩ ᱡᱤᱞᱟᱹ, ᱡᱷᱟᱨᱠᱷᱚᱸᱰ',
          attendeesTotal: 84,
          tribalQuorumPct: '73.8% ST Attendance (62 Members)',
          statutoryClause: 'Section 4(d) & 4(j) of PESA Act 1996 (Protection of Community Water Resources in Scheduled Areas)',
          resolutionExcerptEn: 'The Gram Sabha of Lesliganj convened under Fifth Schedule provisions and hereby grants statutory consent for the installation of the Solar Defluoridation Plant at Ward 4 Borewell. Free, prior and unhindered drinking water access is guaranteed to all households without discrimination.',
          resolutionExcerptHi: 'पाँचवीं अनुसूची प्रावधानों के तहत आयोजित लेसलीगंज ग्राम सभा वार्ड ४ बोरवेल पर सौर डिफ्लोराइडेशन संयंत्र की स्थापना हेतु वैधानिक सहमति प्रदान करती है। सभी परिवारों को बिना किसी भेदभाव के निःशुल्क स्वच्छ पेयजल का अधिकार सुनिश्चित है।',
          resolutionExcerptSat: '᱕ ᱟᱱᱟᱜ ᱟᱹᱱ ᱞᱮᱠᱟᱛᱮ ᱫᱩᱯᱲᱩᱵ ᱟᱠᱟᱱ ᱞᱮᱥᱞᱤᱜᱚᱸᱡᱽ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱔ ᱟᱱᱟᱜ ᱣᱟᱨᱰ ᱪᱟᱯᱟᱠᱚᱞ ᱨᱮ ᱥᱮᱸᱜᱮᱞ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱢᱮᱥᱤᱱ ᱵᱮᱥᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱢᱟᱹᱱ ᱮ ᱮᱢ ᱠᱮᱫᱟ᱾ ᱡᱚᱛᱚ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱞᱟᱹᱜᱤᱫ ᱵᱤᱱᱟᱹ ᱵᱷᱮᱫᱽᱵᱷᱟᱣ ᱛᱮ ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱧᱟᱢᱚᱜ-ᱟ᱾'
        }
      }
    },
    {
      id: 'doc-handover',
      cardLetter: 'C',
      titleEn: 'Local O&M Handover Certificate',
      titleHi: 'स्थानीय संचालन एवं रखरखाव (O&M) सुपुर्दगी प्रमाणपत्र',
      titleSat: 'ᱟᱹᱛᱩ ᱨᱮ ᱥᱟᱢᱵᱽᱲᱟᱣ (O&M) ᱪᱟᱞ ᱥᱟᱹᱨᱤ ᱠᱟᱜᱚᱡᱽ',
      badgeEn: 'Grassroots Capacity Verified',
      badgeHi: 'जमीनी क्षमता सत्यापन पूर्ण',
      badgeSat: 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱠᱟᱹᱢᱤ ᱫᱟᱲᱮ ᱥᱟᱹᱨᱤ',
      summaryEn: 'Verified training of 2 local Jal Sahiyas (Sunita Devi & Anita Soren) with 12 months of spare parts escrowed in Panchayat locker.',
      summaryHi: '२ स्थानीय जल सहियाओं (सुनीता देवी एवं अनिता सोरेन) का प्रमाणित प्रशिक्षण एवं पंचायत लॉकर में १२ माह के स्पेयर पार्ट्स सुरक्षित।',
      summarySat: '᱒ ᱡᱚᱞ ᱥᱚᱦᱤᱭᱟ (ᱥᱩᱱᱤᱛᱟ ᱫᱮᱵᱤ ᱟᱨ ᱚᱱᱤᱛᱟ ᱥᱚᱨᱮᱱ) ᱥᱮᱪᱮᱫ ᱥᱟᱹᱨᱤ ᱟᱨ ᱯᱟᱸᱪᱟᱭᱚᱛ ᱨᱮ ᱑᱒ ᱪᱟᱸᱫᱚ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱢᱟᱱ ᱫᱚᱦᱚ ᱮᱱᱟ᱾',
      documentNumber: 'O&M-BIT-PLM-2026-08',
      issueDate: '12 Aug 2026',
      signatoryEn: 'Dr. R. Verma (BIT Mesra) & Anita Soren (Jal Sahiya Lead)',
      signatoryHi: 'डॉ. आर. वर्मा (बीआईटी मेसरा) एवं अनिता सोरेन (जल सहिया प्रमुख)',
      signatorySat: 'ᱰᱨ. ᱟᱨ. ᱵᱚᱨᱢᱟ (ᱵᱤ.ᱟᱭᱤ.ᱴᱤ) ᱟᱨ ᱚᱱᱤᱛᱟ ᱥᱚᱨᱮᱱ (ᱡᱚᱞ ᱥᱚᱦᱤᱭᱟ)',
      details: {
        type: 'HANDOVER_CERT',
        handoverData: {
          sahiyas: [
            {
              nameEn: 'Smt. Sunita Devi',
              nameHi: 'श्रीमती सुनीता देवी',
              nameSat: 'ᱢᱟᱹᱱᱚᱛᱤ ᱥᱩᱱᱤᱛᱟ ᱫᱮᱵᱤ',
              roleEn: 'Jal Sahiya (Certified Field Operator)',
              roleHi: 'जल सहिया (प्रमाणित क्षेत्रीय ऑपरेटर)',
              roleSat: 'ᱡᱚᱞ ᱥᱚᱦᱤᱭᱟ (ᱥᱟᱹᱨᱤ ᱠᱟᱹᱢᱤᱭᱟᱹ)'
            },
            {
              nameEn: 'Smt. Anita Soren',
              nameHi: 'श्रीमती अनिता सोरेन',
              nameSat: 'ᱢᱟᱹᱱᱚᱛᱤ ᱚᱱᱤᱛᱟ ᱥᱚᱨᱮᱱ',
              roleEn: 'Jal Sahiya (Water Quality Testing Lead)',
              roleHi: 'जल सहिया (जल गुणवत्ता परीक्षण प्रमुख)',
              roleSat: 'ᱡᱚᱞ ᱥᱚᱦᱤᱭᱟ (ᱫᱟᱜ ᱯᱟᱹᱨᱠᱷᱟᱹᱣᱤᱭᱟᱹ)'
            }
          ],
          trainingHours: 40,
          spareInventoryEn: [
            '2x Replacement Activated Alumina Food-Grade Cartridges',
            '4x High-Pressure Teflon Flow Control Ball Valves',
            '1x 24V DC Brushless Solar Booster Sub-Pump',
            '100x Daily Fluoride Field Colorimetric Reagent Ampoules',
            '1x Maintenance Toolkit with Pressure Gauge & Sealants'
          ],
          spareInventoryHi: [
            '२x अतिरिक्त सक्रिय एल्यूमिना सोखता कार्ट्रिज',
            '४x उच्च दबाव टेफ्लॉन प्रवाह नियंत्रण वाल्व',
            '१x २४V डीसी ब्रशलेस सौर बूस्टर पंप',
            '१००x दैनिक फ्लोराइड परीक्षण रासायनिक किट',
            '१x रखरखाव टूलकिट, प्रेशर गेज एवं सीलेंट'
          ],
          spareInventorySat: [
            '᱒x ᱵᱚᱫᱚᱞ ᱞᱟᱹᱜᱤᱫ ᱮᱞᱩᱢᱤᱱᱟ ᱯᱷᱤᱞᱴᱟᱨ ᱠᱟᱨᱴᱨᱤᱡᱽ',
            '᱔x ᱴᱮᱯᱷᱞᱳᱱ ᱫᱟᱜ ᱵᱷᱟᱞᱵᱽ',
            '᱑x ᱒᱔V ᱥᱮᱸᱜᱮᱞ ᱰᱤ.ᱥᱤ ᱵᱩᱥᱴᱟᱨ ᱯᱟᱢᱯ',
            '᱑᱐᱐x ᱫᱤᱱᱟᱹᱢ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱴᱮᱥᱴ ᱠᱮᱢᱤᱠᱟᱞ ᱠᱤᱴ',
            '᱑x ᱥᱟᱢᱵᱽᱲᱟᱣ ᱦᱟᱹᱛᱭᱟᱹᱨ ᱵᱟᱠᱥᱟ'
          ],
          emergencySla: '24-Hour Rapid Response Window underwritten by BIT Mesra Water Division'
        }
      }
    }
  ],
  quorum: {
    villagePopulation: 850,
    formulaString: 'Quorum_min = max(15, ceil(1.45 * sqrt(850))) = 43 Verified Local Votes Needed',
    quorumNeeded: 43,
    quorumPolled: 46,
    percentMet: 107,
    passVotes: 42,
    passPercentage: 91.3,
    failVotes: 4,
    failPercentage: 8.7,
    nlpFilterStatusEn: 'Zero Critical System Defects (<30% threshold). 2 Cosmetic Grievances noted.',
    nlpFilterStatusHi: 'शून्य गंभीर प्रणालीगत दोष (<३०% सीमा)। २ सामान्य सुझाव दर्ज।',
    nlpFilterStatusSat: 'ᱪᱮᱫ ᱢᱟᱨᱟᱝ ᱵᱟᱹᱲᱤᱡ ᱦᱚᱸ ᱵᱟᱹᱱᱩᱜ-ᱟ (<᱓᱐% ᱥᱤᱢᱟᱹ)᱾ ᱒ ᱠᱟᱹᱴᱤᱡ ᱠᱷᱟᱹᱢᱤ ᱱᱳᱴ ᱮᱱᱟ᱾',
    cosmeticGrievancesCount: 2,
    criticalDefectsCount: 0
  },
  academicCredits: {
    hoursLogged: 120,
    creditsEarned: 4,
    ncrfFormula: '120 Verified Workhours logged = 4 Academic Credits (National Credit Framework - NCrF Level 6)',
    apaarStatusEn: 'Pre-Authorized (Auto-transfers to student transcripts on Day 46 sign-off)',
    apaarStatusHi: 'पूर्व-अधिकृत (४६वें दिन समापन पर छात्रों के ट्रांसक्रिप्ट में स्वतः स्थानांतरित)',
    apaarStatusSat: 'ᱢᱟᱲᱟᱝ ᱠᱷᱚᱱ ᱢᱟᱹᱱ ᱟᱠᱟᱱ (᱔᱖ ᱟᱱᱟᱜ ᱢᱟᱦᱟᱸ ᱨᱮ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ଖᱟᱛᱟ ᱛᱮ ᱪᱟᱞᱟᱜ-ᱟ)',
    apaarRegistryId: 'ABC-JAG-2026-BIT-092',
    facultyApiPoints: 10,
    facultyCasScheme: 'UGC-CAS Table 2 (Category 3: Societal Field Innovation & Applied Rural Research)',
    studentLeads: [
      {
        name: 'Priya Kumari',
        program: 'M.Tech Environmental Engineering (Roll: 2024-ENV-014)',
        roleEn: 'Lead Fluidics & Solar Column Skid Designer',
        roleHi: 'प्रमुख द्रविकी एवं सौर कॉलम स्किड डिज़ाइनर',
        roleSat: 'ᱢᱩᱬᱩᱛ ᱥᱮᱸᱜᱮᱞ ᱠᱟᱹᱢᱤ ᱟᱨ ᱯᱷᱞᱩᱭᱤᱰᱤᱠᱥ ᱰᱤᱡᱟᱭᱱᱟᱨ'
      },
      {
        name: 'Amit Oraon',
        program: 'B.Tech Chemical Engineering (Roll: 2023-CHE-088)',
        roleEn: 'Adsorption Chemistry & Lab Validation Lead',
        roleHi: 'अधिशोषण रसायन एवं प्रयोगशाला सत्यापन प्रमुख',
        roleSat: 'ᱠᱮᱢᱤᱠᱟᱞ ᱯᱷᱤᱞᱴᱟᱨ ᱟᱨ ᱞᱮᱵᱽ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱢᱩᱬᱩᱛ'
      },
      {
        name: 'Rahul Soren',
        program: 'B.Tech Mechanical Engineering (Roll: 2023-MEC-052)',
        roleEn: 'Structural Mounting & PESA Field Commissioning',
        roleHi: 'संरचनात्मक माउंटिंग एवं पेसा क्षेत्रीय कमीशनिंग',
        roleSat: 'ᱢᱮᱥᱤᱱ ᱵᱮᱥᱟᱣ ᱟᱨ ᱯᱮᱥᱟ ᱟᱹᱛᱩ ᱠᱟᱹᱢᱤ ᱢᱩᱬᱩᱛ'
      },
      {
        name: 'Sneha Sharma',
        program: 'B.Tech Computer Science (Roll: 2023-CSE-109)',
        roleEn: 'IoT Telemetry & Quorum Consensus Oracle Integration',
        roleHi: 'आईओटी टेलीमेट्री एवं कोरम सर्वसम्मति ओरेकल एकीकरण',
        roleSat: 'IoT ᱴᱮᱞᱤᱢᱮᱴᱨᱤ ᱟᱨ ᱠᱳᱨᱟᱢ ᱰᱟᱴᱟ ᱡᱚᱲᱟᱣ'
      }
    ]
  }
};

export const ALL_MOCK_PROJECTS: Record<string, ProjectProgressData> = {
  'JAG-PLM-0082': MOCK_PROGRESS_PROJECT,
  'JAG-KHT-0014': {
    ...MOCK_PROGRESS_PROJECT,
    ticketId: 'JAG-KHT-0014',
    titleEn: 'Solar Cold Storage for Tribal Lac & Silk',
    titleHi: 'जनजातीय लाह एवं रेशम हेतु सौर शीत गृह',
    titleSat: 'ᱞᱟᱦᱟ ᱟᱨ ᱥᱤᱞᱠ ᱞᱟᱹᱜᱤᱫ ᱵᱮᱲᱟ ᱫᱟᱲᱮ ᱨᱮᱭᱟᱲ ᱜᱩᱫᱟᱢ',
    domainEn: 'Agritech & Forest Produce Preservation',
    domainHi: 'कृषि तकनीक एवं वनोपज संरक्षण',
    domainSat: 'ᱪᱟᱥ ᱴᱮᱠᱱᱤᱠ ᱟᱨ ᱵᱤᱨ ᱡᱤᱱᱤᱥ',
    locationEn: '📍 Torpa Block, Khunti District',
    locationHi: '📍 तोरपा प्रखंड, खूंटी ज़िला',
    locationSat: '📍 ᱛᱳᱨᱯᱟ ᱯᱨᱚᱠᱷᱚᱸᱰ, ᱠᱷᱩᱸᱴᱤ ᱡᱤᱞᱟᱹ',
    institutionEn: 'Birsa Agricultural University (BAU), Ranchi',
    institutionHi: 'बिरसा कृषि विश्वविद्यालय (बीएयू), राँची',
    institutionSat: 'ᱵᱤᱨᱥᱟ ᱪᱟᱥ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ (BAU), ᱨᱟᱺᱪᱤ',
    facultyPi: 'Prof. S. Soren',
    facultyDeptEn: 'Professor, Dept. of Post-Harvest Technology',
    facultyDeptHi: 'प्रोफेसर, कटाई उपरांत प्रौद्योगिकी विभाग',
    facultyDeptSat: 'ᱯᱨᱚᱯᱷᱮᱥᱚᱨ, ᱪᱟᱥ ᱛᱟᱭᱚᱢ ᱴᱮᱠᱱᱳᱞᱳᱡᱤ',
    csrSponsorEn: 'Tata Steel CSR Division',
    csrSponsorHi: 'टाटा स्टील सीएसआर प्रभाग',
    csrSponsorSat: 'ᱴᱟᱴᱟ ᱥᱴᱤᱞ ᱥᱤ.ᱮᱥ.ᱟᱨ ᱦᱟᱹᱴᱤᱧ',
    csrAmount: '₹1,50,000',
    dhteGrantAmount: '₹2,00,000',
    totalBudget: '₹3,50,000',
    currentDay: 18,
    totalMaturationDays: 30,
    maturationPercentage: 60,
    escrowTranches: [
      {
        trancheNumber: 1,
        percentage: 30,
        amount: '₹1,05,000',
        milestoneTitleEn: 'Bench Design & Compressor Sourcing',
        milestoneTitleHi: 'बेंच डिज़ाइन एवं कंप्रेसर खरीद',
        milestoneTitleSat: 'ᱰᱤᱡᱟᱭᱤᱱ ᱟᱨ ᱠᱟᱹᱣᱰᱤ ᱪᱟᱞ',
        status: 'DISBURSED',
        disbursedDate: '08 Aug 2026',
        verificationBadgeEn: 'Tranche 1 Disbursed (₹1,05,000 released)',
        verificationBadgeHi: 'प्रथम चरण संवितरित (₹१,०५,००० विमुक्त)',
        verificationBadgeSat: 'ᱯᱩᱭᱞᱩ ᱦᱟᱹᱴᱤᱧ ᱮᱢ ᱟᱠᱟᱱᱟ (₹᱑,᱐᱕,᱐᱐᱐)',
        attachmentRef: 'TR1-BAU-KHT-01'
      },
      {
        trancheNumber: 2,
        percentage: 40,
        amount: '₹1,40,000',
        milestoneTitleEn: 'Thermal Gradient Bench Validation (2-4°C)',
        milestoneTitleHi: 'तापीय प्रवणता बेंच सत्यापन (२-४°C)',
        milestoneTitleSat: 'ᱞᱚᱞᱚ-ᱨᱮᱭᱟᱲ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ (᱒-᱔°C)',
        status: 'LOCKED',
        verificationBadgeEn: 'Pending Hackathon Round 2 Jury Clearance',
        verificationBadgeHi: 'हैकथॉन चरण २ जूरी अनुमोदन लंबित',
        verificationBadgeSat: 'ᱦᱮᱠᱟᱛᱷᱚᱱ ᱫᱚᱥᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱛᱟᱺᱜᱤ',
        attachmentRef: 'TR2-BAU-PENDING'
      },
      {
        trancheNumber: 3,
        percentage: 30,
        amount: '₹1,05,000',
        milestoneTitleEn: 'Torpa Field Commissioning & Lac SHG Handover',
        milestoneTitleHi: 'तोरपा क्षेत्रीय कमीशनिंग एवं लाह एसएचजी सुपुर्दगी',
        milestoneTitleSat: 'ᱛᱳᱨᱯᱟ ᱴᱷᱟᱶ ᱨᱮ ᱪᱟᱞ',
        status: 'LOCKED',
        verificationBadgeEn: 'Gram Sabha Quorum & SHG Resolution Trigger',
        verificationBadgeHi: 'ग्राम सभा कोरम एवं एसएचजी प्रस्ताव पर विमोच्य',
        verificationBadgeSat: 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱠᱳᱨᱟᱢ ᱛᱟᱭᱚᱢ',
        attachmentRef: 'TR3-BAU-PENDING'
      }
    ]
  },
  'JAG-WSH-0031': {
    ...MOCK_PROGRESS_PROJECT,
    ticketId: 'JAG-WSH-0031',
    titleEn: 'Hybrid Battery Voltage Stabilizer for Forest Health Sub-Center',
    titleHi: 'वन स्वास्थ्य उप-केंद्र हेतु हाइब्रिड बैटरी वोल्टेज स्टेबलाइजर',
    titleSat: 'ᱵᱤᱨ ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ ᱛᱟᱞᱢᱟ ᱞᱟᱹᱜᱤᱫ ᱦᱟᱭᱵᱽᱨᱤᱰ ᱵᱮᱴᱨᱤ ᱵᱷᱳᱞᱴᱮᱡᱽ ᱥᱴᱮᱵᱤᱞᱟᱭᱤᱡᱟᱨ',
    domainEn: 'Clean Energy & Cold Chain Protection',
    domainHi: 'स्वच्छ ऊर्जा एवं शीत श्रृंखला सुरक्षा',
    domainSat: 'ᱯᱷᱟᱨᱪᱟ ᱫᱟᱲᱮ ᱟᱨ ᱨᱩᱠᱷᱤᱭᱟᱹ',
    locationEn: '📍 Chaibasa, West Singhbhum District',
    locationHi: '📍 चाईबासा, पश्चिमी सिंहभूम ज़िला',
    locationSat: '📍 ᱪᱟᱭᱵᱟᱥᱟ, ᱯᱟᱪᱮ ᱥᱤᱝᱵᱷᱩᱢ ᱡᱤᱞᱟᱹ',
    institutionEn: 'National Institute of Technology (NIT), Jamshedpur',
    institutionHi: 'राष्ट्रीय प्रौद्योगिकी संस्थान (एनआईटी), जमशेदपुर',
    institutionSat: 'ᱱᱮᱥᱱᱟᱞ ᱤᱱᱥᱴᱤᱴᱤᱭᱩᱴ ᱚᱯᱷ ᱴᱮᱠᱱᱳᱞᱳᱡᱤ (NIT), ᱡᱟᱢᱥᱮᱫᱽᱯᱩᱨ',
    facultyPi: 'Dr. A. K. Mahato',
    facultyDeptEn: 'Associate Professor, Electrical Engineering Lab',
    facultyDeptHi: 'सह-प्राध्यापक, विद्युत अभियांत्रिकी प्रयोगशाला',
    facultyDeptSat: 'ᱯᱨᱚᱯᱷᱮᱥᱚᱨ, ᱵᱤᱡᱽᱞᱤ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ',
    totalBudget: '₹2,85,000',
    currentDay: 22,
    totalMaturationDays: 45,
    maturationPercentage: 49,
    escrowTranches: [
      {
        trancheNumber: 1,
        percentage: 30,
        amount: '₹85,500',
        milestoneTitleEn: 'Inverter Topology & MOSFET Skids',
        milestoneTitleHi: 'इन्वर्टर टोपोलॉजी एवं मॉसफेट स्किड',
        milestoneTitleSat: 'ᱤᱱᱵᱷᱟᱨᱴᱟᱨ ᱥᱟᱢᱟᱱ ᱠᱤᱨᱤᱧ',
        status: 'DISBURSED',
        disbursedDate: '10 Aug 2026',
        verificationBadgeEn: 'Tranche 1 Disbursed (₹85,000 released)',
        verificationBadgeHi: 'प्रथम चरण संवितरित (₹८५,००० विमुक्त)',
        verificationBadgeSat: 'ᱯᱩᱭᱞᱩ ᱦᱟᱹᱴᱤᱧ ᱮᱢ ᱟᱠᱟᱱᱟ (₹᱘᱕,᱐᱐᱐)',
        attachmentRef: 'TR1-NITJ-WSH-01'
      },
      {
        trancheNumber: 2,
        percentage: 40,
        amount: '₹1,14,000',
        milestoneTitleEn: 'NABL Safety Bench Testing & Surge Clearance',
        milestoneTitleHi: 'एनएबीएल सुरक्षा परीक्षण एवं सर्ज सप्रेशन',
        milestoneTitleSat: 'NABL ᱨᱩᱠᱷᱤᱭᱟᱹ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ',
        status: 'LOCKED',
        verificationBadgeEn: 'NABL Certificate Verification in Progress',
        verificationBadgeHi: 'एनएबीएल प्रमाणपत्र सत्यापन जारी',
        verificationBadgeSat: 'NABL ᱥᱟᱹᱨᱤ ᱠᱟᱜᱚᱡᱽ ᱛᱟᱺᱜᱤ',
        attachmentRef: 'TR2-NITJ-PENDING'
      },
      {
        trancheNumber: 3,
        percentage: 30,
        amount: '₹85,500',
        milestoneTitleEn: 'Sub-Center Deployment & Cold Chain Integration',
        milestoneTitleHi: 'उप-केंद्र प्रतिष्ठापन एवं शीत श्रृंखला एकीकरण',
        milestoneTitleSat: 'ᱴᱷᱟᱶ ᱨᱮ ᱵᱟᱹᱭᱥᱟᱹᱣ ᱟᱨ ᱪᱟᱞ',
        status: 'LOCKED',
        verificationBadgeEn: 'District Health Officer Handover Sign-off',
        verificationBadgeHi: 'ज़िला स्वास्थ्य अधिकारी सुपुर्दगी हस्ताक्षर पर',
        verificationBadgeSat: 'ᱡᱤᱞᱟᱹ ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ ᱥᱩᱦᱤ',
        attachmentRef: 'TR3-NITJ-PENDING'
      }
    ]
  },
  'JAG-DHN-0055': {
    ...MOCK_PROGRESS_PROJECT,
    ticketId: 'JAG-DHN-0055',
    titleEn: 'Bio-Methanation Digester for Weekly Tribal Haat',
    titleHi: 'साप्ताहिक जनजातीय हाट हेतु बायो-मीथेनेशन संयंत्र',
    titleSat: 'ᱦᱟᱯᱛᱟᱠᱤᱭᱟᱹ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱦᱟᱴ ᱞᱟᱹᱜᱤᱫ ᱡᱤᱣᱤ-ᱢᱤᱛᱷᱮᱱ ᱯᱞᱟᱱᱴ',
    domainEn: 'Clean Energy & Haat Organic Waste Management',
    domainHi: 'स्वच्छ ऊर्जा एवं हाट जैविक अपशिष्ट प्रबंधन',
    domainSat: 'ᱯᱷᱟᱨᱪᱟ ᱫᱟᱲᱮ ᱟᱨ ᱦᱟᱴ ᱵᱮᱠᱟᱨ ᱥᱟᱢᱵᱽᱲᱟᱣ',
    locationEn: '📍 Nirsa Block, Dhanbad District',
    locationHi: '📍 निरसा प्रखंड, धनबाद ज़िला',
    locationSat: '📍 ᱱᱤᱨᱥᱟ ᱯᱨᱚᱠᱷᱚᱸᱰ, ᱫᱷᱟᱱᱵᱟᱫᱽ ᱡᱤᱞᱟᱹ',
    institutionEn: 'IIT (ISM), Dhanbad',
    institutionHi: 'भारतीय प्रौद्योगिकी संस्थान (आईएसएम), धनबाद',
    institutionSat: 'ᱟᱭ.ᱟᱭ.ᱴᱤ (ISM), ᱫᱷᱟᱱᱵᱟᱫᱽ',
    facultyPi: 'Prof. P. Sengupta',
    facultyDeptEn: 'Professor, Dept. of Environmental Science & Engineering',
    facultyDeptHi: 'प्रोफेसर, पर्यावरण विज्ञान एवं अभियांत्रिकी विभाग',
    facultyDeptSat: 'ᱯᱨᱚᱯᱷᱮᱥᱚᱨ, ᱥᱟᱪᱟᱨᱦᱮ ᱥᱟᱬᱮᱥ',
    totalBudget: '₹3,80,000',
    currentDay: 28,
    totalMaturationDays: 45,
    maturationPercentage: 62,
    escrowTranches: [
      {
        trancheNumber: 1,
        percentage: 30,
        amount: '₹1,14,000',
        milestoneTitleEn: 'Digester Excavation & Microbe Inoculation',
        milestoneTitleHi: 'डाइजेस्टर खुदाई एवं जीवाणु संवर्धन',
        milestoneTitleSat: 'ᱚᱛ ᱠᱷᱟᱫᱟᱱ ᱟᱨ ᱡᱤᱣᱤ ᱥᱟᱢᱵᱽᱲᱟᱣ',
        status: 'DISBURSED',
        disbursedDate: '01 Aug 2026',
        verificationBadgeEn: 'Tranche 1 Disbursed (₹1,14,000 released)',
        verificationBadgeHi: 'प्रथम चरण संवितरित (₹१,१४,००० विमुक्त)',
        verificationBadgeSat: 'ᱯᱩᱭᱞᱩ ᱦᱟᱹᱴᱤᱧ ᱮᱢ ᱟᱠᱟᱱᱟ (₹᱑,᱑᱔,᱐᱐᱐)',
        attachmentRef: 'TR1-IITD-DHN-01'
      },
      {
        trancheNumber: 2,
        percentage: 40,
        amount: '₹1,52,000',
        milestoneTitleEn: 'Dome Fabrication & Methane Telemetry Sensor',
        milestoneTitleHi: 'डोम निर्माण एवं मीथेन टेलीमेट्री सेंसर',
        milestoneTitleSat: 'ᱰᱳᱢ ᱵᱮᱱᱟᱣ ᱟᱨ ᱜᱮᱥ ᱥᱮᱱᱥᱚᱨ',
        status: 'DISBURSED',
        disbursedDate: '24 Aug 2026',
        verificationBadgeEn: 'Tranche 2 Disbursed (₹1,52,000 released)',
        verificationBadgeHi: 'द्वितीय चरण संवितरित (₹१,५२,००० विमुक्त)',
        verificationBadgeSat: 'ᱫᱚᱥᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱮᱢ ᱟᱠᱟᱱᱟ (₹᱑,᱕᱒,᱐᱐᱐)',
        attachmentRef: 'TR2-IITD-DHN-02'
      },
      {
        trancheNumber: 3,
        percentage: 30,
        amount: '₹1,14,000',
        milestoneTitleEn: 'Haat Vendor Gas Distribution & PESA Handover',
        milestoneTitleHi: 'हाट विक्रेता गैस वितरण एवं पेसा सुपुर्दगी',
        milestoneTitleSat: 'ᱦᱟᱴ ᱦᱚᱲ ᱜᱮᱥ ᱮᱢ ᱟᱨ ᱪᱟᱞ',
        status: 'LOCKED',
        verificationBadgeEn: 'PESA Gram Sabha Quorum Sign-off Trigger',
        verificationBadgeHi: 'पेसा ग्राम सभा कोरम अनुमोदन पर विमोच्य',
        verificationBadgeSat: 'PESA ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱠᱳᱨᱟᱢ ᱛᱟᱭᱚᱢ',
        attachmentRef: 'TR3-IITD-PENDING'
      }
    ]
  }
};

export function getMockProjectData(ticketId: string): ProjectProgressData {
  if (ALL_MOCK_PROJECTS[ticketId]) {
    return ALL_MOCK_PROJECTS[ticketId];
  }
  return {
    ...MOCK_PROGRESS_PROJECT,
    ticketId,
  };
}


