'use client';

import React, { useState } from 'react';
import { StatewideLanguage } from './statewide-types';
import {
  X,
  Zap,
  CheckCircle2,
  PackageCheck,
  Cpu,
  FileCheck2,
  BookOpen,
  Boxes,
  Send,
  Building2,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface BlueprintCloneModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprintId?: string;
  solutionTitle?: string;
  bomAmount?: string;
  language: StatewideLanguage;
}

const JHARKHAND_DISTRICTS = [
  'Garhwa',
  'Godda',
  'Palamu',
  'Chatra',
  'Latehar',
  'Dumka',
  'Deoghar',
  'Sahibganj',
  'Pakur',
  'Jamtara',
  'Hazaribagh',
  'Giridih',
  'Bokaro',
  'Dhanbad',
  'Ranchi',
  'Khunti',
  'Gumla',
  'Simdega',
  'Lohardaga',
  'West Singhbhum',
  'East Singhbhum',
  'Seraikela Kharsawan',
  'Ramgarh',
  'Koderma',
];

const POLYTECHNICS_BY_DISTRICT: Record<string, string[]> = {
  Garhwa: ['Government Polytechnic Garhwa', 'Shri Sadguru Seva Polytechnic Garhwa'],
  Godda: ['Government Polytechnic Godda', 'Santhal Pargana Engineering Institute Godda'],
  Palamu: ['Government Polytechnic Medininagar', 'Palamu Regional Engineering College'],
  Chatra: ['Government Polytechnic Chatra'],
  Latehar: ['Government Polytechnic Latehar'],
  Dumka: ['Dumka Engineering College', 'Government Polytechnic Dumka'],
  Deoghar: ['BIT Mesra Deoghar Campus', 'Government Polytechnic Deoghar'],
  Sahibganj: ['Government Polytechnic Sahibganj'],
  Pakur: ['Government Polytechnic Pakur'],
  Ranchi: ['Government Polytechnic Ranchi', 'BIT Mesra Innovation Cell'],
  Khunti: ['Government Polytechnic Khunti'],
  'West Singhbhum': ['Government Polytechnic Chaibasa', 'Chaibasa Engineering College'],
  'East Singhbhum': ['NIT Jamshedpur Rural Extension Center', 'Government Polytechnic Jamshedpur'],
  Dhanbad: ['IIT (ISM) Dhanbad Center for Rural Tech', 'Government Polytechnic Dhanbad'],
};

export default function BlueprintCloneModal({
  isOpen,
  onClose,
  blueprintId = '#BP-WTR-004',
  solutionTitle = 'Solar Defluoridation Unit for Rural Borewell',
  bomAmount = '₹2,65,000',
  language,
}: BlueprintCloneModalProps) {
  const [targetDistrict, setTargetDistrict] = useState<string>('Garhwa');
  const [targetBlock, setTargetBlock] = useState<string>('Meral');
  const [receivingInstitution, setReceivingInstitution] = useState<string>(
    'Government Polytechnic Garhwa'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dispatchOrder, setDispatchOrder] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDistrictChange = (dist: string) => {
    setTargetDistrict(dist);
    const available = POLYTECHNICS_BY_DISTRICT[dist] || ['Government Polytechnic ' + dist];
    setReceivingInstitution(available[0]);
  };

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `REP-${Date.now().toString().slice(-6)}`;
      setDispatchOrder(generatedId);
    }, 650);
  };

  const handleReset = () => {
    setDispatchOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blueprint-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-900 to-slate-900 text-white">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  {blueprintId.startsWith('#') ? blueprintId : `#${blueprintId}`}
                </span>
                <span className="text-[11px] font-bold text-sky-200 bg-blue-800/80 px-2 py-0.5 rounded-full border border-blue-600">
                  {language === 'hi'
                    ? 'सत्यापित ब्लूप्रिंट'
                    : language === 'sat'
                    ? 'ᱥᱟᱹᱨᱤ ᱵᱞᱩᱯᱨᱤᱱᱴ'
                    : 'Verified Blueprint'}
                </span>
              </div>
              <h2 id="blueprint-modal-title" className="text-sm sm:text-base font-black text-white truncate mt-0.5">
                {language === 'hi'
                  ? 'समाधान प्रतिकृति इंजन — १-क्लिक क्लोन'
                  : language === 'sat'
                  ? 'ᱥᱚᱞᱦᱮ ᱱᱚᱠᱞ ᱤᱧᱡᱤᱱ — ᱑-ᱠᱞᱤᱠ ᱠᱞᱳᱱ'
                  : '1-Click Solution Blueprint Cloning Engine'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
          {dispatchOrder ? (
            /* Success Confirmation Toast State */
            <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-500/80 text-emerald-950 space-y-4 text-center animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-[#044728]">
                  {language === 'hi'
                    ? 'प्रतिकृति अधिकृत एवं निर्माण पैकेज प्रेषित!'
                    : language === 'sat'
                    ? 'ᱱᱚᱠᱞ ᱟᱹᱭᱫᱟᱹᱨ ᱮᱱᱟ ᱟᱨ ᱵᱮᱱᱟᱣ ᱯᱚᱴᱚᱢ ᱠᱩᱞ ᱮᱱᱟ!'
                    : 'Replication Authorized & Fabrication Package Dispatched!'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 font-medium">
                  {language === 'hi'
                    ? `आदेश संदर्भ #${dispatchOrder} को निर्माण हेतु सफलतापूर्वक पंजीकृत कर दिया गया है।`
                    : language === 'sat'
                    ? `ᱚᱰᱟᱨ ᱮᱞ #${dispatchOrder} ᱵᱮᱱᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱹᱛ ᱮᱱᱟ᱾`
                    : `Dispatch Order #${dispatchOrder} has been officially registered with DHTE Innovation Hub.`}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 text-left border border-emerald-200 text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500 font-medium">Master Blueprint:</span>
                  <span className="font-mono font-bold text-slate-900">{blueprintId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500 font-medium">Target District & Block:</span>
                  <span className="font-bold text-slate-900">{targetDistrict}, {targetBlock}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500 font-medium">Receiving Polytechnic:</span>
                  <span className="font-bold text-[#1D4ED8]">{receivingInstitution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Fabrication ETA:</span>
                  <span className="font-bold text-[#044728]">14 Days (60% Lower Cost)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-[#044728] hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                {language === 'hi' ? 'पुष्टि पूर्ण करें' : language === 'sat' ? 'ᱥᱟᱹᱛ ᱮᱱᱟ' : 'Done & Return'}
              </button>
            </div>
          ) : (
            <>
              {/* Highlight Callout */}
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-950 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-black text-[#D97706] uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>
                    {language === 'hi'
                      ? 'प्रतिकृति का त्वरित लाभ'
                      : language === 'sat'
                      ? 'ᱱᱚᱠᱞ ᱨᱮᱱᱟᱜ ᱞᱟᱵᱷ'
                      : 'Replication Advantage'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold leading-relaxed text-slate-800">
                  {language === 'hi'
                    ? '४ माह के हैकथॉन चक्र से सीधा बचाव। ६०% कम लागत पर मात्र १४ दिनों में सीधा निर्माण।'
                    : language === 'sat'
                    ? '᱔ ᱪᱟᱸᱫᱚ ᱦᱮᱠᱟᱛᱷᱚᱱ ᱵᱟᱝ ᱞᱟᱹᱠᱛᱤᱜ-ᱟ᱾ ᱖᱐% ᱠᱚᱢ ᱠᱷᱚᱨᱪᱟ ᱛᱮ ᱑᱔ ᱢᱟᱦᱟᱸ ᱨᱮ ᱵᱮᱱᱟᱣ᱾'
                    : 'Bypasses 4-month hackathon cycle. Direct fabrication in 14 days at 60% lower cost.'}
                </p>
              </div>

              {/* Solution Overview */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold uppercase text-slate-500">
                  {language === 'hi' ? 'क्लोन किया जाने वाला समाधान:' : language === 'sat' ? 'ᱱᱚᱠᱞ ᱦᱩᱭᱩᱜ ᱠᱟᱹᱢᱤ:' : 'Blueprint Target Solution:'}
                </div>
                <div className="text-sm font-black text-slate-900 mt-0.5">
                  {solutionTitle}
                </div>
              </div>

              {/* Pre-Packaged Assets Ready for Replication */}
              <div className="space-y-2.5">
                <div className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center justify-between">
                  <span>
                    {language === 'hi'
                      ? 'प्रतिकृति हेतु पूर्व-पैक परिसंपत्तियां (५ घटक)'
                      : language === 'sat'
                      ? 'ᱱᱚᱠᱞ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱯᱲᱟᱣ ᱡᱤᱱᱤᱥ (᱕ ᱦᱟᱹᱴᱤᱧ)'
                      : 'Pre-Packaged Assets Ready for Replication (5 Assets)'}
                  </span>
                  <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'प्रमाणित पैकेज' : language === 'sat' ? 'ᱥᱟᱹᱨᱤ ᱯᱚᱴᱚᱢ' : '100% Certified'}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Asset 1: Verified BOM */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#044728] flex items-center justify-center flex-shrink-0">
                      <Boxes className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900">
                        {language === 'hi' ? 'सत्यापित बीओएम' : language === 'sat' ? 'ᱥᱟᱹᱨᱤ BOM' : 'Verified BOM'} ({bomAmount})
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {language === 'hi' ? 'स्थानीय सामग्री दर सूची' : language === 'sat' ? 'ᱴᱚᱴᱷᱟ ᱥᱟᱢᱟᱱ ᱫᱟᱢ' : 'Vendor audited rate sheet'}
                      </div>
                    </div>
                  </div>

                  {/* Asset 2: 3D CAD Schematics */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1D4ED8] flex items-center justify-center flex-shrink-0">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900">
                        {language === 'hi' ? '३डी सीएडी रेखाचित्र' : language === 'sat' ? '3D CAD ᱱᱚᱠᱥᱟ' : '3D CAD Schematics'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {language === 'hi' ? 'एसटीएल एवं स्टेप फाइलें' : language === 'sat' ? 'STL & STEP ᱯᱷᱟᱭᱤᱞ' : 'STL & STEP casting files'}
                      </div>
                    </div>
                  </div>

                  {/* Asset 3: Microcontroller Firmware */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900">
                        {language === 'hi' ? 'माइक्रोकंट्रोलर फर्मवेयर' : language === 'sat' ? 'ᱯᱷᱟᱨᱢᱣᱮᱭᱟᱨ ᱠᱳᱰ' : 'Microcontroller Firmware'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {language === 'hi' ? 'संस्करण २.१ एम्बेडेड सी' : language === 'sat' ? 'v2.1 Embedded C ᱠᱳᱰ' : 'v2.1 Embedded C code'}
                      </div>
                    </div>
                  </div>

                  {/* Asset 4: NABL Test Certificate */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#044728] flex items-center justify-center flex-shrink-0">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900">
                        {language === 'hi' ? 'एनएबीएल परीक्षण प्रमाणपत्र' : language === 'sat' ? 'NABL ᱴᱮᱥᱴ ᱥᱟᱹᱨᱤ' : 'NABL Test Certificate'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {language === 'hi' ? 'आईएसओ/आईईसी १७०२५' : language === 'sat' ? 'ISO/IEC 17025 ᱢᱟᱹᱱ' : 'ISO/IEC 17025 cleared'}
                      </div>
                    </div>
                  </div>

                  {/* Asset 5: Vernacular O&M Manuals */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center space-x-3 sm:col-span-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#D97706] flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900">
                        {language === 'hi' ? 'क्षेत्रीय भाषा संचालन व रखरखाव नियमावली' : language === 'sat' ? 'ᱴᱚᱴᱷᱟ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱪᱟᱞᱟᱣ ᱠᱤᱛᱟᱹᱵᱽ' : 'Vernacular O&M Manuals'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {language === 'hi' ? 'हिंदी एवं संथाली ओल चिकी सचित्र गाइड' : language === 'sat' ? 'ᱦᱤᱱᱫᱤ ᱟᱨ ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ ᱪᱤᱛᱟᱹᱨ ᱥᱟᱶ' : 'Hindi & Santhali Ol Chiki illustrated guides'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Replication Form */}
              <form onSubmit={handleAuthorize} className="space-y-4 pt-2 border-t border-slate-200">
                <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                  {language === 'hi' ? 'प्रतिकृति गंतव्य विवरण दर्ज करें:' : language === 'sat' ? 'ᱱᱚᱠᱞ ᱴᱷᱟᱶ ᱵᱟᱪᱷᱟᱣ ᱢᱮ:' : 'Replication Dispatch Target:'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Target District */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === 'hi' ? 'लक्ष्य ज़िला (झारखंड):' : language === 'sat' ? 'ᱡᱤᱞᱟᱹ (ᱡᱷᱟᱨᱠᱷᱚᱸᱰ):' : 'Target District:'}
                    </label>
                    <select
                      value={targetDistrict}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    >
                      {JHARKHAND_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Target Block */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === 'hi' ? 'लक्ष्य प्रखंड (ब्लॉक):' : language === 'sat' ? 'ᱯᱨᱚᱠᱷᱚᱸᱰ (ᱵᱞᱚᱠ):' : 'Target Block:'}
                    </label>
                    <input
                      type="text"
                      value={targetBlock}
                      onChange={(e) => setTargetBlock(e.target.value)}
                      required
                      placeholder="e.g. Meral, Ranka, Torpa"
                      className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>

                  {/* Receiving Polytechnic / College */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === 'hi' ? 'प्राप्तकर्ता पॉलिटेक्निक / इंजीनियरिंग संस्थान:' : language === 'sat' ? 'ᱧᱟᱢᱚᱜ ᱯᱚᱞᱤᱴᱮᱠᱱᱤᱠ / ᱠᱚᱞᱮᱡᱽ:' : 'Receiving Polytechnic / College:'}
                    </label>
                    <input
                      type="text"
                      value={receivingInstitution}
                      onChange={(e) => setReceivingInstitution(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 min-h-[50px] rounded-xl bg-gradient-to-r from-[#1D4ED8] to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center space-x-2 border border-blue-900"
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>
                      {isSubmitting
                        ? language === 'hi'
                          ? 'अधिकृत किया जा रहा है...'
                          : language === 'sat'
                          ? 'ᱟᱹᱭᱫᱟᱹᱨ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ...'
                          : 'Authorizing Replication...'
                        : language === 'hi'
                        ? 'प्रतिकृति अधिकृत करें एवं निर्माण पैकेज प्रेषित करें'
                        : language === 'sat'
                        ? 'ᱱᱚᱠᱞ ᱟᱹᱭᱫᱟᱹᱨ ᱢᱮ ᱟᱨ ᱵᱮᱱᱟᱣ ᱯᱚᱴᱚᱢ ᱠᱩᱞ ᱢᱮ'
                        : 'Authorize Replication & Dispatch Fabrication Package'}
                    </span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

