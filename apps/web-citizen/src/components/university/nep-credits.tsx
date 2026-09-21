"use client";

import { useMemo, useState } from "react";
import { Award, CheckCircle2, GraduationCap, Landmark, LockKeyhole, Upload, UserRound } from "lucide-react";

const HOURS_PER_CREDIT = 30;

export default function NepCredits() {
	const [hours, setHours] = useState(120);
	const [deposited, setDeposited] = useState(false);
	const credits = useMemo(() => hours / HOURS_PER_CREDIT, [hours]);

	return (
		<section aria-labelledby="nep-credit-title" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
			<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
				<div>
					<p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">NEP 2020 · Academic Credit Banking</p>
					<h2 id="nep-credit-title" className="mt-1 text-xl font-bold text-[#0F172A]">NCrF verified project credits</h2>
					<p className="mt-1 text-sm text-slate-600">Convert approved hackathon work into a traceable student APAAR / DigiLocker transcript entry.</p>
				</div>
				<span className="inline-flex items-center gap-1.5 self-start rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800"><LockKeyhole className="h-3.5 w-3.5" /> Faculty verified</span>
			</div>

			<div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
				<div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
					<div className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-[#1D4ED8]" /><h3 className="font-bold text-[#0F172A]">National Credit Framework calculator</h3></div>
					<p className="mt-2 text-sm text-slate-700"><strong>30 verified project workhours = 1 academic credit.</strong> Only faculty-approved hours can be deposited.</p>
					<label htmlFor="verified-hours" className="mt-4 block text-sm font-semibold text-slate-800">Verified project workhours</label>
					<div className="mt-1 flex items-center gap-3"><input id="verified-hours" type="number" min="0" step="1" value={hours} onChange={(event) => { setHours(Math.max(0, Number(event.target.value) || 0)); setDeposited(false); }} className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-bold text-[#0F172A]" /><span className="text-sm text-slate-500">hours</span></div>
					<div className="mt-4 flex items-end justify-between rounded-lg bg-white p-3"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Credits to deposit</p><p className="mt-1 text-3xl font-black text-[#044728]">{credits % 1 === 0 ? credits : credits.toFixed(2)}</p></div><span className="text-xs font-semibold text-slate-500">{hours} ÷ 30</span></div>
					<button type="button" disabled={hours < HOURS_PER_CREDIT} onClick={() => setDeposited(true)} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#044728] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#03331d] disabled:cursor-not-allowed disabled:bg-slate-300">{deposited ? <><CheckCircle2 className="h-4 w-4" /> {credits} credits queued in APAAR / DigiLocker</> : <><Upload className="h-4 w-4" /> Deposit verified credits</>}</button>
					{hours > 0 && hours < HOURS_PER_CREDIT && <p className="mt-2 text-xs font-semibold text-amber-700">Add {HOURS_PER_CREDIT - hours} more verified hour(s) to unlock one credit.</p>}
				</div>

				<div className="space-y-4">
					<div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4"><div className="flex items-center gap-2 text-emerald-900"><UserRound className="h-5 w-5" /><h3 className="font-bold">Ph.D. Research Scholar co-anchor</h3></div><p className="mt-2 text-sm leading-relaxed text-emerald-950">A designated research scholar co-anchors the undergraduate team, preserving exam continuity while the field project is active.</p><span className="mt-3 inline-flex rounded-full border border-emerald-300 bg-white/70 px-2.5 py-1 text-xs font-bold text-emerald-800">Exam continuity protected</span></div>
					<div className="rounded-xl border border-amber-200 bg-amber-50 p-4"><div className="flex items-center gap-2 text-amber-900"><Award className="h-5 w-5" /><h3 className="font-bold">Faculty PI · Career Advancement Scheme</h3></div><p className="mt-2 text-sm leading-relaxed text-amber-950">Verified project supervision and public-impact evidence contribute to the faculty portfolio.</p><div className="mt-3 flex items-center justify-between rounded-lg bg-white/70 p-3"><span className="text-xs font-bold uppercase tracking-wide text-amber-800">UGC Regulations 2018</span><strong className="text-lg text-amber-950">10 UGC-CAS API points</strong></div></div>
				</div>
			</div>
		</section>
	);
}
