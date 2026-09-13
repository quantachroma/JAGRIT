"use client";
import { useMemo, useState } from "react";
import { Plus, Trash2, IndianRupee, AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatINR } from "@/lib/mock-data";

export interface BomRow {
  id: string;
  component: string;
  qty: number;
  unitCost: number;
  vendor: string;
}

interface DprTableProps {
  allocationCeiling?: number;
  stateShare?: number;
  csrShare?: number;
  initialRows?: BomRow[];
}

const DEFAULT_ROWS: BomRow[] = [
  { id: "r1", component: "Activated bauxite media (Lohardaga), 50kg", qty: 4, unitCost: 4200, vendor: "Lohardaga Mines Co-op" },
  { id: "r2", component: "Burnt-clay pottery granules, 25kg", qty: 6, unitCost: 1800, vendor: "Kumhar Co-op, Khunti" },
  { id: "r3", component: "Field fluoride test kits (100 strips)", qty: 5, unitCost: 9500, vendor: "NABL supplier, Ranchi" },
];

let seq = 100;
function nid(): string {
  seq += 1;
  return `r${seq}-${Date.now().toString(36)}`;
}

export function bomRowTotal(r: BomRow): number {
  const q = Number.isFinite(r.qty) ? r.qty : 0;
  const u = Number.isFinite(r.unitCost) ? r.unitCost : 0;
  return Math.max(0, q) * Math.max(0, u);
}
export default function DprTable({ allocationCeiling = 350000, stateShare, csrShare, initialRows }: DprTableProps) {
  const [rows, setRows] = useState<BomRow[]>(initialRows ?? DEFAULT_ROWS);
  const total = useMemo(() => rows.reduce((s, r) => s + bomRowTotal(r), 0), [rows]);
  const remaining = allocationCeiling - total;
  const over = total > allocationCeiling;
  const pct = allocationCeiling > 0 ? Math.min(100, Math.round((total / allocationCeiling) * 100)) : 0;
  function update(id: string, patch: Partial<BomRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function add() {
    setRows((prev) => [...prev, { id: nid(), component: "", qty: 1, unitCost: 0, vendor: "" }]);
  }
  function remove(id: string) {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)));
  }
  return (
    <section aria-label="Bill of Materials calculator" className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F172A]">
          <IndianRupee className="h-4 w-4 text-[#1E3A8A]" /> Bill of Materials (BOM)
        </h3>
        <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
          Ceiling {formatINR(allocationCeiling)}
        </span>
      </div>
      {(stateShare !== undefined || csrShare !== undefined) && (
        <p className="mt-1 text-xs text-slate-600">
          State {formatINR(stateShare ?? 0)} + CSR {formatINR(csrShare ?? 0)} allocation.
        </p>
      )}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-2 py-2">Component</th>
              <th className="px-2 py-2">Qty</th>
              <th className="px-2 py-2">Unit Cost</th>
              <th className="px-2 py-2">Vendor</th>
              <th className="px-2 py-2 text-right">Total</th>
              <th className="px-2 py-2"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-[#E2E8F0]">
                <td className="px-2 py-2">
                  <input value={r.component} onChange={(e) => update(r.id, { component: e.target.value })} placeholder="e.g. SS vessel 200L" aria-label="Component" className="w-full rounded-md border border-[#E2E8F0] px-2 py-1.5 text-sm outline-none focus:border-[#2563EB]" />
                </td>
                <td className="px-2 py-2">
                  <input type="number" min={0} value={r.qty} onChange={(e) => update(r.id, { qty: Number(e.target.value) })} aria-label="Quantity" className="w-20 rounded-md border border-[#E2E8F0] px-2 py-1.5 text-sm outline-none focus:border-[#2563EB]" />
                </td>
                <td className="px-2 py-2">
                  <input type="number" min={0} value={r.unitCost} onChange={(e) => update(r.id, { unitCost: Number(e.target.value) })} aria-label="Unit cost" className="w-28 rounded-md border border-[#E2E8F0] px-2 py-1.5 text-sm outline-none focus:border-[#2563EB]" />
                </td>
                <td className="px-2 py-2">
                  <input value={r.vendor} onChange={(e) => update(r.id, { vendor: e.target.value })} placeholder="Vendor" aria-label="Vendor" className="w-full rounded-md border border-[#E2E8F0] px-2 py-1.5 text-sm outline-none focus:border-[#2563EB]" />
                </td>
                <td className="px-2 py-2 text-right font-semibold tabular-nums">{formatINR(bomRowTotal(r))}</td>
                <td className="px-2 py-2 text-right">
                  <button onClick={() => remove(r.id)} aria-label="Remove row" className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={add} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100">
        <Plus className="h-3.5 w-3.5" /> Add line item
      </button>
      <div className="mt-4 rounded-lg bg-slate-50 p-3">
        <div className="h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Budget utilisation">
          <div className={over ? "h-full bg-slate-400" : "h-full bg-[#1E3A8A]"} style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <p className="font-bold tabular-nums">Total: {formatINR(total)}</p>
          <p className={over ? "text-xs font-semibold text-slate-700" : "text-xs font-semibold text-blue-800"}>
            {over ? `Over ceiling by ${formatINR(total - allocationCeiling)}` : `${formatINR(remaining)} remaining`}
          </p>
          <span className="ml-auto" />
          {over ? (
            <p role="alert" className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-800">
              <AlertTriangle className="h-3.5 w-3.5 text-[#1E3A8A]" /> Exceeds State + CSR ceiling — trim scope before DPR sign-off.
            </p>
          ) : (
            <p role="status" className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-900">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB]" /> Within ceiling — DPR eligible.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}



