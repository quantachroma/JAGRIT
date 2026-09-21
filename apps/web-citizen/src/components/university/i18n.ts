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
};

// ---- Santhali (Ol Chiki) — DRAFT, needs native-speaker review ----
const n = (s: string) => num(s, "sat");

const sat: Strings = {
  back: "← ᱱᱟᱜᱚᱨᱤᱠ ᱯᱚᱨᱴᱟᱞ ᱛᱮ ᱨᱩᱣᱟᱹᱲ ᱢᱮ",
  portalTitle: "ᱵᱤᱥᱣᱵᱤᱫᱟᱞᱚᱭ ᱯᱚᱨᱴᱟᱞ",
  univName: "ᱵᱤᱨᱞᱟ ᱴᱮᱠᱱᱚᱞᱚᱡᱤ ᱤᱱᱥᱴᱤᱪᱩᱴ (ᱵᱤᱟᱭᱴᱤ), ᱢᱮᱥᱨᱟ",
  verifiedLabs: "ᱡᱟᱹᱪ ᱟᱠᱟᱱ ᱞᱮᱵ",
  labNabl: "🔬 ᱮᱱ.ᱮ.ᱵᱤ.ᱮᱞ. ᱨᱚᱥᱟᱭᱚᱱ ᱟᱨ ᱫᱟᱜ ᱡᱟᱹᱪ ᱞᱮᱵ",
  labNano: "⚡ ᱱᱮᱱᱚᱢᱮᱴᱟᱨᱤᱭᱟᱞ ᱟᱨ ᱥᱳᱨᱵᱮᱱᱴ ᱨᱤᱥᱟᱨᱪ ᱥᱮᱱᱴᱟᱨ",
  grants: `₹${n("14,50,000")} ᱪᱟᱹᱞᱩ ᱨᱟᱡᱽ ᱟᱨ ᱥᱤ.ᱮᱥ.ᱟᱨ. ᱮᱥᱠᱨᱳ ᱯᱩᱞ`,
  hScore: `ᱥᱚᱸᱥᱛᱷᱟᱜᱮᱭᱟᱜ ᱞᱟᱹᱠᱛᱤ (ᱮᱪ-ᱥᱠᱳᱨ): ${n("95/100")} (ᱥᱟᱯᱷᱟ ᱨᱮᱠᱚᱨᱰ)`,
  feedTitle: "ᱮ.ᱟᱭ. ᱢᱤᱞᱟᱹᱣ ᱟᱠᱟᱱ ᱪᱮᱞᱮᱱᱡ",
  challengeTitle: "ᱯᱟᱞᱟᱢᱩ ᱡᱤᱞᱟ ᱨᱮ ᱡᱚᱢᱤᱱ ᱛᱟᱞᱟ ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱠᱟᱹᱢᱤ",
  countdown: (d, h) => `⏱️ ᱢᱟᱱᱟᱣ ᱞᱟᱹᱜᱤᱫ ${d} ᱥᱤᱱ, ${h} ᱜᱷᱚᱸᱴᱟ ᱵᱟᱠᱤ`,
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
};

export const STRINGS: Record<Lang, Strings> = { en, hi, sat };