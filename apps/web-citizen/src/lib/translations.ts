export type Language = 'en' | 'hi' | 'sat';

export interface DashboardTranslations {
  title: string;
  subtitle: string;
  reportBtn: string;
  verifiedQuorum: string;
  resolvedCount: string;
  resolvedLabel: string;
  resolvedSub: string;
  universityRnd: string;
  activeCount: string;
  activeLabel: string;
  activeSub: string;
  escrowLedger: string;
  fundsAmount: string;
  fundsLabel: string;
  fundsSub: string;
  problemsNearTitle: string;
  problemsNearSubtitle: string;
  cardsFeed: string;
  radarMap: string;
  range: string;
  allCategories: string;
  searchPlaceholder: string;
  timeline: string;
  daysLeft: string;
  aiMatch: string;
  aiFit: string;
  grant: string;
  heiPartner: string;
  upvoteBtn: string;
  upvotedBtn: string;
}

export interface NavTranslations {
  citizen: string;
  whatsapp: string;
  university: string;
  industry: string;
  govt: string;
  samvaad: string;
  hackathon: string;
  rndFailures: string;
  feedback: string;
}

export interface FeedbackTranslations {
  reviewBadge: string;
  title: string;
  subtitle: string;
  voteQuestion: string;
  solvedBtn: string;
  partialBtn: string;
  failedBtn: string;
  addIssueBtn: string;
  addIssueDesc: string;
  issueInputPlaceholder: string;
  submitFeedback: string;
}

export interface TranslationDictionary {
  stateHeader: string;
  signOut: string;
  gridBadge: string;
  dashboard: DashboardTranslations;
  nav: NavTranslations;
  feedback: FeedbackTranslations;
  aiAssistant: string;
  aiCopilotBtn: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    stateHeader: "State Societal Innovation Portal",
    signOut: "Sign Out",
    gridBadge: "Jharkhand State Innovation Grid",
    dashboard: {
      title: "Local Issues & Solutions",
      subtitle: "Grassroots Problems Connected to Academic Research & Tranche Grants.",
      reportBtn: "+ Report New Issue",
      verifiedQuorum: "VERIFIED QUORUM",
      resolvedCount: "412",
      resolvedLabel: "Issues Resolved",
      resolvedSub: "Verified on Ground",
      universityRnd: "UNIVERSITY R&D",
      activeCount: "184",
      activeLabel: "Active Solutions",
      activeSub: "In University Labs",
      escrowLedger: "ESCROW LEDGER",
      fundsAmount: "₹1.8 Cr",
      fundsLabel: "Funds Allocated",
      fundsSub: "Milestone Grants",
      problemsNearTitle: "Problems in Your Area",
      problemsNearSubtitle: "Vote to prioritize your village issues",
      cardsFeed: "Cards Feed",
      radarMap: "500m Radar Map",
      range: "Range:",
      allCategories: "All Categories",
      searchPlaceholder: "Search tickets or villages...",
      timeline: "TIMELINE",
      daysLeft: "Days Left",
      aiMatch: "AI MATCH",
      aiFit: "AI Fit:",
      grant: "GRANT",
      heiPartner: "HEI Partner:",
      upvoteBtn: "Upvote",
      upvotedBtn: "Upvoted"
    },
    nav: {
      citizen: "Citizen",
      whatsapp: "WhatsApp Bot",
      university: "University",
      industry: "Industry/CSR",
      govt: "Govt DHTE",
      samvaad: "Samvaad",
      hackathon: "Hackathon",
      rndFailures: "R&D Failures",
      feedback: "📝 Citizen Feedback"
    },
    feedback: {
      reviewBadge: "45-Day Post-Implementation Review",
      title: "Citizen Quorum & Feedback Portal",
      subtitle: "Review resolved projects after 45 days of unassisted use. Vote on efficacy and report lingering defects.",
      voteQuestion: "How is the solution performing after 45 days on the ground?",
      solvedBtn: "Fully Solved (Satisfactory)",
      partialBtn: "Partially Solved (Minor Issues)",
      failedBtn: "Failed / Ineffective",
      addIssueBtn: "Add New Issue / Report Defect to this Problem",
      addIssueDesc: "Submitting here routes directly back to the assigned university R&D team for an iterative repair sprint.",
      issueInputPlaceholder: "Describe the lingering defect or new problem in detail...",
      submitFeedback: "Submit Quorum Vote & Feedback"
    },
    aiAssistant: "AI Assistant",
    aiCopilotBtn: "AI Assistant"
  },
  hi: {
    stateHeader: "राज्य सामाजिक नवाचार पोर्टल",
    signOut: "साइन आउट",
    gridBadge: "झारखंड राज्य नवाचार ग्रिड",
    dashboard: {
      title: "जनसमस्याएं एवं समाधान",
      subtitle: "विश्वविद्यालयी अनुसंधान और अनुदान से जुड़े जमीनी मुद्दे।",
      reportBtn: "+ नई समस्या दर्ज करें",
      verifiedQuorum: "सत्यापित कोरम",
      resolvedCount: "४१२",
      resolvedLabel: "हल हुई समस्याएं",
      resolvedSub: "जमीन पर सत्यापित",
      universityRnd: "विश्वविद्यालय अनुसंधान",
      activeCount: "१८४",
      activeLabel: "सक्रिय समाधान",
      activeSub: "विश्वविद्यालय लैब में",
      escrowLedger: "एस्क्रो खाता",
      fundsAmount: "₹१.८ करोड़",
      fundsLabel: "आवंटित राशि",
      fundsSub: "चरणबद्ध अनुदान",
      problemsNearTitle: "आपके क्षेत्र की समस्याएं",
      problemsNearSubtitle: "अपने गांव की समस्याओं को प्राथमिकता देने के लिए वोट करें",
      cardsFeed: "कार्ड सूची",
      radarMap: "५०० मीटर रडार मैप",
      range: "दूरी:",
      allCategories: "सभी श्रेणियां",
      searchPlaceholder: "टिकट या गांव खोजें...",
      timeline: "समय सीमा",
      daysLeft: "दिन शेष",
      aiMatch: "एआई मिलान",
      aiFit: "एआई मिलान:",
      grant: "अनुदान",
      heiPartner: "विश्वविद्यालय भागीदार:",
      upvoteBtn: "वोट दें",
      upvotedBtn: "वोट दिया"
    },
    nav: {
      citizen: "नागरिक",
      whatsapp: "व्हाट्सएप बॉट",
      university: "विश्वविद्यालय",
      industry: "उद्योग/सीएसआर",
      govt: "सरकारी डैशबोर्ड",
      samvaad: "संवाद",
      hackathon: "हैकाथॉन",
      rndFailures: "आरएंडडी असफलताएं",
      feedback: "📝 नागरिक प्रतिक्रिया"
    },
    feedback: {
      reviewBadge: "४५ दिवसीय कार्यान्वयन पश्चात समीक्षा",
      title: "नागरिक कोरम एवं प्रतिक्रिया पोर्टल",
      subtitle: "४५ दिनों के अप्रतिबंधित उपयोग के बाद समाधान की समीक्षा करें। प्रभावशीलता पर वोट करें एवं नए दोष दर्ज करें।",
      voteQuestion: "जमीन पर ४५ दिनों के बाद यह समाधान कैसा काम कर रहा है?",
      solvedBtn: "पूर्णतः हल (संतुष्ट)",
      partialBtn: "आंशिक हल (छोटी समस्याएं)",
      failedBtn: "विफल / अप्रभावी",
      addIssueBtn: "इस समस्या में नया दोष या मुद्दा जोड़ें",
      addIssueDesc: "यहाँ शिकायत दर्ज करने पर यह सीधे संबंधित विश्वविद्यालय टीम को पुनः सुधार के लिए प्रेषित होगी।",
      issueInputPlaceholder: "बचे हुए दोष या नई समस्या का विस्तार से वर्णन करें...",
      submitFeedback: "कोरम वोट एवं प्रतिक्रिया दर्ज करें"
    },
    aiAssistant: "एआई सहायक",
    aiCopilotBtn: "एआई सहायक"
  },
  sat: {
    stateHeader: "Rajya Samajik Nawa Etohor Portal",
    signOut: "Oḍoklen",
    gridBadge: "Jharkhand Rajya Nawa Bhabna Grid",
    dashboard: {
      title: "Aatu Reah Samasya ar Hal",
      subtitle: "University reah research ar sarkar madat te hal aakan samasya.",
      reportBtn: "+ Nawa Samasya Olme",
      verifiedQuorum: "SARI AAKAN QUORUM",
      resolvedCount: "412",
      resolvedLabel: "Hal Ena",
      resolvedSub: "Aatu Re Sari Ena",
      universityRnd: "BIRDAUSUL R&D",
      activeCount: "184",
      activeLabel: "Chalu Menah-a",
      activeSub: "University Lab Re",
      escrowLedger: "SARKAR PAISA KHATA",
      fundsAmount: "₹1.8 Cr",
      fundsLabel: "Paisa Taka",
      fundsSub: "Sarkar Madat",
      problemsNearTitle: "Sur Reah Samasya",
      problemsNearSubtitle: "Aapeah aatu samasya lahante idilaigi vote emme",
      cardsFeed: "Sakom Suchi",
      radarMap: "500m Radar Naksa",
      range: "Sangiñ:",
      allCategories: "Joto Lekan",
      searchPlaceholder: "Ticket se aatu panja me...",
      timeline: "OKTO",
      daysLeft: "Maha Baki",
      aiMatch: "AI MILAW",
      aiFit: "AI Milaw:",
      grant: "MADAT",
      heiPartner: "Birdausul Goroic:",
      upvoteBtn: "Vote Emme",
      upvotedBtn: "Vote Ena"
    },
    nav: {
      citizen: "Aatu Hor",
      whatsapp: "WhatsApp Bot",
      university: "Birdausul",
      industry: "Karkhana/CSR",
      govt: "Sarkar DHTE",
      samvaad: "Galmarao",
      hackathon: "Hal Heprao",
      rndFailures: "Bidaw Bạṛij Khata",
      feedback: "📝 Aatu Bichar"
    },
    feedback: {
      reviewBadge: "45-Maha Tayom Bichar",
      title: "Aatu Quorum ar Bichar Portal",
      subtitle: "45 maha beohar tayom hal reah bichar emme. Sari aakan se ban nelme.",
      voteQuestion: "45 maha beohar tayom noa hal cheleka chalu menah-a?",
      solvedBtn: "Pura Hal Ena (Bes Geya)",
      partialBtn: "Bạṛich Hal Ena (Katiñ Samasya)",
      failedBtn: "Bange Hal Ena / Bạṛij Ena",
      addIssueBtn: "Nawa Samasya / Bạṛij Olme",
      addIssueDesc: "Nonde ol lekhankhan dohorate Birdausul team thech banaw laigi senoh-a.",
      issueInputPlaceholder: "Baki menah bạṛij se nawa samasya bistar te olme...",
      submitFeedback: "Quorum Vote ar Bichar Darj Me"
    },
    aiAssistant: "AI Goroic",
    aiCopilotBtn: "AI Goroic"
  }
};
