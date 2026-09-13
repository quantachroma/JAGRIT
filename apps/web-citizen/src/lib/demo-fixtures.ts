// Stage 4 demo fixtures — realistic Jharkhand academic telemetry for evaluator demos.
// BIT Mesra Environmental Engineering Lab · NIT Jamshedpur Solar Dynamics · BAU lac preservation.

export interface TelemetryLog {
  id: string;
  lab: string;
  campus: string;
  ticketId: string;
  date: string;
  metric: string;
  value: string;
  status: "WITHIN_SPEC" | "WATCH" | "BREACH";
  note: string;
}

export const BIT_MESRA_TELEMETRY: TelemetryLog[] = [
  { id: "BIT-TEL-001", lab: "Environmental Engineering Lab", campus: "BIT Mesra", ticketId: "JAG-4102", date: "2025-11-04", metric: "Influent fluoride", value: "2.8 mg/L", status: "WATCH", note: "Palamu well cluster avg; above BIS 1.0 mg/L limit." },
  { id: "BIT-TEL-002", lab: "Environmental Engineering Lab", campus: "BIT Mesra", ticketId: "JAG-4102", date: "2025-11-11", metric: "Treated fluoride (bauxite bed)", value: "0.7 mg/L", status: "WITHIN_SPEC", note: "70:20:10 bauxite/clay/biochar ratio, 14-day breakthrough curve." },
  { id: "BIT-TEL-003", lab: "Environmental Engineering Lab", campus: "BIT Mesra", ticketId: "JAG-4102", date: "2025-11-18", metric: "Flow calibration", value: "38 L/day gravity feed", status: "WITHIN_SPEC", note: "Bed volumes 6.2/day; pH 7.1 buffered by clay layer." },
  { id: "BIT-TEL-004", lab: "Environmental Engineering Lab", campus: "BIT Mesra", ticketId: "JAG-4102", date: "2025-11-25", metric: "Silica pre-screen", value: "41 mg/L", status: "WATCH", note: "Below 45 mg/L passivation threshold — FAIL-2023-014 guardrail clear." },
];

export const NIT_SOLAR_TELEMETRY: TelemetryLog[] = [
  { id: "NIT-TEL-101", lab: "Solar Dynamics Lab", campus: "NIT Jamshedpur", ticketId: "JAG-3891", date: "2025-10-02", metric: "Cold-room hold temp", value: "5.2°C (day) / 9.8°C (night)", status: "WATCH", note: "Night excursion traced to missing phase-change buffer." },
  { id: "NIT-TEL-102", lab: "Solar Dynamics Lab", campus: "NIT Jamshedpur", ticketId: "JAG-3891", date: "2025-10-16", metric: "PV yield vs load", value: "3.1 kWp → 11.4 kWh/day", status: "WITHIN_SPEC", note: "Compressor duty 8.2 hrs/day at 38°C ambient model." },
  { id: "NIT-TEL-103", lab: "Solar Dynamics Lab", campus: "NIT Jamshedpur", ticketId: "JAG-3891", date: "2025-11-06", metric: "Door-opening loss test", value: "+3.1°C per 20 openings", status: "BREACH", note: "Strip curtain retrofit required before cluster pilot." },
];

export const BAU_LAC_RESULTS: TelemetryLog[] = [
  { id: "BAU-LAC-201", lab: "Post-Harvest & Lac Lab", campus: "Birsa Agricultural University", ticketId: "JAG-3891", date: "2025-09-20", metric: "Organic lac moisture (solar dryer)", value: "62% → 18% in 9 hrs", status: "WITHIN_SPEC", note: "50 kg/batch cabinet dryer, clear-sky run with two FPO clusters." },
  { id: "BAU-LAC-202", lab: "Post-Harvest & Lac Lab", campus: "Birsa Agricultural University", ticketId: "JAG-3891", date: "2025-09-21", metric: "Overnight re-absorption", value: "18% → 26% (no desiccant)", status: "WATCH", note: "Desiccant-tray night hold added; re-test Oct–Mar window per FAIL-2023-027." },
  { id: "BAU-LAC-203", lab: "Post-Harvest & Lac Lab", campus: "Birsa Agricultural University", ticketId: "JAG-3891", date: "2025-10-05", metric: "Stick-lac storage loss", value: "4.2% over 30 days", status: "WITHIN_SPEC", note: "Food-grade SS trays; below 6% FPO acceptability bar." },
];

export const ALL_DEMO_TELEMETRY: TelemetryLog[] = [...BIT_MESRA_TELEMETRY, ...NIT_SOLAR_TELEMETRY, ...BAU_LAC_RESULTS];

export function telemetryByTicket(ticketId: string): TelemetryLog[] {
  return ALL_DEMO_TELEMETRY.filter((t) => t.ticketId === ticketId);
}
