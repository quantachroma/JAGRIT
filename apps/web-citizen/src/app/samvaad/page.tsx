'use client';

import React, { useState, useMemo } from 'react';
import { useCitizen, Language } from '@/context/CitizenContext';
import {
  MessageSquare,
  Heart,
  Share2,
  Mic,
  Send,
  User,
  MapPin,
  Sparkles,
  Plus,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  X,
  Search,
  MessageCircle,
  Clock,
} from 'lucide-react';

export type AuthorRole = 'CITIZEN' | 'RESEARCHER' | 'GOVT_OFFICER' | 'STUDENT';
export type TopicCategory = 'ALL' | 'WATER' | 'AGRITECH' | 'TRIBAL_LIVELIHOODS' | 'RURAL_ENERGY';

export interface SamvaadComment {
  id: string;
  author: string;
  role: AuthorRole;
  roleLabel: string;
  timeAgo: string;
  content: string;
}

export interface SamvaadThread {
  id: string;
  author: string;
  role: AuthorRole;
  roleLabel: string;
  institution?: string;
  location: string;
  timeAgo: string;
  category: TopicCategory;
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  isLiked?: boolean;
  replies: SamvaadComment[];
  attachmentCaption?: string;
  hasAudio?: boolean;
}

const ENGLISH_THREADS: SamvaadThread[] = [
  {
    id: 'th-en-1',
    author: 'Amit Kumar',
    role: 'RESEARCHER',
    roleLabel: 'Researcher • BIT Mesra',
    institution: 'Department of Chemical & Environmental Engineering',
    location: 'Palamu, Satbarwa Block',
    timeAgo: '2 hours ago',
    category: 'WATER',
    title: 'Palamu District: Solar Defluoridation Unit Active in 45-Day Verification Phase',
    content:
      'To address severe groundwater fluoride contamination in Satbarwa, BIT Mesra deployed an unassisted solar membrane defluoridation unit. Operating efficiency is at 88%. Gram Sabha members are actively participating in the citizen quorum audit.',
    tags: ['PalamuWater', 'FluorideRemoval', 'BITMesra', 'GramSabhaQuorum'],
    likesCount: 68,
    isLiked: false,
    attachmentCaption: 'Palamu Solar Defluoridation Unit: 45-Day Durability Audit',
    replies: [
      {
        id: 'c-en-1-1',
        author: 'Somra Oraon',
        role: 'CITIZEN',
        roleLabel: 'Ward Member • Palamu',
        timeAgo: '1 hour ago',
        content: 'Drinking water quality has noticeably improved. We have cast our affirmative quorum vote.',
      },
      {
        id: 'c-en-1-2',
        author: 'Anjana Tigga',
        role: 'GOVT_OFFICER',
        roleLabel: 'Officer • Water & Sanitation Dept',
        timeAgo: '30 mins ago',
        content: 'Upon receiving PESA Gram Sabha clearance, the 30% Tranche 3 escrow release will be disbursed to BIT Mesra.',
      },
    ],
  },
  {
    id: 'th-en-2',
    author: 'Birsa Munda Women Self-Help Group',
    role: 'CITIZEN',
    roleLabel: 'SHG Representative • Khunti',
    location: 'Khunti, Murhu Block',
    timeAgo: '3 hours ago',
    category: 'TRIBAL_LIVELIHOODS',
    title: 'Khunti District: Post-Harvest Spoilage in Lac — Solar Tunnel Dryer Required',
    content:
      'Heavy monsoon dampness is causing over 35% fungal rot in our harvested kusmi and rangini lac produce. Can a portable solar dehumidifier dryer be piloted for our 20 women self-help groups?',
    tags: ['KhuntiLac', 'TribalLivelihoods', 'PostHarvestDecay', 'BAURanchi'],
    likesCount: 54,
    isLiked: true,
    hasAudio: true,
    attachmentCaption: 'Raw Lac Spoilage Assessment & Storage Issues in Murhu',
    replies: [
      {
        id: 'c-en-2-1',
        author: 'Dr. Vikas Kumar',
        role: 'RESEARCHER',
        roleLabel: 'Scientist • Birsa Agricultural University',
        timeAgo: '2 hours ago',
        content: 'Our engineering lab has designed a low-cost foldable solar dehumidifier dryer. A village demonstration will be held in Murhu next week.',
      },
    ],
  },
  {
    id: 'th-en-3',
    author: 'Sunil Hembrom',
    role: 'STUDENT',
    roleLabel: 'Student Lead • NIT Jamshedpur',
    institution: 'Department of Electrical & Renewable Energy Engineering',
    location: 'West Singhbhum, Chaibasa',
    timeAgo: '5 hours ago',
    category: 'RURAL_ENERGY',
    title: 'Chaibasa: Solar Microgrid Voltage Stabilizer for Rural Primary Health Centre',
    content:
      'In Tonto health centre, evening battery voltage dropped to 140V, risking cold-chain vaccine refrigeration. Our student engineering team installed an active battery management system maintaining a steady 220V.',
    tags: ['ChaibasaEnergy', 'HealthCenterSolar', 'NITJamshedpur', 'StudentHackathon'],
    likesCount: 82,
    isLiked: false,
    attachmentCaption: 'Active Telemetry Controller Board installed at Chaibasa PHC',
    replies: [
      {
        id: 'c-en-3-1',
        author: 'Dr. Sudhir Kujur',
        role: 'GOVT_OFFICER',
        roleLabel: 'Medical Officer • Chaibasa',
        timeAgo: '3 hours ago',
        content: 'The student-built system has kept our vaccine refrigerators running securely throughout the night.',
      },
    ],
  },
  {
    id: 'th-en-4',
    author: 'Ramesh Munda',
    role: 'CITIZEN',
    roleLabel: 'Local Citizen • Ward 4',
    location: 'Ranchi, Kanke Panchayat',
    timeAgo: '1 day ago',
    category: 'WATER',
    title: 'Kanke Ward 4: Community Monitoring Committee Formed for Solar Handpump',
    content:
      'The new solar-powered deep bore pump in Ward 4 is supplying clean water to 45 families daily. A village maintenance committee has been established to protect the solar panels.',
    tags: ['DrinkingWater', 'SolarPump', 'GramSabha', 'PESA'],
    likesCount: 46,
    isLiked: false,
    attachmentCaption: 'Operational solar pump providing clean water to 45 households',
    replies: [],
  },
];

const HINDI_THREADS: SamvaadThread[] = [
  {
    id: 'th-hi-1',
    author: 'अमित कुमार',
    role: 'RESEARCHER',
    roleLabel: 'शोधकर्ता • बीआईटी मेसरा',
    institution: 'पर्यावरण एवं रासायनिक अभियांत्रिकी विभाग',
    location: 'पलामू, सतबरवा प्रखंड',
    timeAgo: '2 घंटे पहले',
    category: 'WATER',
    title: 'पलामू ज़िला: भूजल में फ्लोराइड निवारण हेतु सौर सोखता इकाई का सफल परीक्षण',
    content:
      'सतबरवा प्रखंड में भूजल फ्लोराइड की गंभीर समस्या को दूर करने हेतु बीआईटी मेसरा ने सौर-ऊर्जा चालित सोखता झिल्ली इकाई स्थापित की है। 45-दिवसीय परिपक्वता अवधि में 88% परिचालन दक्षता दर्ज की गई है। स्थानीय ग्राम सभा के नागरिक सत्यापन में सक्रिय रूप से भाग ले रहे हैं।',
    tags: ['पलामू_जल', 'फ्लोराइड_मुक्ति', 'बीआईटी_मेसरा', 'ग्राम_सभा'],
    likesCount: 68,
    isLiked: false,
    attachmentCaption: 'पलामू सौर सोखता इकाई: 45-दिवसीय टिकाऊपन परीक्षण',
    replies: [
      {
        id: 'c-hi-1-1',
        author: 'सोमरा उरांव',
        role: 'CITIZEN',
        roleLabel: 'वार्ड सदस्य • पलामू',
        timeAgo: '1 घंटा पहले',
        content: 'पानी की गुणवत्ता में व्यापक सुधार हुआ है। हमने सत्यापन मतदान में सकारात्मक मत दिया है।',
      },
      {
        id: 'c-hi-1-2',
        author: 'अंजना तिग्गा',
        role: 'GOVT_OFFICER',
        roleLabel: 'प्रशासनिक अधिकारी • पेयजल विभाग',
        timeAgo: '30 मिनट पहले',
        content: 'पेसा ग्राम सभा की संस्तुति मिलते ही अंतिम चरण की अनुदान राशि जारी कर दी जाएगी।',
      },
    ],
  },
  {
    id: 'th-hi-2',
    author: 'बिरसा मुंडा महिला स्वयं सहायता समूह',
    role: 'CITIZEN',
    roleLabel: 'प्रतिनिधि • स्वयं सहायता समूह',
    location: 'खूंटी, मुरहू प्रखंड',
    timeAgo: '3 घंटे पहले',
    category: 'TRIBAL_LIVELIHOODS',
    title: 'खूंटी ज़िला: लाह उपज में तुड़ाई उपरांत सड़न रोकने हेतु सोलर ड्रायर की मांग',
    content:
      'अत्यधिक नमी के कारण कुसमी और रंगीनी लाह में 35% से अधिक फफूंद क्षति हो रही है। क्या बिरसा कृषि विश्वविद्यालय द्वारा विकसित पोर्टेबल सोलर ड्रायर का पायलट हमारे 20 महिला समूहों के लिए किया जा सकता है?',
    tags: ['खूंटी_लाह', 'आजीविका', 'बिरसा_कृषि_विश्वविद्यालय'],
    likesCount: 54,
    isLiked: true,
    hasAudio: true,
    attachmentCaption: 'कच्ची लाह भंडारण एवं नमी क्षति विवरण',
    replies: [
      {
        id: 'c-hi-2-1',
        author: 'डॉ. विकास कुमार',
        role: 'RESEARCHER',
        roleLabel: 'वैज्ञानिक • बिरसा कृषि विश्वविद्यालय',
        timeAgo: '2 घंटे पहले',
        content: 'हमारी टीम ने कम लागत का फोल्डेबल सोलर ड्रायर तैयार किया है। अगले सप्ताह मुरहू में प्रशिक्षण दिया जाएगा।',
      },
    ],
  },
  {
    id: 'th-hi-3',
    author: 'सुनील हेंब्रम',
    role: 'STUDENT',
    roleLabel: 'छात्र दल प्रमुख • एनआईटी जमशेदपुर',
    institution: 'विद्युत एवं नवीकरणीय ऊर्जा विभाग',
    location: 'पश्चिमी सिंहभूम, चाईबासा',
    timeAgo: '5 घंटे पहले',
    category: 'RURAL_ENERGY',
    title: 'चाईबासा: प्राथमिक स्वास्थ्य उपकेंद्र में सोलर वोल्टेज स्थिरीकरण समाधान',
    content:
      'टोंटो उपकेंद्र में शाम को वोल्टेज कम होने से वैक्सीन रेफ्रिजरेटर बंद हो रहे थे। छात्र दल ने स्मार्ट रिले लगाकर वोल्टेज 220V स्थिर कर दिया है।',
    tags: ['चाईबासा_ऊर्जा', 'स्वास्थ्य_सौर_ऊर्जा', 'एनआईटी_जमशेदपुर'],
    likesCount: 82,
    isLiked: false,
    attachmentCaption: 'चाईबासा उपकेंद्र में स्थापित टेलीमेट्री कंट्रोलर बोर्ड',
    replies: [
      {
        id: 'c-hi-3-1',
        author: 'डॉ. सुधीर कुजूर',
        role: 'GOVT_OFFICER',
        roleLabel: 'चिकित्सा अधिकारी • चाईबासा',
        timeAgo: '3 घंटे पहले',
        content: 'छात्रों द्वारा विकसित प्रणाली से अब रात में भी जीवनरक्षक दवाएं सुरक्षित हैं।',
      },
    ],
  },
  {
    id: 'th-hi-4',
    author: 'रमेश मुंडा',
    role: 'CITIZEN',
    roleLabel: 'नागरिक • वार्ड 4',
    location: 'राँची, कांके पंचायत',
    timeAgo: '1 दिन पहले',
    category: 'WATER',
    title: 'कांके वार्ड 4: नए सोलर चापाकल की सुरक्षा हेतु सामुदायिक निगरानी समिति',
    content:
      'वार्ड 4 में स्थापित सोलर चापाकल से 45 परिवारों को स्वच्छ पानी मिल रहा है। ग्रामीणों ने सौर पैनल की देखरेख हेतु समिति गठित की है।',
    tags: ['पेयजल', 'सोलर_पंप', 'ग्राम_सभा'],
    likesCount: 46,
    isLiked: false,
    attachmentCaption: '45 परिवारों को स्वच्छ पानी उपलब्ध कराता सोलर चापाकल',
    replies: [],
  },
];

const SANTHALI_THREADS: SamvaadThread[] = [
  {
    id: 'th-sat-1',
    author: 'ᱚᱢᱤᱛ ᱠᱩᱢᱟᱨ',
    role: 'RESEARCHER',
    roleLabel: 'ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱤᱭᱟᱹ • ᱵᱤᱟᱭᱤᱴᱤ ᱢᱮᱥᱨᱟ',
    institution: 'ᱪᱮᱛᱟᱱ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ',
    location: 'ᱯᱟᱞᱟᱢᱩ, ᱥᱟᱛᱵᱟᱨᱣᱟ',
    timeAgo: '᱒ ᱴᱟᱲᱟᱝ ᱢᱟᱲᱟᱝ',
    category: 'WATER',
    title: 'ᱯᱟᱞᱟᱢᱩ ᱦᱚᱱᱚᱛ: ᱫᱟᱜ ᱨᱮ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱥᱟᱦᱟᱭ ᱞᱟᱹᱜᱤᱫ ᱥᱮᱸᱜᱮᱞ ᱪᱟᱯᱟᱠᱚᱞ ᱠᱟᱹᱢᱤ',
    content:
      'ᱥᱟᱛᱵᱟᱨᱣᱟ ᱟᱹᱛᱩ ᱨᱮ ᱵᱟᱹᱲᱤᱡ ᱫᱟᱜ ᱥᱟᱯᱷᱟᱭ ᱞᱟᱹᱜᱤᱫ ᱵᱤᱟᱭᱤᱴᱤ ᱢᱮᱥᱨᱟ ᱦᱚᱛᱮᱛᱮ ᱱᱟᱣᱟ ᱥᱚᱞᱦᱮ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱱᱟ᱾ ᱔᱕ ᱢᱟᱦᱟᱸ ᱨᱮ ᱘᱘% ᱱᱟᱯᱟᱭ ᱠᱟᱹᱢᱤ ᱧᱟᱢ ᱟᱠᱟᱱᱟ᱾ ᱟᱹᱛᱩ ᱦᱚᱲ ᱠᱚ ᱥᱟᱹᱨᱤᱭᱟᱹᱛ ᱨᱮ ᱥᱮᱞᱮᱫ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ᱾',
    tags: ['ᱯᱟᱞᱟᱢᱩ_ᱫᱟᱜ', 'ᱥᱟᱯᱷᱟ_ᱫᱟᱜ', 'ᱵᱤᱟᱭᱤᱴᱤ_ᱢᱮᱥᱨᱟ'],
    likesCount: 68,
    isLiked: false,
    attachmentCaption: 'ᱯᱟᱞᱟᱢᱩ ᱥᱮᱸᱜᱮᱞ ᱪᱟᱯᱟᱠᱚᱞ ᱵᱤᱰᱟᱹᱣ',
    replies: [
      {
        id: 'c-sat-1-1',
        author: 'ᱥᱳᱢᱨᱟ ᱩᱨᱟᱶ',
        role: 'CITIZEN',
        roleLabel: 'ᱟᱹᱛᱩ ᱦᱚᱲ',
        timeAgo: '᱑ ᱴᱟᱲᱟᱝ ᱢᱟᱲᱟᱝ',
        content: 'ᱫᱟᱜ ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱥᱟᱯᱷᱟ ᱟᱠᱟᱱᱟ᱾ ᱟᱞᱮ ᱥᱟᱹᱨᱤᱭᱟᱹᱛ ᱵᱷᱳᱴ ᱞᱮ ᱮᱢ ᱠᱮᱫᱟ᱾',
      },
    ],
  },
  {
    id: 'th-sat-2',
    author: 'ᱵᱤᱨᱥᱟ ᱢᱩᱸᱰᱟ ᱛᱤᱨᱞᱟᱹ ᱜᱟᱶᱛᱟ',
    role: 'CITIZEN',
    roleLabel: 'ᱛᱤᱨᱞᱟᱹ ᱜᱟᱶᱛᱟ • ᱠᱷᱩᱸᱴᱤ',
    location: 'ᱠᱷᱩᱸᱴᱤ, ᱢᱩᱨᱦᱩ',
    timeAgo: '᱓ ᱴᱟᱲᱟᱝ ᱢᱟᱲᱟᱝ',
    category: 'TRIBAL_LIVELIHOODS',
    title: 'ᱠᱷᱩᱸᱴᱤ ᱦᱚᱱᱚᱛ: ᱞᱟᱦᱟ ᱨᱚᱦᱚᱲ ᱞᱟᱹᱜᱤᱫ ᱥᱮᱸᱜᱮᱞ ᱰᱨᱟᱭᱟᱨ ᱞᱟᱹᱠᱛᱤ',
    content:
      'ᱫᱟᱜ ᱫᱤᱱ ᱞᱟᱦᱟ ᱓᱕% ᱵᱟᱹᱲᱤᱡᱚᱜ ᱠᱟᱱᱟ᱾ ᱪᱮᱫ ᱵᱤᱨᱥᱟ ᱪᱟᱥ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱨᱮᱱᱟᱜ ᱥᱮᱸᱜᱮᱞ ᱰᱨᱟᱭᱟᱨ ᱟᱞᱮ ᱞᱟᱹᱜᱤᱫ ᱧᱟᱢᱚᱜ-ᱟ?',
    tags: ['ᱠᱷᱩᱸᱴᱤ_ᱞᱟᱦᱟ', 'ᱛᱤᱨᱞᱟᱹ_ᱜᱟᱶᱛᱟ', 'ᱵᱤᱨᱥᱟ_ᱪᱟᱥ'],
    likesCount: 54,
    isLiked: true,
    hasAudio: true,
    attachmentCaption: 'ᱞᱟᱦᱟ ᱨᱚᱦᱚᱲ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱪᱤᱛᱟᱹᱨ',
    replies: [
      {
        id: 'c-sat-2-1',
        author: 'ᱰᱨ. ᱵᱤᱠᱟᱥ ᱠᱩᱢᱟᱨ',
        role: 'RESEARCHER',
        roleLabel: 'ᱥᱟᱬᱮᱥᱤᱭᱟᱹ',
        timeAgo: '᱒ ᱴᱟᱲᱟᱝ ᱢᱟᱲᱟᱝ',
        content: 'ᱟᱞᱮᱭᱟᱜ ᱴᱤᱢ ᱠᱚᱢ ᱠᱷᱚᱨᱚᱪ ᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱰᱨᱟᱭᱟᱨ ᱮ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱫᱟ᱾ ᱦᱤᱡᱩᱜ ᱦᱟᱯᱛᱟ ᱢᱩᱨᱦᱩ ᱨᱮ ᱥᱮᱪᱮᱫ ᱦᱩᱭᱩᱜ-ᱟ᱾',
      },
    ],
  },
  {
    id: 'th-sat-3',
    author: 'ᱥᱩᱱᱤᱞ ᱦᱮᱢᱵᱽᱨᱚᱢ',
    role: 'STUDENT',
    roleLabel: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ • ᱮᱱᱟᱭᱤᱴᱤ ᱡᱟᱢᱥᱮᱫᱽᱯᱩᱨ',
    institution: 'ᱵᱤᱡᱞᱤ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ',
    location: 'ᱯᱟᱪᱮ ᱥᱤᱝᱵᱷᱩᱢ, ᱪᱟᱭᱵᱟᱥᱟ',
    timeAgo: '᱕ ᱴᱟᱲᱟᱝ ᱢᱟᱲᱟᱝ',
    category: 'RURAL_ENERGY',
    title: 'ᱪᱟᱭᱵᱟᱥᱟ: ᱦᱟᱥᱯᱟᱛᱟᱞ ᱨᱮ ᱥᱮᱸᱜᱮᱞ ᱵᱤᱡᱞᱤ ᱵᱷᱳᱞᱴᱮᱡᱽ ᱴᱷᱤᱠ ᱫᱚᱦᱚ',
    content:
      'ᱴᱳᱱᱴᱳ ᱦᱟᱥᱯᱟᱛᱟᱞ ᱨᱮ ᱨᱟᱱ ᱫᱚᱦᱚ ᱞᱟᱹᱜᱤᱫ ᱵᱤᱡᱞᱤ ᱵᱷᱳᱞᱴᱮᱡᱽ ᱠᱚᱢᱚᱜ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱫ᱾ ᱮᱱᱟᱭᱤᱴᱤ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱱᱟᱣᱟ ᱢᱮᱥᱤᱱ ᱞᱟᱜᱟᱣ ᱠᱟᱛᱮ ᱒᱒᱐ ᱵᱷᱳᱞᱴ ᱴᱷᱤᱠ ᱠᱮᱫᱟ᱾',
    tags: ['ᱪᱟᱭᱵᱟᱥᱟ', 'ᱥᱮᱸᱜᱮᱞ_ᱵᱤᱡᱞᱤ', 'ᱦᱟᱥᱯᱟᱛᱟᱞ'],
    likesCount: 82,
    isLiked: false,
    attachmentCaption: 'ᱪᱟᱭᱵᱟᱥᱟ ᱦᱟᱥᱯᱟᱛᱟᱞ ᱨᱮ ᱞᱟᱜᱟᱣ ᱟᱠᱟᱱ ᱵᱳᱨᱰ',
    replies: [],
  },
  {
    id: 'th-sat-4',
    author: 'ᱨᱚᱢᱮᱥ ᱢᱩᱸᱰᱟ',
    role: 'CITIZEN',
    roleLabel: 'ᱟᱹᱛᱩ ᱦᱚᱲ • ᱠᱟᱸᱠᱮ',
    location: 'ᱨᱟᱺᱪᱤ, ᱠᱟᱸᱠᱮ',
    timeAgo: '᱑ ᱢᱟᱦᱟᱸ ᱢᱟᱲᱟᱝ',
    category: 'WATER',
    title: 'ᱠᱟᱸᱠᱮ ᱟᱹᱛᱩ: ᱪᱟᱯᱟᱠᱚᱞ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱟᱹᱛᱩ ᱠᱩᱢᱩᱴ ᱵᱮᱱᱟᱣ',
    content:
      'ᱠᱟᱸᱠᱮ ᱨᱮ ᱞᱟᱜᱟᱣ ᱟᱠᱟᱱ ᱥᱮᱸᱜᱮᱞ ᱪᱟᱯᱟᱠᱚᱞ ᱠᱷᱚᱱ ᱔᱕ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱧᱟᱢᱚᱜ ᱠᱟᱱᱟ᱾ ᱟᱹᱛᱩ ᱦᱚᱲ ᱠᱚ ᱱᱚᱶᱟ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱠᱩᱢᱩᱴ ᱠᱚ ᱵᱮᱱᱟᱣ ᱠᱮᱫᱟ᱾',
    tags: ['ᱪᱟᱯᱟᱠᱚᱞ', 'ᱥᱟᱯᱷᱟ_ᱫᱟᱜ', 'ᱟᱹᱛᱩ_ᱠᱩᱢᱩᱴ'],
    likesCount: 46,
    isLiked: false,
    attachmentCaption: 'ᱠᱟᱸᱠᱮ ᱨᱮ ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱪᱟᱯᱟᱠᱚᱞ',
    replies: [],
  },
];

export default function SamvaadPage() {
  const { t, language, currentLocation } = useCitizen();

  // Active threads based on current language
  const currentInitialThreads = useMemo(() => {
    if (language === 'hi') return HINDI_THREADS;
    if (language === 'sat') return SANTHALI_THREADS;
    return ENGLISH_THREADS;
  }, [language]);

  const [threads, setThreads] = useState<SamvaadThread[]>(currentInitialThreads);
  const [activeCategory, setActiveCategory] = useState<TopicCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize threads whenever language changes
  React.useEffect(() => {
    setThreads(currentInitialThreads);
  }, [currentInitialThreads]);

  // Comment Expander / Drawer State
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [replyInputText, setReplyInputText] = useState<Record<string, string>>({});

  // Start Discussion Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<TopicCategory>('WATER');
  const [newRole, setNewRole] = useState<AuthorRole>('CITIZEN');
  const [newTags, setNewTags] = useState('');

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Optimistic Like Action
  const handleToggleLike = (threadId: string) => {
    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          const isLiked = !thread.isLiked;
          const likesCount = isLiked ? thread.likesCount + 1 : thread.likesCount - 1;
          return { ...thread, isLiked, likesCount };
        }
        return thread;
      })
    );
  };

  // Optimistic Reply Action
  const handlePostReply = (threadId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = replyInputText[threadId]?.trim();
    if (!text) return;

    const newReply: SamvaadComment = {
      id: `rep-${Date.now()}`,
      author:
        language === 'hi'
          ? 'नागरिक प्रतिभागी'
          : language === 'sat'
          ? 'ᱥᱮᱞᱮᱫᱤᱭᱟᱹ'
          : 'Citizen Contributor',
      role: 'CITIZEN',
      roleLabel:
        language === 'hi' ? 'नागरिक' : language === 'sat' ? 'ᱟᱹᱛᱩ ᱦᱚᱲ' : 'Citizen',
      timeAgo:
        language === 'hi' ? 'अभी' : language === 'sat' ? 'ᱱᱤᱛᱚᱜ' : 'Just now',
      content: text,
    };

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            replies: [...thread.replies, newReply],
          };
        }
        return thread;
      })
    );

    setReplyInputText((prev) => ({ ...prev, [threadId]: '' }));
    showToast(
      language === 'hi'
        ? 'आपकी टिप्पणी तुरंत पोस्ट हो गई!'
        : language === 'sat'
        ? 'ᱛᱮᱞᱟ ᱥᱟᱹᱛ ᱮᱱᱟ!'
        : 'Reply posted successfully!'
    );
  };

  // Share Action
  const handleShareThread = async (thread: SamvaadThread) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/samvaad#${thread.id}` : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: thread.title,
          text: thread.content,
          url,
        });
        return;
      } catch {
        // clipboard fallback
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast(
        language === 'hi'
          ? 'चर्चा का लिंक कॉपी किया गया!'
          : language === 'sat'
          ? 'ᱞᱤᱝᱠ ᱠᱚᱯᱤ ᱮᱱᱟ!'
          : 'Thread link copied to clipboard!'
      );
    }
  };

  // Create Discussion Action
  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const parsedTags = newTags
      .split(',')
      .map((tag) => tag.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newThread: SamvaadThread = {
      id: `th-usr-${Date.now()}`,
      author:
        language === 'hi'
          ? 'नागरिक सदस्य'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱦᱚᱲ'
          : 'Citizen Member',
      role: newRole,
      roleLabel:
        language === 'hi'
          ? 'नागरिक'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱦᱚᱲ'
          : 'Citizen',
      location: `${currentLocation.district}, ${currentLocation.block || 'Kanke'}`,
      timeAgo: language === 'hi' ? 'अभी' : language === 'sat' ? 'ᱱᱤᱛᱚᱜ' : 'Just now',
      category: newCategory,
      title: newTitle,
      content: newContent,
      tags: parsedTags.length > 0 ? parsedTags : ['JanSamvaad'],
      likesCount: 1,
      isLiked: true,
      replies: [],
    };

    setThreads([newThread, ...threads]);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setIsModalOpen(false);

    showToast(
      language === 'hi'
        ? 'जन संवाद में आपकी चर्चा सफलतापूर्वक प्रकाशित हो गई!'
        : language === 'sat'
        ? 'ᱨᱚᱯᱚᱲ ᱥᱟᱹᱛ ᱮᱱᱟ!'
        : 'Discussion published to Jan Samvaad forum!'
    );
  };

  // Filter Logic
  const filteredThreads = useMemo(() => {
    return threads.filter((th) => {
      if (activeCategory !== 'ALL' && th.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          th.title.toLowerCase().includes(q) ||
          th.content.toLowerCase().includes(q) ||
          th.author.toLowerCase().includes(q) ||
          th.tags.some((t) => t.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [threads, activeCategory, searchQuery]);

  // Category Buttons Definitions (Strict Single-Language)
  const categoryFilters = [
    {
      id: 'ALL' as TopicCategory,
      label:
        language === 'hi'
          ? 'सभी विषय'
          : language === 'sat'
          ? 'ᱡᱚᱛᱚ ᱥᱟᱛᱟᱢ'
          : 'All Topics',
    },
    {
      id: 'WATER' as TopicCategory,
      label:
        language === 'hi'
          ? 'पेयजल एवं स्वच्छता'
          : language === 'sat'
          ? 'ᱫᱟᱜ ᱟᱨ ᱥᱟᱯᱷᱟ'
          : 'Water and Sanitation',
    },
    {
      id: 'AGRITECH' as TopicCategory,
      label:
        language === 'hi'
          ? 'कृषि तकनीक'
          : language === 'sat'
          ? 'ᱪᱟᱥ ᱦᱩᱱᱟᱹᱨ'
          : 'Agritech',
    },
    {
      id: 'TRIBAL_LIVELIHOODS' as TopicCategory,
      label:
        language === 'hi'
          ? 'जनजातीय आजीविका'
          : language === 'sat'
          ? 'ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱟᱹᱥᱩᱞ'
          : 'Tribal Livelihoods',
    },
    {
      id: 'RURAL_ENERGY' as TopicCategory,
      label:
        language === 'hi'
          ? 'ग्रामीण ऊर्जा'
          : language === 'sat'
          ? 'ᱟᱹᱛᱩ ᱵᱤᱡᱞᱤ'
          : 'Rural Energy',
    },
  ];

  const renderRoleBadge = (role: AuthorRole, label: string) => {
    switch (role) {
      case 'RESEARCHER':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
            <span>{label}</span>
          </span>
        );
      case 'STUDENT':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-700" />
            <span>{label}</span>
          </span>
        );
      case 'GOVT_OFFICER':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
            <span>{label}</span>
          </span>
        );
      case 'CITIZEN':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <User className="w-3.5 h-3.5 text-blue-700" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 relative">
      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top duration-200 max-w-[90%] text-center">
          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('samvaad', 'title', 'Jan Samvaad Community Forum')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            {t('samvaad', 'title', 'Jan Samvaad Community Forum')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
            {t(
              'samvaad',
              'subtitle',
              'Collaborative forum uniting citizens, university researchers, and student innovators.'
            )}
          </p>
        </div>

        {/* Start Discussion Trigger Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 min-h-[48px] rounded-2xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all self-start sm:self-auto active:scale-95 group"
        >
          <Plus className="w-4 h-4 text-white group-hover:rotate-90 transition-transform" />
          <span>{t('samvaad', 'newDiscussion', 'Start a Discussion')}</span>
        </button>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="space-y-3 bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200 shadow-xs">
        {/* Horizontal Category Filter Pills (>= 48px touch targets) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          {categoryFilters.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 min-h-[48px] rounded-xl whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-sm font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('samvaad', 'searchPlaceholder', 'Search discussions, researcher tags, or villages...')}
            className="w-full pl-9 pr-3 py-2.5 min-h-[48px] text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
            <MessageCircle className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-60" />
            <h3 className="text-sm font-bold text-slate-800">
              {language === 'hi'
                ? 'इस श्रेणी में अभी कोई संवाद नहीं है'
                : language === 'sat'
                ? 'ᱱᱚᱶᱟ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱪᱮᱫ ᱦᱚᱸ ᱵᱟᱹᱱᱩᱜ-ᱟ'
                : 'No discussions in this topic yet'}
            </h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center space-x-1.5 bg-blue-700 text-white px-4 py-2.5 min-h-[48px] rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
              <span>{t('samvaad', 'newDiscussion', 'Start a Discussion')}</span>
            </button>
          </div>
        ) : (
          filteredThreads.map((thread) => {
            const isCommentsOpen = Boolean(expandedComments[thread.id]);

            return (
              <div
                key={thread.id}
                className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all space-y-4"
              >
                {/* Author Info & Role Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm flex-shrink-0">
                      {thread.author.charAt(0)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                          {thread.author}
                        </h3>
                        {renderRoleBadge(thread.role, thread.roleLabel)}
                      </div>

                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span>{thread.location}</span>
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{thread.timeAgo}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Title & Content */}
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {thread.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {thread.content}
                  </p>
                </div>

                {/* Evidence / Caption Pill */}
                {thread.attachmentCaption && (
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-700 flex items-center space-x-2">
                    <span className="text-blue-700 font-bold">✓</span>
                    <span className="font-mono text-[11px]">{thread.attachmentCaption}</span>
                  </div>
                )}

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {thread.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <div className="flex items-center space-x-3">
                    {/* Support / Like */}
                    <button
                      type="button"
                      onClick={() => handleToggleLike(thread.id)}
                      className={`flex items-center space-x-1.5 px-3.5 py-2 min-h-[48px] rounded-xl transition-all active:scale-95 ${
                        thread.isLiked
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          thread.isLiked ? 'fill-blue-600 text-blue-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{thread.likesCount}</span>
                      <span className="hidden sm:inline text-[11px] font-normal">
                        {t('samvaad', 'upvoteDiscussion', 'Support')}
                      </span>
                    </button>

                    {/* Replies Drawer */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedComments((prev) => ({
                          ...prev,
                          [thread.id]: !prev[thread.id],
                        }))
                      }
                      className={`flex items-center space-x-1.5 px-3.5 py-2 min-h-[48px] rounded-xl transition-all active:scale-95 ${
                        isCommentsOpen
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-blue-700" />
                      <span>{thread.replies.length}</span>
                      <span className="hidden sm:inline text-[11px] font-normal">
                        {t('samvaad', 'replies', 'Replies')}
                      </span>
                    </button>
                  </div>

                  {/* Share */}
                  <button
                    type="button"
                    onClick={() => handleShareThread(thread)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 min-h-[48px] rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors active:scale-95"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {language === 'hi' ? 'साझा करें' : language === 'sat' ? 'ᱦᱟᱹᱴᱤᱧ ᱢᱮ' : 'Share'}
                    </span>
                  </button>
                </div>

                {/* Comment Drawer */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                    <div className="space-y-2 pl-2 sm:pl-4 border-l-2 border-blue-200">
                      {thread.replies.length === 0 ? (
                        <p className="text-xs text-slate-400 py-1">
                          {language === 'hi'
                            ? 'अभी कोई प्रतिक्रिया नहीं है। पहली प्रतिक्रिया दें!'
                            : language === 'sat'
                            ? 'ᱪᱮᱫ ᱦᱚᱸ ᱛᱮᱞᱟ ᱵᱟᱹᱱᱩᱜ-ᱟ᱾'
                            : 'No replies yet. Be the first to share an insight!'}
                        </p>
                      ) : (
                        thread.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1 text-xs"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-slate-900">{reply.author}</span>
                                {renderRoleBadge(reply.role, reply.roleLabel)}
                              </div>
                              <span className="text-[10px] text-slate-400">{reply.timeAgo}</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{reply.content}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Reply Input Form */}
                    <form
                      onSubmit={(e) => handlePostReply(thread.id, e)}
                      className="flex items-center space-x-2 pt-1"
                    >
                      <input
                        type="text"
                        value={replyInputText[thread.id] || ''}
                        onChange={(e) =>
                          setReplyInputText((prev) => ({
                            ...prev,
                            [thread.id]: e.target.value,
                          }))
                        }
                        placeholder={
                          language === 'hi'
                            ? 'अपनी राय या समाधान लिखें...'
                            : language === 'sat'
                            ? 'ᱟᱢᱟᱜ ᱵᱤᱪᱟᱹᱨ ᱚᱞ ᱢᱮ...'
                            : 'Add to the discussion or propose an approach...'
                        }
                        className="flex-1 text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-50"
                      />
                      <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white p-3 min-h-[48px] min-w-[48px] rounded-xl transition-all shadow-xs flex items-center justify-center"
                        title="Send Reply"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Start a Discussion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {t('samvaad', 'newDiscussion', 'Start a Discussion')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDiscussion} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  {language === 'hi' ? 'चर्चा का शीर्षक' : language === 'sat' ? 'ᱨᱚᱯᱚᱲ ᱧᱩᱛᱩᱢ' : 'Discussion Title'} *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'उदा. गांव में सौर ऊर्जा ड्रायर की आवश्यकता'
                      : language === 'sat'
                      ? 'ᱡᱮᱞᱮᱠᱟ: ᱟᱹᱛᱩ ᱨᱮ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ'
                      : 'e.g., Request for Solar Dryer Trial in Murhu'
                  }
                  className="w-full text-xs border border-slate-200 rounded-xl p-3 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  {language === 'hi' ? 'विस्तृत विवरण' : language === 'sat' ? 'ᱵᱤᱥᱛᱟᱹᱨ ᱛᱮ ᱚᱞ' : 'Detailed Content'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'समस्या अथवा नवाचार विचार विस्तार से लिखें...'
                      : language === 'sat'
                      ? 'ᱟᱢᱟᱜ ᱵᱤᱪᱟᱹᱨ ᱵᱤᱥᱛᱟᱹᱨ ᱛᱮ ᱚᱞ ᱢᱮ...'
                      : 'Describe the problem or proposed innovation in detail...'
                  }
                  className="w-full text-xs border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 min-h-[48px] rounded-xl shadow transition-all"
              >
                {language === 'hi'
                  ? 'चर्चा प्रकाशित करें'
                  : language === 'sat'
                  ? 'ᱨᱚᱯᱚᱲ ᱪᱷᱟᱯᱟᱭ ᱢᱮ'
                  : 'Publish Discussion'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
