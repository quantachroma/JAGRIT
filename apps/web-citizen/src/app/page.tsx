'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users,
  GraduationCap,
  Briefcase,
  Landmark,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  FileText,
  Building,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useLanguage, type AppLanguage } from '@/context/LanguageContext';
import { useCitizen } from '@/context/CitizenContext';
import { MOCK_ACCOUNTS, saveActiveSession, type MockUser } from '@/lib/mock-auth';

type StakeholderRole = 'CITIZEN' | 'UNIVERSITY' | 'INDUSTRY' | 'GOVERNMENT';

export default function HomeLoginPage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const { login } = useCitizen();

  // Theatrical Curtain State (Default false = curtains closed)
  const [curtainOpen, setCurtainOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);

  // Active Stakeholder Role Tab
  const [activeRole, setActiveRole] = useState<StakeholderRole>('CITIZEN');

  // Form State
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Role-Specific Authorization Fields
  const [citizenIdType, setCitizenIdType] = useState<string>('voter');
  const [citizenIdNumber, setCitizenIdNumber] = useState<string>('');

  const [universityInstitution, setUniversityInstitution] = useState<string>('bit-mesra');
  const [universityAcademicId, setUniversityAcademicId] = useState<string>('');

  const [industryCinOrCsr, setIndustryCinOrCsr] = useState<string>('');
  const [industrySector, setIndustrySector] = useState<string>('mining');

  const [govtDepartment, setGovtDepartment] = useState<string>('dhte');
  const [govtServiceCode, setGovtServiceCode] = useState<string>('');

  // Status & Feedback
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authSuccessRole, setAuthSuccessRole] = useState<string | null>(null);

  // Check if session previously marked curtain as opened in current session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const openedBefore = sessionStorage.getItem('jagrit_curtain_viewed');
      if (openedBefore === 'true') {
        setCurtainOpen(true);
      }
    }
  }, []);

  const handleOpenCurtain = () => {
    if (curtainOpen || isOpening) return;
    setIsOpening(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jagrit_curtain_viewed', 'true');
    }
    setTimeout(() => {
      setCurtainOpen(true);
      setIsOpening(false);
    }, 750);
  };

  const handleReplayCurtain = () => {
    setCurtainOpen(false);
    setIsOpening(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jagrit_curtain_viewed');
    }
  };

  // Populate fields and authenticate with 1-Click Fast Pass
  const handleFastPass = (roleKey: 'citizen' | 'university' | 'industry' | 'government') => {
    const mockUser: MockUser = MOCK_ACCOUNTS[roleKey];
    setActiveRole(mockUser.role);
    setEmailOrPhone(mockUser.email);
    setPassword(mockUser.password);

    if (mockUser.role === 'CITIZEN') {
      setCitizenIdType('voter');
      setCitizenIdNumber(mockUser.authId);
    } else if (mockUser.role === 'UNIVERSITY') {
      setUniversityInstitution('bit-mesra');
      setUniversityAcademicId(mockUser.authId);
    } else if (mockUser.role === 'INDUSTRY') {
      setIndustryCinOrCsr(mockUser.authId);
      setIndustrySector('mining');
    } else if (mockUser.role === 'GOVERNMENT') {
      setGovtDepartment('dhte');
      setGovtServiceCode(mockUser.authId);
    }

    setIsAuthenticating(true);
    setAuthSuccessRole(mockUser.role);
    saveActiveSession(mockUser);
    login(mockUser.email, mockUser.name);

    setTimeout(() => {
      router.push(mockUser.targetDashboard);
    }, 600);
  };

  // Manual Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    const roleKey = activeRole.toLowerCase() as keyof typeof MOCK_ACCOUNTS;
    const baseMock = MOCK_ACCOUNTS[roleKey] || MOCK_ACCOUNTS.citizen;

    const sessionUser: MockUser = {
      ...baseMock,
      role: activeRole,
      email: emailOrPhone || baseMock.email,
      targetDashboard:
        activeRole === 'CITIZEN'
          ? '/dashboard'
          : activeRole === 'UNIVERSITY'
          ? '/university/dashboard'
          : activeRole === 'INDUSTRY'
          ? '/industry/dashboard'
          : '/government/dashboard',
    };

    saveActiveSession(sessionUser);
    login(sessionUser.email, sessionUser.name);
    setAuthSuccessRole(activeRole);

    setTimeout(() => {
      router.push(sessionUser.targetDashboard);
    }, 600);
  };

  // Pure Translations
  const content = {
    en: {
      appName: 'JAGRIT',
      appSubtitle: 'Jharkhand Academic & Grassroots Resolution for Innovation and Transformation',
      tagline: 'Grassroots Problems. Academic Solutions.',
      clickToEnter: 'Enter Portal',
      curtainInstruction: 'Click anywhere to unveil login portal',
      signInTitle: 'Single Sign-On Authentication',
      signInSubtitle: 'Select your stakeholder category to access portal',
      signInButton: 'Sign In',
      registerLink: "Don't have an account? Register Now",
      emailPhoneLabel: 'Registered Email or Phone Number',
      passwordLabel: 'Security Password',
      roles: {
        citizen: 'Citizen',
        university: 'University',
        industry: 'Industry',
        government: 'Government',
      },
      citizen: {
        idTypeLabel: 'Identity Document Type',
        idNumberLabel: 'Document ID Number',
        idTypes: {
          voter: 'Voter ID Card (EPIC)',
          aadhaar: 'Aadhaar Virtual ID',
          ration: 'Ration Card (NFSA)',
        },
        placeholderId: 'e.g. JH-2026-9941',
      },
      university: {
        institutionLabel: 'Recognized Higher Education Institution',
        academicIdLabel: 'Faculty Employee ID or Student APAAR ID',
        institutions: {
          bit: 'Birla Institute of Technology (BIT) Mesra',
          nit: 'National Institute of Technology (NIT) Jamshedpur',
          iit: 'IIT (Indian School of Mines) Dhanbad',
          bau: 'Birsa Agricultural University (BAU) Ranchi',
        },
        placeholderId: 'e.g. AISHE-U-0204',
      },
      industry: {
        cinLabel: 'Corporate Identification (CIN) or Form CSR-1 Reg ID',
        sectorLabel: 'Primary CSR & Technology Focus Sector',
        sectors: {
          mining: 'Mining & Metallurgy Innovation',
          agritech: 'Agritech, Food Security & Water Systems',
          energy: 'Renewable Energy & Clean Tech',
        },
        placeholderId: 'e.g. CSR-1-JH-00421',
      },
      government: {
        deptLabel: 'State Administrative Department',
        codeLabel: 'Official Service Code or Jan Parichay Token',
        depts: {
          dhte: 'Higher & Technical Education (DHTE)',
          ulb: 'Urban Local Body & Municipal Administration',
          panchayat: 'Panchayati Raj & Rural Development',
        },
        placeholderId: 'e.g. JH-GOV-DHTE-001',
      },
      fastPassTitle: 'Quick Demo Fast-Pass (1-Click Login for Judges):',
      verifying: 'Verifying Credentials...',
      replayCurtain: 'Replay Splash Curtain',
    },
    hi: {
      appName: 'जागृत',
      appSubtitle: 'झारखंड एकेडमिक एवं जमीनी स्तर नवाचार और रूपांतरण समाधान',
      tagline: 'जमीनी समस्याएं, शैक्षणिक समाधान।',
      clickToEnter: 'प्रवेश करें',
      curtainInstruction: 'पोर्टल खोलने के लिए कहीं भी क्लिक करें',
      signInTitle: 'एकल साइन-ऑन प्रमाणीकरण',
      signInSubtitle: 'पोर्टल में प्रवेश के लिए अपना हितधारक वर्ग चुनें',
      signInButton: 'साइन इन करें',
      registerLink: 'खाता नहीं है? अभी पंजीकरण करें',
      emailPhoneLabel: 'पंजीकृत ईमेल अथवा मोबाइल नंबर',
      passwordLabel: 'सुरक्षा पासवर्ड',
      roles: {
        citizen: 'नागरिक',
        university: 'विश्वविद्यालय',
        industry: 'उद्योग',
        government: 'सरकार',
      },
      citizen: {
        idTypeLabel: 'पहचान दस्तावेज का प्रकार',
        idNumberLabel: 'दस्तावेज पहचान संख्या',
        idTypes: {
          voter: 'मतदाता पहचान पत्र (EPIC)',
          aadhaar: 'आधार वर्चुअल आईडी',
          ration: 'राशन कार्ड (NFSA)',
        },
        placeholderId: 'उदा. JH-2026-9941',
      },
      university: {
        institutionLabel: 'मान्यता प्राप्त उच्च शिक्षण संस्थान',
        academicIdLabel: 'संकाय कर्मचारी आईडी अथवा छात्र अपार आईडी',
        institutions: {
          bit: 'बिरला इंस्टीट्यूट ऑफ टेक्नोलॉजी (बीआईटी) मेसरा',
          nit: 'राष्ट्रीय प्रौद्योगिकी संस्थान (एनआईटी) जमशेदपुर',
          iit: 'आईआईटी (आईएसएम) धनबाद',
          bau: 'बिरसा कृषि विश्वविद्यालय (बीएयू) रांची',
        },
        placeholderId: 'उदा. AISHE-U-0204',
      },
      industry: {
        cinLabel: 'कॉर्पोरेट पहचान संख्या (CIN) अथवा फॉर्म CSR-1',
        sectorLabel: 'प्राथमिक सीएसआर एवं प्रौद्योगिकी क्षेत्र',
        sectors: {
          mining: 'खनन एवं धातुकर्म नवाचार',
          agritech: 'कृषि तकनीक एवं जल संरक्षण',
          energy: 'नवीकरणीय ऊर्जा एवं स्वच्छ तकनीक',
        },
        placeholderId: 'उदा. CSR-1-JH-00421',
      },
      government: {
        deptLabel: 'राज्य प्रशासनिक विभाग',
        codeLabel: 'आधिकारिक सेवा कोड अथवा जन परिचय टोकन',
        depts: {
          dhte: 'उच्च एवं तकनीकी शिक्षा विभाग (DHTE)',
          ulb: 'शहरी स्थानीय निकाय एवं नगर प्रशासन',
          panchayat: 'पंचायती राज एवं ग्रामीण विकास',
        },
        placeholderId: 'उदा. JH-GOV-DHTE-001',
      },
      fastPassTitle: 'त्वरित डेमो फास्ट-पास (मूल्यांकनकर्ताओं के लिए 1-क्लिक लॉगिन):',
      verifying: 'सत्यापन जारी है...',
      replayCurtain: 'पर्दा पुनः देखें',
    },
    sat: {
      appName: 'JAGRIT',
      appSubtitle: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱮᱪᱮᱫ ᱟᱨ ᱜᱟᱹᱦᱤᱨ ᱛᱷᱚᱠ ᱨᱮᱱᱟᱜ ᱱᱟᱶᱟ ᱩᱭᱦᱟᱹᱨ ᱟᱨ ᱵᱚᱫᱚᱞ ᱥᱚᱞᱦᱮ',
      tagline: 'ᱜᱟᱹᱦᱤᱨ ᱮᱴᱠᱮᱴᱚᱬᱮ, ᱥᱮᱪᱮᱫ ᱥᱚᱞᱦᱮ᱾',
      clickToEnter: 'ᱵᱚᱞᱚᱱ ᱢᱮ',
      curtainInstruction: 'ᱯᱳᱨᱴᱟᱞ ᱡᱷᱤᱡ ᱞᱟᱹᱜᱤᱫ ᱡᱟᱦᱟᱸᱨᱮᱜᱮ ᱚᱛᱟᱭ ᱢᱮ',
      signInTitle: 'ᱢᱤᱫ ᱴᱷᱟᱶ ᱞᱚᱜᱤᱱ ᱥᱟᱹᱵᱤᱛ',
      signInSubtitle: 'ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱵᱚᱞᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱟᱢᱟᱜ ᱛᱷᱚᱠ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      signInButton: 'ᱵᱚᱞᱚᱱ ᱢᱮ',
      registerLink: 'ᱠᱷᱟᱛᱟ ᱵᱟᱹᱱᱩᱜᱼᱟ? ᱱᱤᱛ ᱜᱮ ᱨᱮᱡᱤᱥᱴᱟᱨ ᱢᱮ',
      emailPhoneLabel: 'ᱤᱢᱮᱞ ᱥᱮ ᱢᱚᱵᱟᱭᱤᱞ ᱮᱞ',
      passwordLabel: 'ᱫᱟᱱᱟᱝ ᱥᱟᱵᱟᱫᱽ',
      roles: {
        citizen: 'ᱱᱟᱜᱟᱨᱤᱠ',
        university: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ',
        industry: 'ᱵᱤᱨᱤᱫ',
        government: 'ᱥᱚᱨᱠᱟᱨ',
      },
      citizen: {
        idTypeLabel: 'ᱩᱯᱨᱩᱢ ᱥᱟᱠᱟᱢ ᱞᱮᱠᱟᱱ',
        idNumberLabel: 'ᱥᱟᱠᱟᱢ ᱮᱞ',
        idTypes: {
          voter: 'ᱵᱷᱳᱴᱟᱨ ᱠᱟᱨᱰ (EPIC)',
          aadhaar: 'ᱟᱫᱷᱟᱨ ᱵᱷᱟᱨᱪᱩᱣᱟᱞ ᱟᱭᱰᱤ',
          ration: 'ᱨᱮᱥᱚᱱ ᱠᱟᱨᱰ (NFSA)',
        },
        placeholderId: 'ᱫᱟᱹᱭᱠᱟᱹ: JH-2026-9941',
      },
      university: {
        institutionLabel: 'ᱪᱮᱛᱟᱱ ᱥᱮᱪᱮᱫ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ',
        academicIdLabel: 'ᱯᱷᱮᱠᱟᱞᱴᱤ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱟᱭᱰᱤ ᱥᱮ ᱟᱯᱟᱨ ᱮᱞ',
        institutions: {
          bit: 'ᱵᱤᱨᱞᱟ ᱤᱱᱥᱴᱤᱴᱤᱭᱩᱴ ᱚᱯᱷ ᱴᱮᱠᱱᱚᱞᱚᱡᱤ (BIT) ᱢᱮᱥᱨᱟ',
          nit: 'ᱱᱮᱥᱱᱟᱞ ᱤᱱᱥᱴᱤᱴᱤᱭᱩᱴ ᱚᱯᱷ ᱴᱮᱠᱱᱚᱞᱚᱡᱤ (NIT) ᱡᱟᱢᱥᱮᱫᱽᱯᱩᱨ',
          iit: 'IIT (ISM) ᱫᱷᱟᱱᱵᱟᱫᱽ',
          bau: 'ᱵᱤᱨᱥᱟ ᱪᱟᱥ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ (BAU) ᱨᱟᱺᱪᱤ',
        },
        placeholderId: 'ᱫᱟᱹᱭᱠᱟᱹ: AISHE-U-0204',
      },
      industry: {
        cinLabel: 'ᱠᱚᱨᱯᱚᱨᱮᱴ ᱩᱯᱨᱩᱢ ᱮᱞ (CIN) ᱥᱮ ᱯᱷᱚᱨᱢ CSR-1',
        sectorLabel: 'ᱢᱩᱬᱩᱛ CSR ᱴᱮᱠᱱᱚᱞᱚᱡᱤ ᱠᱷᱮᱛᱨᱚ',
        sectors: {
          mining: 'ᱠᱷᱟᱫᱟᱱ ᱟᱨ ᱢᱮᱬᱦᱮᱫ ᱦᱩᱱᱟᱹᱨ',
          agritech: 'ᱪᱟᱥ ᱦᱩᱱᱟᱹᱨ ᱟᱨ ᱫᱟᱜ',
          energy: 'ᱱᱟᱶᱟ ᱫᱟᱲᱮ ᱟᱨ ᱥᱟᱯᱷᱟ ᱴᱮᱠ',
        },
        placeholderId: 'ᱫᱟᱹᱭᱠᱟᱹ: CSR-1-JH-00421',
      },
      government: {
        deptLabel: 'ᱯᱚᱱᱚᱛ ᱥᱟᱥᱚᱱ ᱵᱤᱵᱷᱟᱜᱽ',
        codeLabel: 'ᱥᱚᱨᱠᱟᱨᱤ ᱠᱟᱹᱢᱤ ᱠᱳᱰ ᱥᱮ ᱡᱟᱱ ᱯᱚᱨᱤᱪᱚᱭ ᱴᱳᱠᱮᱱ',
        depts: {
          dhte: 'ᱪᱮᱛᱟᱱ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱥᱮᱪᱮᱫ (DHTE)',
          ulb: 'ᱥᱟᱦᱟᱨ ᱱᱤᱠᱟᱭ ᱟᱨ ᱢᱩᱱᱤᱥᱤᱯᱟᱞ',
          panchayat: 'ᱯᱚᱧᱪᱟᱭᱮᱛ ᱨᱟᱡᱽ ᱟᱨ ᱟᱹᱛᱩ ᱩᱛᱱᱟᱹᱣ',
        },
        placeholderId: 'ᱫᱟᱹᱭᱠᱟᱹ: JH-GOV-DHTE-001',
      },
      fastPassTitle: 'ᱞᱚᱜᱚᱱ ᱰᱮᱢᱚ ᱯᱷᱟᱥᱴ-ᱯᱟᱥ (ᱡᱚᱡᱽ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱑-ᱠᱞᱤᱠ ᱞᱚᱜᱤᱱ):',
      verifying: 'ᱥᱟᱹᱨᱤᱭᱟᱹᱛ ᱧᱮᱞᱚᱜ ᱠᱟᱱᱟ...',
      replayCurtain: 'ᱯᱚᱨᱫᱟ ᱫᱚᱦᱲᱟ ᱧᱮᱞ ᱢᱮ',
    },
  }[language];

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-6 px-3.5 sm:px-6">
      {/* ========================================================================= */}
      {/* DELIVERABLE 2: THEATRICAL NAMASTE CURTAINS SPLASH OVERLAY */}
      {/* ========================================================================= */}
      <div
        onClick={handleOpenCurtain}
        className={`fixed inset-0 z-50 transition-visibility duration-750 ${
          curtainOpen ? 'pointer-events-none' : 'cursor-pointer'
        }`}
        aria-hidden={curtainOpen}
      >
        {/* Top-Right Language Bar (Floating above curtains) */}
        {!curtainOpen && (
          <div
            className="absolute top-4 right-4 sm:top-6 sm:right-8 z-60 flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-blue-200 shadow-lg shadow-blue-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            {(['en', 'hi', 'sat'] as AppLanguage[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-bold transition-all ${
                  language === lang
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'ᱥᱟᱱᱛᱟᱲᱤ'}
              </button>
            ))}
          </div>
        )}

        {/* Theatrical Curtain Panels: Left Panel & Right Panel */}
        <div className="absolute inset-0 flex overflow-hidden">
          {/* LEFT CURTAIN PANEL */}
          <div
            className={`w-1/2 h-full bg-gradient-to-br from-white via-blue-50/60 to-slate-100 border-r border-blue-200/80 shadow-2xl flex items-center justify-end pr-2 sm:pr-6 relative transition-transform duration-700 ease-in-out ${
              curtainOpen ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Subtle decorative vertical stripe */}
            <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 opacity-60" />

            {/* Left Namaste Hand (Part of central emblem) */}
            <div
              className={`transform transition-transform duration-700 ease-out flex flex-col items-end ${
                curtainOpen ? '-translate-x-16 opacity-0' : 'translate-x-0 opacity-100'
              }`}
            >
              <div className="w-16 h-28 sm:w-24 sm:h-36 flex items-center justify-end">
                <svg
                  viewBox="0 0 100 160"
                  className="w-full h-full text-blue-600 drop-shadow-[0_8px_20px_rgba(37,99,235,0.25)]"
                  fill="currentColor"
                >
                  {/* Stylized Left Praying Hand */}
                  <path d="M90 10 C85 10, 70 30, 65 55 C60 75, 62 100, 64 125 C65 140, 72 150, 85 155 C90 157, 95 150, 95 140 L95 15 C95 12, 93 10, 90 10 Z" />
                  <path d="M78 30 C72 30, 58 48, 54 70 C50 90, 54 115, 58 135" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.8" />
                  <path d="M66 50 C60 52, 48 68, 44 88 C40 106, 44 125, 48 140" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT CURTAIN PANEL */}
          <div
            className={`w-1/2 h-full bg-gradient-to-bl from-white via-blue-50/60 to-slate-100 border-l border-blue-200/80 shadow-2xl flex items-center justify-start pl-2 sm:pl-6 relative transition-transform duration-700 ease-in-out ${
              curtainOpen ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Subtle decorative vertical stripe */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 opacity-60" />

            {/* Right Namaste Hand (Part of central emblem) */}
            <div
              className={`transform transition-transform duration-700 ease-out flex flex-col items-start ${
                curtainOpen ? 'translate-x-16 opacity-0' : 'translate-x-0 opacity-100'
              }`}
            >
              <div className="w-16 h-28 sm:w-24 sm:h-36 flex items-center justify-start">
                <svg
                  viewBox="0 0 100 160"
                  className="w-full h-full text-blue-600 drop-shadow-[0_8px_20px_rgba(37,99,235,0.25)]"
                  fill="currentColor"
                >
                  {/* Stylized Right Praying Hand (Mirrored) */}
                  <path d="M10 10 C15 10, 30 30, 35 55 C40 75, 38 100, 36 125 C35 140, 28 150, 15 155 C10 157, 5 150, 5 140 L5 15 C5 12, 7 10, 10 10 Z" />
                  <path d="M22 30 C28 30, 42 48, 46 70 C50 90, 46 115, 42 135" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.8" />
                  <path d="M34 50 C40 52, 52 68, 56 88 C60 106, 56 125, 52 140" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Central Overlay Typography & Enter Button (Fades out when curtains part) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-55 pointer-events-none transition-all duration-500 ${
            curtainOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
        >
          {/* Subtle Glow Aura behind Namaste Icon */}
          <div className="relative mb-4 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-blue-500/15 blur-2xl animate-pulse pointer-events-none" />
          </div>

          <div className="space-y-3 max-w-xl">
            {/* National/State Insignia Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Government of Jharkhand · DHTE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#1E3A8A] tracking-tight">
              {content.appName}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md mx-auto leading-relaxed">
              {content.appSubtitle}
            </p>

            <div className="pt-2">
              <span className="inline-block text-sm sm:text-base font-bold text-blue-600 bg-blue-50/80 px-4 py-1.5 rounded-xl border border-blue-100">
                {content.tagline}
              </span>
            </div>
          </div>

          {/* Interactive Enter Button */}
          <div className="mt-8 pointer-events-auto">
            <button
              type="button"
              onClick={handleOpenCurtain}
              className="inline-flex items-center space-x-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 min-h-[52px] rounded-2xl text-base shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 group"
            >
              <span>{content.clickToEnter}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              {content.curtainInstruction}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DELIVERABLE 3: THE 4-ROLE LOGIN CARD & REPLAY SPLASH BUTTON */}
      {/* ========================================================================= */}
      <div
        className={`w-full max-w-lg mx-auto transition-all duration-700 ${
          curtainOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Replay Curtain Reveal Control Button */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Official Authentication Gateway</span>
          </div>

          <button
            type="button"
            onClick={handleReplayCurtain}
            className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-white hover:bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl shadow-2xs transition-all active:scale-95"
            title="Replay Theatrical Curtain Animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{content.replayCurtain}</span>
          </button>
        </div>

        {/* Pure White Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Card Header */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 text-2xl shadow-xs mx-auto mb-1">
              🏛️
            </div>
            <h2 className="text-2xl font-black text-blue-950 tracking-tight">
              {content.appName}
            </h2>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto leading-tight">
              {content.appSubtitle}
            </p>
          </div>

          {/* 4-Role Tab Selector */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200">
              {/* Tab 1: Citizen */}
              <button
                type="button"
                onClick={() => setActiveRole('CITIZEN')}
                className={`flex items-center justify-center space-x-1.5 py-2.5 px-2 min-h-[44px] rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  activeRole === 'CITIZEN'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:text-blue-600 border border-slate-200/80'
                }`}
              >
                <span>👥</span>
                <span className="truncate">{content.roles.citizen}</span>
              </button>

              {/* Tab 2: University */}
              <button
                type="button"
                onClick={() => setActiveRole('UNIVERSITY')}
                className={`flex items-center justify-center space-x-1.5 py-2.5 px-2 min-h-[44px] rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  activeRole === 'UNIVERSITY'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:text-blue-600 border border-slate-200/80'
                }`}
              >
                <span>🎓</span>
                <span className="truncate">{content.roles.university}</span>
              </button>

              {/* Tab 3: Industry */}
              <button
                type="button"
                onClick={() => setActiveRole('INDUSTRY')}
                className={`flex items-center justify-center space-x-1.5 py-2.5 px-2 min-h-[44px] rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  activeRole === 'INDUSTRY'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:text-blue-600 border border-slate-200/80'
                }`}
              >
                <span>💼</span>
                <span className="truncate">{content.roles.industry}</span>
              </button>

              {/* Tab 4: Government */}
              <button
                type="button"
                onClick={() => setActiveRole('GOVERNMENT')}
                className={`flex items-center justify-center space-x-1.5 py-2.5 px-2 min-h-[44px] rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  activeRole === 'GOVERNMENT'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:text-blue-600 border border-slate-200/80'
                }`}
              >
                <span>🏛️</span>
                <span className="truncate">{content.roles.government}</span>
              </button>
            </div>
          </div>

          {/* Interactive Form with Dynamic Role Authorization Inputs */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Common Input 1: Email or Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {content.emailPhoneLabel} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder={
                    activeRole === 'CITIZEN'
                      ? 'citizen@jagrit.jharkhand.gov.in'
                      : activeRole === 'UNIVERSITY'
                      ? 'dean.research@bitmesra.ac.in'
                      : activeRole === 'INDUSTRY'
                      ? 'csr.lead@tatasteel.com'
                      : 'dhte.secretary@jharkhand.gov.in'
                  }
                  className="w-full pl-10 pr-3.5 py-2.5 min-h-[44px] text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none bg-slate-50/50 text-slate-900 transition-colors"
                />
              </div>
            </div>

            {/* Common Input 2: Password with reveal toggle */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {content.passwordLabel} *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 min-h-[44px] text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none bg-slate-50/50 text-slate-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* =================================================================== */}
            {/* DYNAMIC ROLE-SPECIFIC AUTHORIZATION INPUTS */}
            {/* =================================================================== */}

            {/* 1. CITIZEN DYNAMIC INPUTS */}
            {activeRole === 'CITIZEN' && (
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-blue-900">
                    {content.citizen.idTypeLabel}
                  </label>
                  <select
                    value={citizenIdType}
                    onChange={(e) => setCitizenIdType(e.target.value)}
                    className="w-full px-3 py-2 min-h-[40px] text-xs border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800"
                  >
                    <option value="voter">{content.citizen.idTypes.voter}</option>
                    <option value="aadhaar">{content.citizen.idTypes.aadhaar}</option>
                    <option value="ration">{content.citizen.idTypes.ration}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-blue-900">
                    {content.citizen.idNumberLabel}
                  </label>
                  <input
                    type="text"
                    value={citizenIdNumber}
                    onChange={(e) => setCitizenIdNumber(e.target.value)}
                    placeholder={content.citizen.placeholderId}
                    className="w-full px-3 py-2 min-h-[40px] text-xs border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800 font-mono"
                  />
                </div>
              </div>
            )}

            {/* 2. UNIVERSITY DYNAMIC INPUTS */}
            {activeRole === 'UNIVERSITY' && (
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-blue-900">
                    {content.university.institutionLabel}
                  </label>
                  <select
                    value={universityInstitution}
                    onChange={(e) => setUniversityInstitution(e.target.value)}
                    className="w-full px-3 py-2 min-h-[40px] text-xs border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800"
                  >
                    <option value="bit-mesra">{content.university.institutions.bit}</option>
                    <option value="nit-jsr">{content.university.institutions.nit}</option>
                    <option value="iit-ism">{content.university.institutions.iit}</option>
                    <option value="bau-ranchi">{content.university.institutions.bau}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-blue-900">
                    {content.university.academicIdLabel}
                  </label>
                  <input
                    type="text"
                    value={universityAcademicId}
                    onChange={(e) => setUniversityAcademicId(e.target.value)}
                    placeholder={content.university.placeholderId}
                    className="w-full px-3 py-2 min-h-[40px] text-xs border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800 font-mono"
                  />
                </div>
              </div>
            )}

            {/* 3. INDUSTRY DYNAMIC INPUTS */}
            {activeRole === 'INDUSTRY' && (
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-blue-900">
                    {content.industry.cinLabel}
                  </label>
                  <input
                    type="text"
                    value={industryCinOrCsr}
                    onChange={(e) => setIndustryCinOrCsr(e.target.value)}
                    placeholder={content.industry.placeholderId}
                    className="w-full px-3 py-2 min-h-[40px] text-xs border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-blue-900">
                    {content.industry.sectorLabel}
                  </label>
                  <select
                    value={industrySector}
                    onChange={(e) => setIndustrySector(e.target.value)}
                    className="w-full px-3 py-2 min-h-[40px] text-xs border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800"
                  >
                    <option value="mining">{content.industry.sectors.mining}</option>
                    <option value="agritech">{content.industry.sectors.agritech}</option>
                    <option value="energy">{content.industry.sectors.energy}</option>
                  </select>
                </div>
              </div>
            )}

            {/* 4. GOVERNMENT DYNAMIC INPUTS */}
            {activeRole === 'GOVERNMENT' && (
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-blue-900">
                    {content.government.deptLabel}
                  </label>
                  <select
                    value={govtDepartment}
                    onChange={(e) => setGovtDepartment(e.target.value)}
                    className="w-full px-3 py-2 min-h-[40px] text-xs border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800"
                  >
                    <option value="dhte">{content.government.depts.dhte}</option>
                    <option value="ulb">{content.government.depts.ulb}</option>
                    <option value="panchayat">{content.government.depts.panchayat}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-blue-900">
                    {content.government.codeLabel}
                  </label>
                  <input
                    type="text"
                    value={govtServiceCode}
                    onChange={(e) => setGovtServiceCode(e.target.value)}
                    placeholder={content.government.placeholderId}
                    className="w-full px-3 py-2 min-h-[40px] text-xs border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800 font-mono"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 min-h-[48px] rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-[0.99] flex items-center justify-center space-x-2 disabled:opacity-75"
            >
              {isAuthenticating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">{content.verifying}</span>
                </>
              ) : (
                <>
                  <span className="text-sm">{content.signInButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Navigation Link: Don't have an account? Register Now */}
          <div className="pt-2 text-center border-t border-slate-100">
            <Link
              href="/register"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center space-x-1"
            >
              <span>{content.registerLink}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DELIVERABLE 4: 1-CLICK FAST-PASS DEMO BAR (FOR HACKATHON EVALUATORS) */}
        {/* ========================================================================= */}
        <div className="mt-6 bg-white rounded-2xl border border-blue-200 shadow-sm p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-950">
              <span className="text-base">⚡</span>
              <span>{content.fastPassTitle}</span>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              Instant Access
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* 1-Click Citizen */}
            <button
              type="button"
              onClick={() => handleFastPass('citizen')}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 min-h-[42px] bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              <span>👥</span>
              <span className="truncate">{content.roles.citizen}</span>
            </button>

            {/* 1-Click University */}
            <button
              type="button"
              onClick={() => handleFastPass('university')}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 min-h-[42px] bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              <span>🎓</span>
              <span className="truncate">{content.roles.university}</span>
            </button>

            {/* 1-Click Industry */}
            <button
              type="button"
              onClick={() => handleFastPass('industry')}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 min-h-[42px] bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              <span>💼</span>
              <span className="truncate">{content.roles.industry}</span>
            </button>

            {/* 1-Click Government */}
            <button
              type="button"
              onClick={() => handleFastPass('government')}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 min-h-[42px] bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-2xs"
            >
              <span>🏛️</span>
              <span className="truncate">{content.roles.government}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
