"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, FlaskConical, MapPin, ShieldCheck } from "lucide-react";

type Instrument = {
	id: string;
	name: string;
	institution: string;
	location: string;
	description: string;
	slots: string[];
};

const instruments: Instrument[] = [
	{ id: "fsem", name: "FESEM", institution: "BIT Mesra", location: "Ranchi", description: "High-resolution surface morphology and elemental imaging.", slots: ["24 Sep · 10:00", "26 Sep · 14:00", "30 Sep · 09:00"] },
	{ id: "xrd", name: "XRD", institution: "IIT ISM Dhanbad", location: "Dhanbad", description: "Crystal structure, phase identification, and material characterization.", slots: ["25 Sep · 09:30", "27 Sep · 11:00", "02 Oct · 14:30"] },
	{ id: "icp-ms", name: "ICP-MS", institution: "CSIR-NML Jamshedpur", location: "Jamshedpur", description: "Trace-element analysis for water and soil samples.", slots: ["23 Sep · 13:00", "28 Sep · 10:30", "03 Oct · 15:00"] },
];

export default function LabExchange() {
	const [booked, setBooked] = useState<{ instrument: string; slot: string } | null>(null);

	return (
		<section aria-labelledby="lab-exchange-title" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
			<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">Inter-university facility exchange</p><h2 id="lab-exchange-title" className="mt-1 text-xl font-bold text-[#0F172A]">Central Instrument Booking Grid</h2><p className="mt-1 text-sm text-slate-600">Reserve verified characterization time across Jharkhand partner institutions for your hackathon evidence pack.</p></div><span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800"><ShieldCheck className="h-3.5 w-3.5" /> Shared with audit trail</span></div>
			<div className="mt-5 grid gap-4 lg:grid-cols-3">
				{instruments.map((instrument) => (
					<article key={instrument.id} className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-4">
						<div className="flex items-start justify-between gap-2"><div className="rounded-lg bg-blue-100 p-2 text-[#1D4ED8]"><FlaskConical className="h-5 w-5" /></div><span className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-slate-600">NABL partner</span></div>
						<h3 className="mt-3 text-lg font-black text-[#0F172A]">{instrument.name}</h3><p className="text-sm font-semibold text-blue-800">{instrument.institution}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5" />{instrument.location}</p><p className="mt-3 min-h-10 text-sm leading-relaxed text-slate-600">{instrument.description}</p>
						<div className="mt-4 border-t border-slate-200 pt-3"><p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500"><CalendarDays className="h-3.5 w-3.5" /> Available testing slots</p><div className="mt-2 space-y-2">{instrument.slots.map((slot) => { const isBooked = booked?.instrument === instrument.id && booked.slot === slot; return <button key={slot} type="button" onClick={() => setBooked({ instrument: instrument.id, slot })} className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${isBooked ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-800"}`}><span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{slot}</span>{isBooked && <CheckCircle2 className="h-4 w-4" />}</button>; })}</div></div>
					</article>
				))}
			</div>
			{booked && <div role="status" className="mt-4 flex flex-col justify-between gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 sm:flex-row sm:items-center"><span><strong>Booking request queued:</strong> {instruments.find((item) => item.id === booked.instrument)?.name} · {booked.slot}</span><span className="text-xs font-semibold">Institutional confirmation pending</span></div>}
		</section>
	);
}
