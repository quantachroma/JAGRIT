import {
  MacroMetrics,
  OngoingProjectItem,
  UniversityLeaderboardItem,
  DistrictResolutionItem,
} from './statewide-types';

export const STATEWIDE_MACRO_METRICS: MacroMetrics = {
  solvedProblemsCount: '1,248+',
  solvedProblemsLabel: {
    en: 'Problems Completely Solved',
    hi: 'समस्याएं पूर्णतः समाधानित',
    sat: 'ᱥᱟᱹᱛ ᱟᱠᱟᱱ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ',
  },
  solvedProblemsSub: {
    en: '100% Quorum Verified by Gram Sabha',
    hi: 'ग्राम सभा द्वारा १००% कोरम सत्यापित',
    sat: 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱦᱚᱛᱮᱛᱮ ᱑᱐᱐% ᱠᱳᱨᱟᱢ ᱥᱟᱹᱨᱤ',
  },

  activeProjectsCount: '384',
  activeProjectsLabel: {
    en: 'Active Ongoing Projects',
    hi: 'सक्रिय प्रगतिशील परियोजनाएं',
    sat: 'ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱠᱚ',
  },
  activeProjectsSub: {
    en: 'In University Labs & Field Trials',
    hi: 'विश्वविद्यालयी प्रयोगशाला एवं क्षेत्रीय परीक्षण',
    sat: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱞᱮᱵᱽ ᱟᱨ ᱴᱷᱟᱶ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱨᱮ',
  },

  institutionsCount: '42+',
  institutionsLabel: {
    en: 'State HEIs & Universities Empanelled',
    hi: 'संबद्ध उच्च शिक्षण संस्थान',
    sat: 'ᱥᱮᱞᱮᱫ ᱪᱮᱛᱟᱱ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱚ',
  },
  institutionsSub: {
    en: 'Across all 24 Districts of Jharkhand (BIT Mesra, NIT Jsr, BAU & Colleges)',
    hi: 'झारखंड के २४ ज़िलों में विस्तृत',
    sat: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱒᱔ ᱡᱤᱞᱟᱹ ᱨᱮ',
  },

  fundsMobilizedAmount: '₹4.85 Crore',
  fundsMobilizedLabel: {
    en: 'CSR Escrow Mobilized',
    hi: 'सीएसआर एस्क्रो निधि संवितरित',
    sat: 'CSR ᱮᱥᱠᱨᱳ ᱠᱟᱹᱣᱰᱤ ᱡᱟᱣᱨᱟ',
  },
  fundsMobilizedSub: {
    en: 'DHTE Innovation Pool + Corporate CSR',
    hi: 'डीएचटीई नवाचार पूल + कॉर्पोरेट सीएसआर',
    sat: 'DHTE ᱯᱩᱞ + ᱠᱟᱨᱠᱷᱟᱱᱟ CSR',
  },

  nepCreditsCount: '8,420',
  nepCreditsLabel: {
    en: 'NEP 2020 Student Credits Awarded',
    hi: 'एनईपी २०२० छात्र क्रेडिट प्रदान',
    sat: 'NEP 2020 ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱨᱮᱰᱤᱴ ᱧᱟᱢ ᱮᱱᱟ',
  },

  patentsFiledCount: '14',
  patentsFiledLabel: {
    en: 'Patents Filed',
    hi: 'पेटेंट दायर',
    sat: 'ᱯᱮᱴᱮᱱᱴ ᱫᱟᱨᱡᱽ',
  },

  panchayatsImpactedCount: '4,350+',
  panchayatsImpactedLabel: {
    en: 'Panchayats Reached',
    hi: 'पंचायतें लाभान्वित',
    sat: 'ᱯᱟᱸᱪᱟᱭᱚᱛ ᱥᱮᱴᱮᱨ',
  },
};

export const ONGOING_PROJECTS_DATA: OngoingProjectItem[] = [
  {
    id: 'proj-water-01',
    ticketId: 'JAG-PLM-0082',
    domainKey: 'water',
    stageKey: 'maturation',
    title: {
      en: 'Solar Defluoridation Unit for Rural Borewell',
      hi: 'ग्रामीण बोरवेल हेतु सौर चालित फ्लोराइड निष्कासन संयंत्र',
      sat: 'ᱟᱹᱛᱩ ᱪᱟᱯᱟᱠᱚᱞ ᱞᱟᱹᱜᱤᱫ ᱵᱮᱲᱟ ᱫᱟᱲᱮ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱥᱟᱯᱷᱟ ᱡᱚᱱᱛᱨᱚ',
    },
    location: {
      en: 'Palamu, Lesliganj',
      hi: 'पलामू, लेस्लीगंज',
      sat: 'ᱯᱟᱞᱟᱢᱩ, ᱞᱮᱥᱞᱤᱜᱚᱸᱡᱽ',
    },
    institution: {
      en: 'BIT Mesra (Water Resilient Lab)',
      hi: 'बीआईटी मेसरा (जल संवर्धन प्रयोगशाला)',
      sat: 'ᱵᱤ.ᱟᱭ.ᱴᱤ ᱢᱮᱥᱨᱟ (ᱫᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱞᱮᱵᱽ)',
    },
    facultyPi: {
      en: 'Dr. R. Verma (Dept. of Chemical Engg)',
      hi: 'डॉ. आर. वर्मा (रासायनिक अभियांत्रिकी विभाग)',
      sat: 'ᱰᱨ. ᱟᱨ. ᱵᱚᱨᱢᱟ (ᱨᱟᱥᱟᱭᱟᱱᱤᱠ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ)',
    },
    liveStageLabel: {
      en: '45-Day Maturation Buffer (Day 32/45 Active)',
      hi: '४५ दिवसीय स्थिरीकरण अवधि (दिन ३२/४५ सक्रिय)',
      sat: '᱔᱕ ᱢᱟᱦᱟᱸ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱚᱠᱛᱚ (᱓᱒/᱔᱕ ᱢᱟᱦᱟᱸ ᱪᱟᱹᱞᱩ)',
    },
    stageBadgeColor: 'emerald',
    stageProgressPct: 71,
    stageCountdown: {
      en: 'Day 32 of 45 Days Active',
      hi: '४५ दिनों में से ३२वां दिन जारी',
      sat: '᱔᱕ ᱢᱟᱦᱟᱸ ᱠᱷᱚᱱ ᱓᱒ ᱢᱟᱦᱟᱸ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ',
    },
    escrowStatus: {
      en: 'Tranches 1 & 2 Disbursed (₹2,45,000)',
      hi: 'प्रथम एवं द्वितीय चरण संवितरित (₹२,४५,०००)',
      sat: 'ᱯᱩᱭᱞᱩ ᱟᱨ ᱫᱚᱥᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱮᱢ ᱟᱠᱟᱱᱟ (₹᱒,᱔᱕,᱐᱐᱐)',
    },
    fieldHealth: {
      en: 'Health: 99.1% Operational',
      hi: 'स्वास्थ्य: ९९.१% सक्रिय संचालन',
      sat: 'ᱦᱟᱞᱚᱛ: ᱙᱙.᱑% ᱪᱟᱹᱞᱩ ᱢᱮᱱᱟᱜ-ᱟ',
    },
    mentorOrCompliance: {
      en: 'Groundwater Board Verified • Gram Sabha Quorum 92%',
      hi: 'भूजल बोर्ड सत्यापित • ग्राम सभा कोरम ९२%',
      sat: 'ᱦᱟᱥᱟ ᱞᱟᱛᱟᱨ ᱫᱟᱜ ᱵᱳᱨᱰ ᱥᱟᱹᱨᱤ • ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱠᱳᱨᱟᱢ ᱙᱒%',
    },
    inspectUrl: '/progress/JAG-PLM-0082',
  },
  {
    id: 'proj-agri-02',
    ticketId: 'JAG-KHT-0014',
    domainKey: 'agritech',
    stageKey: 'prototyping',
    title: {
      en: 'Solar Cold Storage for Tribal Lac & Silk',
      hi: 'जनजातीय लाह एवं रेशम हेतु सौर शीत गृह',
      sat: 'ᱞᱟᱦᱟ ᱟᱨ ᱥᱤᱞᱠ ᱞᱟᱹᱜᱤᱫ ᱵᱮᱲᱟ ᱫᱟᱲᱮ ᱨᱮᱭᱟᱲ ᱜᱩᱫᱟᱢ',
    },
    location: {
      en: 'Khunti, Torpa',
      hi: 'खूंटी, तोरपा',
      sat: 'ᱠᱷᱩᱸᱴᱤ, ᱛᱳᱨᱯᱟ',
    },
    institution: {
      en: 'Birsa Agricultural University (BAU)',
      hi: 'बिरसा कृषि विश्वविद्यालय (बीएयू)',
      sat: 'ᱵᱤᱨᱥᱟ ᱪᱟᱥ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ (BAU)',
    },
    facultyPi: {
      en: 'Prof. S. Soren (Dept. of Post-Harvest Technology)',
      hi: 'प्रो. एस. सोरेन (कटाई उपरांत प्रौद्योगिकी विभाग)',
      sat: 'ᱯᱨᱳ. ᱮᱥ. ᱥᱚᱨᱮᱱ (ᱪᱟᱥ ᱛᱟᱭᱚᱢ ᱴᱮᱠᱱᱳᱞᱳᱡᱤ)',
    },
    liveStageLabel: {
      en: 'Hackathon Round 2 (Bench Testing)',
      hi: 'हैकथॉन चरण २ (प्रयोगशाला परीक्षण)',
      sat: 'ᱦᱮᱠᱟᱛᱷᱚᱱ ᱫᱚᱥᱟᱨ ᱦᱟᱹᱴᱤᱧ (ᱞᱮᱵᱽ ᱵᱤᱰᱟᱹᱣ)',
    },
    stageBadgeColor: 'blue',
    stageProgressPct: 45,
    stageCountdown: {
      en: 'Round 2 Evaluation Window (Day 18 of 30)',
      hi: 'द्वितीय चरण मूल्यांकन अवधि (३० में से १८वां दिन)',
      sat: 'ᱫᱚᱥᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱚᱠᱛᱚ (᱓᱐ ᱢᱟᱦᱟᱸ ᱨᱮ ᱑᱘)',
    },
    escrowStatus: {
      en: 'Tranche 1 Disbursed (₹1,05,000)',
      hi: 'प्रथम चरण संवितरित (₹१,०५,०००)',
      sat: 'ᱯᱩᱭᱞᱩ ᱦᱟᱹᱴᱤᱧ ᱮᱢ ᱟᱠᱟᱱᱟ (₹᱑,᱐᱕,᱐᱐᱐)',
    },
    fieldHealth: {
      en: 'Health: 98.4% Operational (Thermal gradient stable at 2-4°C)',
      hi: 'स्वास्थ्य: ९८.४% सक्रिय संचालन (तापीय स्थिरता २-४°C)',
      sat: 'ᱦᱟᱞᱚᱛ: ᱙᱘.᱔% ᱪᱟᱹᱞᱩ (ᱞᱚᱞᱚ-ᱨᱮᱭᱟᱲ ᱒-᱔°C)',
    },
    mentorOrCompliance: {
      en: 'Industry Mentor: Tata Steel CSR',
      hi: 'उद्योग परामर्शदाता: टाटा स्टील सीएसआर',
      sat: 'ᱠᱟᱨᱠᱷᱟᱱᱟ ᱫᱤᱥᱟᱹ-ᱩᱫᱩᱜᱤᱡ: ᱴᱟᱴᱟ ᱥᱴᱤᱞ CSR',
    },
    inspectUrl: '/progress/JAG-KHT-0014',
  },
  {
    id: 'proj-energy-03',
    ticketId: 'JAG-WSH-0031',
    domainKey: 'energy',
    stageKey: 'prototyping',
    title: {
      en: 'Hybrid Battery Voltage Stabilizer for Forest Health Sub-Center',
      hi: 'वन स्वास्थ्य उप-केंद्र हेतु हाइब्रिड बैटरी वोल्टेज स्टेबलाइजर',
      sat: 'ᱵᱤᱨ ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ ᱛᱟᱞᱢᱟ ᱞᱟᱹᱜᱤᱫ ᱦᱟᱭᱵᱽᱨᱤᱰ ᱵᱮᱴᱨᱤ ᱵᱷᱳᱞᱴᱮᱡᱽ ᱥᱴᱮᱵᱤᱞᱟᱭᱤᱡᱟᱨ',
    },
    location: {
      en: 'West Singhbhum, Chaibasa',
      hi: 'पश्चिमी सिंहभूम, चाईबासा',
      sat: 'ᱯᱟᱪᱮ ᱥᱤᱝᱵᱷᱩᱢ, ᱪᱟᱭᱵᱟᱥᱟ',
    },
    institution: {
      en: 'NIT Jamshedpur',
      hi: 'एनआईटी जमशेदपुर',
      sat: 'NIT ᱡᱟᱢᱥᱮᱫᱽᱯᱩᱨ',
    },
    facultyPi: {
      en: 'Dr. A. K. Mahato (Electrical Engineering Lab)',
      hi: 'डॉ. ए. के. महतो (विद्युत अभियांत्रिकी प्रयोगशाला)',
      sat: 'ᱰᱨ. ᱮ. ᱠᱮ. ᱢᱟᱦᱛᱳ (ᱵᱤᱡᱽᱞᱤ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ)',
    },
    liveStageLabel: {
      en: 'Lab Bench Testing (NABL cert pending)',
      hi: 'प्रयोगशाला बेंच परीक्षण (एनएबीएल प्रमाणपत्र लंबित)',
      sat: 'ᱞᱮᱵᱽ ᱵᱮᱸᱪ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ (NABL ᱥᱟᱹᱨᱤ ᱠᱟᱜᱚᱡᱽ ᱛᱟᱺᱜᱤ)',
    },
    stageBadgeColor: 'purple',
    stageProgressPct: 50,
    stageCountdown: {
      en: 'NABL Safety Audit Stage (5 Days to Dispatch)',
      hi: 'एनएबीएल सुरक्षा ऑडिट चरण (प्रेषण हेतु ५ दिन शेष)',
      sat: 'NABL ᱨᱩᱠᱷᱤᱭᱟᱹ ᱚᱰᱤᱴ (᱕ ᱢᱟᱦᱟᱸ ᱵᱟᱹᱠᱤ ᱢᱮᱱᱟᱜ-ᱟ)',
    },
    escrowStatus: {
      en: 'Tranche 1 Disbursed (₹85,000)',
      hi: 'प्रथम चरण संवितरित (₹८५,०००)',
      sat: 'ᱯᱩᱭᱞᱩ ᱦᱟᱹᱴᱤᱧ ᱮᱢ ᱟᱠᱟᱱᱟ (₹᱘᱕,᱐᱐᱐)',
    },
    fieldHealth: {
      en: 'Health: 100% Bench Test Stability',
      hi: 'स्वास्थ्य: १००% बेंच परीक्षण स्थिरता',
      sat: 'ᱦᱟᱞᱚᱛ: ᱑᱐᱐% ᱞᱮᱵᱽ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱥᱟᱹᱛ',
    },
    mentorOrCompliance: {
      en: 'District Health Officer NOC • Cold Chain Vaccine Unit Safe',
      hi: 'ज़िला स्वास्थ्य अधिकारी अनापत्ति • टीका शीत गृह सुरक्षित',
      sat: 'ᱡᱤᱞᱟᱹ ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ NOC • ᱴᱤᱠᱟᱹ ᱨᱮᱭᱟᱲ ᱚᱲᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ',
    },
    inspectUrl: '/progress/JAG-WSH-0031',
  },
  {
    id: 'proj-eco-04',
    ticketId: 'JAG-DHN-0055',
    domainKey: 'energy',
    stageKey: 'deployment',
    title: {
      en: 'Bio-Methanation Digester for Weekly Tribal Haat',
      hi: 'साप्ताहिक जनजातीय हाट हेतु बायो-मीथेनेशन संयंत्र',
      sat: 'ᱦᱟᱯᱛᱟᱠᱤᱭᱟᱹ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱦᱟᱴ ᱞᱟᱹᱜᱤᱫ ᱡᱤᱣᱤ-ᱢᱤᱛᱷᱮᱱ ᱯᱞᱟᱱᱴ',
    },
    location: {
      en: 'Dhanbad',
      hi: 'धनबाद',
      sat: 'ᱫᱷᱟᱱᱵᱟᱫᱽ',
    },
    institution: {
      en: 'IIT (ISM) Dhanbad',
      hi: 'आईआईटी (आईएसएम) धनबाद',
      sat: 'IIT (ISM) ᱫᱷᱟᱱᱵᱟᱫᱽ',
    },
    facultyPi: {
      en: 'Prof. P. Sengupta (Dept. of Environmental Science)',
      hi: 'प्रो. पी. सेनगुप्ता (पर्यावरण विज्ञान विभाग)',
      sat: 'ᱯᱨᱳ. ᱯᱤ. ᱥᱮᱱᱜᱩᱯᱛᱟ (ᱦᱚᱭ-ᱦᱤᱥᱤᱫ ᱥᱟᱬᱮᱥ)',
    },
    liveStageLabel: {
      en: 'Ground Installation (PESA NOC Approved)',
      hi: 'क्षेत्रीय प्रतिष्ठापन (पेसा एनओसी स्वीकृत)',
      sat: 'ᱴᱷᱟᱶ ᱨᱮ ᱵᱟᱹᱭᱥᱟᱹᱣ (PESA NOC ᱥᱟᱹᱨᱤ)',
    },
    stageBadgeColor: 'amber',
    stageProgressPct: 82,
    stageCountdown: {
      en: 'Ground Civil Foundation 90% Completed',
      hi: 'भूतल निर्माण कार्य ९०% पूर्ण',
      sat: 'ᱚᱛ ᱵᱮᱱᱟᱣ ᱠᱟᱹᱢᱤ ᱙᱐% ᱥᱟᱹᱛ ᱮᱱᱟ',
    },
    escrowStatus: {
      en: 'Tranches 1 & 2 Disbursed (₹1,90,000)',
      hi: 'प्रथम एवं द्वितीय चरण संवितरित (₹१,९०,०००)',
      sat: 'ᱯᱩᱭᱞᱩ ᱟᱨ ᱫᱚᱥᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱮᱢ ᱟᱠᱟᱱᱟ (₹᱑,᱙᱐,᱐᱐᱐)',
    },
    fieldHealth: {
      en: 'Health: 88% Substrate Digestion Rate',
      hi: 'स्वास्थ्य: ८८% अपशिष्ट पाचन दर',
      sat: 'ᱦᱟᱞᱚᱛ: ᱘᱘% ᱵᱮᱠᱟᱨ ᱡᱤᱱᱤᱥ ᱥᱮᱬ ᱫᱟᱲᱮ',
    },
    mentorOrCompliance: {
      en: 'Statutory PESA Section 4(d) Gram Sabha Approval Certified',
      hi: 'पेसा धारा ४(घ) ग्राम सभा अनुमोदन प्रमाणित',
      sat: 'ᱯᱮᱥᱟ ᱫᱷᱟᱨᱟ ᱔(d) ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱥᱟᱹᱨᱤ ᱢᱟᱹᱱ',
    },
    inspectUrl: '/progress/JAG-DHN-0055',
  },
  {
    id: 'proj-health-05',
    ticketId: 'JAG-RNC-0044',
    domainKey: 'healthcare',
    stageKey: 'bidding',
    title: {
      en: 'Portable Solar ECG & Telemedicine Micro-Hub for Anganwadi',
      hi: 'आंगनबाड़ी केंद्रों हेतु सुवाह्य सौर ईसीजी एवं टेलीमेडिसिन केंद्र',
      sat: 'ᱟᱸᱜᱚᱱᱵᱟᱰᱤ ᱞᱟᱹᱜᱤᱫ ᱥᱩᱵᱷᱤᱫᱟ ᱵᱮᱲᱟ ᱫᱟᱲᱮ ECG ᱟᱨ ᱴᱮᱞᱤᱢᱮᱰᱤᱥᱤᱱ',
    },
    location: {
      en: 'Angara Block, Ranchi District',
      hi: 'अनगड़ा प्रखंड, राँची ज़िला',
      sat: 'ᱟᱱᱜᱟᱲᱟ ᱯᱨᱚᱠᱷᱚᱸᱰ, ᱨᱟᱺᱪᱤ ᱡᱤᱞᱟᱹ',
    },
    institution: {
      en: 'Rajendra Institute of Medical Sciences (RIMS Ranchi) & BIT Mesra',
      hi: 'रिम्स राँची एवं बीआईटी मेसरा संयुक्त दल',
      sat: 'RIMS ᱨᱟᱺᱪᱤ ᱟᱨ ᱵᱤ.ᱟᱭ.ᱴᱤ ᱢᱮᱥᱨᱟ',
    },
    facultyPi: {
      en: 'Dr. M. Murmu (Biomedical Engineering Unit)',
      hi: 'डॉ. एम. मुर्मू (बायोमेडिकल इंजीनियरिंग इकाई)',
      sat: 'ᱰᱨ. ᱮᱢ. ᱢᱩᱨᱢᱩ (ᱵᱟᱭᱳᱢᱮᱰᱤᱠᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ)',
    },
    liveStageLabel: {
      en: 'Institutional Bidding Window (3 Academic Bids Received)',
      hi: 'संस्थागत निविदा खिड़की (३ विश्वविद्यालय प्रस्ताव प्राप्त)',
      sat: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱴᱮᱱᱰᱟᱨ ᱡᱷᱤᱡ (᱓ ᱜᱚᱴᱟᱝ ᱯᱨᱚᱯᱳᱡᱟᱞ ᱧᱟᱢ ᱮᱱᱟ)',
    },
    stageBadgeColor: 'blue',
    stageProgressPct: 20,
    stageCountdown: {
      en: 'Bidding Closes in 4 Days (Technical Jury Review Next)',
      hi: 'निविदा ४ दिनों में समाप्त (तकनीकी जूरी समीक्षा आगामी)',
      sat: 'ᱴᱮᱱᱰᱟᱨ ᱔ ᱢᱟᱦᱟᱸ ᱨᱮ ᱵᱚᱸᱫᱚᱜ-ᱟ (ᱴᱮᱠᱱᱤᱠᱟᱞ ᱡᱩᱨᱤ ᱧᱮᱞ)',
    },
    escrowStatus: {
      en: 'Pre-Escrow Allocation (₹1,20,000 Reserved)',
      hi: 'पूर्व-एस्क्रो आवंटन (₹१,२०,००० सुरक्षित)',
      sat: 'ᱯᱩᱭᱞᱩ ᱮᱥᱠᱨᱳ ᱴᱷᱟᱹᱣᱠᱟᱹ (₹᱑,᱒᱐,᱐᱐᱐ ᱫᱚᱦᱚ ᱮᱱᱟ)',
    },
    fieldHealth: {
      en: '4G Low-Bandwidth Sync Tested • Sahiyas Trained',
      hi: '४जी निम्न-बैंडविड्थ सिंक परीक्षित • सहिया प्रशिक्षण पूर्ण',
      sat: '4G ᱠᱚᱢ ᱱᱮᱴᱣᱟᱨᱠ ᱨᱮ ᱪᱟᱞᱟᱜ-ᱟ • ᱥᱟᱦᱤᱭᱟ ᱥᱮᱪᱮᱫ ᱥᱟᱹᱛ',
    },
    mentorOrCompliance: {
      en: 'National Health Mission Jharkhand Consultation Approved',
      hi: 'राष्ट्रीय स्वास्थ्य मिशन झारखंड परामर्श अनुमोदित',
      sat: 'ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ ᱢᱤᱥᱚᱱ ᱢᱟᱹᱱ',
    },
    inspectUrl: '/progress/JAG-PLM-0082',
  },
];

export const UNIVERSITY_LEADERBOARD_DATA: UniversityLeaderboardItem[] = [
  {
    id: 'bit-mesra',
    rank: 1,
    name: {
      en: 'Birla Institute of Technology (BIT), Mesra',
      hi: 'बिरला प्रौद्योगिकी संस्थान (बीआईटी), मेसरा',
      sat: 'ᱵᱤᱨᱞᱟ ᱤᱱᱥᱴᱤᱴᱤᱭᱩᱴ ᱚᱯᱷ ᱴᱮᱠᱱᱳᱞᱳᱡᱤ (BIT), ᱢᱮᱥᱨᱟ',
    },
    badge: {
      en: 'NABL Water & Chemical Innovation Hub',
      hi: 'एनएबीएल जल एवं रासायनिक नवाचार केंद्र',
      sat: 'NABL ᱫᱟᱜ ᱟᱨ ᱨᱟᱥᱟᱭᱟᱱ ᱱᱟᱣᱟᱱᱟᱜ ᱛᱟᱞᱢᱟ',
    },
    solvedCount: 18,
    ongoingCount: 6,
    patentsCount: 4,
    totalGrants: '₹84 Lakhs',
    coreExpertise: {
      en: ['Groundwater Arsenic/Fluoride Filtration', 'Nanomaterials', 'Sensor IoT', 'Electro-dialysis'],
      hi: ['भूजल आर्सेनिक/फ्लोराइड निष्कासन', 'नैनो-सामग्री', 'सेंसर आईओटी', 'इलेक्ट्रो-डायलिसिस'],
      sat: ['ᱦᱟᱥᱟ ᱞᱟᱛᱟᱨ ᱫᱟᱜ ᱥᱟᱯᱷᱟ', 'ᱱᱮᱱᱳ-ᱡᱤᱱᱤᱥ', 'ᱥᱮᱱᱥᱚᱨ IoT', 'ᱵᱤᱡᱽᱞᱤ ᱪᱷᱟᱹᱱᱤ'],
    },
    solvedPortfolio: [
      {
        ticketId: 'JAG-PLM-0052',
        blueprintId: 'BP-WTR-004',
        bomAmount: '₹2,65,000',
        title: {
          en: 'Palamu Fluoride Unit & High-Density Cartridge',
          hi: 'पलामू फ्लोराइड निष्कासन संयंत्र एवं उच्च-क्षमता फिल्टर',
          sat: 'ᱯᱟᱞᱟᱢᱩ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱥᱟᱯᱷᱟ ᱡᱚᱱᱛᱨᱚ ᱟᱨ ᱪᱷᱟᱹᱱᱤ',
        },
        date: {
          en: 'Verified 46 Days Ago',
          hi: '४६ दिन पूर्व सत्यापित',
          sat: '᱔᱖ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Satbarwa, Palamu District',
          hi: 'सतबरवा, पलामू ज़िला',
          sat: 'ᱥᱚᱛᱵᱚᱨᱣᱟ, ᱯᱟᱞᱟᱢᱩ ᱡᱤᱞᱟᱹ',
        },
        quorumScore: '91.3% Pass Rate',
        grantAmount: '₹3,50,000',
        impactSnippet: {
          en: 'Purifies 12,000L safe drinking water daily for 850 villagers',
          hi: '८५० ग्रामीणों हेतु प्रतिदिन १२,००० लीटर सुरक्षित पेयजल शुद्धिकरण',
          sat: '᱘᱕᱐ ᱦᱚᱲ ᱞᱟᱹᱜᱤᱫ ᱫᱤᱱᱟᱹᱢ ᱑᱒,᱐᱐᱐L ᱥᱟᱯᱷᱟ ᱧᱩ ᱫᱟᱜ',
        },
      },
      {
        ticketId: 'JAG-HZB-0019',
        title: {
          en: 'Hazaribagh Deep Iron Remediation Tube Well Filter',
          hi: 'हज़ारीबाग़ लौह तत्व निवारण नलकूप फिल्टर',
          sat: 'ᱦᱟᱡᱟᱨᱤᱵᱟᱜᱽ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱪᱟᱯᱟᱠᱚᱞ ᱯᱷᱤᱞᱴᱟᱨ',
        },
        date: {
          en: 'Verified 78 Days Ago',
          hi: '७८ दिन पूर्व सत्यापित',
          sat: '᱗᱘ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Ichak Block, Hazaribagh',
          hi: 'इचाक प्रखंड, हज़ारीबाग़',
          sat: 'ᱤᱪᱟᱠ ᱯᱨᱚᱠᱷᱚᱸᱰ, ᱦᱟᱡᱟᱨᱤᱵᱟᱜᱽ',
        },
        quorumScore: '94.6% Pass Rate',
        grantAmount: '₹2,80,000',
        impactSnippet: {
          en: 'Iron reduction from 8.2 ppm to 0.18 ppm compliant with WHO standards',
          hi: 'लौह तत्व स्तर ८.२ से घटकर ०.१८ पीपीएम (विश्व स्वास्थ्य संगठन मानक अनुरूप)',
          sat: 'ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱘.᱒ ᱠᱷᱚᱱ ᱐.᱑᱘ ppm WHO ᱢᱟᱹᱱ ᱞᱮᱠᱟᱛᱮ ᱠᱚᱢ ᱮᱱᱟ',
        },
      },
      {
        ticketId: 'JAG-RNC-0071',
        title: {
          en: 'Kanke Low-Cost Smart Soil Moisture IoT Node',
          hi: 'कांके कम लागत स्मार्ट मृदा नमी आईओटी सेंसर',
          sat: 'ᱠᱟᱸᱠᱮ ᱠᱚᱢ ᱫᱟᱢ ᱦᱟᱥᱟ ᱟᱞᱦᱟᱫ ᱥᱮᱱᱥᱚᱨ',
        },
        date: {
          en: 'Verified 112 Days Ago',
          hi: '११२ दिन पूर्व सत्यापित',
          sat: '᱑᱑᱒ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Kanke Block, Ranchi',
          hi: 'कांके प्रखंड, राँची',
          sat: 'ᱠᱟᱸᱠᱮ ᱯᱨᱚᱠᱷᱚᱸᱰ, ᱨᱟᱺᱪᱤ',
        },
        quorumScore: '89.2% Pass Rate',
        grantAmount: '₹1,95,000',
        impactSnippet: {
          en: 'Saved 35% irrigation water across 60 tribal micro-farms',
          hi: '६० जनजातीय लघु खेतों में सिंचाई जल की ३५% बचत',
          sat: '᱖᱐ ᱜᱚᱴᱟᱝ ᱪᱟᱥ ᱨᱮ ᱓᱕% ᱫᱟᱜ ᱵᱟᱧᱪᱟᱣ ᱮᱱᱟ',
        },
      },
    ],
  },
  {
    id: 'bau-ranchi',
    rank: 2,
    name: {
      en: 'Birsa Agricultural University (BAU), Ranchi',
      hi: 'बिरसा कृषि विश्वविद्यालय (बीएयू), राँची',
      sat: 'ᱵᱤᱨᱥᱟ ᱪᱟᱥ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ (BAU), ᱨᱟᱺᱪᱤ',
    },
    badge: {
      en: 'Agritech & Lac Produce Specialist',
      hi: 'कृषि तकनीक एवं लाह उत्पाद विशेषज्ञ',
      sat: 'ᱪᱟᱥ ᱴᱮᱠᱱᱤᱠ ᱟᱨ ᱞᱟᱦᱟ ᱢᱩᱬᱩᱛ ᱛᱟᱞᱢᱟ',
    },
    solvedCount: 16,
    ongoingCount: 7,
    patentsCount: 1,
    totalGrants: '₹71 Lakhs',
    coreExpertise: {
      en: ['Lac Cultivation Protocols', 'Acid Soil Reclamation', 'Post-Harvest Cold Chains', 'Tribal Bio-Fertilizers'],
      hi: ['लाह संवर्धन तकनीक', 'अम्लीय मृदा सुधार', 'कटाई उपरांत शीत श्रृंखला', 'जनजातीय जैव-उर्वरक'],
      sat: ['ᱞᱟᱦᱟ ᱪᱟᱥ ᱦᱚᱨᱟ', 'ᱦᱟᱥᱟ ᱥᱩᱫᱷᱟᱹᱨ', 'ᱪᱟᱥ ᱛᱟᱭᱚᱢ ᱨᱮᱭᱟᱲ ᱜᱩᱫᱟᱢ', 'ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱡᱤᱣᱤ-ᱥᱟᱨ'],
    },
    solvedPortfolio: [
      {
        ticketId: 'JAG-KHT-0008',
        blueprintId: 'BP-AGR-002',
        bomAmount: '₹1,85,000',
        title: {
          en: 'Khunti Scientific Rangeeni Lac Inoculation System',
          hi: 'खूंटी वैज्ञानिक रंगीनी लाह बीजारोपण प्रणाली',
          sat: 'ᱠᱷᱩᱸᱴᱤ ᱥᱟᱬᱮᱥᱤᱭᱟᱹ ᱨᱚᱝᱜᱤᱱᱤ ᱞᱟᱦᱟ ᱪᱟᱥ ᱵᱮᱵᱚᱥᱛᱟ',
        },
        date: {
          en: 'Verified 39 Days Ago',
          hi: '३९ दिन पूर्व सत्यापित',
          sat: '᱓᱙ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Murhu Block, Khunti',
          hi: 'मुरहू प्रखंड, खूंटी',
          sat: 'ᱢᱩᱨᱦᱩ ᱯᱨᱚᱠᱷᱚᱸᱰ, ᱠᱷᱩᱸᱴᱤ',
        },
        quorumScore: '95.4% Pass Rate',
        grantAmount: '₹3,75,000',
        impactSnippet: {
          en: 'Increased host tree yield by 44% with temperature-controlled larval mesh covers',
          hi: 'तापमान नियंत्रित जाली आवरण द्वारा पोषक वृक्षों से लाह उत्पादन में ४४% वृद्धि',
          sat: 'ᱡᱟᱹᱞᱤ ᱛᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱟᱛᱮ ᱞᱟᱦᱟ ᱪᱟᱥ ᱨᱮ ᱔᱔% ᱵᱟᱹᱲᱛᱤ ᱦᱩᱭ ᱮᱱᱟ',
        },
      },
      {
        ticketId: 'JAG-KHT-0018',
        blueprintId: 'BP-AGR-005',
        bomAmount: '₹1,40,000',
        title: {
          en: 'Torpa Mahua Post-Harvest Solar Convective Dryer',
          hi: 'तोरपा महुआ कटाई उपरांत सौर संवहन सुखाने का यंत्र',
          sat: 'ᱛᱳᱨᱯᱟ ᱢᱟᱛᱠᱚᱢ ᱨᱚᱦᱚᱲ ᱵᱮᱲᱟ ᱫᱟᱲᱮ ᱡᱚᱱᱛᱨᱚ',
        },
        date: {
          en: 'Verified 84 Days Ago',
          hi: '८४ दिन पूर्व सत्यापित',
          sat: '᱘᱔ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Torpa, Khunti District',
          hi: 'तोरपा, खूंटी ज़िला',
          sat: 'ᱛᱳᱨᱯᱟ, ᱠᱷᱩᱸᱴᱤ ᱡᱤᱞᱟᱹ',
        },
        quorumScore: '93.0% Pass Rate',
        grantAmount: '₹2,60,000',
        impactSnippet: {
          en: 'Eliminates fungus spoilage; fetched ₹18/kg higher procurement price for tribal collectors',
          hi: 'फफूंद क्षति की रोकथाम; जनजातीय संग्राहकों को ₹१८ प्रति किग्रा अधिक विक्रय मूल्य',
          sat: 'ᱥᱮᱬᱚᱜ ᱠᱷᱚᱱ ᱵᱟᱧᱪᱟᱣ; ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱠᱚ ₹᱑᱘ ᱠᱮᱡᱤ ᱨᱮ ᱵᱟᱹᱲᱛᱤ ᱠᱟᱹᱣᱰᱤ ᱠᱚ ᱧᱟᱢ ᱠᱮᱫᱟ',
        },
      },
      {
        ticketId: 'JAG-SMD-0027',
        blueprintId: 'BP-AGR-007',
        bomAmount: '₹1,20,000',
        title: {
          en: 'Simdega Acidic Soil Bio-Char Nutrient Restorer',
          hi: 'सिमडेगा अम्लीय मृदा बायो-चार पोषक पुनर्स्थापना',
          sat: 'ᱥᱤᱢᱰᱮᱜᱟ ᱦᱟᱥᱟ ᱡᱤᱣᱤ-ᱠᱩᱭᱞᱟᱹ ᱥᱟᱨ ᱵᱮᱵᱚᱥᱛᱟ',
        },
        date: {
          en: 'Verified 130 Days Ago',
          hi: '१३० दिन पूर्व सत्यापित',
          sat: '᱑᱓᱐ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Kolebira, Simdega',
          hi: 'कोलेबिरा, सिमडेगा',
          sat: 'ᱠᱳᱞᱮᱵᱤᱨᱟ, ᱥᱤᱢᱰᱮᱜᱟ',
        },
        quorumScore: '90.7% Pass Rate',
        grantAmount: '₹2,10,000',
        impactSnippet: {
          en: 'Restored soil pH from 4.8 to 6.4 across 220 acres of tribal paddy plots',
          hi: '२२० एकड़ जनजातीय धान खेतों में मृदा पीएच ४.८ से बढ़कर ६.४ पर पुनर्स्थापित',
          sat: '᱒᱒᱐ ᱮᱠᱚᱲ ᱦᱳᱲᱳ ᱠᱷᱮᱛ ᱨᱮ ᱦᱟᱥᱟ ᱯᱤ.ᱮᱪ ᱔.᱘ ᱠᱷᱚᱱ ᱖.᱔ ᱥᱩᱫᱷᱟᱹᱨ ᱮᱱᱟ',
        },
      },
    ],
  },
  {
    id: 'nit-jamshedpur',
    rank: 3,
    name: {
      en: 'National Institute of Technology (NIT), Jamshedpur',
      hi: 'राष्ट्रीय प्रौद्योगिकी संस्थान (एनआईटी), जमशेदपुर',
      sat: 'ᱱᱮᱥᱱᱟᱞ ᱤᱱᱥᱴᱤᱴᱤᱭᱩᱴ ᱚᱯᱷ ᱴᱮᱠᱱᱳᱞᱳᱡᱤ (NIT), ᱡᱟᱢᱥᱮᱫᱽᱯᱩᱨ',
    },
    badge: {
      en: 'Rural Power & Mechanical Systems Lead',
      hi: 'ग्रामीण ऊर्जा एवं यांत्रिक प्रणाली विशेषज्ञ संस्थान',
      sat: 'ᱟᱹᱛᱩ ᱵᱤᱡᱽᱞᱤ ᱟᱨ ᱢᱮᱠᱟᱱᱤᱠᱟᱞ ᱢᱩᱬᱩᱛ ᱛᱟᱞᱢᱟ',
    },
    solvedCount: 14,
    ongoingCount: 5,
    patentsCount: 2,
    totalGrants: '₹62 Lakhs',
    coreExpertise: {
      en: ['Solar Microgrids', 'Mechanical Agro-Processing', 'Battery Energy Storage', 'Smart Inverters'],
      hi: ['सौर माइक्रोग्रिड', 'यांत्रिक कृषि प्रसंस्करण', 'बैटरी ऊर्जा भंडारण', 'स्मार्ट इन्वर्टर'],
      sat: ['ᱵᱮᱲᱟ ᱫᱟᱲᱮ ᱜᱽᱨᱤᱰ', 'ᱪᱟᱥ ᱡᱤᱱᱤᱥ ᱵᱮᱱᱟᱣ', 'ᱵᱮᱴᱨᱤ ᱫᱟᱲᱮ ᱫᱚᱦᱚ', 'ᱥᱢᱟᱨᱴ ᱤᱱᱵᱷᱟᱨᱴᱟᱨ'],
    },
    solvedPortfolio: [
      {
        ticketId: 'JAG-EAS-0021',
        blueprintId: 'BP-NRG-003',
        bomAmount: '₹3,10,000',
        title: {
          en: 'Ghatshila Solar Microgrid for Forest Hamlet',
          hi: 'घाटशिला वन ग्राम हेतु सौर माइक्रोग्रिड',
          sat: 'ᱜᱷᱟᱴᱥᱤᱞᱟ ᱵᱤᱨ ᱟᱹᱛᱩ ᱞᱟᱹᱜᱤᱫ ᱵᱮᱲᱟ ᱫᱟᱲᱮ ᱜᱽᱨᱤᱰ',
        },
        date: {
          en: 'Verified 52 Days Ago',
          hi: '५२ दिन पूर्व सत्यापित',
          sat: '᱕᱒ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Ghatshila, East Singhbhum',
          hi: 'घाटशिला, पूर्वी सिंहभूम',
          sat: 'ᱜᱷᱟᱴᱥᱤᱞᱟ, ᱥᱟᱢᱟᱝ ᱥᱤᱝᱵᱷᱩᱢ',
        },
        quorumScore: '96.1% Pass Rate',
        grantAmount: '₹4,20,000',
        impactSnippet: {
          en: '24/7 solar lighting for 110 forest households with lithium iron phosphate storage',
          hi: '११० वनवासी परिवारों को लिथियम आयरन फॉस्फेट भंडारण सहित चौबीसों घंटे सौर विद्युत',
          sat: '᱑᱑᱐ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱞᱟᱹᱜᱤᱫ ᱒᱔ ᱴᱟᱲᱟᱝ ᱵᱮᱲᱟ ᱫᱟᱲᱮ ᱵᱤᱡᱽᱞᱤ ᱧᱟᱢ ᱮᱱᱟ',
        },
      },
      {
        ticketId: 'JAG-WSH-0012',
        blueprintId: 'BP-NRG-008',
        bomAmount: '₹2,20,000',
        title: {
          en: 'Chaibasa Hybrid Inverter for Primary Health Center',
          hi: 'चाईबासा प्राथमिक स्वास्थ्य केंद्र हाइब्रिड इन्वर्टर',
          sat: 'ᱪᱟᱭᱵᱟᱥᱟ ᱯᱩᱭᱞᱩ ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ ᱤᱱᱵᱷᱟᱨᱴᱟᱨ',
        },
        date: {
          en: 'Verified 89 Days Ago',
          hi: '८९ दिन पूर्व सत्यापित',
          sat: '᱘᱙ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Chaibasa, West Singhbhum',
          hi: 'चाईबासा, पश्चिमी सिंहभूम',
          sat: 'ᱪᱟᱭᱵᱟᱥᱟ, ᱯᱟᱪᱮ ᱥᱤᱝᱵᱷᱩᱢ',
        },
        quorumScore: '92.8% Pass Rate',
        grantAmount: '₹3,10,000',
        impactSnippet: {
          en: 'Zero temperature drops in vaccine cold chain during 180+ grid outage hours',
          hi: '१८० से अधिक घंटों के ग्रिड कटौतियों के दौरान टीका शीत गृह में शून्य तापमान गिरावट',
          sat: '᱑᱘᱐ ᱴᱟᱲᱟᱝ ᱵᱤᱡᱽᱞᱤ ᱵᱟᱹᱱᱩᱜ ᱨᱮᱦᱚᱸ ᱴᱤᱠᱟᱹ ᱨᱮᱭᱟᱲ ᱫᱚᱦᱚ ᱮᱱᱟ',
        },
      },
      {
        ticketId: 'JAG-SRK-0033',
        blueprintId: 'BP-NRG-012',
        bomAmount: '₹1,75,000',
        title: {
          en: 'Saraikela Mechanized Biomass Pellet Press',
          hi: 'सरायकेला यंत्रीकृत बायोमास पेलेट प्रेस',
          sat: 'ᱥᱚᱨᱟᱭᱠᱮᱞᱟ ᱡᱤᱣᱤ-ᱡᱤᱱᱤᱥ ᱵᱮᱱᱟᱣ ᱢᱮᱥᱤᱱ',
        },
        date: {
          en: 'Verified 140 Days Ago',
          hi: '१४० दिन पूर्व सत्यापित',
          sat: '᱑᱔᱐ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Kharsawan, Saraikela',
          hi: 'खरसावां, सरायकेला',
          sat: 'ᱠᱷᱚᱨᱥᱚᱣᱟᱸ, ᱥᱚᱨᱟᱭᱠᱮᱞᱟ',
        },
        quorumScore: '88.5% Pass Rate',
        grantAmount: '₹2,30,000',
        impactSnippet: {
          en: 'Converts agricultural stubble into clean fuel pellets, generating ₹14,000 monthly for SHG',
          hi: 'फसल अवशेषों को स्वच्छ ईंधन में परिवर्तित कर महिला स्वयं सहायता समूहों हेतु ₹१४,००० मासिक आय',
          sat: 'ᱪᱟᱥ ᱡᱤᱱᱤᱥ ᱠᱷᱚᱱ ᱥᱟᱯᱷᱟ ᱤᱱᱫᱷᱚᱱ ᱵᱮᱱᱟᱣ ᱛᱮ SHG ᱠᱚ ᱪᱟᱸᱫᱚᱨᱮ ₹᱑᱔,᱐᱐᱐ ᱧᱟᱢ ᱮᱫᱟ',
        },
      },
    ],
  },
  {
    id: 'iit-ism-dhanbad',
    rank: 4,
    name: {
      en: 'IIT (ISM), Dhanbad',
      hi: 'भारतीय प्रौद्योगिकी संस्थान (आईएसएम), धनबाद',
      sat: 'ᱟᱭ.ᱟᱭ.ᱴᱤ (ISM), ᱫᱷᱟᱱᱵᱟᱫᱽ',
    },
    badge: {
      en: 'Mining Eco-Restoration & Acid Drainage Lead',
      hi: 'खनन पारिस्थितिकी पुनर्स्थापन एवं अम्लीय जल शोधन केंद्र',
      sat: 'ᱠᱷᱟᱫᱟᱱ ᱥᱟᱯᱷᱟ ᱟᱨ ᱠᱩᱭᱞᱟᱹ ᱫᱟᱜ ᱥᱩᱫᱷᱟᱹᱨ ᱢᱩᱬᱩᱛ ᱛᱟᱞᱢᱟ',
    },
    solvedCount: 12,
    ongoingCount: 4,
    patentsCount: 3,
    totalGrants: '₹55 Lakhs',
    coreExpertise: {
      en: ['Acid Mine Water Purification', 'Heavy Metal Remediation', 'Overburden Eco-Stabilization', 'Bio-Methanation'],
      hi: ['खदान अम्लीय जल शोधन', 'भारी धातु निवारण', 'खनन मलबे का हरित स्थिरीकरण', 'बायो-मीथेनेशन'],
      sat: ['ᱠᱷᱟᱫᱟᱱ ᱟᱹᱢᱤᱞ ᱫᱟᱜ ᱥᱟᱯᱷᱟ', 'ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱥᱟᱯᱷᱟ', 'ᱠᱷᱟᱫᱟᱱ ᱦᱟᱥᱟ ᱨᱮ ᱫᱟᱨᱮ ᱨᱚᱦᱚᱭ', 'ᱡᱤᱣᱤ-ᱜᱮᱥ ᱵᱮᱱᱟᱣ'],
    },
    solvedPortfolio: [
      {
        ticketId: 'JAG-DHN-0011',
        blueprintId: 'BP-ECO-009',
        bomAmount: '₹3,90,000',
        title: {
          en: 'Jharia Acid Mine Drainage Limestone Neutralization Reactor',
          hi: 'झरिया खदान अम्लीय जल चूना निष्कासन रिएक्टर',
          sat: 'ᱡᱷᱟᱨᱤᱭᱟ ᱠᱷᱟᱫᱟᱱ ᱟᱹᱢᱤᱞ ᱫᱟᱜ ᱪᱩᱱ ᱥᱟᱯᱷᱟ ᱡᱚᱱᱛᱨᱚ',
        },
        date: {
          en: 'Verified 61 Days Ago',
          hi: '६१ दिन पूर्व सत्यापित',
          sat: '᱖᱑ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Jharia Coal Belt, Dhanbad',
          hi: 'झरिया कोयला क्षेत्र, धनबाद',
          sat: 'ᱡᱷᱟᱨᱤᱭᱟ ᱠᱩᱭᱞᱟᱹ ᱴᱚᱴᱷᱟ, ᱫᱷᱟᱱᱵᱟᱫᱽ',
        },
        quorumScore: '93.8% Pass Rate',
        grantAmount: '₹3,90,000',
        impactSnippet: {
          en: 'Purifies 50,000L daily mine runoff for community irrigation, eliminating sulfur acidity',
          hi: 'सल्फर अम्लता समाप्त कर सामुदायिक सिंचाई हेतु प्रतिदिन ५०,००० लीटर खदान जल का शोधन',
          sat: 'ᱫᱤᱱᱟᱹᱢ ᱕᱐,᱐᱐᱐L ᱠᱷᱟᱫᱟᱱ ᱫᱟᱜ ᱪᱟᱥ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱯᱷᱟ ᱠᱟᱛᱮ ᱮᱢᱚᱜ ᱠᱟᱱᱟ',
        },
      },
      {
        ticketId: 'JAG-DHN-0029',
        title: {
          en: 'Katras Fly-Ash Soil Conditioner for Barren Overburdens',
          hi: 'कतरास फ्लाई-ऐश मृदा सुधारक बंजर खनन क्षेत्र',
          sat: 'ᱠᱟᱛᱨᱟᱥ ᱠᱩᱭᱞᱟᱹ ᱛᱚᱨᱚᱡ ᱦᱟᱥᱟ ᱥᱩᱫᱷᱟᱹᱨ ᱡᱤᱱᱤᱥ',
        },
        date: {
          en: 'Verified 95 Days Ago',
          hi: '९५ दिन पूर्व सत्यापित',
          sat: '᱙᱕ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Katras Block, Dhanbad',
          hi: 'कतरास प्रखंड, धनबाद',
          sat: 'ᱠᱟᱛᱨᱟᱥ ᱯᱨᱚᱠᱷᱚᱸᱰ, ᱫᱷᱟᱱᱵᱟᱫᱽ',
        },
        quorumScore: '91.2% Pass Rate',
        grantAmount: '₹2,40,000',
        impactSnippet: {
          en: 'Enabled fast-growing indigenous native vegetation cover over 14 hectares of mine spoil',
          hi: '१४ हेक्टेयर खनन अपशिष्ट भूमि पर त्वरित देशी वनस्पति आच्छादन सक्षम',
          sat: '᱑᱔ ᱦᱮᱠᱴᱟᱨ ᱠᱷᱟᱫᱟᱱ ᱵᱟᱹᱲᱤᱡ ᱦᱟᱥᱟ ᱨᱮ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱦᱟᱨᱟ ᱮᱱᱟ',
        },
      },
      {
        ticketId: 'JAG-DHN-0041',
        title: {
          en: 'Nirsa Subsurface Mine Water Treatment Plant',
          hi: 'निरसा भूगर्भ खदान जल शोधन संयंत्र',
          sat: 'ᱱᱤᱨᱥᱟ ᱚᱛ ᱞᱟᱛᱟᱨ ᱠᱷᱟᱫᱟᱱ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱯᱞᱟᱱᱴ',
        },
        date: {
          en: 'Verified 162 Days Ago',
          hi: '१६२ दिन पूर्व सत्यापित',
          sat: '᱑᱖᱒ ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟ ᱥᱟᱹᱨᱤ ᱮᱱᱟ',
        },
        location: {
          en: 'Nirsa, Dhanbad District',
          hi: 'निरसा, धनबाद ज़िला',
          sat: 'ᱱᱤᱨᱥᱟ, ᱫᱷᱟᱱᱵᱟᱫᱽ ᱡᱤᱞᱟᱹ',
        },
        quorumScore: '89.9% Pass Rate',
        grantAmount: '₹3,25,000',
        impactSnippet: {
          en: 'Potable water supply to 3 neighboring colliery bastis with 0 ppm suspended sediment',
          hi: '३ समीपवर्ती कोलियरी बस्तियों को शून्य निलंबित तलछट युक्त स्वच्छ पेयजल आपूर्ति',
          sat: '᱓ ᱜᱚᱴᱟᱝ ᱠᱩᱭᱞᱟᱹ ᱠᱷᱟᱫᱟᱱ ᱵᱚᱥᱛᱤ ᱨᱮ ᱥᱟᱯᱷᱟ ᱧᱩ ᱫᱟᱜ ᱧᱟᱢ ᱮᱱᱟ',
        },
      },
    ],
  },
];

export const DISTRICT_RESOLUTION_DATA: DistrictResolutionItem[] = [
  {
    districtName: { en: 'Palamu', hi: 'पलामू', sat: 'ᱯᱟᱞᱟᱢᱩ' },
    problemsReceived: 184,
    problemsSolved: 142,
    activeUniversities: 6,
    avgResolutionWeeks: { en: '15 Weeks Avg', hi: 'औसत १५ सप्ताह', sat: '᱑᱕ ᱦᱟᱯᱛᱟ ᱦᱟᱨᱟᱦᱟᱹᱨᱤ' },
    satisfactionQuorumScore: '92.4%',
    statusTag: { en: 'High Quorum Consensus', hi: 'उच्च कोरम सहमति', sat: 'ᱪᱮᱛᱟᱱ ᱠᱳᱨᱟᱢ ᱨᱮᱵᱮᱱ' },
  },
  {
    districtName: { en: 'Ranchi', hi: 'राँची', sat: 'ᱨᱟᱺᱪᱤ' },
    problemsReceived: 260,
    problemsSolved: 218,
    activeUniversities: 11,
    avgResolutionWeeks: { en: '14 Weeks Avg', hi: 'औसत १४ सप्ताह', sat: '᱑᱔ ᱦᱟᱯᱛᱟ ᱦᱟᱨᱟᱦᱟᱹᱨᱤ' },
    satisfactionQuorumScore: '94.1%',
    statusTag: { en: 'Rapid Engineering Turnaround', hi: 'द्रुत इंजीनियरिंग समाधान', sat: 'ᱞᱚᱜᱚᱱ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨ ᱥᱚᱞᱦᱮ' },
  },
  {
    districtName: { en: 'Khunti', hi: 'खूंटी', sat: 'ᱠᱷᱩᱸᱴᱤ' },
    problemsReceived: 142,
    problemsSolved: 116,
    activeUniversities: 5,
    avgResolutionWeeks: { en: '17 Weeks Avg', hi: 'औसत १७ सप्ताह', sat: '᱑᱗ ᱦᱟᱯᱛᱟ ᱦᱟᱨᱟᱦᱟᱹᱨᱤ' },
    satisfactionQuorumScore: '95.2%',
    statusTag: { en: 'Top Agritech Adoption', hi: 'शीर्ष कृषि तकनीक अंगीकरण', sat: 'ᱥᱤᱨᱟᱹ ᱪᱟᱥ ᱴᱮᱠᱱᱤᱠ ᱦᱟᱛᱟᱣ' },
  },
  {
    districtName: { en: 'West Singhbhum', hi: 'पश्चिमी सिंहभूम', sat: 'ᱯᱟᱪᱮ ᱥᱤᱝᱵᱷᱩᱢ' },
    problemsReceived: 156,
    problemsSolved: 119,
    activeUniversities: 5,
    avgResolutionWeeks: { en: '18 Weeks Avg', hi: 'औसत १८ सप्ताह', sat: '᱑᱘ ᱦᱟᱯᱛᱟ ᱦᱟᱨᱟᱦᱟᱹᱨᱤ' },
    satisfactionQuorumScore: '91.8%',
    statusTag: { en: 'Tribal PESA Compliant', hi: 'पेसा ग्राम सभा अनुपालित', sat: 'ᱯᱮᱥᱟ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱢᱟᱹᱱ' },
  },
  {
    districtName: { en: 'Dhanbad', hi: 'धनबाद', sat: 'ᱫᱷᱟᱱᱵᱟᱫᱽ' },
    problemsReceived: 198,
    problemsSolved: 154,
    activeUniversities: 7,
    avgResolutionWeeks: { en: '16 Weeks Avg', hi: 'औसत १६ सप्ताह', sat: '᱑᱖ ᱦᱟᱯᱛᱟ ᱦᱟᱨᱟᱦᱟᱹᱨᱤ' },
    satisfactionQuorumScore: '90.6%',
    statusTag: { en: 'Industrial Eco-Restoration', hi: 'औद्योगिक पर्यावरण सुधार', sat: 'ᱠᱟᱨᱠᱷᱟᱱᱟ ᱦᱚᱭ-ᱦᱤᱥᱤᱫ ᱥᱟᱯᱷᱟ' },
  },
  {
    districtName: { en: 'Hazaribagh', hi: 'हज़ारीबाग़', sat: 'ᱦᱟᱡᱟᱨᱤᱵᱟᱜᱽ' },
    problemsReceived: 135,
    problemsSolved: 108,
    activeUniversities: 4,
    avgResolutionWeeks: { en: '15 Weeks Avg', hi: 'औसत १५ सप्ताह', sat: '᱑᱕ ᱦᱟᱯᱛᱟ ᱦᱟᱨᱟᱦᱟᱹᱨᱤ' },
    satisfactionQuorumScore: '93.5%',
    statusTag: { en: 'Water Remediation Focus', hi: 'पेयजल शुद्धिकरण प्रमुखता', sat: 'ᱧᱩ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱢᱩᱬᱩᱛ' },
  },
  {
    districtName: { en: 'East Singhbhum', hi: 'पूर्वी सिंहभूम', sat: 'ᱥᱟᱢᱟᱝ ᱥᱤᱝᱵᱷᱩᱢ' },
    problemsReceived: 172,
    problemsSolved: 138,
    activeUniversities: 6,
    avgResolutionWeeks: { en: '15 Weeks Avg', hi: 'औसत १५ सप्ताह', sat: '᱑᱕ ᱦᱟᱯᱛᱟ ᱦᱟᱨᱟᱦᱟᱹᱨᱤ' },
    satisfactionQuorumScore: '93.9%',
    statusTag: { en: 'Solar Power Integration', hi: 'सौर ऊर्जा संयोजित', sat: 'ᱵᱮᱲᱟ ᱫᱟᱲᱮ ᱵᱤᱡᱽᱞᱤ ᱡᱚᱲᱟᱣ' },
  },
  {
    districtName: { en: 'Dumka', hi: 'दुमका', sat: 'ᱫᱩᱢᱠᱟᱹ' },
    problemsReceived: 110,
    problemsSolved: 83,
    activeUniversities: 3,
    avgResolutionWeeks: { en: '19 Weeks Avg', hi: 'औसत १९ सप्ताह', sat: '᱑᱙ ᱦᱟᱯᱛᱟ ᱦᱟᱨᱟᱦᱟᱹᱨᱤ' },
    satisfactionQuorumScore: '91.0%',
    statusTag: { en: 'Santhal Pargana Expansion', hi: 'संथाल परगना विस्तार', sat: 'ᱥᱟᱱᱛᱟᱲ ᱯᱟᱨᱜᱟᱱᱟ ᱯᱟᱥᱱᱟᱣ' },
  },
  {
    districtName: { en: 'Bokaro', hi: 'बोकारो', sat: 'ᱵᱳᱠᱟᱨᱳ' },
    problemsReceived: 124,
    problemsSolved: 98,
    activeUniversities: 4,
    avgResolutionWeeks: { en: '16 Weeks Avg', hi: 'औसत १६ सप्ताह', sat: '᱑᱖ ᱦᱟᱯᱛᱟ ᱦᱟᱨᱟᱦᱟᱹᱨᱤ' },
    satisfactionQuorumScore: '92.1%',
    statusTag: { en: 'Urban & Peri-Urban Tech', hi: 'नगरीय एवं उपनगरीय तकनीक', sat: 'ᱵᱟᱡᱟᱨ ᱟᱨ ᱟᱹᱛᱩ ᱴᱮᱠᱱᱤᱠ' },
  },
];

