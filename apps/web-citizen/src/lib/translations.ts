import { useLanguage, type AppLanguage } from '@/context/LanguageContext';

export type Language = AppLanguage;

export const TRANSLATIONS = {
  en: {
    appTitle: 'JAGRIT', appFullForm: 'Jharkhand Academic & Grassroots Resolution for Innovation and Transformation', tagline: 'Grassroots Problems. Academic Solutions.', enterPortal: 'Enter Portal', demoLogin: 'Demo Login',
    nav: { citizen: 'Citizen Portal', whatsapp: 'WhatsApp Bot', university: 'University Portal', industry: 'Industry CSR', govt: 'Government Command', samvaad: 'Samvaad Forum', timeMachine: 'Time Machine' },
    dashboard: { heading: 'Community Grievances', reportBtn: '+ Report Issue', resolved: 'Issues Resolved', active: 'Active Solutions', funds: 'Funds Released', nearby: 'Problems in Your Area', upvote: 'Upvote', upvoted: 'Upvoted', filterAll: 'All Categories', filterNear: '< 5 km', radarTitle: '500m Deduplication Radar', radarActive: 'Active Scan', radarMatch: 'Nearby Match Found (140m) — 89% Similarity' },
    aiBtn: 'AI Assistant',
  },
  hi: {
    appTitle: 'जागृत', appFullForm: 'झारखंड एकेडमिक एवं जमीनी स्तर नवाचार और रूपांतरण समाधान', tagline: 'जमीनी समस्याएं, शैक्षणिक समाधान।', enterPortal: 'पोर्टल में प्रवेश करें', demoLogin: 'डेमो लॉगिन',
    nav: { citizen: 'नागरिक पोर्टल', whatsapp: 'व्हाट्सएप बॉट', university: 'विश्वविद्यालय पोर्टल', industry: 'उद्योग सीएसआर', govt: 'सरकारी डैशबोर्ड', samvaad: 'संवाद मंच', timeMachine: 'समय मशीन' },
    dashboard: { heading: 'जनसमस्याएं एवं समाधान', reportBtn: '+ नई समस्या दर्ज करें', resolved: 'हल हुई समस्याएं', active: 'प्रगतिशील समाधान', funds: 'आवंटित राशि', nearby: 'आपके क्षेत्र की समस्याएं', upvote: 'वोट दें', upvoted: 'वोट दिया', filterAll: 'सभी श्रेणियां', filterNear: '५ किमी के अंदर', radarTitle: '५०० मीटर रडार स्कैन', radarActive: 'सक्रिय स्कैन', radarMatch: 'समीप की समस्या मिली (१४० मीटर) — ८९% समानता' },
    aiBtn: 'एआई सहायक',
  },
  sat: {
    appTitle: 'JAGRIT', appFullForm: 'Jharkhand Academic & Grassroots Resolution for Innovation and Transformation', tagline: 'Aatu Samasya, Porao Hal.', enterPortal: 'Portal Re Bolog', demoLogin: 'Demo Login',
    nav: { citizen: 'Aatu Hor Portal', whatsapp: 'WhatsApp Bot', university: 'University Portal', industry: 'Industry', govt: 'Sarkar Command', samvaad: 'Galmarao Manch', timeMachine: 'Somoy Mesin' },
    dashboard: { heading: 'Aatu Reah Samasya', reportBtn: '+ Samasya Olme', resolved: 'Hal Ena', active: 'Chalu Menah-a', funds: 'Paisa Taka', nearby: 'Aapeah Sur Reah Samasya', upvote: 'Vote Emme', upvoted: 'Vote Ena', filterAll: 'Joto Lekan', filterNear: '< 5 km', radarTitle: '500m Radar Scan', radarActive: 'Active Scan', radarMatch: 'Sur Samasya Namena (140m) — 89% Match' },
    aiBtn: 'AI Goroic',
  },
} as const;

export function useTranslation() {
  const { language } = useLanguage();
  return { t: TRANSLATIONS[language] };
}
