"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, Plus, Trash2, Upload } from "lucide-react";

export const GRANT_CEILING = 350000;

type BomItem = {
	id: number;
	name: string;
	category: string;
	quantity: number;
	unitCost: number;
};

const INITIAL_ITEMS: BomItem[] = [
	{ id: 1, name: "Solar pump and controller", category: "Core system", quantity: 1, unitCost: 118000 },
	{ id: 2, name: "Water quality sensor kit", category: "Telemetry", quantity: 2, unitCost: 18500 },
	{ id: 3, name: "Fabrication and enclosure", category: "Fabrication", quantity: 1, unitCost: 42000 },
	{ id: 4, name: "12-Month Emergency Spares Escrow Kit", category: "Escrow", quantity: 1, unitCost: 35000 },
];

const inr = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export default function BomCalculator() {
	const [items, setItems] = useState(INITIAL_ITEMS);
	const [expandedScope, setExpandedScope] = useState(false);
	const [dprName, setDprName] = useState<string | null>(null);
	const [saved, setSaved] = useState(false);

	const total = useMemo(
		() => items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0),
		[items],
	);
	const remaining = GRANT_CEILING - total;
	const percentage = Math.min(100, Math.round((total / GRANT_CEILING) * 100));

	function updateItem(id: number, field: "quantity" | "unitCost", value: string) {
		const nextValue = Math.max(0, Number(value) || 0);
		setItems((current) => current.map((item) => item.id === id ? { ...item, [field]: nextValue } : item));
		setSaved(false);
	}

	function toggleScope() {
		setExpandedScope((current) => {
			const next = !current;
			setItems((currentItems) => currentItems.map((item) => item.id === 4
				? { ...item, name: next ? "24-Month Emergency Spares Escrow Kit" : "12-Month Emergency Spares Escrow Kit" }
				: item));
			return next;
		});
	}

	function addLineItem() {
		const id = Math.max(0, ...items.map((item) => item.id)) + 1;
		setItems([...items, { id, name: "New component", category: "Other", quantity: 1, unitCost: 0 }]);
		setSaved(false);
	}

	return (
		<section aria-labelledby="bom-title" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
			<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
				<div>
					<p className="text-xs font-bold uppercase tracking-wide text-[#2563EB]">Round 3 · DPR submission</p>
					<h2 id="bom-title" className="mt-1 text-xl font-bold text-[#0F172A]">Live Bill of Materials</h2>
					<p className="mt-1 text-sm text-slate-600">Build a transparent procurement plan within the ₹3,50,000 grant ceiling.</p>
				</div>
				<label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#1D4ED8] px-3 py-2 text-sm font-semibold text-[#1D4ED8] hover:bg-blue-50">
					<Upload className="h-4 w-4" /> Upload DPR
					<input type="file" accept=".pdf,application/pdf" className="sr-only" onChange={(event) => setDprName(event.target.files?.[0]?.name ?? null)} />
				</label>
			</div>

			{dprName && <p role="status" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><FileText className="h-3.5 w-3.5" />{dprName} queued for review</p>}

			<div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
				<table className="w-full min-w-[680px] text-left text-sm">
					<thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
						<tr><th className="px-3 py-3">Line item</th><th className="px-3 py-3">Category</th><th className="w-24 px-3 py-3">Qty</th><th className="w-36 px-3 py-3">Unit cost</th><th className="w-32 px-3 py-3 text-right">Subtotal</th><th className="w-12 px-3 py-3" /></tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{items.map((item) => (
							<tr key={item.id} className="text-slate-800">
								<td className="px-3 py-3 font-semibold">{item.name}</td><td className="px-3 py-3 text-slate-500">{item.category}</td>
								<td className="px-3 py-3"><input aria-label={`${item.name} quantity`} type="number" min="0" value={item.quantity} onChange={(event) => updateItem(item.id, "quantity", event.target.value)} className="w-20 rounded-md border border-slate-300 px-2 py-1.5" /></td>
								<td className="px-3 py-3"><div className="flex items-center gap-1"><span>₹</span><input aria-label={`${item.name} unit cost`} type="number" min="0" value={item.unitCost} onChange={(event) => updateItem(item.id, "unitCost", event.target.value)} className="w-28 rounded-md border border-slate-300 px-2 py-1.5" /></div></td>
								<td className="px-3 py-3 text-right font-bold">{inr(item.quantity * item.unitCost)}</td>
								<td className="px-3 py-3 text-right">{item.id !== 4 && <button type="button" aria-label={`Remove ${item.name}`} onClick={() => setItems(items.filter((current) => current.id !== item.id))} className="text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<button type="button" onClick={addLineItem} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1D4ED8] hover:underline"><Plus className="h-4 w-4" /> Add line item</button>
				<label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700"><input type="checkbox" checked={expandedScope} onChange={toggleScope} className="h-4 w-4 accent-[#1D4ED8]" /> Stage 1 scope expanded to 24 months</label>
			</div>

			<div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
				<div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Grant utilization</p><p className="mt-1 text-2xl font-black text-[#0F172A]">{inr(total)} <span className="text-sm font-medium text-slate-500">/ {inr(GRANT_CEILING)}</span></p></div><p className={`text-sm font-bold ${remaining >= 0 ? "text-emerald-700" : "text-red-700"}`}>{remaining >= 0 ? `${inr(remaining)} remaining` : `${inr(Math.abs(remaining))} over ceiling`}</p></div>
				<div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"><div className={`h-full rounded-full ${remaining >= 0 ? "bg-emerald-600" : "bg-red-600"}`} style={{ width: `${percentage}%` }} /></div>
				<p className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">{remaining >= 0 ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}{remaining >= 0 ? "Within the approved grant ceiling." : "Reduce quantities or unit costs before submitting the DPR."}</p>
			</div>
			<button type="button" disabled={remaining < 0} onClick={() => setSaved(true)} className="mt-4 w-full rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#172554] disabled:cursor-not-allowed disabled:bg-slate-300">{saved ? "DPR and BOM saved for defense" : "Save DPR and BOM for Ranchi Defense"}</button>
		</section>
	);
}
