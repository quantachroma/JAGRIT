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

/**
 * Local 5-axis shape. `packages/contracts` XAISpiderChartData has only 4 axes (no faculty axis)
 * and is frozen, so this component defines its own type until the team agrees a contract change.
 */
export interface UniversityXAIData {
  labs: number; // 0-100
  patents: number;
  proximity: number;
  trackRecord: number;
  faculty: number;
  overall: number; // headline compatibility %
}

// Demo values for BIT Mesra ↔ #JAG-PLM-0082 (from the Stage 1 brief).
export const BIT_MESRA_XAI: UniversityXAIData = {
  labs: 95,
  patents: 90,
  proximity: 85,
  trackRecord: 88,
  faculty: 92,
  overall: 94,
};

// w1..w5 — sums to 1.00
export const XAI_WEIGHTS = [0.35, 0.3, 0.15, 0.14, 0.06] as const;

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
  const values = [data.labs, data.patents, data.proximity, data.trackRecord, data.faculty];

  const rows: Row[] = t.axes.map((axis, i) => ({
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
        <p className="mt-1 text-sm leading-relaxed text-slate-700">{t.explain}</p>
      </div>
    </section>
  );
}