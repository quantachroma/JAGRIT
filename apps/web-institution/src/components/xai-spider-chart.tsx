"use client";
import type { XAISpiderChartData } from "@jagrit/contracts";
import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { FlaskConical, Microscope, Quote } from "lucide-react";

export default function XaiSpiderChart({ data, studentPool = 82, ticketId }: { data: XAISpiderChartData; studentPool?: number; ticketId?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const chart = [
    { axis: "NABL Labs", full: "NABL Accredited Research Labs (+35%)", value: data.labCapability },
    { axis: "Patents", full: "Faculty Patent Corpus (+30%)", value: data.facultyPatents },
    { axis: "Proximity", full: "Geographic Basin Proximity (+15%)", value: data.geographicProximity },
    { axis: "Track Record", full: "Deployed Project Track Record (+14%)", value: data.trackRecord },
    { axis: "Student Pool", full: "Interdisciplinary Student Pool (+6%)", value: studentPool },
  ];
  const weights = ["+35%", "+30%", "+15%", "+14%", "+6%"];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4F46E5]">AI Capability Fit: {data.overallMatchScore}%{ticketId ? ` · ${ticketId}` : ""}</p>
        <h3 className="mt-1 text-sm font-bold text-[#0F172A]">Why the AI Matched Your Campus</h3>
        {!mounted ? (
          <div className="mt-3 flex h-[260px] items-center justify-center rounded-lg bg-slate-50 text-xs text-slate-500">Loading match visualization…</div>
        ) : (
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chart} outerRadius="68%">
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "#334155" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Campus fit" dataKey="value" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.35} strokeWidth={2} dot />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
        <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
          {chart.map((c, i) => (
            <li key={c.axis} className="flex items-center justify-between rounded bg-slate-50 px-2 py-1"><span>{c.full}</span><span className="font-bold text-slate-800">{c.value} {weights[i]}</span></li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-blue-200 bg-[#EFF6FF] p-4">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#1E3A8A] px-2.5 py-1 text-[11px] font-semibold text-white"><Microscope className="h-3 w-3" /> Explainability card</p>
        <h4 className="mt-2 text-sm font-bold text-[#0F172A]">Exact evidence behind the score</h4>
        <div className="mt-3 space-y-3 text-xs leading-relaxed text-slate-700">
          <div className="rounded-lg bg-white p-3">
            <p className="flex items-center gap-1.5 font-semibold text-slate-800"><FlaskConical className="h-3.5 w-3.5 text-[#2563EB]" /> NABL lab equipment (+35%)</p>
            <ul className="mt-1.5 list-disc space-y-0.5 pl-5">
              <li>Water Quality Lab — AAS (NABL/2024-31) for fluoride/arsenic assay</li>
              <li>Sensor Systems Lab — field fluorimeters + 14 IoT logger nodes</li>
              <li>Advanced Fabrication Lab — membrane housing CNC rig</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="flex items-center gap-1.5 font-semibold text-slate-800"><Quote className="h-3.5 w-3.5 text-[#2563EB]" /> Faculty citations (+30%)</p>
            <ul className="mt-1.5 list-disc space-y-0.5 pl-5">
              <li>Prof. R. K. Verma — IN Patent 202341052117: fluoride adsorbent (41 cites)</li>
              <li>Dr. S. Marandi — arsenic dual-media column, Palamu pilot 2024</li>
              <li>14 prior deployments — track record (+14%)</li>
            </ul>
          </div>
          <p className="rounded-lg bg-white p-3">Basin proximity (+15%): Ranchi to site, same North Koel basin. Student pool (+6%): 240 students, 5 NSS field teams ready.</p>
        </div>
      </div>
    </div>
  );
}