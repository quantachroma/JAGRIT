"use client";

import { useState } from "react";
import { MapPin, ChevronUp, ChevronDown, TrendingUp } from "lucide-react";

type District = {
  name: string;
  division: string;
  logged: number;
  clustered: number;
  active: number;
  solved: number;
  avgDays: number;
  quorum: number; // out of 5
};

const DISTRICTS: District[] = [
  { name: "Ranchi",          division: "Ranchi",       logged: 340, clustered: 31, active: 28, solved: 32, avgDays: 47, quorum: 4.6 },
  { name: "Dhanbad",         division: "Dhanbad",      logged: 210, clustered: 19, active: 17, solved: 16, avgDays: 62, quorum: 4.1 },
  { name: "Palamu",          division: "Palamu",       logged: 184, clustered: 17, active: 14, solved: 18, avgDays: 71, quorum: 3.8 },
  { name: "Khunti",          division: "Ranchi",       logged: 142, clustered: 13, active: 11, solved: 14, avgDays: 68, quorum: 3.5 },
  { name: "West Singhbhum",  division: "Kolhan",       logged: 128, clustered: 12, active:  9, solved: 11, avgDays: 79, quorum: 3.2 },
  { name: "East Singhbhum",  division: "Kolhan",       logged: 196, clustered: 18, active: 15, solved: 19, avgDays: 58, quorum: 4.0 },
  { name: "Bokaro",          division: "Dhanbad",      logged: 175, clustered: 16, active: 13, solved: 17, avgDays: 55, quorum: 4.2 },
  { name: "Giridih",         division: "Dhanbad",      logged: 138, clustered: 12, active: 10, solved: 12, avgDays: 74, quorum: 3.4 },
  { name: "Hazaribagh",      division: "North Chhota", logged: 162, clustered: 15, active: 12, solved: 15, avgDays: 63, quorum: 3.9 },
  { name: "Ramgarh",         division: "North Chhota", logged:  98, clustered:  9, active:  7, solved:  9, avgDays: 58, quorum: 3.7 },
  { name: "Koderma",         division: "North Chhota", logged:  84, clustered:  8, active:  6, solved:  8, avgDays: 61, quorum: 3.6 },
  { name: "Chatra",          division: "North Chhota", logged: 109, clustered: 10, active:  8, solved: 10, avgDays: 77, quorum: 3.3 },
  { name: "Latehar",         division: "Palamu",       logged: 122, clustered: 11, active:  9, solved:  9, avgDays: 82, quorum: 3.1 },
  { name: "Garhwa",          division: "Palamu",       logged: 115, clustered: 10, active:  8, solved: 10, avgDays: 80, quorum: 3.2 },
  { name: "Dumka",           division: "Santhal",      logged: 148, clustered: 14, active: 11, solved: 13, avgDays: 69, quorum: 3.6 },
  { name: "Jamtara",         division: "Santhal",      logged:  92, clustered:  8, active:  6, solved:  8, avgDays: 72, quorum: 3.3 },
  { name: "Deoghar",         division: "Santhal",      logged: 134, clustered: 12, active: 10, solved: 12, avgDays: 65, quorum: 3.8 },
  { name: "Godda",           division: "Santhal",      logged: 118, clustered: 11, active:  8, solved: 10, avgDays: 74, quorum: 3.4 },
  { name: "Sahebganj",       division: "Santhal",      logged: 104, clustered:  9, active:  7, solved:  8, avgDays: 78, quorum: 3.2 },
  { name: "Pakur",           division: "Santhal",      logged:  96, clustered:  9, active:  6, solved:  8, avgDays: 75, quorum: 3.1 },
  { name: "Seraikela",       division: "Kolhan",       logged: 112, clustered: 10, active:  8, solved:  9, avgDays: 70, quorum: 3.5 },
  { name: "Simdega",         division: "South Chhota", logged: 108, clustered: 10, active:  7, solved:  9, avgDays: 76, quorum: 3.3 },
  { name: "Gumla",           division: "South Chhota", logged: 126, clustered: 11, active:  9, solved: 10, avgDays: 73, quorum: 3.4 },
  { name: "Lohardaga",       division: "South Chhota", logged:  88, clustered:  8, active:  6, solved:  8, avgDays: 69, quorum: 3.5 },
];

type SortKey = keyof District;

function QuorumStars({ value }: { value: number }) {
  const full = Math.floor(value);
  const frac = value - full;
  return (
    <span className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <span key={i} className="text-[13px]">★</span>;
        if (i === full && frac >= 0.5) return <span key={i} className="text-[13px] opacity-50">★</span>;
        return <span key={i} className="text-[13px] text-slate-200">★</span>;
      })}
      <span className="ml-1 text-[11px] font-bold text-slate-700">{value.toFixed(1)}</span>
    </span>
  );
}

function quorumColor(q: number) {
  if (q >= 4.2) return "bg-emerald-100 text-emerald-800";
  if (q >= 3.8) return "bg-blue-100 text-blue-800";
  if (q >= 3.4) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

export function DistrictHeatmap() {
  const [sortKey, setSortKey] = useState<SortKey>("logged");
  const [asc, setAsc]         = useState(false);

  const sorted = [...DISTRICTS].sort((a, b) => {
    const av = a[sortKey] as number | string;
    const bv = b[sortKey] as number | string;
    return asc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });

  function handleSort(key: SortKey) {
    if (key === sortKey) setAsc(!asc);
    else { setSortKey(key); setAsc(false); }
  }

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? asc ? <ChevronUp className="inline w-3 h-3 ml-0.5" /> : <ChevronDown className="inline w-3 h-3 ml-0.5" />
      : null;

  const totalLogged  = DISTRICTS.reduce((s, d) => s + d.logged, 0);
  const totalSolved  = DISTRICTS.reduce((s, d) => s + d.solved, 0);
  const totalActive  = DISTRICTS.reduce((s, d) => s + d.active, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-700" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Statewide 24-District GIS Heatmap
            </h3>
            <p className="text-xs text-slate-500">
              Problem density, resolution velocity, and citizen satisfaction across Jharkhand
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-slate-600">Total Logged: <span className="text-blue-800">{totalLogged.toLocaleString()}</span></span>
          <span className="text-slate-600">Solved: <span className="text-emerald-700">{totalSolved}</span></span>
          <span className="text-slate-600">Active: <span className="text-amber-700">{totalActive}</span></span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-100 sticky top-0">
            <tr>
              {[
                { label: "District",                     key: "name"      as SortKey },
                { label: "Division",                     key: "division"  as SortKey },
                { label: "Problems Logged",              key: "logged"    as SortKey },
                { label: "Clustered Master Tickets",     key: "clustered" as SortKey },
                { label: "Active HEI Projects",          key: "active"    as SortKey },
                { label: "Completely Solved",            key: "solved"    as SortKey },
                { label: "Avg. Resolution (Days)",       key: "avgDays"   as SortKey },
                { label: "Citizen Quorum Rating",        key: "quorum"    as SortKey },
              ].map(({ label, key }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-3 py-3 text-left text-[11px] font-bold text-slate-600 uppercase tracking-wide cursor-pointer hover:text-blue-700 select-none whitespace-nowrap"
                >
                  {label}<SortIcon k={key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sorted.map((d, i) => {
              const solveRate = d.logged > 0 ? (d.solved / d.logged) * 100 : 0;
              const isHighlight = ["Palamu", "Khunti", "West Singhbhum", "Dhanbad", "Ranchi"].includes(d.name);
              return (
                <tr
                  key={d.name}
                  className={`transition-colors ${isHighlight ? "bg-blue-50/60" : i % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-blue-50/40`}
                >
                  <td className="px-3 py-2.5 font-bold text-slate-900 whitespace-nowrap">
                    {isHighlight && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 mb-0.5" />}
                    {d.name}
                  </td>
                  <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">{d.division}</td>
                  <td className="px-3 py-2.5">
                    <span className="font-bold text-slate-900">{d.logged}</span>
                    <div className="w-20 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(d.logged / 340) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-slate-700">{d.clustered}</td>
                  <td className="px-3 py-2.5">
                    <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      {d.active}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-emerald-700">{d.solved}</span>
                      <span className="text-slate-400 text-[10px]">({solveRate.toFixed(0)}%)</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`font-bold ${d.avgDays > 75 ? "text-red-600" : d.avgDays > 65 ? "text-amber-600" : "text-emerald-700"}`}>
                      {d.avgDays}d
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${quorumColor(d.quorum)}`}>
                      {d.quorum.toFixed(1)} ★
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
        <TrendingUp className="w-3 h-3" />
        <span>Click any column header to sort. Highlighted rows: key focal districts per PRD §4.2.</span>
      </div>
    </div>
  );
}

