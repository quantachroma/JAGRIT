export interface IprClause {
  party: string;
  icon: string;
  title: string;
  points: string[];
  accent: string;
}

export const IPR_CLAUSES: IprClause[] = [
  {
    party: "Students & Faculty",
    icon: "🎓",
    title: "Inventors — moral rights + majority equity",
    points: ["Exclusive moral rights as Inventors", ">=60% equity in spin-off startup", "Named on patent + startup cap table"],
    accent: "border-indigo-200 bg-indigo-50",
  },
  {
    party: "University",
    icon: "🏛️",
    title: "Custody of patent + royalty share",
    points: ["Institutional custody of patent", "20-30% royalty share on commercial licensing", "Funds departmental research"],
    accent: "border-emerald-200 bg-emerald-50",
  },
  {
    party: "Industry CSR Co-Sponsor",
    icon: "🏢",
    title: "ROFR + internal use licence",
    points: ["Right of First Refusal (ROFR) for manufacturing", "Royalty-free internal operational licence", "CSR Schedule VII credit + branding"],
    accent: "border-amber-200 bg-amber-50",
  },
  {
    party: "Government of Jharkhand",
    icon: "🏛️",
    title: "Statewide public deployment licence",
    points: ["Irrevocable royalty-free licence statewide", "Deploy in schools, PHCs, rural bodies", "DHTE nodal counter-signature"],
    accent: "border-sky-200 bg-sky-50",
  },
];

export function buildIprAgreementText(input: { ticket: string; title: string; team: string; date: string }): string {
  return [
    "JAGRIT TRIPARTITE IPR CONCORDAT (PRD 10.2)",
    `Project: ${input.ticket} — ${input.title}`,
    `Team: ${input.team}`,
    `Date: ${input.date}`,
    "",
    "1. Students & Faculty retain moral rights as Inventors and >=60% spin-off equity.",
    "2. University holds patent custody with 20-30% commercial royalty share.",
    "3. Industry CSR partner holds ROFR for manufacturing + royalty-free internal licence.",
    "4. Govt of Jharkhand holds irrevocable royalty-free licence for statewide public deployment.",
    "5. COMPLETELY_SOLVED projects fast-track to AIC/EDC incubation + Jharkhand Startup Policy seed support.",
  ].join("\n");
}
