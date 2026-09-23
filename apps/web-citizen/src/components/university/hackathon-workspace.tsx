"use client";

import { useState } from "react";
import { Activity, CheckCircle2, CircleDollarSign, FileText, Landmark, Lock, MessageSquare, Plus, ShieldCheck, Upload, UserRound } from "lucide-react";
import BomCalculator from "./bom-calculator";

type Stage = "round-1" | "round-2" | "round-3";

const stages: { id: Stage; label: string; detail: string }[] = [
	{ id: "round-1", label: "Round 1: Ideation & Pitch", detail: "14 days" },
	{ id: "round-2", label: "Round 2: Mentoring & Bench Test", detail: "21 days" },
	{ id: "round-3", label: "Round 3: DPR & Ranchi Defense", detail: "7 days" },
];

export default function HackathonWorkspace({ ticketId = "JAG-PLM-0082" }: { ticketId?: string }) {
	const [stage, setStage] = useState<Stage>("round-1");
	const [pitchName, setPitchName] = useState<string | null>(null);
	const [pitchSaved, setPitchSaved] = useState(false);
	const [seedUsed, setSeedUsed] = useState(12000);
	const [telemetry, setTelemetry] = useState(["Bench test started · 10:42", "Pump flow sensor connected · 10:48"]);
	const [telemetryEntry, setTelemetryEntry] = useState("");

	function addTelemetry() {
		if (!telemetryEntry.trim()) return;
		setTelemetry([...telemetry, `${telemetryEntry.trim()} · just now`]);
		setTelemetryEntry("");
	}

	return (
		<section aria-labelledby="workspace-title" className="space-y-4">
			<header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
				<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">University HEI workspace · {ticketId}</p><h1 id="workspace-title" className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A]">Dynamic Hackathon Workspace</h1><p className="mt-1 text-sm text-slate-600">Move one verified village challenge from a defensible idea to a deployable DPR.</p></div><span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800"><ShieldCheck className="h-4 w-4" /> Audit trail active</span></div>
				<nav aria-label="Hackathon stages" className="mt-5 grid gap-2 md:grid-cols-3">
					{stages.map((item, index) => <button key={item.id} type="button" onClick={() => setStage(item.id)} aria-current={stage === item.id ? "step" : undefined} className={`rounded-lg border p-3 text-left transition ${stage === item.id ? "border-[#2563EB] bg-blue-50 ring-1 ring-[#2563EB]" : "border-slate-200 bg-white hover:border-blue-300"}`}><span className="flex items-center gap-2 text-sm font-bold text-[#0F172A]"><span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${stage === item.id ? "bg-[#2563EB] text-white" : "bg-slate-100 text-slate-600"}`}>{index + 1}</span>{item.label}</span><span className="ml-8 text-xs text-slate-500">{item.detail}</span></button>)}
				</nav>
			</header>

			{stage === "round-1" && <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
				<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">Round 1 · shortlist entry</p><h2 className="mt-1 text-lg font-bold text-[#0F172A]">Pitch deck and preliminary BOM</h2></div><FileText className="h-5 w-5 text-blue-600" /></div><label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5 hover:border-blue-500"><Upload className="h-5 w-5 text-blue-600" /><span><span className="block text-sm font-semibold text-slate-800">Upload pitch deck PDF</span><span className="block text-xs text-slate-500">Maximum 5 slides, 10 MB</span></span><input type="file" accept="application/pdf" className="sr-only" onChange={(event) => { setPitchName(event.target.files?.[0]?.name ?? null); setPitchSaved(false); }} /></label>{pitchName && <p className="mt-2 text-xs font-semibold text-emerald-700">{pitchName} ready for review</p>}<div className="mt-4 rounded-lg border border-slate-200"><div className="flex items-center justify-between border-b border-slate-100 px-3 py-2"><span className="text-sm font-bold">Preliminary BOM</span><span className="text-sm font-bold text-slate-700">₹1,96,000</span></div><p className="px-3 py-3 text-xs leading-relaxed text-slate-600">Solar pump, sensors, enclosure, and the protected emergency spares escrow kit are scoped for feasibility review.</p></div><button type="button" disabled={!pitchName} onClick={() => setPitchSaved(true)} className="mt-4 w-full rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300">{pitchSaved ? "Round 1 pitch submitted" : "Submit Round 1 pitch"}</button></section>
				<aside className="rounded-xl border border-amber-200 bg-amber-50 p-5"><div className="flex items-center gap-2 text-amber-900"><Lock className="h-5 w-5" /><h2 className="font-bold">Public Fund Protection</h2></div><p className="mt-3 text-sm leading-relaxed text-amber-950">Round 1 is an ideation gate. No public funds are disbursed until a team is shortlisted and enters the mentored bench test.</p><div className="mt-5 rounded-lg border border-amber-300 bg-white/70 p-4"><p className="text-xs font-bold uppercase tracking-wide text-amber-800">Round 1 disbursed</p><p className="mt-1 text-3xl font-black text-amber-950">₹0</p><p className="mt-1 text-xs text-amber-800">Escrow remains protected pending jury shortlist.</p></div></aside>
			</div>}

			{stage === "round-2" && <div className="grid gap-4 lg:grid-cols-2">
				<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><div className="rounded-lg bg-amber-100 p-2 text-amber-800"><UserRound className="h-5 w-5" /></div><div><p className="text-xs font-bold uppercase tracking-wide text-amber-700">Corporate mentor</p><h2 className="font-bold text-[#0F172A]">Dr. A. Sen</h2><p className="text-sm text-slate-600">Tata Steel CSR · Materials and field deployment</p></div></div><div className="mt-5 rounded-lg bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-800">Next review</p><p className="mt-1 text-sm text-slate-600">Bench-test evidence and failure log due before the mentoring gate.</p><button type="button" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#0F172A] px-3 py-2 text-xs font-bold text-white"><MessageSquare className="h-3.5 w-3.5" /> Message mentor</button></div></section>
				<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">Shortlisted team allowance</p><h2 className="mt-1 text-lg font-bold text-[#0F172A]">Seed allowance tracker</h2></div><CircleDollarSign className="h-6 w-6 text-emerald-600" /></div><div className="mt-4 flex items-end justify-between"><span className="text-2xl font-black text-[#0F172A]">₹{seedUsed.toLocaleString("en-IN")}</span><span className="text-sm font-semibold text-slate-500">/ ₹20,000 cap</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${(seedUsed / 20000) * 100}%` }} /></div><p className="mt-2 text-xs text-slate-600">Available for verified bench-test components. Every expense is logged against the team.</p><div className="mt-4 flex gap-2"><button type="button" disabled={seedUsed >= 20000} onClick={() => setSeedUsed(Math.min(20000, seedUsed + 1000))} className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white disabled:bg-slate-300">Record ₹1,000 spend</button><span className="inline-flex items-center text-xs font-semibold text-slate-500">₹{(20000 - seedUsed).toLocaleString("en-IN")} remaining</span></div></section>
				<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2"><div className="flex items-center gap-2"><Activity className="h-5 w-5 text-[#2563EB]" /><h2 className="font-bold text-[#0F172A]">Telemetry logger</h2></div><div className="mt-3 flex gap-2"><input value={telemetryEntry} onChange={(event) => setTelemetryEntry(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addTelemetry()} placeholder="e.g. Flow rate 18 L/min" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" /><button type="button" onClick={addTelemetry} className="inline-flex items-center gap-1 rounded-lg bg-[#1E3A8A] px-3 py-2 text-sm font-bold text-white"><Plus className="h-4 w-4" /> Log reading</button></div><ul className="mt-3 grid gap-2 sm:grid-cols-2">{telemetry.map((entry) => <li key={entry} className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{entry}</li>)}</ul></section>
			</div>}

			{stage === "round-3" && <BomCalculator />}
		</section>
	);
}
