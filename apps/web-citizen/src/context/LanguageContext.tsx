'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type AppLanguage = 'en' | 'hi' | 'sat';

export interface LanguageDictionary {
  appTitle: string;
  appName: string;
  appSubtitle: string;
  tagline: string;
  welcome: string;
  welcomeSubtitle: string;
  enterPortal: string;
  signIn: string;
  register: string;
  quickDemo: string;
  demoAs: { citizen: string; university: string; industry: string; government: string };
  roles: { citizen: string; university: string; industry: string; government: string };
  nav: { home: string; citizen: string; whatsapp: string; university: string; industry: string; government: string; samvaad: string; timeMachine: string; report: string };
  auth: { emailPhone: string; password: string; idProof: string; idNumber: string; campus: string; apaar: string; cin: string; serviceCode: string; janParichay: string; voter: string; aadhaar: string; ration: string; citizenEmail: string; institutionalEmail: string; corporateEmail: string; governmentEmail: string };
  citizen: { reportProblem: string; radar: string; upvote: string; activeIssues: string; resolved: string; escrow: string; search: string; allCategories: string; distance5: string; distance15: string; district: string };
  dashboard: { title: string; subtitle: string; resolved: string; resolvedSub: string; active: string; activeSub: string; escrow: string; escrowSub: string; nearbyTitle: string; nearbySubtitle: string; upvoteBtn: string; upvotedBtn: string; filterAll: string; filterNear: string; reportProblemBtn: string; cards: string; radar: string; range: string };
  aiCopilotBtn: string;
  whatsapp: { online: string; sendVoice: string; recording: string; tapToStop: string; listen: string; verified: string; reset: string; photo: string; location: string; typeMessage: string; typing: string; encrypted: string };
  university: { feed: string; match: string; hackathon: string; bom: string; credits: string };
  industry: { consortium: string; pledge: string; certified: string; mentor: string };
  government: { command: string; total: string; approve: string; reroute: string };
}

const dictionaries: Record<AppLanguage, LanguageDictionary> = {
  en: {
    appTitle: 'JAGRIT',
    appName: 'JAGRIT — Jharkhand Academic & Grassroots Resolution for Innovation and Transformation',
    appSubtitle: 'Jharkhand Academic & Grassroots Resolution for Innovation and Transformation', tagline: 'Grassroots Problems. Academic Solutions.',
    welcome: 'Johar & Namaste • Welcome to JAGRIT — Jharkhand Academic & Grassroots Resolution for Innovation and Transformation Jharkhand',
    welcomeSubtitle: 'Jharkhand Academic & Grassroots Resolution for Innovation and Transformation',
    enterPortal: 'Enter Portal', signIn: 'Sign In', register: 'Register Now', quickDemo: 'Demo Login',
    demoAs: { citizen: 'Citizen Demo', university: 'University Demo', industry: 'Industry Demo', government: 'Government Demo' },
    roles: { citizen: 'Citizen', university: 'University', industry: 'Industry', government: 'Government' },
    nav: { home: 'Home', citizen: 'Citizen Portal', whatsapp: 'WhatsApp Bot', university: 'University Portal', industry: 'Industry CSR', government: 'Government Command', samvaad: 'Samvaad Forum', timeMachine: 'Time Machine', report: 'Report Issue' },
    auth: { emailPhone: 'Email or Phone', password: 'Password', idProof: 'ID Proof', idNumber: 'ID Number', campus: 'Campus', apaar: 'AISHE / APAAR ID', cin: 'Corporate CIN / CSR-1 Registration', serviceCode: 'Official Service Code', janParichay: 'Jan Parichay Token', voter: 'Voter ID', aadhaar: 'Aadhaar', ration: 'Ration Card', citizenEmail: 'citizen@example.com', institutionalEmail: 'name@bitmesra.ac.in', corporateEmail: 'name@tatasteel.com', governmentEmail: 'name@jharkhand.gov.in' },
    citizen: { reportProblem: 'Report Local Problem', radar: '500m Radar Scan', upvote: 'Upvote', activeIssues: 'Active Issues', resolved: 'Resolved', escrow: 'Escrow Pool', search: 'Search challenges...', allCategories: 'All Categories', distance5: 'Within 5 km', distance15: 'Within 15 km', district: 'District' },
    dashboard: { title: 'Grievance & Solution Portal', subtitle: 'Simple problem reporting and verified rural solutions', resolved: 'Issues Resolved', resolvedSub: 'Verified on Ground', active: 'Active Solutions', activeSub: 'In University Labs', escrow: 'Funds Allocated', escrowSub: 'Milestone Grants', nearbyTitle: 'Problems in Your Area', nearbySubtitle: 'Vote to prioritize your village issues', upvoteBtn: 'Upvote', upvotedBtn: 'Upvoted', filterAll: 'All Categories', filterNear: '< 5 km', reportProblemBtn: '+ Report New Issue', cards: 'Cards Feed', radar: '500m Radar Map', range: 'Range:' },
    aiCopilotBtn: 'AI Assistant',
    whatsapp: { online: 'Online', sendVoice: 'Send Voice Note', recording: 'Recording...', tapToStop: 'Tap to Stop', listen: 'Listen', verified: 'Verified Bot', reset: 'Reset Simulation', photo: 'Photo', location: 'Location', typeMessage: 'Type a message...', typing: 'Typing', encrypted: 'Messages and calls are end-to-end encrypted.' },
    university: { feed: 'Research Discovery Feed', match: '5-Axis AI Matchmaking', hackathon: 'Hackathon Arena', bom: 'DPR Bill of Materials', credits: 'APAAR Credits' },
    industry: { consortium: 'Corporate CSR Consortium', pledge: 'Pledge Matching Grant', certified: 'Form CSR-1 Certified', mentor: 'Assign Technical Mentor' },
    government: { command: 'State Innovation Command Center', total: 'Total Challenges', approve: 'Approve & Broadcast', reroute: 'Reroute to ULB' },
  },
  hi: {
    appTitle: 'जागृत',
    appName: 'जागृत — झारखंड एकेडमिक एवं जमीनी स्तर नवाचार और रूपांतरण समाधान',
    appSubtitle: 'झारखंड एकेडमिक एवं जमीनी स्तर नवाचार और रूपांतरण समाधान', tagline: 'जमीनी समस्याएं, शैक्षणिक समाधान।',
    welcome: 'जोहार और नमस्ते', welcomeSubtitle: 'जागृत झारखण्ड', enterPortal: 'पोर्टल में प्रवेश करें', signIn: 'साइन इन करें', register: 'पंजीकरण करें', quickDemo: 'डेमो लॉगिन',
    demoAs: { citizen: 'नागरिक डेमो', university: 'विश्वविद्यालय डेमो', industry: 'उद्योग डेमो', government: 'सरकार डेमो' }, roles: { citizen: 'नागरिक', university: 'विश्वविद्यालय', industry: 'उद्योग सीएसआर', government: 'सरकारी अधिकारी' },
    nav: { home: 'होम', citizen: 'नागरिक पोर्टल', whatsapp: 'व्हाट्सएप बॉट', university: 'विश्वविद्यालय पोर्टल', industry: 'उद्योग सीएसआर', government: 'सरकारी कमांड', samvaad: 'संवाद मंच', timeMachine: 'समय मशीन', report: 'समस्या दर्ज करें' },
    auth: { emailPhone: 'ईमेल या मोबाइल', password: 'पासवर्ड', idProof: 'पहचान प्रमाण', idNumber: 'पहचान संख्या', campus: 'परिसर', apaar: 'एआईएसएचई / अपार आईडी', cin: 'कॉर्पोरेट सीआईएन / सीएसआर-1 पंजीकरण', serviceCode: 'आधिकारिक सेवा कोड', janParichay: 'जन परिचय टोकन', voter: 'मतदाता पहचान पत्र', aadhaar: 'आधार', ration: 'राशन कार्ड', citizenEmail: 'नागरिक@example.com', institutionalEmail: 'नाम@bitmesra.ac.in', corporateEmail: 'नाम@tatasteel.com', governmentEmail: 'नाम@jharkhand.gov.in' },
    citizen: { reportProblem: 'स्थानीय समस्या दर्ज करें', radar: '500 मीटर रडार स्कैन', upvote: 'समर्थन करें', activeIssues: 'सक्रिय समस्याएं', resolved: 'समाधान पूर्ण', escrow: 'एस्क्रो राशि', search: 'समस्याएं खोजें...', allCategories: 'सभी श्रेणियां', distance5: '5 किमी के भीतर', distance15: '15 किमी के भीतर', district: 'जिला' },
    dashboard: { title: 'समस्या एवं समाधान पोर्टल', subtitle: 'ग्रामीण समस्याओं का आसान समाधान और प्रगति', resolved: 'हल हुई समस्याएं', resolvedSub: 'जमीन पर सत्यापित', active: 'प्रगति में', activeSub: 'विश्वविद्यालय लैब में', escrow: 'आवंटित राशि', escrowSub: 'अनुदान राशि', nearbyTitle: 'आपके क्षेत्र की समस्याएं', nearbySubtitle: 'समस्या को प्राथमिकता देने के लिए वोट करें', upvoteBtn: 'वोट दें', upvotedBtn: 'वोट दिया', filterAll: 'सभी श्रेणियां', filterNear: '५ किमी के अंदर', reportProblemBtn: '+ नई समस्या दर्ज करें', cards: 'कार्ड सूची', radar: '५०० मीटर रडार', range: 'दायरा:' },
    aiCopilotBtn: 'एआई सहायक',
    whatsapp: { online: 'ऑनलाइन', sendVoice: 'आवाज़ संदेश भेजें', recording: 'रिकॉर्डिंग...', tapToStop: 'रोकने के लिए दबाएं', listen: 'सुनें', verified: 'सत्यापित बॉट', reset: 'सिमुलेशन रीसेट करें', photo: 'फोटो', location: 'स्थान', typeMessage: 'संदेश लिखें...', typing: 'लिखा जा रहा है', encrypted: 'संदेश और कॉल एंड-टू-एंड एन्क्रिप्टेड हैं।' },
    university: { feed: 'शोध खोज फ़ीड', match: '5-अक्ष एआई मिलान', hackathon: 'हैकथॉन क्षेत्र', bom: 'डीपीआर सामग्री सूची', credits: 'अपार क्रेडिट' }, industry: { consortium: 'कॉर्पोरेट सीएसआर संघ', pledge: 'मिलान अनुदान का संकल्प', certified: 'सीएसआर-1 प्रमाणित फॉर्म', mentor: 'तकनीकी मार्गदर्शक नियुक्त करें' }, government: { command: 'राज्य नवाचार कमांड सेंटर', total: 'कुल समस्याएं', approve: 'अनुमोदित करें और प्रसारित करें', reroute: 'यूएलबी को भेजें' },
  },
  sat: {
    appTitle: 'JAGRIT',
    appName: 'ᱡᱟᱜᱽᱨᱤᱛ — ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱮᱠᱮᱰᱮᱢᱤᱠ ᱟᱨ ᱡᱟᱹᱢᱤᱱ ᱥᱛᱨ ᱨᱮᱱᱟᱜ ᱱᱟᱣᱟ ᱟᱨ ᱞᱟᱹᱞᱟᱹᱭ ᱥᱚᱞᱦᱮ',
    appSubtitle: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱮᱠᱮᱰᱮᱢᱤᱠ ᱟᱨ ᱡᱟᱹᱢᱤᱱ ᱥᱛᱨ ᱨᱮᱱᱟᱜ ᱱᱟᱣᱟ ᱥᱚᱞᱦᱮ', tagline: 'Aatu Samasya, Porao Hal.',
    welcome: 'ᱡᱚᱦᱟᱨ ᱟᱨ ᱱᱟᱢᱟᱥᱠᱟᱨ', welcomeSubtitle: 'ᱡᱟᱜᱽᱨᱤᱛ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ', enterPortal: 'ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱵᱚᱞᱚᱜ', signIn: 'ᱵᱚᱞᱚᱜ', register: 'ᱨᱮᱡᱤᱥᱴᱟᱨ', quickDemo: 'ᱰᱮᱢᱚ ᱞᱚᱜᱤᱱ',
    demoAs: { citizen: 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱰᱮᱢᱚ', university: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱰᱮᱢᱚ', industry: 'ᱤᱱᱰᱟᱥᱴᱨᱤ ᱰᱮᱢᱚ', government: 'ᱥᱚᱨᱠᱟᱨ ᱰᱮᱢᱚ' }, roles: { citizen: 'ᱟᱹᱛᱩ ᱦᱚᱲ', university: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ', industry: 'ᱤᱱᱰᱟᱥᱴᱨᱤ ᱥᱤᱮᱥᱟᱨ', government: 'ᱥᱚᱨᱠᱟᱨ ᱟᱹᱢᱞᱟ' },
    nav: { home: 'ᱚᱲᱟᱜ', citizen: 'ᱟᱹᱛᱩ ᱦᱚᱲ ᱯᱳᱨᱴᱟᱞ', whatsapp: 'ᱣᱟᱴᱥᱟᱯ ᱵᱳᱴ', university: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱯᱳᱨᱴᱟᱞ', industry: 'ᱤᱱᱰᱟᱥᱴᱨᱤ', government: 'ᱥᱚᱨᱠᱟᱨ ᱠᱚᱢᱟᱱᱰ', samvaad: 'ᱜᱟᱞᱢᱟᱨᱟᱣ ᱢᱟᱸᱪ', timeMachine: 'ᱥᱢᱟᱹᱭ ᱢᱮᱥᱤᱱ', report: 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ' },
    auth: { emailPhone: 'ᱤᱢᱮᱞ ᱥᱮ ᱢᱚᱵᱟᱭᱤᱞ', password: 'ᱯᱟᱥᱣᱟᱨᱰ', idProof: 'ᱯᱚᱨᱢᱟᱱ', idNumber: 'ᱮᱞ', campus: 'ᱠᱮᱢᱯᱟᱥ', apaar: 'ᱟᱭᱤᱥᱮ / ᱟᱯᱟᱨ ᱮᱞ', cin: 'ᱠᱚᱨᱯᱚᱨᱮᱴ ᱥᱤᱟᱭᱮᱱ / ᱥᱤᱮᱥᱟᱨ-᱑', serviceCode: 'ᱥᱚᱨᱠᱟᱨᱤ ᱥᱮᱵᱟ ᱠᱳᱰ', janParichay: 'ᱡᱟᱱ ᱯᱚᱨᱤᱪᱚᱭ ᱴᱳᱠᱮᱱ', voter: 'ᱵᱷᱳᱴᱟᱨ ᱮᱞ', aadhaar: 'ᱟᱫᱷᱟᱨ', ration: 'ᱨᱮᱥᱚᱱ ᱠᱟᱨᱰ', citizenEmail: 'ᱟᱹᱛᱩ@example.com', institutionalEmail: 'ᱧᱩᱛᱩᱢ@bitmesra.ac.in', corporateEmail: 'ᱧᱩᱛᱩᱢ@tatasteel.com', governmentEmail: 'ᱧᱩᱛᱩᱢ@jharkhand.gov.in' },
    citizen: { reportProblem: 'ᱟᱹᱛᱩ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ', radar: '᱕᱐᱐ ᱢᱤᱴᱟᱨ ᱨᱟᱰᱟᱨ', upvote: 'ᱥᱟᱞᱟᱜ ᱢᱮ', activeIssues: 'ᱪᱟᱞᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ', resolved: 'ᱥᱚᱞᱦᱮ ᱮᱱᱟ', escrow: 'ᱮᱥᱠᱨᱳ ᱯᱩᱞ', search: 'ᱮᱴᱠᱮᱴᱚᱬᱮ ᱥᱟᱹᱫᱽ...', allCategories: 'ᱡᱚᱛᱚ ᱵᱤᱵᱷᱟᱜ', distance5: '᱕ ᱠᱤᱢᱤ ᱵᱷᱤᱛᱨᱤ', distance15: '᱑᱕ ᱠᱤᱢᱤ ᱵᱷᱤᱛᱨᱤ', district: 'ᱦᱚᱱᱚᱛ' },
    dashboard: { title: 'Samasya ar Hal Portal', subtitle: 'Aatu reah samasya ar unkuah hal', resolved: 'Hal Ena', resolvedSub: 'Sari Ena', active: 'Chalu Menah-a', activeSub: 'University Re', escrow: 'Paisa Taka', escrowSub: 'Sarkar Madat', nearbyTitle: 'Aapeah Sur Reah Samasya', nearbySubtitle: 'Samasya lahante idilaigi vote emme', upvoteBtn: 'Vote Emme', upvotedBtn: 'Vote Ena', filterAll: 'Joto Lekan', filterNear: '< 5 km', reportProblemBtn: '+ Nawa Samasya Olme', cards: 'Cards Feed', radar: '500m Radar', range: 'Range:' },
    aiCopilotBtn: 'AI Goroic',
    whatsapp: { online: 'ᱚᱱᱞᱟᱭᱤᱱ', sendVoice: 'ᱟᱲᱟᱝ ᱵᱷᱮᱡᱟ', recording: 'ᱨᱮᱠᱚᱨᱰᱤᱝ...', tapToStop: 'ᱛᱷᱟᱢ ᱞᱟᱹᱜᱤᱫ ᱛᱤᱯᱟᱹᱣ', listen: 'ᱟᱧᱡᱚᱢ', verified: 'ᱥᱟᱹᱵᱤᱛ ᱵᱳᱴ', reset: 'ᱥᱤᱢᱩᱞᱮᱥᱚᱱ ᱨᱤᱥᱮᱴ', photo: 'ᱪᱤᱛᱟᱹᱨ', location: 'ᱴᱷᱟᱶ', typeMessage: 'ᱠᱷᱚᱵᱚᱨ ᱚᱞ...', typing: 'ᱚᱞᱚᱜ ᱠᱟᱱᱟ', encrypted: 'ᱠᱷᱚᱵᱚᱨ ᱟᱨ ᱠᱚᱞ ᱫᱚ ᱮᱱᱰ-ᱴᱩ-ᱮᱱᱰ ᱥᱤᱠᱨᱮᱴ ᱢᱮᱱᱟ' },
    university: { feed: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱧᱮᱞ ᱯᱟᱛᱟ', match: '᱕-ᱟᱠᱥ ᱮᱟᱭ ᱢᱤᱞᱟᱹᱣ', hackathon: 'ᱦᱟᱠᱟᱛᱷᱚᱱ ᱟᱨᱮᱱᱟ', bom: 'ᱰᱤᱯᱤᱟᱨ ᱡᱤᱱᱤᱥ ᱛᱟᱹᱞᱤᱠᱟ', credits: 'ᱟᱯᱟᱨ ᱠᱨᱮᱰᱤᱴ' }, industry: { consortium: 'ᱠᱚᱨᱯᱚᱨᱮᱴ ᱥᱤᱮᱥᱟᱨ ᱡᱚᱛ', pledge: 'ᱢᱤᱞᱟᱹᱣ ᱜᱨᱟᱱᱴ ᱵᱟᱹᱭᱥᱟᱹᱣ', certified: 'ᱥᱤᱮᱥᱟᱨ-᱑ ᱥᱟᱹᱵᱤᱛ', mentor: 'ᱴᱮᱠᱱᱤᱠᱟᱞ ᱢᱮᱱᱴᱚᱨ' }, government: { command: 'ᱥᱴᱮᱴ ᱤᱱᱚᱵᱮᱥᱚᱱ ᱠᱚᱢᱟᱱᱰ ᱥᱮᱱᱴᱟᱨ', total: 'ᱢᱩᱴᱷᱟᱹᱱ ᱮᱴᱠᱮᱴᱚᱬᱮ', approve: 'ᱢᱟᱱᱮ ᱟᱨ ᱵᱷᱮᱡᱟ', reroute: 'ᱩᱞᱵᱤ ᱛᱮ ᱨᱩᱴ ᱢᱮ' },
  },
};

interface LanguageContextValue { language: AppLanguage; setLanguage: (language: AppLanguage) => void; t: LanguageDictionary; }
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>('hi');
  useEffect(() => {
    const stored = window.localStorage.getItem('jagrit_language') as AppLanguage | null;
    if (stored && stored in dictionaries) setLanguageState(stored);
  }, []);
  const setLanguage = (next: AppLanguage) => {
    setLanguageState(next);
    window.localStorage.setItem('jagrit_language', next);
    document.documentElement.lang = next === 'sat' ? 'sat' : next;
  };
  const value = useMemo(() => ({ language, setLanguage, t: dictionaries[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
