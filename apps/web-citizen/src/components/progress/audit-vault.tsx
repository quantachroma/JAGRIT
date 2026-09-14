'use client';

import React, { useState } from 'react';
import { AuditDocument } from './types';
import DocumentPreviewModal from './document-preview-modal';
import { FileCheck2, ShieldCheck, Eye, ExternalLink, Award, FileText, CheckCircle2 } from 'lucide-react';

interface AuditVaultProps {
  documents: AuditDocument[];
  language: 'en' | 'hi' | 'sat';
}

export default function AuditVault({ documents, language }: AuditVaultProps) {
  const [activeModalDoc, setActiveModalDoc] = useState<AuditDocument | null>(null);

  const getDocTitle = (doc: AuditDocument) => {
    if (language === 'hi') return doc.titleHi;
    if (language === 'sat') return doc.titleSat;
    return doc.titleEn;
  };

  const getDocBadge = (doc: AuditDocument) => {
    if (language === 'hi') return doc.badgeHi;
    if (language === 'sat') return doc.badgeSat;
    return doc.badgeEn;
  };

  const getDocSummary = (doc: AuditDocument) => {
    if (language === 'hi') return doc.summaryHi;
    if (language === 'sat') return doc.summarySat;
    return doc.summaryEn;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* Vault Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>
              {language === 'hi'
                ? 'वैधानिक अनुपालन एवं जनजातीय शासन तिजोरी'
                : language === 'sat'
                ? 'ᱥᱟᱹᱨᱤ ᱠᱟᱜᱚᱡᱽ ᱟᱨ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱟᱹᱱ ᱚᱲᱟᱜ'
                : 'Compliance & Tribal Governance Audit Vault'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
            {language === 'hi'
              ? 'प्रमाणित अभिलेख एवं पंचायती अनापत्ति साक्ष्य'
              : language === 'sat'
              ? 'ᱥᱟᱹᱨᱤ ᱠᱟᱜᱚᱡᱽ ᱟᱨ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱢᱟᱹᱱ ᱥᱟᱹᱵᱩᱛ'
              : 'Cryptographically Verified Proof Documents'}
          </h2>
        </div>

        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl self-start sm:self-auto">
          {language === 'hi' ? '३ सत्यापित प्रमाणपत्र उपलब्ध' : language === 'sat' ? '᱓ ᱜᱚᱴᱟᱝ ᱥᱟᱹᱨᱤ ᱠᱟᱜᱚᱡᱽ' : '3 Verified Proof Certificates'}
        </span>
      </div>

      {/* 3 Interactive Proof Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Card Top Pill */}
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-xs">
                  {doc.cardLetter}
                </span>

                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {getDocBadge(doc)}
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-sm font-black text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                  {getDocTitle(doc)}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1.5 leading-relaxed">
                  {getDocSummary(doc)}
                </p>
              </div>
            </div>

            {/* Bottom Document Number & View Modal Button */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono">{doc.documentNumber}</span>
                <span>{doc.issueDate}</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalDoc(doc)}
                className="w-full bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-2xs active:scale-[0.98]"
              >
                <Eye className="w-4 h-4" />
                <span>
                  {language === 'hi' ? 'दस्तावेज़ देखें' : language === 'sat' ? 'ᱠᱟᱜᱚᱡᱽ ᱧᱮᱞ ᱢᱮ' : 'View Document'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Integration */}
      <DocumentPreviewModal
        document={activeModalDoc}
        onClose={() => setActiveModalDoc(null)}
        language={language}
      />
    </div>
  );
}

