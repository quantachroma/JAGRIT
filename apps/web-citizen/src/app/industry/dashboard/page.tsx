'use client';

import { useState } from 'react';
import { BadgeCheck, Download, FileCheck2, IndianRupee, ShieldCheck, Users } from 'lucide-react';

const portfolio = [
  { title: 'Palamu Water Purification', partner: 'BIT Mesra', amount: '₹3.50 Lakh', status: 'Matched and escrow ready' },
  { title: 'Khunti Lac Storage', partner: 'Birsa Agricultural University', amount: '₹4.20 Lakh', status: 'Co-funding pipeline' },
  { title: 'Ranchi DeepTech Incubator', partner: 'BIT Mesra Innovation Center', amount: '₹8.50 Lakh', status: 'Active deployment' },
];

export default function IndustryDashboardPage() {
  const [certificateDownloaded, setCertificateDownloaded] = useState(false);

  const downloadCertificate = () => {
    const certificate = 'JAGRIT JHARKHAND\nCSR Compliance Certificate\nTata Steel Corporate Foundation\nSection 135 / Schedule VII verified';
    const url = URL.createObjectURL(new Blob([certificate], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'jagrit-csr-compliance-certificate.txt';
    link.click();
    URL.revokeObjectURL(url);
    setCertificateDownloaded(true);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      <header className="rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">Corporate CSR command center</p>
            <h1 className="text-3xl font-black tracking-tight">CSR Portfolio Hub</h1>
            <p className="max-w-2xl text-sm leading-6 text-blue-100">Track co-funded R&amp;D, corporate mentorship, and compliant public-impact partnerships across Jharkhand.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-400/15 px-4 py-3 text-sm font-bold text-emerald-100 ring-1 ring-emerald-300/30"><ShieldCheck className="h-5 w-5" /> Section 135 / Schedule VII compliant</div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="CSR portfolio summary">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><IndianRupee className="h-5 w-5 text-amber-700" /><p className="mt-4 text-xs font-black uppercase tracking-wide text-amber-800">Committed CSR Pool</p><p className="mt-1 text-2xl font-black text-amber-950">₹50.00 Lakh</p></div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5"><FileCheck2 className="h-5 w-5 text-blue-700" /><p className="mt-4 text-xs font-black uppercase tracking-wide text-blue-800">Matched Grants</p><p className="mt-1 text-2xl font-black text-blue-950">₹24.50 Lakh</p></div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><Users className="h-5 w-5 text-emerald-700" /><p className="mt-4 text-xs font-black uppercase tracking-wide text-emerald-800">Senior Mentors</p><p className="mt-1 text-2xl font-black text-emerald-950">14 Assigned</p></div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-xl font-black text-slate-900">Active CSR portfolio</h2><p className="mt-1 text-sm text-slate-500">Static reference view for current university partnerships.</p></div><button type="button" onClick={downloadCertificate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"><Download className="h-4 w-4" /> Download certificate</button></div>
        {certificateDownloaded && <p className="mt-3 text-sm font-bold text-emerald-700" role="status">Certificate downloaded successfully.</p>}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">{portfolio.map((project) => <article key={project.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><BadgeCheck className="h-5 w-5 text-emerald-600" /><span className="text-xs font-black text-blue-700">{project.amount}</span></div><h3 className="mt-5 font-black text-slate-900">{project.title}</h3><p className="mt-2 text-sm text-slate-600">{project.partner}</p><p className="mt-4 text-xs font-bold text-emerald-700">{project.status}</p></article>)}</div>
      </section>
    </div>
  );
}