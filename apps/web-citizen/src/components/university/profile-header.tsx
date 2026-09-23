"use client";

import { STRINGS, type Lang } from "./i18n";

export default function ProfileHeader({ lang }: { lang: Lang }) {
  const t = STRINGS[lang];

  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <p className="text-sm text-slate-600">{t.portalTitle}</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#044728] sm:text-3xl">{t.univName}</h1>

      <div className="mt-4">
        <p className="text-sm font-medium text-[#0F172A]">{t.verifiedLabs}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-800">
            {t.labNabl}
          </li>
          <li className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800">
            {t.labNano}
          </li>
        </ul>
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        <li className="rounded-xl bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0F172A]">{t.grants}</li>
        <li className="rounded-xl bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0F172A]">{t.hScore}</li>
      </ul>
    </header>
  );
}