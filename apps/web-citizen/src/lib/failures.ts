export type FailureSeverity = "MINOR" | "MAJOR";

export interface FailureCase {
  id: string;
  ticketId: string;
  title: string;
  campus: string;
  district: string;
  year: number;
  domain: string;
  severity: FailureSeverity;
  trl: string;
  attempted: string;
  specs: string[];
  rootCause: string;
  failureModes: string[];
  recommendations: string[];
  costINR: number;
  teamSize: number;
}

export const FAILURE_TABS = ["All Archives", "Minor Engineering Failures", "Major State Challenges"] as const;
export type FailureTab = (typeof FAILURE_TABS)[number];

export function filterFailures(cases: FailureCase[], tab: FailureTab, query: string): FailureCase[] {
  const q = query.trim().toLowerCase();
  return cases.filter((c) => {
    const okTab =
      tab === "All Archives" ||
      (tab === "Minor Engineering Failures" && c.severity === "MINOR") ||
      (tab === "Major State Challenges" && c.severity === "MAJOR");
    if (!okTab) return false;
    if (!q) return true;
    const hay = `${c.title} ${c.campus} ${c.district} ${c.domain} ${c.ticketId} ${c.year} ${c.rootCause}`.toLowerCase();
    return hay.includes(q);
  });
}
