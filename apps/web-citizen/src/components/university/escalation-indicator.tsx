"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Globe2, Landmark, Network, ShieldCheck } from "lucide-react";

const rules = [
	"No speculative bidding: a zero-bid challenge is never silently assigned to a team.",
	"Keep the original problem statement and evidence trail intact at every escalation.",
	"Publish any revised budget, scope, or eligibility criteria before reopening bids.",
	"Record the reason, approving authority, and timestamp for every escalation decision.",
	"Return unresolved challenges to public visibility rather than closing them without disposition.",
];

const stages = [
	{ number: 1, title: "Statewide re-bid", detail: "Reopen the challenge across Jharkhand with up to +25% budget and documented scope expansion.", icon: Landmark },
	{ number: 2, title: "ITI / Polytechnic route", detail: "Route practical, implementation-ready work to state ITIs and polytechnics for an applied build cycle.", icon: Network },
	{ number: 3, title: "State mandate", detail: "DHTE issues a state mandate when the societal need remains unresolved after institutional routes.", icon: ShieldCheck },
	{ number: 4, title: "Pan-India national hackathon", detail: "Publish the verified challenge nationally with its full evidence, decision log, and grant context.", icon: Globe2 },
];

export default function EscalationIndicator() {
	const [activeStage, setActiveStage] = useState(1);
	const [rulesRead, setRulesRead] = useState(false);
	const current = stages[activeStage - 1];
	const CurrentIcon = current.icon;

	return (
		<section aria-labelledby="escalation-title" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
			<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">Zero-bid governance · ADR escalation control</p><h2 id="escalation-title" className="mt-1 text-xl font-bold text-[#0F172A]">Four-stage escalation path</h2><p className="mt-1 text-sm text-slate-600">A transparent recovery route protects public funds when a verified challenge receives no bids.</p></div><span className="inline-flex items-center gap-1.5 self-start rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800"><AlertTriangle className="h-3.5 w-3.5" /> Zero-bid trigger monitored</span></div>

			<div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
				<div>
					<div className="grid gap-2 sm:grid-cols-4" role="list" aria-label="Escalation stages">{stages.map((stage) => { const Icon = stage.icon; return <button key={stage.number} type="button" onClick={() => setActiveStage(stage.number)} aria-pressed={activeStage === stage.number} className={`rounded-lg border p-3 text-left transition ${activeStage === stage.number ? "border-[#1D4ED8] bg-blue-50 ring-1 ring-[#1D4ED8]" : "border-slate-200 hover:border-blue-300"}`}><span className="flex items-center justify-between"><span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${activeStage === stage.number ? "bg-[#1D4ED8] text-white" : "bg-slate-100 text-slate-600"}`}>{stage.number}</span><Icon className={`h-4 w-4 ${activeStage === stage.number ? "text-[#1D4ED8]" : "text-slate-400"}`} /></span><span className="mt-2 block text-xs font-bold leading-tight text-[#0F172A]">{stage.title}</span></button>; })}</div>
					<div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4"><div className="flex items-start gap-3"><div className="rounded-lg bg-white p-2 text-[#1D4ED8]"><CurrentIcon className="h-5 w-5" /></div><div><p className="text-xs font-bold uppercase tracking-wide text-[#1D4ED8]">Current escalation stage · {current.number}</p><h3 className="mt-1 text-lg font-bold text-[#0F172A]">{current.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-700">{current.detail}</p></div></div><div className="mt-4 flex items-center gap-2 text-xs font-semibold text-blue-900"><ArrowRight className="h-4 w-4" /> Next action: publish the decision log and notify eligible institutions.</div></div>
				</div>
				<div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-bold text-[#0F172A]">Anti-speculation rules</h3><ul className="mt-3 space-y-2.5">{rules.map((rule) => <li key={rule} className="flex gap-2 text-xs leading-relaxed text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{rule}</li>)}</ul><label className="mt-4 flex cursor-pointer items-start gap-2 border-t border-slate-200 pt-3 text-xs font-semibold text-slate-700"><input type="checkbox" checked={rulesRead} onChange={(event) => setRulesRead(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#1D4ED8]" /> I have reviewed the escalation controls before advancing a zero-bid case.</label>{rulesRead && <p className="mt-2 text-xs font-bold text-emerald-700">Governance acknowledgement recorded for this session.</p>}</div>
			</div>
		</section>
	);
}
