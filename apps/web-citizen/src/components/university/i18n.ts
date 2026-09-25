// Single-language dictionary for the University HEI Portal.
// Rule: every rendered string is 100% one language. Never mix (no "Aage Badhein / Get Started").
// NOTE: the Santhali (Ol Chiki) block is a first draft and MUST be reviewed by a native speaker.

export type Lang = "en" | "hi" | "sat";

export const toLang = (v: unknown): Lang => (v === "hi" || v === "sat" ? v : "en");

const OL_CHIKI_DIGITS = ["᱐", "᱑", "᱒", "᱓", "᱔", "᱕", "᱖", "᱗", "᱘", "᱙"];

/** Convert Latin digits to Ol Chiki digits when lang === 'sat'. Leaves other languages untouched. */
export const num = (value: number | string, lang: Lang): string => {
  const s = String(value);
  return lang === "sat" ? s.replace(/\d/g, (d) => OL_CHIKI_DIGITS[Number(d)]) : s;
};

export interface AxisText {
  label: string; // full label (tooltip + list)
  short: string; // short label for the radar axis
  detail: string; // evidence line
}

export interface Strings {
  back: string;
  portalTitle: string;
  univName: string;
  verifiedLabs: string;
  labNabl: string;
  labNano: string;
  grants: string;
  hScore: string;
  feedTitle: string;
  challengeTitle: string;
  countdown: (days: string, hours: string) => string;
  countdownExpired: string;
  budgetLabel: string;
  budgetValue: string;
  advantage: string;
  accept: string;
  consortium: string;
  close: string;
  cancel: string;
  solo: {
    title: string;
    intro: string;
    facultyLabel: string;
    facultyPlaceholder: string;
    studentLabel: (n: string) => string;
    studentHint: string;
    errRequired: string;
    errId: string;
    confirm: string;
    doneTitle: string;
    doneBody: string;
  };
  cons: {
    title: string;
    intro: string;
    partnerLabel: string;
    partners: string[];
    shareLabel: string;
    partnerShare: (pct: string) => string;
    errPartner: string;
    confirm: string;
    doneTitle: string;
    doneBody: (partner: string) => string;
  };
  xai: {
    title: string;
    axes: AxisText[]; // order: labs, patents, proximity, track record, faculty
    weightLabel: (w: string) => string;
    scoreLabel: string;
    overallBadge: (pct: string) => string;
    explainTitle: string;
    explain: string;
  };
  workspace: {
    eyebrow: string;
    title: string;
    subtitle: string;
    audit: string;
    stages: {
      round1: string;
      round1Detail: string;
      round2: string;
      round2Detail: string;
      round3: string;
      round3Detail: string;
    };
    round1: {
      prefix: string;
      title: string;
      upload: string;
      uploadMeta: string;
      ready: string;
      bomTitle: string;
      bomValue: string;
      bomText: string;
      submit: string;
      submitted: string;
    };
    round2: {
      mentorLabel: string;
      mentorName: string;
      mentorRole: string;
      reviewTitle: string;
      reviewText: string;
      message: string;
      allowanceLabel: string;
      allowanceTitle: string;
      cap: string;
      recordSpend: string;
      remaining: (value: string) => string;
      loggerTitle: string;
      logPlaceholder: string;
      button: string;
      telemetryLabel: string;
    };
    round3: {
      title: string;
      description: string;
      guard: string;
    };
  };
  bom: {
    prefix: string;
    title: string;
    subtitle: string;
    upload: string;
    queued: (name: string) => string;
    lineItem: string;
    category: string;
    qty: string;
    unitCost: string;
    subtotal: string;
    addItem: string;
    expanded: string;
    grantUtilization: string;
    remaining: (value: string) => string;
    overCeiling: (value: string) => string;
    within: string;
    over: string;
    save: string;
    saved: string;
  };
  credits: {
    prefix: string;
    title: string;
    subtitle: string;
    badge: string;
    calculatorTitle: string;
    calculatorText: string;
    label: string;
    hours: string;
    creditsToDeposit: string;
    deposit: string;
    queued: (credits: string) => string;
    unlock: (minutes: string) => string;
    scholarTitle: string;
    scholarText: string;
    scholarBadge: string;
    facultyTitle: string;
    facultyText: string;
    facultyPoints: string;
  };
  labExchange: {
    prefix: string;
    title: string;
    subtitle: string;
    badge: string;
    partnerBadge: string;
    available: string;
    bookingRequest: (instrument: string, slot: string) => string;
    pending: string;
  };
  escalation: {
    prefix: string;
    title: string;
    subtitle: string;
    badge: string;
    stageSummary: string;
    nextAction: string;
    rulesTitle: string;
    acknowledgement: string;
    acknowledged: string;
    stages: {
      one: { title: string; detail: string };
      two: { title: string; detail: string };
      three: { title: string; detail: string };
      four: { title: string; detail: string };
    };
    rules: string[];
  };
}

const en: Strings = {
  back: "← Return to Citizen Portal",
  portalTitle: "University Portal",
  univName: "Birla Institute of Technology (BIT), Mesra",
  verifiedLabs: "Verified laboratories",
  labNabl: "🔬 NABL Environmental Chemistry & Water Testing Lab",
  labNano: "⚡ Nanomaterials & Sorbent Research Center",
  grants: "₹14,50,000 Active State & CSR Escrow Pool",
  hScore: "Institutional Responsiveness (H-Score): 95/100 (Clean Record)",
  feedTitle: "AI-matched challenge",
  challengeTitle: "Groundwater Fluoride Remediation in Palamu District",
  countdown: (d, h) => `⏱️ ${d} Days, ${h} Hours Remaining to Accept`,
  countdownExpired: "⏱️ Acceptance window closed",
  budgetLabel: "Grant budget ceiling",
  budgetValue: "₹3,50,000 (DHTE State Innovation Pool + Tata Steel CSR 1:1 Matching Grant)",
  advantage:
    "⚡ Round 1 Advantage: Guaranteed Direct Solo Allocation (Zero Competition). If skipped, this challenge enters open competitive tournament across all 42+ Jharkhand HEIs with expanded multi-hamlet deliverables.",
  accept: "Accept Solo Challenge & Form Team",
  consortium: "Propose Joint Consortium",
  close: "Close",
  cancel: "Cancel",
  solo: {
    title: "Accept Solo Challenge & Form Team",
    intro: "Enter your Faculty PI and the four student innovators who will work on this challenge.",
    facultyLabel: "Faculty PI",
    facultyPlaceholder: "Full name of the Principal Investigator",
    studentLabel: (n) => `Student ${n} ID`,
    studentHint: "12-digit APAAR ID",
    errRequired: "This field is required.",
    errId: "Enter a valid 12-digit APAAR ID.",
    confirm: "Confirm and accept",
    doneTitle: "Challenge accepted",
    doneBody: "Your team is registered for #JAG-PLM-0082. Direct solo allocation is locked for your institution.",
  },
  cons: {
    title: "Propose Joint Consortium",
    intro: "Choose a partner institution and agree on how the work is shared.",
    partnerLabel: "Partner institution",
    partners: ["Birsa Agricultural University", "NIT Jamshedpur", "Ranchi University"],
    shareLabel: "Work-share for BIT Mesra (%)",
    partnerShare: (p) => `Partner work-share: ${p}%`,
    errPartner: "Select a partner institution.",
    confirm: "Send consortium proposal",
    doneTitle: "Proposal sent",
    doneBody: (p) => `Your joint proposal has been sent to ${p} for confirmation.`,
  },
  xai: {
    title: "Why the AI matched your campus",
    axes: [
      { label: "Labs & Infrastructure", short: "Labs", detail: "NABL Certified Water Lab" },
      { label: "Patents & IP Pedigree", short: "Patents", detail: "4 Published Fluoride Sorbent Patents" },
      { label: "Geographic Proximity", short: "Proximity", detail: "Palamu Basin <140 km" },
      { label: "Historical Track Record", short: "Track Record", detail: "94% Quorum Pass Rate on 8 Deployed Pilots" },
      { label: "Faculty Specialization", short: "Faculty", detail: "Dr. R. Verma publication match" },
    ],
    weightLabel: (w) => `weight ${w}`,
    scoreLabel: "Score",
    overallBadge: (p) => `${p}% Compatibility Match`,
    explainTitle: "How this score was reached",
    explain:
      "Assigned as Top Match because campus NABL lab supports required fluoride adsorption testing, faculty holds 4 sorbent patents, remaining departmental project capacity is 62%, and historical project success rate is 94% across 8 deployed state pilots.",
  },
  workspace: {
    eyebrow: "University HEI workspace",
    title: "Dynamic Hackathon Workspace",
    subtitle: "Move one verified village challenge from a defensible idea to a deployable DPR.",
    audit: "Audit trail active",
    stages: {
      round1: "Round 1: Ideation & Pitch",
      round1Detail: "14 days",
      round2: "Round 2: Mentoring & Bench Test",
      round2Detail: "21 days",
      round3: "Round 3: DPR & Ranchi Defense",
      round3Detail: "7 days",
    },
    round1: {
      prefix: "Round 1 · shortlist entry",
      title: "Pitch deck and preliminary BOM",
      upload: "Upload pitch deck PDF",
      uploadMeta: "Maximum 5 slides, 10 MB",
      ready: "ready for review",
      bomTitle: "Preliminary BOM",
      bomValue: "₹1,96,000",
      bomText: "Solar pump, sensors, enclosure, and the protected emergency spares escrow kit are scoped for feasibility review.",
      submit: "Submit Round 1 pitch",
      submitted: "Round 1 pitch submitted",
    },
    round2: {
      mentorLabel: "Corporate mentor",
      mentorName: "Dr. A. Sen",
      mentorRole: "Tata Steel CSR · Materials and field deployment",
      reviewTitle: "Next review",
      reviewText: "Bench-test evidence and failure log due before the mentoring gate.",
      message: "Message mentor",
      allowanceLabel: "Shortlisted team allowance",
      allowanceTitle: "Seed allowance tracker",
      cap: "/ ₹20,000 cap",
      recordSpend: "Record ₹1,000 spend",
      remaining: (value) => `${value} remaining`,
      loggerTitle: "Telemetry logger",
      logPlaceholder: "e.g. Flow rate 18 L/min",
      button: "Log reading",
      telemetryLabel: "Telemetry logger",
    },
    round3: {
      title: "Round 3 · DPR submission",
      description: "Build a transparent procurement plan within the ₹3,50,000 grant ceiling.",
      guard: "Protected by audit trail",
    },
  },
  bom: {
    prefix: "Round 3 · DPR submission",
    title: "Live Bill of Materials",
    subtitle: "Build a transparent procurement plan within the ₹3,50,000 grant ceiling.",
    upload: "Upload DPR",
    queued: (name) => `${name} queued for review`,
    lineItem: "Line item",
    category: "Category",
    qty: "Qty",
    unitCost: "Unit cost",
    subtotal: "Subtotal",
    addItem: "Add line item",
    expanded: "Stage 1 scope expanded to 24 months",
    grantUtilization: "Grant utilization",
    remaining: (value) => `${value} remaining`,
    overCeiling: (value) => `${value} over ceiling`,
    within: "Within the approved grant ceiling.",
    over: "Reduce quantities or unit costs before submitting the DPR.",
    save: "Save DPR and BOM for Ranchi Defense",
    saved: "DPR and BOM saved for defense",
  },
  credits: {
    prefix: "NEP 2020 · Academic Credit Banking",
    title: "NCrF verified project credits",
    subtitle: "Convert approved hackathon work into a traceable student APAAR / DigiLocker transcript entry.",
    badge: "Faculty verified",
    calculatorTitle: "National Credit Framework calculator",
    calculatorText: "30 verified project workhours = 1 academic credit. Only faculty-approved hours can be deposited.",
    label: "Verified project workhours",
    hours: "hours",
    creditsToDeposit: "Credits to deposit",
    deposit: "Deposit verified credits",
    queued: (credits) => `${credits} credits queued in APAAR / DigiLocker`,
    unlock: (minutes) => `Add ${minutes} more verified hour(s) to unlock one credit.`,
    scholarTitle: "Ph.D. Research Scholar co-anchor",
    scholarText: "A designated research scholar co-anchors the undergraduate team, preserving exam continuity while the field project is active.",
    scholarBadge: "Exam continuity protected",
    facultyTitle: "Faculty PI · Career Advancement Scheme",
    facultyText: "Verified project supervision and public-impact evidence contribute to the faculty portfolio.",
    facultyPoints: "10 UGC-CAS API points",
  },
  labExchange: {
    prefix: "Inter-university facility exchange",
    title: "Central Instrument Booking Grid",
    subtitle: "Reserve verified characterization time across Jharkhand partner institutions for your hackathon evidence pack.",
    badge: "Shared with audit trail",
    partnerBadge: "NABL partner",
    available: "Available testing slots",
    bookingRequest: (instrument, slot) => `Booking request queued: ${instrument} · ${slot}`,
    pending: "Institutional confirmation pending",
  },
  escalation: {
    prefix: "Zero-bid governance · ADR escalation control",
    title: "Four-stage escalation path",
    subtitle: "A transparent recovery route protects public funds when a verified challenge receives no bids.",
    badge: "Zero-bid trigger monitored",
    stageSummary: "Current escalation stage",
    nextAction: "Next action: publish the decision log and notify eligible institutions.",
    rulesTitle: "Anti-speculation rules",
    acknowledgement: "I have reviewed the escalation controls before advancing a zero-bid case.",
    acknowledged: "Governance acknowledgement recorded for this session.",
    stages: {
      one: { title: "Statewide re-bid", detail: "Reopen the challenge across Jharkhand with up to +25% budget and documented scope expansion." },
      two: { title: "ITI / Polytechnic route", detail: "Route practical, implementation-ready work to state ITIs and polytechnics for an applied build cycle." },
      three: { title: "State mandate", detail: "DHTE issues a state mandate when the societal need remains unresolved after institutional routes." },
      four: { title: "Pan-India national hackathon", detail: "Publish the verified challenge nationally with its full evidence, decision log, and grant context." },
    },
    rules: [
      "No speculative bidding: a zero-bid challenge is never silently assigned to a team.",
      "Keep the original problem statement and evidence trail intact at every escalation.",
      "Publish any revised budget, scope, or eligibility criteria before reopening bids.",
      "Record the reason, approving authority, and timestamp for every escalation decision.",
      "Return unresolved challenges to public visibility rather than closing them without disposition.",
    ],
  },
};

const hi: Strings = {
  back: "← नागरिक पोर्टल पर लौटें",
  portalTitle: "विश्वविद्यालय पोर्टल",
  univName: "बिड़ला प्रौद्योगिकी संस्थान (बीआईटी), मेसरा",
  verifiedLabs: "सत्यापित प्रयोगशालाएँ",
  labNabl: "🔬 एनएबीएल पर्यावरण रसायन एवं जल परीक्षण प्रयोगशाला",
  labNano: "⚡ नैनोमटेरियल्स एवं अवशोषक अनुसंधान केंद्र",
  grants: "₹14,50,000 सक्रिय राज्य एवं सीएसआर एस्क्रो पूल",
  hScore: "संस्थागत तत्परता (एच-स्कोर): 95/100 (स्वच्छ रिकॉर्ड)",
  feedTitle: "एआई द्वारा मिलान की गई चुनौती",
  challengeTitle: "पलामू ज़िले में भूजल फ्लोराइड उपचार",
  countdown: (d, h) => `⏱️ स्वीकार करने के लिए ${d} दिन, ${h} घंटे शेष`,
  countdownExpired: "⏱️ स्वीकृति की अवधि समाप्त",
  budgetLabel: "अनुदान बजट की अधिकतम सीमा",
  budgetValue: "₹3,50,000 (डीएचटीई राज्य नवाचार पूल + टाटा स्टील सीएसआर 1:1 मैचिंग अनुदान)",
  advantage:
    "⚡ राउंड 1 का लाभ: सुनिश्चित सीधा एकल आवंटन (शून्य प्रतिस्पर्धा)। छोड़ने पर यह चुनौती झारखंड के सभी 42+ उच्च शिक्षण संस्थानों के बीच खुली प्रतियोगिता में चली जाएगी, जिसमें कई टोलों के विस्तृत लक्ष्य होंगे।",
  accept: "एकल चुनौती स्वीकारें और टीम बनाएँ",
  consortium: "संयुक्त कंसोर्टियम प्रस्तावित करें",
  close: "बंद करें",
  cancel: "रद्द करें",
  solo: {
    title: "एकल चुनौती स्वीकारें और टीम बनाएँ",
    intro: "अपने फैकल्टी पीआई और इस चुनौती पर काम करने वाले चार छात्र नवोन्मेषकों की जानकारी दें।",
    facultyLabel: "फैकल्टी पीआई",
    facultyPlaceholder: "प्रधान अन्वेषक का पूरा नाम",
    studentLabel: (n) => `छात्र ${n} की आईडी`,
    studentHint: "12 अंकों की अपार आईडी",
    errRequired: "यह जानकारी आवश्यक है।",
    errId: "12 अंकों की मान्य अपार आईडी दर्ज करें।",
    confirm: "पुष्टि करें और स्वीकारें",
    doneTitle: "चुनौती स्वीकार हो गई",
    doneBody: "आपकी टीम #JAG-PLM-0082 के लिए पंजीकृत हो गई है। आपके संस्थान के लिए सीधा एकल आवंटन सुरक्षित है।",
  },
  cons: {
    title: "संयुक्त कंसोर्टियम प्रस्तावित करें",
    intro: "साझेदार संस्थान चुनें और तय करें कि काम कैसे बँटेगा।",
    partnerLabel: "साझेदार संस्थान",
    partners: ["बिरसा कृषि विश्वविद्यालय", "एनआईटी जमशेदपुर", "राँची विश्वविद्यालय"],
    shareLabel: "बीआईटी मेसरा का कार्य-अंश (%)",
    partnerShare: (p) => `साझेदार का कार्य-अंश: ${p}%`,
    errPartner: "कृपया साझेदार संस्थान चुनें।",
    confirm: "कंसोर्टियम प्रस्ताव भेजें",
    doneTitle: "प्रस्ताव भेज दिया गया",
    doneBody: (p) => `आपका संयुक्त प्रस्ताव पुष्टि के लिए ${p} को भेज दिया गया है।`,
  },
  xai: {
    title: "एआई ने आपका परिसर क्यों चुना",
    axes: [
      { label: "प्रयोगशाला एवं अवसंरचना", short: "प्रयोगशाला", detail: "एनएबीएल प्रमाणित जल प्रयोगशाला" },
      { label: "पेटेंट एवं बौद्धिक संपदा", short: "पेटेंट", detail: "फ्लोराइड अवशोषक के 4 प्रकाशित पेटेंट" },
      { label: "भौगोलिक निकटता", short: "निकटता", detail: "पलामू बेसिन से 140 किमी से कम" },
      { label: "पिछला प्रदर्शन", short: "प्रदर्शन", detail: "8 लागू पायलटों पर 94% कोरम उत्तीर्ण दर" },
      { label: "फैकल्टी विशेषज्ञता", short: "फैकल्टी", detail: "डॉ. आर. वर्मा के प्रकाशनों से मेल" },
    ],
    weightLabel: (w) => `भार ${w}`,
    scoreLabel: "अंक",
    overallBadge: (p) => `${p}% अनुकूलता मिलान`,
    explainTitle: "यह स्कोर कैसे बना",
    explain:
      "शीर्ष मिलान इसलिए चुना गया क्योंकि परिसर की एनएबीएल प्रयोगशाला आवश्यक फ्लोराइड अवशोषण परीक्षण कर सकती है, फैकल्टी के पास 4 अवशोषक पेटेंट हैं, विभाग की शेष परियोजना क्षमता 62% है, और 8 लागू राज्य पायलटों में ऐतिहासिक सफलता दर 94% है।",
  },
  workspace: {
    eyebrow: "विश्वविद्यालय HEI कार्यक्षेत्र",
    title: "डायनामिक हैकाथॉन वर्कस्पेस",
    subtitle: "एक सत्यापित ग्राम चुनौती को उपयोगी विचार से लागू DPR तक पहुँचाएँ।",
    audit: "ऑडिट ट्रेल सक्रिय",
    stages: {
      round1: "राउंड 1: आइडियेशन एवं पिच",
      round1Detail: "14 दिन",
      round2: "राउंड 2: मार्गदर्शन एवं बेंच टेस्ट",
      round2Detail: "21 दिन",
      round3: "राउंड 3: DPR एवं राँची रक्षा",
      round3Detail: "7 दिन",
    },
    round1: {
      prefix: "राउंड 1 · शॉर्टलिस्ट प्रविष्टि",
      title: "पिच डेक और प्रारंभिक BOM",
      upload: "पिच डेक PDF अपलोड करें",
      uploadMeta: "अधिकतम 5 स्लाइड, 10 MB",
      ready: "समीक्षा के लिए तैयार",
      bomTitle: "प्रारंभिक BOM",
      bomValue: "₹1,96,000",
      bomText: "सौर पम्प, सेंसर, एन्क्लोज़र और सुरक्षित आपात स्पेयर्स एस्क्रो किट को व्यवहार्यता समीक्षा के लिए रखा गया है।",
      submit: "राउंड 1 पिच जमा करें",
      submitted: "राउंड 1 पिच जमा हो गई",
    },
    round2: {
      mentorLabel: "कॉर्पोरेट मेंटर",
      mentorName: "डॉ. ए. सेन",
      mentorRole: "टाटा स्टील सीएसआर · सामग्री और फील्ड डिप्लॉयमेंट",
      reviewTitle: "अगली समीक्षा",
      reviewText: "मार्गदर्शन गेट से पहले बेंच-टेस्ट साक्ष्य और फेल्योर लॉग जमा करें।",
      message: "मेंटर को संदेश करें",
      allowanceLabel: "शॉर्टलिस्ट टीम अलाउंस",
      allowanceTitle: "सीड अलाउंस ट्रैकर",
      cap: "/ ₹20,000 सीमा",
      recordSpend: "₹1,000 खर्च दर्ज करें",
      remaining: (value) => `${value} शेष`,
      loggerTitle: "टेलीमेट्री लॉगर",
      logPlaceholder: "उदा. प्रवाह दर 18 L/min",
      button: "रीडिंग दर्ज करें",
      telemetryLabel: "टेलीमेट्री लॉगर",
    },
    round3: {
      title: "राउंड 3 · DPR जमा",
      description: "₹3,50,000 अनुदान सीमा के भीतर पारदर्शी खरीद योजना बनाएं।",
      guard: "ऑडिट ट्रेल द्वारा सुरक्षित",
    },
  },
  bom: {
    prefix: "राउंड 3 · DPR जमा",
    title: "लाइव बिल ऑफ मैटेरियल्स",
    subtitle: "₹3,50,000 अनुदान सीमा के भीतर पारदर्शी खरीद योजना बनाएं।",
    upload: "DPR अपलोड करें",
    queued: (name) => `${name} समीक्षा के लिए कतार में है`,
    lineItem: "लाइन आइटम",
    category: "श्रेणी",
    qty: "मात्रा",
    unitCost: "इकाई लागत",
    subtotal: "उप-योग",
    addItem: "लाइन आइटम जोड़ें",
    expanded: "स्टेज 1 स्कोप 24 महीनों तक बढ़ा",
    grantUtilization: "अनुदान उपयोग",
    remaining: (value) => `${value} शेष`,
    overCeiling: (value) => `${value} सीमा से अधिक`,
    within: "स्वीकृत अनुदान सीमा के भीतर।",
    over: "DPR जमा करने से पहले मात्रा या इकाई लागत कम करें।",
    save: "राँची रक्षा के लिए DPR और BOM सेव करें",
    saved: "DPR और BOM रक्षा के लिए सेव हो गए",
  },
  credits: {
    prefix: "NEP 2020 · शैक्षणिक क्रेडिट बैंकिंग",
    title: "NCrF सत्यापित प्रोजेक्ट क्रेडिट",
    subtitle: "अनुमोदित हैकाथॉन कार्य को ट्रेस करने योग्य विद्यार्थी APAAR / DigiLocker ट्रांसक्रिप्ट प्रविष्टि में बदलें।",
    badge: "फैकल्टी सत्यापित",
    calculatorTitle: "नेशनल क्रेडिट फ्रेमवर्क कैलकुलेटर",
    calculatorText: "30 सत्यापित प्रोजेक्ट वर्कआउर्स = 1 शैक्षणिक क्रेडिट। केवल फैकल्टी-अनुमोदित घंटे जमा किए जा सकते हैं।",
    label: "सत्यापित प्रोजेक्ट काम के घंटे",
    hours: "घंटे",
    creditsToDeposit: "जमा करने योग्य क्रेडिट",
    deposit: "सत्यापित क्रेडिट जमा करें",
    queued: (credits) => `${credits} क्रेडिट APAAR / DigiLocker में कतार में हैं`,
    unlock: (minutes) => `एक क्रेडिट खोलने के लिए ${minutes} और सत्यापित घंटे जोड़ें।`,
    scholarTitle: "पीएचडी रिसर्च स्कॉलर सह-एंकर",
    scholarText: "एक नामित शोध छात्र Untergraduate टीम का सह-एंकर है और फील्ड प्रोजेक्ट के दौरान परीक्षा निरंतरता सुरक्षित रखता है।",
    scholarBadge: "परीक्षा निरंतरता सुरक्षित",
    facultyTitle: "फैकल्टी पीआई · कैरियर एडेवांसमेंट स्कीम",
    facultyText: "सत्यापित प्रोजेक्ट पर्यवेक्षण और सार्वजनिक प्रभाव डेटा फैकल्टी पोर्टफोलियो में योगदान देता है।",
    facultyPoints: "10 UGC-CAS API अंक",
  },
  labExchange: {
    prefix: "अंतर-विश्वविद्यालय सुविधा आदान-प्रदान",
    title: "केन्द्रीय इंस्ट्रूमेंट बुकिंग ग्रिड",
    subtitle: "झारखंड के साझेदार संस्थानों में सत्यापित कैरेक्टराइज़ेशन समय आरक्षित करें।",
    badge: "ऑडिट ट्रेल के साथ साझा",
    partnerBadge: "NABL साझेदार",
    available: "उपलब्ध परीक्षण स्लॉट",
    bookingRequest: (instrument, slot) => `बुकिंग अनुरोध कतार में: ${instrument} · ${slot}`,
    pending: "संस्थान की पुष्टि लंबित",
  },
  escalation: {
    prefix: "शून्य-बिड शासन · ADR एस्केलेशन नियंत्रण",
    title: "चार-स्टेज एस्केलेशन पथ",
    subtitle: "एक पारदर्शी रिकवरी रूट सार्वजनिक धन की रक्षा करता है जब सत्यापित चुनौती को कोई बिड नहीं मिलता।",
    badge: "शून्य-बिड ट्रिगर मॉनिटर किया जा रहा है",
    stageSummary: "वर्तमान एस्केलेशन स्टेज",
    nextAction: "अगला कदम: निर्णय लॉग प्रकाशित करें और योग्य संस्थानों को सूचित करें।",
    rulesTitle: "एंटी-स्पेकुलेशन नियम",
    acknowledgement: "मैंने शून्य-बिड केस आगे बढ़ाने से पहले एस्केलेशन नियंत्रणों की समीक्षा की है।",
    acknowledged: "शासन स्वीकृति इस सत्र के लिए दर्ज की गई।",
    stages: {
      one: { title: "स्टेट-वाइड री-बिड", detail: "झारखंड भर में चुनौती को +25% बजट और दस्तावेजित स्कोप विस्तार के साथ फिर से खोलें।" },
      two: { title: "ITI / पॉलीटेक्निक रास्ता", detail: "व्यावहारिक, लागू कार्य को राज्य ITI और पॉलीटेक्निक में भेजें।" },
      three: { title: "स्टेट मांडेट", detail: "DHTE राज्य मांडेट जारी करता है जब संस्थागत मार्गों के बाद भी समस्या अनसुलझी रहती है।" },
      four: { title: "पैन-इंडिया नैशनल हैकाथॉन", detail: "सत्यापित चुनौती को पूरे साक्ष्य, निर्णय लॉग और अनुदान संदर्भ के साथ राष्ट्रीय स्तर पर प्रकाशित करें।" },
    },
    rules: [
      "कोई स्पेकुलेटिव बिड नहीं: शून्य-बिड चुनौती को कभी भी शांतिपूर्वक किसी टीम को नहीं सौंपा जाता है।",
      "हर एस्केलेशन पर मूल समस्या कथन और साक्ष्य ट्रेल सुरक्षित रखें।",
      "बिड फिर से खोलने से पहले कोई संशोधित बजट, स्कोप या पात्रता मानदंड प्रकाशित करें।",
      "हर एस्केलेशन निर्णय के लिए कारण, अनुमोदन अधिकारी और टाइमस्टैम्प रिकॉर्ड करें।",
      "अनसुलझी चुनौतियों को बिना निपटारे बंद किए सार्वजनिक दृश्यता में लौटाएँ।",
    ],
  },
};
const n = (s: string) => num(s, "sat");
const sat: Strings = {
  back: "← ᱱᱟᱜᱚᱨᱤᱠ ᱯᱳᱨᱴᱟᱞ ᱛᱮ ᱨᱩᱣᱟᱹᱲ ᱢᱮ",
  portalTitle: "ᱵᱤᱥᱣᱵᱤᱫᱟᱞᱚᱭ ᱯᱚᱨᱴᱟᱞ",
  univName: "ᱵᱤᱨᱞᱟ ᱴᱮᱠᱱᱚᱞᱚᱡᱤ ᱤᱱᱥᱴᱤᱪᱩᱴ (ᱵᱤᱟᱭᱴᱤ), ᱢᱮᱥᱨᱟ",
  verifiedLabs: "ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱞᱮᱵ",
  labNabl: "🔬 ᱮᱱ.ᱮ.ᱵᱤ.ᱮᱞ. ᱨᱚᱥᱟᱭᱚᱱ ᱟᱨ ᱫᱟᱜ ᱡᱟᱹᱪ ᱞᱮᱵ",
  labNano: "⚡ ᱱᱮᱱᱚᱢᱮᱴᱟᱨᱤᱭᱟᱞ ᱟᱨ ᱥᱳᱨᱵᱮᱱᱴ ᱨᱤᱥᱟᱨᱪ ᱥᱮᱱᱴᱟᱨ",
  grants: `₹${n("14,50,000")} ᱪᱟᱹᱞᱩ ᱨᱟᱡᱽ ᱟᱨ ᱥᱤ.ᱮᱥ.ᱟᱨ. ᱮᱥᱠᱨᱳ ᱯᱩᱞ`,
  hScore: `ᱥᱚᱸᱥᱛᱷᱟᱜᱮᱭᱟᱜ ᱞᱟᱹᱠᱛᱤ (ᱮᱪ-ᱥᱠᱳᱨ): ${n("95/100")} (ᱥᱟᱯᱷᱟ ᱨᱮᱠᱚᱨᱰ)`,
  feedTitle: "ᱮ.ᱟᱭ. ᱢᱤᱞᱟᱹᱣ ᱟᱠᱟᱱ ᱪᱮᱞᱮᱱᱡ",
  challengeTitle: "ᱯᱟᱞᱟᱢᱩ ᱡᱤᱞᱟ ᱨᱮ ᱡᱚᱢᱤᱱ ᱛᱟᱞᱟ ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱠᱟᱹᱢᱤ",
  countdown: (d, h) => `⏱️ ${d} ᱥᱤᱱ, ${h} ᱜᱷᱚᱸᱴᱟ ᱠᱚ ᱢᱟᱱᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱵᱟᱠᱤ` ,
  countdownExpired: "⏱️ ᱢᱟᱱᱟᱣ ᱦᱚᱨᱟ ᱪᱟᱵᱟ ᱦᱩᱭ ᱠᱟᱱᱟ",
  budgetLabel: "ᱜᱨᱟᱱᱴ ᱵᱚᱡᱮᱴ ᱨᱮᱭᱟᱜ ᱥᱤᱢᱟ",
  budgetValue: `₹${n("3,50,000")} (ᱰᱤ.ᱮᱪ.ᱴᱤ.ᱤ. ᱨᱟᱡᱽ ᱱᱟᱣᱟ ᱯᱩᱞ + ᱴᱟᱴᱟ ᱥᱴᱤᱞ ᱥᱤ.ᱮᱥ.ᱟᱨ. ${n("1:1")} ᱢᱮᱪᱤᱝ ᱜᱨᱟᱱᱴ)`,
  advantage: `⚡ ᱨᱟᱣᱩᱱᱰ ${n("1")} ᱨᱮᱭᱟᱜ ᱵᱟᱭᱰᱟ: ᱥᱳᱡᱷᱮ ᱮᱠᱟᱠᱤ ᱵᱚᱴᱚᱱ (ᱠᱚᱢᱯᱮᱴᱤᱥᱚᱱ ᱵᱟᱝ)᱾ ᱵᱟᱭ ᱫᱚ ᱱᱚᱶᱟ ᱪᱮᱞᱮᱱᱡ ᱫᱚ ᱡᱷᱟᱨᱠᱷᱚᱱᱰ ᱨᱮᱭᱟᱜ ᱡᱚᱛᱚ ${n("42")}+ ᱮᱪ.ᱤ.ᱟᱭ. ᱛᱮ ᱡᱷᱟᱲ ᱠᱚᱢᱯᱮᱴᱤᱥᱚᱱ ᱨᱮ ᱟᱹᱛᱩ ᱛᱮᱭᱟᱭ ᱾`,
  accept: "ᱮᱠᱟᱠᱤ ᱪᱮᱞᱮᱱᱡ ᱢᱟᱱᱟᱣ ᱟᱨ ᱴᱤᱢ ᱵᱮᱱᱟᱣ ᱢᱮ",
  consortium: "ᱡᱩᱛ ᱠᱚᱱᱥᱚᱨᱴᱤᱭᱟᱢ ᱯᱨᱚᱥᱛᱟᱵ ᱢᱮ",
  close: "ᱵᱚᱸᱫᱚ ᱢᱮ",
  cancel: "ᱵᱟᱛᱤᱞ ᱢᱮ",
  solo: {
    title: "ᱮᱠᱟᱠᱤ ᱪᱮᱞᱮᱱᱡ ᱢᱟᱱᱟᱣ ᱟᱨ ᱴᱤᱢ ᱵᱮᱱᱟᱣ ᱢᱮ",
    intro: "ᱟᱢᱟᱜ ᱯᱷᱮᱠᱟᱞᱴᱤ ᱯᱤ.ᱟᱭ. ᱟᱨ ᱯᱮᱴ ᱪᱮᱛ ᱪᱮᱞᱮᱱᱡ ᱨᱮ ᱠᱟᱹᱢᱤ ᱮᱦᱚᱵ ᱠᱟᱱ ᱯᱩᱱ ᱡᱚᱱ ᱪᱷᱟᱛᱨᱚ ᱨᱮᱭᱟᱜ ᱠᱷᱚᱵᱚᱨ ᱮᱢ ᱢᱮ ᱾",
    facultyLabel: "ᱯᱷᱮᱠᱟᱞᱴᱤ ᱯᱤ.ᱟᱭ.",
    facultyPlaceholder: "ᱯᱨᱟᱱ ᱟᱱᱩᱥᱚᱸᱫᱷᱟᱱᱠᱟᱨᱤ ᱨᱮᱭᱟᱜ ᱡᱚᱛᱚ ᱧᱤᱛᱩ",
    studentLabel: (k) => `ᱪᱷᱟᱛᱨᱚ ${k} ᱨᱮᱭᱟᱜ ᱟᱭ.ᱰᱤ.`,
    studentHint: `${n("12")} ᱟᱠᱷᱟᱨ ᱨᱮᱭᱟᱜ ᱟᱯᱟᱨ ᱟᱭ.ᱰᱤ.`,
    errRequired: "ᱱᱚᱶᱟ ᱫᱚ ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱾",
    errId: `ᱴᱷᱤᱠ ${n("12")} ᱟᱠᱷᱟᱨ ᱨᱮᱭᱟᱜ ᱟᱯᱟᱨ ᱟᱭ.ᱰᱤ. ᱚᱞ ᱢᱮ ᱾`,
    confirm: "ᱴᱷᱤᱠ ᱢᱮ ᱟᱨ ᱢᱟᱱᱟᱣ ᱢᱮ",
    doneTitle: "ᱪᱮᱞᱮᱱᱡ ᱢᱟᱱᱟᱣ ᱦᱩᱭ ᱮᱱᱟ",
    doneBody: "ᱟᱢᱟᱜ ᱴᱤᱢ #JAG-PLM-0082 ᱞᱟᱹᱜᱤᱫ ᱚᱞ ᱦᱩᱭ ᱮᱱᱟ ᱾ ᱟᱢᱟᱜ ᱥᱚᱸᱥᱛᱷᱟ ᱞᱟᱹᱜᱤᱫ ᱥᱳᱡᱷᱮ ᱮᱠᱟᱠᱤ ᱵᱚᱴᱚᱱ ᱴᱷᱤᱠ ᱠᱟᱱᱟ ᱾",
  },
  cons: {
    title: "ᱡᱩᱛ ᱠᱚᱱᱥᱚᱨᱴᱤᱭᱟᱢ ᱯᱨᱚᱥᱛᱟᱵ ᱢᱮ",
    intro: "ᱥᱟᱹᱦᱤ ᱥᱚᱸᱥᱛᱷᱟ ᱚᱪᱚ ᱢᱮ ᱟᱨ ᱠᱟᱹᱢᱤ ᱫᱚ ᱪᱮᱫ ᱞᱮᱠᱟ ᱵᱟᱷᱟᱨᱟ ᱠᱟᱛᱮ ᱾",
    partnerLabel: "ᱥᱟᱹᱦᱤ ᱥᱚᱸᱥᱛᱷᱟ",
    partners: ["ᱵᱤᱨᱥᱟ ᱠᱨᱤᱥᱤ ᱵᱤᱥᱣᱵᱤᱫᱟᱞᱚᱭ", "ᱮᱱ.ᱟᱭ.ᱴᱤ. ᱡᱟᱢᱥᱮᱫᱯᱩᱨ", "ᱨᱟᱸᱪᱤ ᱵᱤᱥᱣᱵᱤᱫᱟᱞᱚᱭ"],
    shareLabel: "ᱵᱤᱟᱭᱴᱤ ᱢᱮᱥᱨᱟ ᱨᱮᱭᱟᱜ ᱠᱟᱹᱢᱤ ᱦᱤᱥᱟ (%)",
    partnerShare: (p) => `ᱥᱟᱹᱦᱤ ᱨᱮᱭᱟᱜ ᱠᱟᱹᱢᱤ ᱦᱤᱥᱟ: ${p}%`,
    errPartner: "ᱥᱟᱹᱦᱤ ᱥᱚᱸᱥᱛᱷᱟ ᱚᱪᱚ ᱢᱮ ᱾",
    confirm: "ᱠᱚᱱᱥᱚᱨᱴᱤᱭᱟᱢ ᱯᱨᱚᱥᱛᱟᱵ ᱛᱮᱭᱟᱨ ᱢᱮ",
    doneTitle: "ᱯᱨᱚᱥᱛᱟᱵ ᱛᱮᱭᱟᱨ ᱦᱩᱭ ᱮᱱᱟ",
    doneBody: (p) => `ᱟᱢᱟᱜ ᱡᱩᱛ ᱯᱨᱚᱥᱛᱟᱵ ${p} ᱥᱮᱫ ᱴᱷᱤᱠ ᱞᱟᱹᱜᱤᱫ ᱪᱟᱞᱟᱜ ᱦᱩᱭ ᱮᱱᱟ ᱾`,
  },
  xai: {
    title: "ᱮ.ᱟᱭ. ᱪᱮᱫᱟᱛᱮ ᱟᱢᱟᱜ ᱠᱮᱢᱯᱟᱥ ᱚᱪᱚ ᱮᱱᱟ",
    axes: [
      { label: "ᱞᱮᱵ ᱟᱨ ᱵᱮᱵᱚᱥᱛᱷᱟ", short: "ᱞᱮᱵ", detail: "ᱮᱱ.ᱮ.ᱵᱤ.ᱮᱞ. ᱯᱚᱛᱷᱚᱨ ᱟᱠᱟᱱ ᱫᱟᱜ ᱞᱮᱵ" },
      { label: "ᱯᱮᱴᱮᱱᱴ ᱟᱨ ᱵᱩᱫᱷᱤ ᱥᱚᱢᱯᱚᱛᱤ", short: "ᱯᱮᱴᱮᱱᱴ", detail: `ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱥᱳᱨᱵᱮᱱᱴ ᱨᱮᱭᱟᱜ ${n("4")} ᱯᱮᱴᱮᱱᱴ` },
      { label: "ᱡᱟᱭᱜᱟ ᱨᱮᱭᱟᱜ ᱡᱟᱱᱟᱹᱛ", short: "ᱡᱟᱱᱟᱹᱛ", detail: `ᱯᱟᱞᱟᱢᱩ ᱵᱮᱥᱤᱱ ᱠᱷᱚᱱ ${n("140")} ᱠᱤ.ᱢᱤ. ᱠᱚᱢ` },
      { label: "ᱟᱥᱟᱜ ᱠᱟᱹᱢᱤ ᱨᱮᱭᱟᱜ ᱨᱮᱠᱚᱨᱰ", short: "ᱨᱮᱠᱚᱨᱰ", detail: `${n("8")} ᱯᱟᱭᱞᱚᱴ ᱨᱮ ${n("94")}% ᱠᱚᱨᱚᱢ ᱯᱟᱥ` },
      { label: "ᱯᱷᱮᱠᱟᱞᱴᱤ ᱨᱮᱭᱟᱜ ᱪᱮᱫ ᱦᱚᱪᱚ", short: "ᱯᱷᱮᱠᱟᱞᱴᱤ", detail: "ᱰᱟ. ᱟᱨ. ᱵᱟᱨᱢᱟ ᱨᱮᱭᱟᱜ ᱚᱞ ᱥᱟᱶ ᱢᱤᱞᱟᱹᱣ" },
    ],
    weightLabel: (w) => `ᱵᱷᱟᱨ ${w}`,
    scoreLabel: "ᱮᱴᱠᱮᱴ",
    overallBadge: (p) => `${p}% ᱢᱤᱞᱟᱹᱣ`,
    explainTitle: "ᱱᱚᱶᱟ ᱮᱴᱠᱮᱴ ᱪᱮᱫ ᱞᱮᱠᱟ ᱟᱨᱦᱚᱸ",
    explain: `ᱫᱚᱦᱚ ᱢᱤᱞᱟᱹᱣ ᱮᱱᱟ ᱚᱠᱛᱮ ᱠᱮᱢᱯᱟᱥ ᱨᱮᱭᱟᱜ ᱮᱱ.ᱮ.ᱵᱤ.ᱮᱞ. ᱞᱮᱵ ᱫᱚ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱡᱟᱹᱪ ᱠᱟᱹᱢᱤ ᱨᱮ ᱜᱚᱲᱚ ᱮᱢᱚᱜᱼᱟ, ᱯᱷᱮᱠᱟᱞᱴᱤ ᱥᱟᱶ ${n("4")} ᱥᱳᱨᱵᱮᱱᱴ ᱯᱮᱴᱮᱱᱴ ᱢᱮᱱᱟᱜᱼᱟ, ᱵᱤᱵᱷᱟᱜ ᱨᱮᱭᱟᱜ ᱵᱟᱠᱤ ᱯᱨᱚᱡᱮᱠᱴ ᱠᱷᱚᱢᱛᱟ ${n("62")}% ᱠᱟᱱᱟ, ᱟᱨ ${n("8")} ᱨᱟᱡᱽ ᱯᱟᱭᱞᱚᱴ ᱨᱮ ᱟᱥᱟᱜ ᱥᱟᱯᱷᱟᱞᱤᱭᱟᱹ ᱦᱚᱨ ${n("94")}% ᱠᱟᱱᱟ ᱾`,
  },
  workspace: {
    eyebrow: "ᱵᱤᱥᱣᱵᱤᱫᱟᱞᱚᱭ HEI ᱠᱟᱹᱢᱤ ᱚᱠᱟᱨ",
    title: "ᱰᱟᱭᱱᱟᱢᱤᱠ ᱦᱮᱠᱟᱛᱷᱚᱱ ᱣᱚᱨᱠᱥᱯᱮᱥ",
    subtitle: "ᱢᱤᱫ ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱜᱟᱢ ᱪᱮᱞᱮᱱᱡ ᱠᱚ ᱫᱚ ᱠᱷᱟᱛᱟᱡᱮ ᱠᱟᱹᱢᱤ ᱫᱚ ᱮᱠᱟᱠᱤ ᱰᱤ.ᱯᱤ.ᱟᱨ. ᱛᱮ ᱫᱚᱦᱚ ᱢᱮ ᱾",
    audit: "ᱚᱰᱤᱴ ᱴᱨᱮᱞ ᱠᱟᱹᱢᱤ",
    stages: {
      round1: "ᱨᱟᱣᱩᱱᱰ 1: ᱟᱭᱰᱤᱭᱟᱞᱤᱡᱟᱱ ᱟᱨ ᱯᱤᱪᱷ",
      round1Detail: "14 ᱥᱤᱱ",
      round2: "ᱨᱟᱣᱩᱱᱰ 2: ᱢᱮᱱᱴᱚᱨᱤᱝ ᱟᱨ ᱵᱮᱱᱪ ᱴᱮᱥᱴ",
      round2Detail: "21 ᱥᱤᱱ",
      round3: "ᱨᱟᱣᱩᱱᱰ 3: DPR ᱟᱨ ᱨᱟᱸᱪᱤ ᱰᱤᱯᱮᱱᱥ",
      round3Detail: "7 ᱥᱤᱱ",
    },
    round1: {
      prefix: "ᱨᱟᱣᱩᱱᱰ 1 · ᱥᱚᱨᱴᱞᱤᱥᱴ ᱮᱱᱴᱨᱤ",
      title: "ᱯᱤᱪᱷ ᱰᱮᱠ ᱟᱨ ᱯᱨᱟᱨᱟᱝᱜᱤᱛ BOM",
      upload: "ᱯᱤᱪᱷ ᱰᱮᱠ PDF ᱟᱫᱮᱢ ᱢᱮ",
      uploadMeta: "ᱟᱞᱚᱢᱟᱜ 5 ᱥᱞᱟᱭᱰ, 10 MB",
      ready: "ᱥᱤᱢᱤᱠᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱦᱟᱛᱟᱣ",
      bomTitle: "ᱯᱨᱟᱨᱟᱝᱜᱤᱛ BOM",
      bomValue: "₹1,96,000",
      bomText: "ᱥᱚᱞᱟᱨ ᱯᱟᱢᱯ, ᱥᱮᱱᱥᱚᱨ, ᱮᱱᱠᱞᱚᱡᱷᱟᱹᱨ ᱟᱨ ᱥᱟᱛᱷᱟᱣ ᱟᱨᱮᱡ ᱥᱯᱟᱨᱥ ᱮᱥᱠᱨᱚ ᱠᱤᱴ ᱠᱩᱞ ᱟᱹᱞᱩᱠᱟᱹ ᱮᱢ ᱮᱱᱟ ᱾",
      submit: "ᱨᱟᱣᱩᱱᱰ 1 ᱯᱤᱪᱷ ᱡᱚᱴᱟᱭ ᱢᱮ",
      submitted: "ᱨᱟᱣᱩᱱᱰ 1 ᱯᱤᱪᱷ ᱡᱚᱴᱟᱭ ᱦᱩᱭ ᱮᱱᱟ",
    },
    round2: {
      mentorLabel: "ᱠᱚᱨᱯᱳᱨᱮᱴ ᱢᱮᱱᱴᱚᱨ",
      mentorName: "ᱰᱟ. ᱮ. ᱥᱮᱱ",
      mentorRole: "ᱴᱟᱴᱟ ᱥᱴᱤᱞ CSR · ᱢᱟᱴᱮᱨᱤᱭᱟᱞ ᱟᱨ ᱯᱷᱤᱞᱰ ᱰᱤᱯᱞᱚᱭᱢᱮᱱᱴ",
      reviewTitle: "ᱟᱞᱚᱢ ᱥᱤᱢᱤᱠᱟᱹ",
      reviewText: "ᱵᱮᱱᱪ-ᱴᱮᱥᱴ ᱥᱟᱠᱷᱤᱭᱟ ᱟᱨ ᱯᱟᱹᱞᱟᱹᱫᱤ ᱞᱚᱜ ᱫᱚ ᱢᱮᱱᱴᱚᱨᱤᱝ ᱜᱮᱴ ᱠᱷᱚᱱ ᱢᱟᱱᱟᱣ ᱠᱟᱱᱟ ᱾",
      message: "ᱢᱮᱱᱴᱚᱨ ᱠᱚ ᱢᱮᱥᱮᱡ ᱢᱮ",
      allowanceLabel: "ᱥᱚᱨᱴᱞᱤᱥᱴ ᱴᱤᱢ ᱟᱞᱩᱠᱟᱱᱥ",
      allowanceTitle: "ᱥᱤᱰ ᱟᱞᱩᱠᱟᱱᱥ ᱴᱨᱮᱠᱚᱨ",
      cap: "/ ₹20,000 ᱥᱤᱢᱟ",
      recordSpend: "₹1,000 ᱡᱷᱚᱜ ᱫᱟᱹᱨᱠ ᱢᱮ",
      remaining: (value) => `${value} ᱵᱟᱠᱤ`,
      loggerTitle: "ᱴᱮᱞᱮᱢᱮᱴᱨᱤ ᱞᱚᱜᱟᱨ",
      logPlaceholder: "ᱡᱮᱟᱫᱤ. ᱢᱟᱦᱟᱜ ᱠᱷᱟᱱ 18 L/min",
      button: "ᱨᱮᱰᱤᱝ ᱫᱟᱹᱨᱠ ᱢᱮ",
      telemetryLabel: "ᱴᱮᱞᱮᱢᱮᱴᱨᱤ ᱞᱚᱜᱟᱨ",
    },
    round3: {
      title: "ᱨᱟᱣᱩᱱᱰ 3 · DPR ᱡᱚᱴᱟᱭ",
      description: "₹3,50,000 ᱟᱱᱩᱫᱟᱱ ᱥᱤᱢᱟ ᱨᱮ ᱯᱟᱨᱫᱚᱨᱥᱤ ᱠᱤᱨᱮᱱ ᱠᱤ ᱵᱮᱱᱟᱜ ᱢᱮ ᱾",
      guard: "ᱚᱰᱤᱴ ᱴᱨᱮᱞ ᱫᱚ ᱥᱟᱞᱟᱜ ᱠᱟᱱᱟ",
    },
  },
  bom: {
    prefix: "ᱨᱟᱣᱩᱱᱰ 3 · DPR ᱡᱚᱴᱟᱭ",
    title: "ᱞᱟᱭᱣ ᱵᱤᱞ ᱚᱯ ᱢᱮᱴᱮᱨᱤᱟᱞᱥ",
    subtitle: "₹3,50,000 ᱟᱱᱩᱫᱟᱱ ᱥᱤᱢᱟ ᱨᱮ ᱯᱟᱨᱫᱚᱨᱥᱤ ᱠᱤᱨᱮᱱ ᱠᱤ ᱵᱮᱱᱟᱜ ᱢᱮ ᱾",
    upload: "DPR ᱟᱫᱮᱢ ᱢᱮ",
    queued: (name) => `${name} ᱥᱤᱢᱤᱠᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱠᱟᱴᱟᱨ ᱨᱮ ᱠᱟᱱᱟ`,
    lineItem: "ᱞᱟᱭᱤᱱ ᱟᱭᱴᱮᱢ",
    category: "ᱥᱚᱨᱠ",
    qty: "ᱢᱟᱫᱟᱜ",
    unitCost: "ᱤᱠᱚᱱᱤ ᱠᱚᱥᱴ",
    subtotal: "ᱠᱚᱞᱡ",
    addItem: "ᱞᱟᱭᱤᱱ ᱟᱭᱴᱮᱢ ᱥᱮᱞᱮᱫ ᱢᱮ",
    expanded: "ᱥᱴᱮᱡ 1 ᱥᱠᱚᱯ 24 ᱢᱟᱦᱟᱸ ᱛᱮ ᱵᱟᱫᱟᱭ ᱦᱩᱭ ᱮᱱᱟ",
    grantUtilization: "ᱟᱱᱩᱫᱟᱱ ᱵᱮᱵᱷᱟᱨ",
    remaining: (value) => `${value} ᱵᱟᱠᱤ`,
    overCeiling: (value) => `${value} ᱥᱤᱢᱟ ᱠᱷᱚᱱ ᱵᱟᱫᱟᱭ`,
    within: "ᱥᱚᱫᱚᱦᱤ ᱟᱱᱩᱫᱟᱱ ᱥᱤᱢᱟ ᱨᱮᱭᱟᱜ ᱞᱟᱹᱠᱛᱤ ᱨᱮ ᱾",
    over: "DPR ᱡᱚᱴᱟᱭ ᱢᱮ ᱠᱷᱚᱱ ᱢᱟᱫᱟᱜ ᱟᱨ ᱤᱠᱚᱱᱤ ᱠᱚᱥᱴ ᱠᱚ ᱠᱚᱢ ᱢᱮ ᱾",
    save: "ᱨᱟᱸᱪᱤ ᱰᱤᱯᱮᱱᱥ ᱞᱟᱹᱜᱤᱫ DPR ᱟᱨ BOM ᱥᱮᱵ ᱢᱮ",
    saved: "DPR ᱟᱨ BOM ᱰᱤᱯᱮᱱᱥ ᱞᱟᱹᱜᱤᱫ ᱥᱮᱵ ᱦᱩᱭ ᱮᱱᱟ",
  },
  credits: {
    prefix: "NEP 2020 · ᱥᱟᱪᱷᱟᱠᱤᱠ ᱠᱨᱮᱰᱤᱴ ᱵᱮᱝᱠᱤᱝ",
    title: "NCrF ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱯᱨᱚᱡᱮᱠᱴ ᱠᱨᱮᱰᱤᱴ",
    subtitle: "ᱟᱱᱩᱢᱚᱰᱤᱴ ᱦᱮᱠᱟᱛᱷᱚᱱ ᱠᱟᱹᱢᱤ ᱠᱚ ᱴᱨᱮᱥ ᱠᱚᱟᱲᱟᱜ ᱵᱟᱹᱱᱫᱮ ᱠᱚ ᱧᱮᱞ ᱢᱮ ᱾",
    badge: "ᱯᱷᱮᱠᱟᱞᱴᱤ ᱡᱟᱹᱪ ᱟᱠᱟᱱ",
    calculatorTitle: "ᱱᱟᱴᱤᱭᱚᱱᱟᱞ ᱠᱨᱮᱰᱤᱴ ᱯᱨᱟᱹᱢᱤ ᱠᱟᱞᱠᱩᱞᱮᱴᱚᱨ",
    calculatorText: "30 ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱯᱨᱚᱡᱮᱠᱴ ᱠᱟᱹᱢᱤ = 1 ᱥᱟᱪᱷᱟᱠᱤᱠ ᱠᱨᱮᱰᱤᱴ ᱾ ᱠᱷᱟᱹᱞᱤ ᱯᱷᱮᱠᱟᱞᱴᱤ-ᱟᱱᱚᱢᱚᱰᱤᱴ ᱜᱚᱲ ᱠᱷᱚᱸ ᱠᱷᱚᱫᱚᱨ ᱠᱟᱱᱟ ᱾",
    label: "ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱯᱨᱚᱡᱮᱠᱴ ᱠᱟᱹᱢᱤ ᱜᱷᱚᱸᱴᱟ",
    hours: "ᱜᱷᱚᱸᱴᱟ",
    creditsToDeposit: "ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱠᱨᱮᱰᱤᱴ",
    deposit: "ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱠᱨᱮᱰᱤᱴ ᱡᱚᱴᱟᱭ ᱢᱮ",
    queued: (credits) => `${credits} ᱠᱨᱮᱰᱤᱴ APAAR / DigiLocker ᱨᱮ ᱠᱟᱴᱟᱨ ᱨᱮ ᱠᱟᱱᱟ`,
    unlock: (minutes) => `ᱢᱤᱫ ᱠᱨᱮᱰᱤᱴ ᱡᱷᱤᱡ ᱞᱟᱹᱜᱤᱫ ${minutes} ᱟᱨ ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱜᱷᱚᱸᱴᱟ ᱥᱮᱞᱮᱫ ᱢᱮ ᱾`,
    scholarTitle: "ᱯᱷᱟᱭ.ᱰᱤ.ᱚ. ᱨᱤᱥᱟᱨᱪ ᱥᱠᱚᱞᱟᱨ ᱥᱚᱦ-ᱮᱱᱠᱚᱨ",
    scholarText: "ᱢᱤᱫ ᱱᱟᱢᱤᱭᱟᱠ ᱨᱤᱥᱟᱨᱪ ᱪᱟᱹᱛᱫᱤ ᱴᱮᱢ ᱨᱮᱱ ᱥᱚᱦ-ᱮᱱᱠᱚᱨ ᱠᱟᱹᱢᱤ ᱠᱟᱱᱟ ᱟᱨ ᱯᱷᱤᱞᱰ ᱯᱨᱚᱡᱮᱠᱴ ᱨᱮᱭᱟᱜ ᱠᱷᱚᱱ ᱨᱟᱹᱨᱤᱡᱽ ᱡᱟᱹᱪ ᱠᱟᱹᱢᱤ ᱠᱟᱱᱟ ᱾",
    scholarBadge: "ᱯᱨᱤᱱᱟᱹᱠ ᱠᱟᱹᱢᱤ ᱡᱟᱹᱪ ᱟᱠᱟᱱ",
    facultyTitle: "ᱯᱷᱮᱠᱟᱞᱴᱤ PI · ᱠᱟᱨᱤᱭᱟᱨ ᱟᱫᱟᱠᱟᱴᱤ ᱥᱠᱤᱢ",
    facultyText: "ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱯᱨᱚᱡᱮᱠᱴ ᱠᱟᱹᱢᱤ ᱟᱨ ᱫᱚᱦᱚ ᱠᱟᱹᱢᱤ ᱰᱟᱴᱟ ᱯᱷᱮᱠᱟᱞᱴᱤ ᱯᱳᱨᱴᱯᱳᱞᱤᱭᱚ ᱨᱮ ᱥᱟᱺᱤᱡ ᱠᱟᱱᱟ ᱾",
    facultyPoints: "10 UGC-CAS API ᱟᱠᱷᱟᱨ",
  },
  labExchange: {
    prefix: "ᱟᱱᱴᱟᱨ-ᱵᱤᱥᱣᱵᱤᱫᱟᱞᱚᱭ ᱠᱟᱹᱢᱤ ᱠᱟᱨᱮᱵᱚᱨ",
    title: "ᱠᱮᱱᱴᱨᱟᱞ ᱤᱱᱥᱴᱨᱩᱢᱮᱱᱴ ᱵᱩᱠᱤᱝ ᱜᱽᱨᱤᱰ",
    subtitle: "ᱡᱷᱟᱨᱠᱷᱟᱱᱰ ᱥᱟᱹᱦᱤ ᱥᱚᱸᱥᱛᱷᱟ ᱠᱚ ᱨᱮ ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱠᱚᱨᱠᱟᱠᱴᱮᱨ ᱡᱟᱹᱜᱤᱫ ᱢᱮ ᱾",
    badge: "ᱚᱰᱤᱴ ᱴᱨᱮᱞ ᱥᱟᱶ ᱥᱟᱞᱟᱜ",
    partnerBadge: "NABL ᱥᱟᱹᱦᱤ",
    available: "ᱩᱯᱞᱟᱹᱣ ᱴᱮᱥᱴᱤᱝ ᱥᱞᱚᱴ",
    bookingRequest: (instrument, slot) => `ᱵᱩᱠᱤᱝ ᱟᱫᱮᱢ: ${instrument} · ${slot}`,
    pending: "ᱥᱚᱸᱥᱛᱷᱟ ᱫᱟᱹᱨᱠ ᱠᱷᱚᱵᱚᱨ ᱥᱟᱹᱛᱫᱤ",
  },
  escalation: {
    prefix: "ᱡᱩᱠᱟᱹᱜ ᱵᱤᱰ ᱥᱟᱫᱷᱟᱨᱤ · ADR ᱮᱥᱠᱟᱞᱮᱥᱚᱱ ᱠᱚᱱᱴᱨᱳᱞ",
    title: "ᱠᱟᱹᱨ ᱥᱴᱮᱡ ᱮᱥᱠᱟᱞᱮᱥᱚᱱ ᱢᱟᱨᱜ",
    subtitle: "ᱢᱤᱫ ᱯᱟᱨᱫᱚᱨᱥᱤ ᱠᱤ ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱪᱮᱞᱮᱱᱡ ᱠᱚ ᱡᱚᱴᱟᱭ ᱵᱟᱝ ᱦᱩᱭ ᱠᱟᱱᱟ ᱨᱮ ᱫᱚ ᱠᱷᱟᱹᱞᱤ ᱟᱱᱩᱫᱟᱱ ᱠᱟᱹᱢᱤ ᱡᱟᱫᱮᱞ ᱠᱟᱱᱟ ᱾",
    badge: "ᱡᱩᱠᱟᱹᱜ-ᱵᱤᱰ ᱴᱨᱤᱜᱚᱨ ᱢᱳᱱᱤᱴᱚᱨ ᱦᱩᱭ ᱠᱟᱱᱟ",
    stageSummary: "ᱵᱟᱲᱟᱣ ᱮᱥᱠᱟᱞᱮᱥᱚᱱ ᱥᱴᱮᱡ",
    nextAction: "ᱟᱞᱚᱢ ᱠᱟᱹᱢᱤ: ᱠᱟᱹᱢᱤ ᱞᱚᱜ ᱪᱷᱟᱠᱟᱸ ᱟᱨ ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱥᱚᱸᱥᱛᱷᱟ ᱠᱚ ᱟᱹᱨᱥᱤ ᱢᱮ ᱾",
    rulesTitle: "ᱮᱱᱴᱤ-ᱥᱯᱮᱠᱩᱞᱮᱥᱚᱱ ᱱᱤᱭᱚᱢ",
    acknowledgement: "ᱡᱚᱫᱚᱠ ᱥᱟᱫᱷᱟᱨᱤ ᱠᱚ ᱮᱱᱚᱞ ᱨᱮ ᱫᱚ ᱡᱩᱠᱟᱹᱜ-ᱵᱤᱰ ᱠᱮᱥ ᱣᱮᱵᱽ ᱢᱮ ᱾",
    acknowledged: "ᱥᱚᱨᱠᱟᱨ ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱥᱟᱚᱛᱟᱨ ᱱᱚᱶᱟ ᱥᱟᱫᱷᱟᱨᱤ ᱨᱮ ᱨᱮᱠᱚᱰ ᱦᱩᱭ ᱮᱱᱟ ᱾",
    stages: {
      one: { title: "ᱥᱴᱮᱴ-ᱣᱟᱭᱰ ᱨᱤ-ᱵᱤᱰ", detail: "ᱡᱷᱟᱨᱠᱷᱟᱱᱰ ᱢᱤᱫ ᱪᱮᱞᱮᱱᱡ ᱠᱚ ᱠᱷᱟᱹᱞᱤ +25% ᱵᱡᱮᱴ ᱟᱨ ᱰᱚᱠᱩᱢᱮᱱᱴᱮᱰ ᱥᱠᱚᱯ ᱥᱟᱞᱟᱜ ᱱᱤᱭᱟᱨ ᱩᱠᱩᱜ ᱢᱮ ᱾" },
      two: { title: "ITI / ᱯᱚᱞᱤᱴᱮᱠᱱᱤᱠ ᱨᱚᱴ", detail: "ᱵᱮᱵᱷᱟᱨᱤᱠ, ᱠᱟᱜᱩᱱᱤ ᱠᱚ ᱴᱚ ᱣᱟᱨᱮ ᱟᱭ.ᱴᱤ.ᱤ. ᱟᱨ ᱯᱚᱞᱤᱴᱮᱠᱱᱤᱠ ᱨᱮ ᱫᱩᱠᱟᱹᱢ ᱢᱮ ᱾" },
      three: { title: "ᱥᱴᱮᱴ ᱢᱟᱱᱰᱮᱴ", detail: "DHTE ᱥᱴᱮᱴ ᱢᱟᱱᱰᱮᱴ ᱠᱚ ᱡᱚᱫᱚᱠ ᱠᱟᱹᱢᱤ ᱠᱚ ᱫᱚ ᱮᱠᱟᱠᱤ ᱥᱚᱸᱥᱛᱷᱟ ᱠᱚ ᱨᱮ ᱠᱟᱹᱢᱤ ᱩᱫᱩᱢ ᱤᱭᱟᱭ ᱾" },
      four: { title: "ᱯᱮᱱ-ᱤᱱᱰᱤᱭᱟ ᱱᱟᱥᱚᱱᱟᱞ ᱦᱮᱠᱟᱛᱷᱚᱱ", detail: "ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱪᱮᱞᱮᱱᱡ ᱠᱚ ᱟᱡᱟᱜ ᱥᱟᱦᱤ ᱞᱚᱜ, ᱠᱟᱹᱢᱤ ᱞᱚᱜ, ᱟᱨ ᱟᱱᱩᱫᱟᱱ ᱥᱟᱡᱟᱜ ᱥᱟᱶ ᱫᱟᱹᱨᱠ ᱢᱮ ᱾" },
    },
    rules: [
      "ᱠᱩᱱᱟᱹᱣ ᱵᱤᱰ ᱵᱟᱝ: ᱡᱩᱠᱟᱹᱜ-ᱵᱤᱰ ᱪᱮᱞᱮᱱᱡ ᱠᱚ ᱫᱚ ᱠᱩᱥᱤᱭᱟᱭ ᱚᱫᱚᱞ ᱵᱟᱝ ᱦᱩᱭ ᱠᱟᱱᱟ ᱾",
      "ᱢᱩᱞᱟ ᱠᱟᱹᱢᱤ ᱠᱟᱹᱢᱤ ᱟᱨ ᱥᱟᱠᱷᱤᱭᱟ ᱴᱨᱮᱞ ᱠᱚ ᱧᱟᱢ ᱟᱠᱚᱭ ᱢᱮ ᱾",
      "ᱠᱷᱟᱹᱞᱤ ᱨᱤ-ᱩᱯᱮᱱ ᱵᱡᱮᱴ, ᱥᱠᱚᱯ ᱟᱨ ᱠᱟᱹᱢᱤ ᱴᱷᱟᱹᱣ ᱠᱚ ᱨᱟᱹᱦᱤᱠ ᱞᱟᱹᱜᱤᱫ ᱪᱷᱟᱪᱟ ᱢᱮ ᱾",
      "ᱦᱟᱹᱨ ᱮᱥᱠᱟᱞᱮᱥᱚᱱ ᱨᱮ ᱠᱟᱹᱢᱤ, ᱚᱱᱚᱢᱚᱰᱤᱱᱜ ᱠᱟᱹᱢᱤ ᱟᱨ ᱴᱤᱢᱤᱡᱽ ᱨᱮᱠᱚᱰ ᱢᱮ ᱾",
      "ᱟᱱᱥᱩᱞᱟᱹᱫᱤ ᱪᱮᱞᱮᱱᱡ ᱠᱚ ᱫᱚ ᱠᱟᱹᱢᱤ ᱰᱤᱥᱯᱞᱟᱭ ᱨᱮ ᱫᱚᱦᱚ ᱢᱮ ᱾",
    ],
  },
};

export const STRINGS: Record<Lang, Strings> = { en, hi, sat };