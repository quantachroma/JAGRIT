"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from "recharts";
import { STRINGS, num, type Lang } from "./i18n";

export interface UniversityXAIData {
  domainExpertise?: number;
  facultyAvailability?: number;
  nablLab?: number;
  proximity?: number;
  campusCapacity?: number;
  trackRecord?: number;
  labs?: number;
  patents?: number;
  faculty?: number;
  overall: number;
}

export const BIT_MESRA_XAI: UniversityXAIData = {
  domainExpertise: 95,
  facultyAvailability: 90,
  nablLab: 100,
  proximity: 85,
  campusCapacity: 88,
  trackRecord: 94,
  overall: 94,
};

export const XAI_WEIGHTS = [0.25, 0.2, 0.2, 0.15, 0.1, 0.1] as const;

interface Row {
  short: string;
  label: string;
  detail: string;
  value: number;
  valueText: string;
  weightText: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<{ payload: Row }>;
  scoreLabel: string;
}

function XAITooltip({ active, payload, scoreLabel }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0].payload;
  return (
    <div className="max-w-[220px] rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-md">
      <p className="font-semibold text-[#0F172A]">{row.label}</p>
      <p className="mt-0.5 text-slate-600">{row.detail}</p>
      <p className="mt-1.5 text-[#1D4ED8]">
        {scoreLabel}: <span className="font-semibold">{row.valueText}%</span> · {row.weightText}
      </p>
    </div>
  );
}

interface Props {
  lang: Lang;
  data?: UniversityXAIData;
}

export default function XAISpiderChart({ lang, data = BIT_MESRA_XAI }: Props) {
  const t = STRINGS[lang].xai;
  const values = [
    data.domainExpertise ?? data.labs ?? 95,
    data.facultyAvailability ?? data.faculty ?? 90,
    data.nablLab ?? 100,
    data.proximity ?? 85,
    data.campusCapacity ?? 88,
    data.trackRecord ?? 94,
  ];

  const axisMeta = [
    { short: "E", label: "Domain Expertise", detail: "NABL certified water lab & sorbent patents" },
    { short: "F", label: "Faculty Availability", detail: "Faculty load verified and active for challenge" },
    { short: "I", label: "NABL Lab", detail: "Accredited facility with testing capacity" },
    { short: "G", label: "Proximity", detail: "Palamu Basin <140 km" },
    { short: "C", label: "Campus Capacity", detail: "Departmental bandwidth available" },
    { short: "H", label: "Track Record", detail: "94% historical success on deployed pilots" },
  ];

  const rows: Row[] = axisMeta.map((axis, i) => ({
    short: axis.short,
    label: axis.label,
    detail: axis.detail,
    value: values[i],
    valueText: num(values[i], lang),
    weightText: t.weightLabel(num(XAI_WEIGHTS[i].toFixed(2), lang)),
  }));

  return (
    <section
      aria-labelledby="xai-title"
      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 id="xai-title" className="text-lg font-semibold text-[#0F172A]">
          {t.title}
        </h2>
        <span className="rounded-full bg-[#1D4ED8] px-3 py-1 text-sm font-semibold text-white">
          {t.overallBadge(num(data.overall, lang))}
        </span>
      </div>

      <div className="mt-2 h-72 w-full" role="img" aria-label={t.title}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={rows} outerRadius="72%">
            <PolarGrid stroke="#CBD5E1" />
            <PolarAngleAxis dataKey="short" tick={{ fill: "#0F172A", fontSize: 12 }} />
            <Radar
              dataKey="value"
              stroke="#1E40AF"
              strokeWidth={2}
              fill="#1D4ED8"
              fillOpacity={0.35}
              isAnimationActive={false}
            />
            <Tooltip content={<XAITooltip scoreLabel={t.scoreLabel} />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Text equivalent of the chart: helps mobile (no hover) and screen readers */}
      <ul className="mt-2 divide-y divide-slate-100 text-sm">
        {rows.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between gap-3 py-2">
            <div className="min-w-0">
              <p className="font-medium text-[#0F172A]">{row.label}</p>
              <p className="text-xs text-slate-600">{row.detail}</p>
            </div>
            <p className="shrink-0 text-right text-xs text-slate-600">
              <span className="text-sm font-semibold text-[#1D4ED8]">{row.valueText}%</span>
              <br />
              {row.weightText}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-xl bg-[#F8FAFC] p-4">
        <h3 className="text-sm font-semibold text-[#0F172A]">{t.explainTitle}</h3>
        <p className="mt-1 text-sm font-medium text-[#1D4ED8]">Score(U, P) = 0.25E + 0.20F + 0.20I + 0.15G + 0.10C + 0.10H</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.explain}</p>
      </div>
    </section>
  );
}