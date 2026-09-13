export const CREDIT_HOURS_PER_CREDIT = 30;
export const MAX_CAPSTONE_CREDITS = 4;

export function computeCredits(workhours: number): {
  credits: number;
  remainder: number;
  capped: boolean;
  progressToNext: number;
} {
  const safe = Number.isFinite(workhours) ? Math.max(0, Math.floor(workhours)) : 0;
  const raw = Math.floor(safe / CREDIT_HOURS_PER_CREDIT);
  const capped = raw > MAX_CAPSTONE_CREDITS;
  const credits = Math.min(raw, MAX_CAPSTONE_CREDITS);
  const remainder = safe - credits * CREDIT_HOURS_PER_CREDIT;
  const progressToNext =
    credits >= MAX_CAPSTONE_CREDITS ? 100 : Math.round((remainder / CREDIT_HOURS_PER_CREDIT) * 100);
  return { credits, remainder, capped, progressToNext };
}

export interface CourseMapping {
  code: string;
  title: string;
  category: string;
  maxCredits: number;
}

export const COURSE_MAPPINGS: CourseMapping[] = [
  {
    code: "NEP-CE-401",
    title: "Field Engagement & Applied Community Innovation",
    category: "Multidisciplinary Capstone Innovation Project",
    maxCredits: 4,
  },
  {
    code: "NEP-CE-201",
    title: "Community Engagement & Service",
    category: "Community Engagement & Service (Mandatory under NEP)",
    maxCredits: 2,
  },
  {
    code: "NEP-FP-301",
    title: "Summer Internship / Field Project",
    category: "Summer Internship / Field Project",
    maxCredits: 4,
  },
];

export interface ApaarPayload {
  schema: string;
  schemaVersion: string;
  issuer: {
    authority: string;
    department: string;
    state: string;
    nadEndpoint: string;
  };
  student: { name: string; apaarId: string };
  award: {
    courseCode: string;
    courseTitle: string;
    courseCategory: string;
    verifiedWorkhours: number;
    creditsAwarded: number;
    creditRule: string;
    academicYear: string;
    projectTicket: string;
    facultyPi: string;
    institution: string;
  };
  verification: {
    facultyVerified: boolean;
    verifiedAt: string;
    transcriptEligible: boolean;
    digilockerPush: string;
  };
  signatures: { facultyPi: string; dhteNodal: string; checksum: string };
}

export function buildApaarPayload(input: {
  studentName: string;
  apaarId: string;
  course: CourseMapping;
  workhours: number;
  credits: number;
  projectTicket: string;
  facultyPi: string;
  institution: string;
}): ApaarPayload {
  const now = new Date().toISOString();
  const checksumBase = `${input.apaarId}|${input.course.code}|${input.credits}|${input.workhours}|JAGRIT-DHTE`;
  let hash = 0;
  for (let i = 0; i < checksumBase.length; i++) {
    hash = (hash * 31 + checksumBase.charCodeAt(i)) >>> 0;
  }
  return {
    schema: "NAD/ABC/CreditDeposit",
    schemaVersion: "1.0.0",
    issuer: {
      authority: "Department of Higher & Technical Education (DHTE)",
      department: "Government of Jharkhand",
      state: "Jharkhand",
      nadEndpoint: "https://nad.digilocker.gov.in/api/v1/abc/credit-deposit",
    },
    student: { name: input.studentName, apaarId: input.apaarId },
    award: {
      courseCode: input.course.code,
      courseTitle: input.course.title,
      courseCategory: input.course.category,
      verifiedWorkhours: input.workhours,
      creditsAwarded: input.credits,
      creditRule: "30 verified workhours = 1 Academic Credit (UGC/NCrF, ADR-008, max 4 for Capstone)",
      academicYear: "2025-26",
      projectTicket: input.projectTicket,
      facultyPi: input.facultyPi,
      institution: input.institution,
    },
    verification: {
      facultyVerified: true,
      verifiedAt: now,
      transcriptEligible: input.credits > 0,
      digilockerPush: "READY_FOR_NAD",
    },
    signatures: {
      facultyPi: `signed:${input.facultyPi}:${now}`,
      dhteNodal: "signed:DHTE-JH-NODAL:pending-counter-sign",
      checksum: `JAG-${hash.toString(16).toUpperCase().padStart(8, "0")}`,
    },
  };
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
