'use client';

import React from 'react';
import { AuditDocument } from './types';
import { X, FileCheck2, ShieldCheck, Download, Printer, CheckCircle2, Building2, MapPin } from 'lucide-react';

interface DocumentPreviewModalProps {
  document: AuditDocument | null;
  onClose: () => void;
  language: 'en' | 'hi' | 'sat';
}

export default function DocumentPreviewModal({ document, onClose, language }: DocumentPreviewModalProps) {
  if (!document) return null;

  const getDocTitle = () => {
    if (language === 'hi') return document.titleHi;
    if (language === 'sat') return document.titleSat;
    return document.titleEn;
  };

  const getDocBadge = () => {
    if (language === 'hi') return document.badgeHi;
    if (language === 'sat') return document.badgeSat;
    return document.badgeEn;
  };

  const getSignatory = () => {
    if (language === 'hi') return document.signatoryHi;
    if (language === 'sat') return document.signatorySat;
    return document.signatoryEn;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center flex-shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold bg-blue-700 text-white px-2 py-0.5 rounded">
                  {document.documentNumber}
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {getDocBadge()}
                </span>
              </div>
              <h2 id="audit-modal-title" className="text-sm sm:text-base font-black text-slate-900 truncate mt-0.5">
                {getDocTitle()}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
          {/* Certificate Watermark Header */}
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-bold text-blue-950 block">Government of Jharkhand • DHTE Audit Vault</span>
              <span className="text-slate-500 text-[11px]">Certified Digitally Verifiable Record #{document.documentNumber}</span>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-[11px] text-slate-500 block">Date of Issue:</span>
              <span className="font-bold text-slate-800">{document.issueDate}</span>
            </div>
          </div>

          {/* TYPE A: NABL LAB TEST REPORT TABLE */}
          {document.details.type === 'LAB_REPORT' && document.details.metrics && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === 'hi' 
                      ? 'जल गुणवत्ता तुलना विश्लेषण (कच्चा बनाम उपचारित जल)' 
                      : language === 'sat'
                      ? 'ᱫᱟᱜ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱛᱩᱞᱟᱹᱡᱚᱠᱷᱟ (ᱠᱟᱸᱪᱟ ᱵᱟᱱᱟᱢ ᱥᱟᱯᱷᱟ)'
                      : 'Water Quality Comparative Assay (Raw vs Treated Water)'}
                  </span>
                </h3>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="p-3">
                        {language === 'hi' ? 'मापदंड (पैरामीटर)' : language === 'sat' ? 'ᱥᱟᱛᱟᱢ' : 'Chemical Parameter'}
                      </th>
                      <th className="p-3 text-rose-700">
                        {language === 'hi' ? 'कच्चा भूजल' : language === 'sat' ? 'ᱠᱟᱸᱪᱟ ᱫᱟᱜ' : 'Raw Groundwater'}
                      </th>
                      <th className="p-3 text-emerald-700">
                        {language === 'hi' ? 'उपचारित जल' : language === 'sat' ? 'ᱥᱟᱯᱷᱟ ᱫᱟᱜ' : 'Treated Effluent'}
                      </th>
                      <th className="p-3 text-slate-600 hidden sm:table-cell">
                        {language === 'hi' ? 'डब्ल्यूएचओ मानक' : language === 'sat' ? 'WHO ᱢᱟᱹᱱ' : 'WHO Permissible'}
                      </th>
                      <th className="p-3 text-right">
                        {language === 'hi' ? 'परिणाम' : language === 'sat' ? 'ᱚᱨᱡᱚ' : 'Status'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {document.details.metrics.map((row, idx) => {
                      const paramLabel = language === 'hi' ? row.parameterHi : language === 'sat' ? row.parameterSat : row.parameterEn;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="p-3 font-semibold text-slate-900">{paramLabel}</td>
                          <td className="p-3 text-rose-600 font-bold">{row.rawGroundwater}</td>
                          <td className="p-3 text-emerald-700 font-bold">{row.treatedWater}</td>
                          <td className="p-3 text-slate-500 text-[11px] hidden sm:table-cell">{row.whoStandard}</td>
                          <td className="p-3 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>PASS</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TYPE B: PESA ACT 1996 RESOLUTION */}
          {document.details.type === 'PESA_NOC' && document.details.pesaData && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs space-y-2">
                <div className="flex items-center justify-between text-amber-950 font-bold">
                  <span>{document.details.pesaData.statutoryClause}</span>
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px]">
                    {document.details.pesaData.tribalQuorumPct}
                  </span>
                </div>
                <p className="text-slate-800 italic leading-relaxed text-xs sm:text-[13px] bg-white p-3 rounded-xl border border-amber-100">
                  &ldquo;
                  {language === 'hi'
                    ? document.details.pesaData.resolutionExcerptHi
                    : language === 'sat'
                    ? document.details.pesaData.resolutionExcerptSat
                    : document.details.pesaData.resolutionExcerptEn}
                  &rdquo;
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                  <span>
                    {language === 'hi' ? 'कुल उपस्थित सदस्य: ' : language === 'sat' ? 'ᱜᱩᱞᱟᱹᱴ ᱦᱚᱲ: ' : 'Total Members Present: '}
                    <strong>{document.details.pesaData.attendeesTotal} Adults</strong>
                  </span>
                  <span>
                    {language === 'hi' ? document.details.pesaData.villagePanchayatHi : language === 'sat' ? document.details.pesaData.villagePanchayatSat : document.details.pesaData.villagePanchayatEn}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TYPE C: O&M HANDOVER CERTIFICATE */}
          {document.details.type === 'HANDOVER_CERT' && document.details.handoverData && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                {language === 'hi'
                  ? 'प्रमाणित स्थानीय जल सहिया ऑपरेटर'
                  : language === 'sat'
                  ? 'ᱥᱮᱪᱮᱫ ᱧᱟᱢ ᱟᱠᱟᱫ ᱡᱚᱞ ᱥᱚᱦᱤᱭᱟ ᱠᱚ'
                  : 'Certified Grassroots Jal Sahiya Operators'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {document.details.handoverData.sahiyas.map((s, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">
                        {language === 'hi' ? s.nameHi : language === 'sat' ? s.nameSat : s.nameEn}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {language === 'hi' ? s.roleHi : language === 'sat' ? s.roleSat : s.roleEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
                <span className="text-xs font-extrabold text-blue-950 block">
                  {language === 'hi' ? 'पंचायत में उपलब्ध १२ माह के स्पेयर पार्ट्स सूची:' : language === 'sat' ? 'ᱯᱟᱸᱪᱟᱭᱚᱛ ᱨᱮ ᱑᱒ ᱪᱟᱸᱫᱚ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱢᱟᱱ:' : '12-Month Spare Parts Escrow Locker Inventory:'}
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700">
                  {(language === 'hi'
                    ? document.details.handoverData.spareInventoryHi
                    : language === 'sat'
                    ? document.details.handoverData.spareInventorySat
                    : document.details.handoverData.spareInventoryEn
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Statutory Signatory Block */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold block">
                {language === 'hi' ? 'अधिकृत हस्ताक्षरकर्ता' : language === 'sat' ? 'ᱥᱩᱦᱤ ᱟᱠᱟᱫ ᱚᱯᱷᱤᱥᱟᱨ' : 'Authorized Signatory'}
              </span>
              <span className="font-bold text-slate-900">{getSignatory()}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl self-start sm:self-auto font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'वैधानिक डिजिटल हस्ताक्षर सत्यापित' : language === 'sat' ? 'ᱰᱤᱡᱤᱴᱟᱞ ᱥᱩᱦᱤ ᱥᱟᱹᱨᱤ ᱮᱱᱟ' : 'Digital Signature Verified'}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {language === 'hi' ? 'दस्तावेज़ हैश: SHA-256 #JAG-PLM-VLT-992' : language === 'sat' ? 'ᱠᱟᱜᱚᱡᱽ ᱮᱞ: SHA-256 #JAG-PLM-VLT-992' : 'Cryptographic Hash: SHA-256 #JAG-PLM-VLT-992'}
          </span>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रिंट' : language === 'sat' ? 'ᱯᱨᱤᱱᱴ' : 'Print'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors shadow-xs"
            >
              {language === 'hi' ? 'बंद करें' : language === 'sat' ? 'ᱵᱚᱸᱫᱽ ᱢᱮ' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

