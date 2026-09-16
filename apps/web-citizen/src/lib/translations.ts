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
  progress: string;
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

export interface SsoTranslations {
  back: string;
  ssoTitle: string;
  tabs: {
    citizen: string;
    university: string;
    industry: string;
    govt: string;
  };
  fieldLabels: {
    citizen: string;
    university: string;
    industry: string;
    govt: string;
  };
  placeholders: {
    citizen: string;
    university: string;
    industry: string;
    govt: string;
  };
  passwordLabel: string;
  passwordPlaceholder: string;
  signInBtn: string;
  fastPassHeading: string;
  fastPassRoles: {
    citizen: string;
    university: string;
    industry: string;
    govt: string;
  };
  trackerBtn: string;
}

export interface TranslationDictionary {
  stateHeader: string;
  heading: string;
  subheading: string;
  reportBtn: string;
  resolvedTitle: string;
  resolvedCount: string;
  resolvedSub: string;
  resolvedDesc: string;
  activeTitle: string;
  activeCount: string;
  activeSub: string;
  activeDesc: string;
  escrowTitle: string;
  escrowAmt: string;
  escrowSub: string;
  escrowDesc: string;
  problemsTitle: string;
  problemsSub: string;
  cardsFeed: string;
  radarMap: string;
  rangeLabel: string;
  searchPlaceholder: string;
  allCategories: string;
  timeline: string;
  aiMatch: string;
  grant: string;
  heiPartner: string;
  openBids: string;
  fieldTesting: string;
  aiAssistant: string;
  signOut: string;

  // Extensions for site-wide purity and component compatibility
  gridBadge: string;
  aiCopilotBtn: string;
  daysLeft: string;
  aiFit: string;
  upvoteBtn: string;
  upvotedBtn: string;
  dashboard: DashboardTranslations;
  nav: NavTranslations;
  feedback: FeedbackTranslations;
  sso: SsoTranslations;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    stateHeader: "STATE SOCIETAL INNOVATION PORTAL",
    heading: "Local Issues & Solutions",
    subheading: "Grassroots Problems Connected to Academic Research & Tranche Grants.",
    reportBtn: "+ Report New Issue",
    resolvedTitle: "VERIFIED QUORUM",
    resolvedCount: "412",
    resolvedSub: "Issues Resolved",
    resolvedDesc: "Verified on Ground",
    activeTitle: "UNIVERSITY R&D",
    activeCount: "184",
    activeSub: "Active Solutions",
    activeDesc: "In University Labs",
    escrowTitle: "ESCROW LEDGER",
    escrowAmt: "₹1.8 Cr",
    escrowSub: "Funds Allocated",
    escrowDesc: "Milestone Grants",
    problemsTitle: "Problems in Your Area",
    problemsSub: "Vote to prioritize your village issues",
    cardsFeed: "Cards Feed",
    radarMap: "500m Radar Map",
    rangeLabel: "Range:",
    searchPlaceholder: "Search tickets or villages...",
    allCategories: "All Categories",
    timeline: "TIMELINE",
    aiMatch: "AI MATCH",
    grant: "GRANT",
    heiPartner: "HEI Partner:",
    openBids: "Open for University Bids",
    fieldTesting: "Field Testing and Durability Pilot",
    aiAssistant: "AI Assistant",
    signOut: "Sign Out",

    gridBadge: "Jharkhand State Innovation Grid",
    aiCopilotBtn: "AI Assistant",
    daysLeft: "Days Left",
    aiFit: "AI Fit:",
    upvoteBtn: "Upvote",
    upvotedBtn: "Upvoted",
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
      industry: "Industry / CSR",
      govt: "Govt DHTE",
      samvaad: "Samvaad",
      hackathon: "Hackathon",
      rndFailures: "R&D Failures",
      feedback: "Citizen Feedback",
      progress: "Progress Tracker"
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
    sso: {
      back: "Back",
      ssoTitle: "JAGRIT Single Sign-On",
      tabs: {
        citizen: "Citizen",
        university: "University",
        industry: "Industry",
        govt: "Govt"
      },
      fieldLabels: {
        citizen: "Phone / Voter ID / Aadhaar Virtual ID",
        university: "Campus + Faculty Employee or Student ID",
        industry: "Corporate CIN / Form CSR-1 Registration No.",
        govt: "State Department + Official Govt Service Code"
      },
      placeholders: {
        citizen: "+91 98765 43210",
        university: "BIT Mesra · AISHE-U-0204",
        industry: "CIN: L27100MH1907PLC000260",
        govt: "JH-GOV-DHTE-001"
      },
      passwordLabel: "Security Password / Passcode",
      passwordPlaceholder: "••••••••",
      signInBtn: "Sign In to Portal ➔",
      fastPassHeading: "⚡ Quick Demo Fast-Pass (1-Click Login):",
      fastPassRoles: {
        citizen: "👥 Citizen",
        university: "🎓 University",
        industry: "💼 Industry",
        govt: "🏛️ Govt"
      },
      trackerBtn: "Statewide Progress & Resolution Tracker"
    }
  },
  hi: {
    stateHeader: "राजकीय सामाजिक नवाचार पोर्टल",
    heading: "जनसमस्याएं एवं समाधान",
    subheading: "शैक्षणिक अनुसंधान और अनुदान से जुड़ी जमीनी समस्याएं।",
    reportBtn: "+ नई समस्या दर्ज करें",
    resolvedTitle: "सत्यापित कोरम",
    resolvedCount: "४१२",
    resolvedSub: "हल हुई समस्याएं",
    resolvedDesc: "जमीन पर सत्यापित",
    activeTitle: "विश्वविद्यालय अनुसंधान",
    activeCount: "१८४",
    activeSub: "सक्रिय समाधान",
    activeDesc: "विश्वविद्यालय प्रयोगशाला में",
    escrowTitle: "एस्क्रो खाता",
    escrowAmt: "₹१.८ करोड़",
    escrowSub: "आवंटित राशि",
    escrowDesc: "माइलस्टोन अनुदान",
    problemsTitle: "आपके क्षेत्र की समस्याएं",
    problemsSub: "अपनी गांव की समस्याओं को प्राथमिकता देने के लिए वोट करें",
    cardsFeed: "कार्ड फीड",
    radarMap: "५०० मीटर रडार मैप",
    rangeLabel: "दायरा:",
    searchPlaceholder: "टिकट नंबर या गांव खोजें...",
    allCategories: "सभी श्रेणियां",
    timeline: "समय-सीमा",
    aiMatch: "एआई मिलान",
    grant: "अनुदान",
    heiPartner: "विश्वविद्यालय भागीदार:",
    openBids: "विश्वविद्यालय प्रस्ताव के लिए खुला",
    fieldTesting: "क्षेत्र परीक्षण और स्थायित्व पायलट",
    aiAssistant: "एआई सहायक",
    signOut: "साइन आउट",

    gridBadge: "झारखंड राज्य नवाचार ग्रिड",
    aiCopilotBtn: "एआई सहायक",
    daysLeft: "दिन शेष",
    aiFit: "एआई मिलान:",
    upvoteBtn: "वोट दें",
    upvotedBtn: "वोट दिया",
    dashboard: {
      title: "जनसमस्याएं एवं समाधान",
      subtitle: "शैक्षणिक अनुसंधान और अनुदान से जुड़ी जमीनी समस्याएं।",
      reportBtn: "+ नई समस्या दर्ज करें",
      verifiedQuorum: "सत्यापित कोरम",
      resolvedCount: "४१२",
      resolvedLabel: "हल हुई समस्याएं",
      resolvedSub: "जमीन पर सत्यापित",
      universityRnd: "विश्वविद्यालय अनुसंधान",
      activeCount: "१८४",
      activeLabel: "सक्रिय समाधान",
      activeSub: "विश्वविद्यालय प्रयोगशाला में",
      escrowLedger: "एस्क्रो खाता",
      fundsAmount: "₹१.८ करोड़",
      fundsLabel: "आवंटित राशि",
      fundsSub: "माइलस्टोन अनुदान",
      problemsNearTitle: "आपके क्षेत्र की समस्याएं",
      problemsNearSubtitle: "अपनी गांव की समस्याओं को प्राथमिकता देने के लिए वोट करें",
      cardsFeed: "कार्ड फीड",
      radarMap: "५०० मीटर रडार मैप",
      range: "दायरा:",
      allCategories: "सभी श्रेणियां",
      searchPlaceholder: "टिकट नंबर या गांव खोजें...",
      timeline: "समय-सीमा",
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
      industry: "उद्योग / सीएसआर",
      govt: "सरकारी पोर्टल",
      samvaad: "संवाद",
      hackathon: "हैकाथॉन",
      rndFailures: "आरएंडडी विफलताएं",
      feedback: "नागरिक प्रतिक्रिया",
      progress: "प्रगति ट्रैकर"
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
    sso: {
      back: "वापस",
      ssoTitle: "जागृत सिंगल साइन-ऑन",
      tabs: {
        citizen: "नागरिक",
        university: "विश्वविद्यालय",
        industry: "उद्योग",
        govt: "प्रशासन"
      },
      fieldLabels: {
        citizen: "फोन / मतदाता पहचान पत्र / आधार वर्चुअल आईडी",
        university: "परिसर + संकाय कर्मचारी अथवा छात्र आईडी",
        industry: "कॉर्पोरेट सीआईएन / फॉर्म सीएसआर-1 पंजीकरण संख्या",
        govt: "राज्य विभाग + आधिकारिक सरकारी सेवा कोड"
      },
      placeholders: {
        citizen: "+91 98765 43210",
        university: "बीआईटी मेसरा · AISHE-U-0204",
        industry: "सीआईएन: L27100MH1907PLC000260",
        govt: "JH-GOV-DHTE-001"
      },
      passwordLabel: "सुरक्षा पासवर्ड / पासकोड",
      passwordPlaceholder: "••••••••",
      signInBtn: "पोर्टल में साइन इन करें ➔",
      fastPassHeading: "⚡ त्वरित डेमो फास्ट-पास (१-क्लिक लॉगिन):",
      fastPassRoles: {
        citizen: "👥 नागरिक",
        university: "🎓 विश्वविद्यालय",
        industry: "💼 उद्योग",
        govt: "🏛️ प्रशासन"
      },
      trackerBtn: "राज्यव्यापी प्रगति एवं समाधान ट्रैकर"
    }
  },
  sat: {
    stateHeader: "State Societal Innovation Portal",
    heading: "Aatu Reah Samasya ar Hal",
    subheading: "Grassroots Problems Connected to Academic Research",
    reportBtn: "+ Nawa Samasya Olme",
    resolvedTitle: "VERIFIED QUORUM",
    resolvedCount: "412",
    resolvedSub: "Hal Ena",
    resolvedDesc: "Sari Ena",
    activeTitle: "UNIVERSITY R&D",
    activeCount: "184",
    activeSub: "Chalu Menah-a",
    activeDesc: "University Re",
    escrowTitle: "ESCROW LEDGER",
    escrowAmt: "₹1.8 Cr",
    escrowSub: "Paisa Taka",
    escrowDesc: "Milestone Grants",
    problemsTitle: "Sur Reah Samasya",
    problemsSub: "Vote emme",
    cardsFeed: "Cards Feed",
    radarMap: "500m Radar Map",
    rangeLabel: "Range:",
    searchPlaceholder: "Search tickets...",
    allCategories: "Joto Lekan",
    timeline: "TIMELINE",
    aiMatch: "AI MATCH",
    grant: "GRANT",
    heiPartner: "HEI Partner:",
    openBids: "Open for Bids",
    fieldTesting: "Field Testing",
    aiAssistant: "AI Goroic",
    signOut: "Sign Out",

    gridBadge: "Jharkhand Rajya Nawa Bhabna Grid",
    aiCopilotBtn: "AI Goroic",
    daysLeft: "Maha Baki",
    aiFit: "AI Milaw:",
    upvoteBtn: "Vote Emme",
    upvotedBtn: "Vote Ena",
    dashboard: {
      title: "Aatu Reah Samasya ar Hal",
      subtitle: "Grassroots Problems Connected to Academic Research",
      reportBtn: "+ Nawa Samasya Olme",
      verifiedQuorum: "VERIFIED QUORUM",
      resolvedCount: "412",
      resolvedLabel: "Hal Ena",
      resolvedSub: "Sari Ena",
      universityRnd: "UNIVERSITY R&D",
      activeCount: "184",
      activeLabel: "Chalu Menah-a",
      activeSub: "University Re",
      escrowLedger: "ESCROW LEDGER",
      fundsAmount: "₹1.8 Cr",
      fundsLabel: "Paisa Taka",
      fundsSub: "Milestone Grants",
      problemsNearTitle: "Sur Reah Samasya",
      problemsNearSubtitle: "Vote emme",
      cardsFeed: "Cards Feed",
      radarMap: "500m Radar Map",
      range: "Range:",
      allCategories: "Joto Lekan",
      searchPlaceholder: "Search tickets...",
      timeline: "TIMELINE",
      daysLeft: "Maha Baki",
      aiMatch: "AI MATCH",
      aiFit: "AI Milaw:",
      grant: "GRANT",
      heiPartner: "HEI Partner:",
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
      feedback: "Aatu Bichar",
      progress: "Lahanti Tracker"
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
    sso: {
      back: "ᱨᱩᱣᱟᱹᱲ",
      ssoTitle: "ᱡᱟᱜᱽᱨᱤᱛ ᱢᱤᱫ ᱥᱟᱭᱤᱱ-ᱚᱱ",
      tabs: {
        citizen: "ᱨᱟᱹᱥᱤᱭᱟᱹ",
        university: "ᱵᱤᱨᱫᱟᱹᱜᱟᱲ",
        industry: "ᱠᱟᱹᱨᱜᱟᱲ",
        govt: "ᱥᱚᱨᱠᱟᱨ"
      },
      fieldLabels: {
        citizen: "ᱯᱷᱳᱱ / ᱵᱷᱳᱴᱟᱨ ᱠᱟᱨᱰ / ᱟᱫᱷᱟᱨ ᱵᱷᱟᱨᱪᱩᱣᱟᱞ ᱟᱭᱰᱤ",
        university: "ᱠᱮᱢᱯᱟᱥ + ᱯᱨᱚᱯᱷᱮᱥᱟᱨ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱥᱮ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱟᱭᱰᱤ",
        industry: "ᱠᱚᱨᱯᱳᱨᱮᱴ CIN / ᱯᱷᱳᱨᱢ CSR-1 ᱨᱮᱡᱤᱥᱴᱨᱮᱥᱚᱱ ᱱᱚᱢᱵᱚᱨ",
        govt: "ᱯᱚᱱᱚᱛ ᱵᱤᱵᱷᱟᱜᱽ + ᱥᱚᱨᱠᱟᱨᱤ ᱥᱮᱵᱟ ᱠᱳᱰ"
      },
      placeholders: {
        citizen: "+91 98765 43210",
        university: "BIT Mesra · AISHE-U-0204",
        industry: "CIN: L27100MH1907PLC000260",
        govt: "JH-GOV-DHTE-001"
      },
      passwordLabel: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱯᱟᱥᱣᱟᱨᱰ / ᱯᱟᱥᱠᱳᱰ",
      passwordPlaceholder: "••••••••",
      signInBtn: "ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱥᱟᱭᱤᱱ ᱤᱱ ᱢᱮ ➔",
      fastPassHeading: "⚡ ᱞᱚᱜᱚᱱ ᱰᱮᱢᱳ ᱯᱷᱟᱥᱴ-ᱯᱟᱥ (᱑-ᱠᱞᱤᱠ ᱵᱚᱞᱚᱱ):",
      fastPassRoles: {
        citizen: "👥 ᱨᱟᱹᱥᱤᱭᱟᱹ",
        university: "🎓 ᱵᱤᱨᱫᱟᱹᱜᱟᱲ",
        industry: "💼 ᱠᱟᱹᱨᱜᱟᱲ",
        govt: "🏛️ ᱥᱚᱨᱠᱟᱨ"
      },
      trackerBtn: "ᱯᱚᱱᱚᱛ ᱡᱟᱠᱟᱛ ᱞᱟᱦᱟᱱᱛᱤ ᱟᱨ ᱥᱚᱞᱦᱮ ᱴᱨᱮᱠᱟᱨ"
    }
  }
};
