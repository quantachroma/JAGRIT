import type { ChallengeStatus, XAISpiderChartData } from "@jagrit/contracts";

export type CampusId = "bit-mesra" | "nit-jamshedpur" | "iit-ism-dhanbad";

export interface Campus {
  id: CampusId;
  shortName: string;
  fullLabel: string;
  cell: string;
}

export const campuses: Campus[] = [
  { id: "bit-mesra", shortName: "BIT Mesra", fullLabel: "BIT Mesra - Innovation & EDC Cell", cell: "Innovation & EDC Cell" },
  { id: "nit-jamshedpur", shortName: "NIT Jamshedpur", fullLabel: "NIT Jamshedpur - Incubation Centre", cell: "Incubation Centre" },
  { id: "iit-ism-dhanbad", shortName: "IIT ISM Dhanbad", fullLabel: "IIT ISM Dhanbad - R&D Cell", cell: "R&D Cell" },
];

export type PersonaId = "faculty-pi" | "student-lead" | "industry-mentor";

export interface Persona {
  id: PersonaId;
  label: string;
  description: string;
}

export const personas: Persona[] = [
  { id: "faculty-pi", label: "Faculty Principal Investigator (PI)", description: "Owns proposals, milestones and DPR sign-off." },
  { id: "student-lead", label: "Student Lead", description: "Runs builds, logs hours and drafts DPR inputs." },
  { id: "industry-mentor", label: "Industry/CSR Mentor", description: "Reviews viability, CSR match and deployment." },
];

export interface OpenChallenge {
  ticketId: string;
  title: string;
  district: string;
  domain: string;
  priority: string;
  summary: string;
  shortTag: string;
  statePoolINR: number;
  csrMatching?: string;
  aiMatch: number;
  status: ChallengeStatus;
  skills: string[];
  timelineWeeks: number;
  xai: XAISpiderChartData;
}

export const openChallenges: OpenChallenge[] = [
  {
    ticketId: "JAG-4102",
    title: "Safe drinking water for Mahua village",
    district: "Palamu",
    domain: "Water & Public Health",
    priority: "Critical Drinking Water Hazard",
    summary: "Test and treat a recurring fluoride contamination issue in community handpumps.",
    shortTag: "Mahua village water safety",
    statePoolINR: 350000,
    csrMatching: "Tata Steel CSR (1:1 Match)",
    aiMatch: 94,
    status: "OPEN_FOR_BIDS",
    skills: ["Environmental Engineering", "Water Testing Lab", "NABL Assay"],
    timelineWeeks: 12,
    xai: {
      domainExpertise: 96,
      facultyAvailability: 88,
      nablLab: 100,
      proximity: 85,
      campusCapacity: 78,
      trackRecord: 98,
      overallMatchScore: 94,
    },
  },
  {
    ticketId: "JAG-3891",
    title: "Low-cost cold storage for lac producers",
    district: "Khunti",
    domain: "Agri & Forest Produce",
    priority: "State Priority",
    summary: "Prototype a reliable low-energy storage system for local lac producer groups.",
    shortTag: "Lac producer cold storage",
    statePoolINR: 250000,
    csrMatching: "Corporate CSR Pool",
    aiMatch: 88,
    status: "OPEN_FOR_BIDS",
    skills: ["Thermal Systems", "Food Processing", "Field Prototyping"],
    timelineWeeks: 12,
    xai: {
      domainExpertise: 88,
      facultyAvailability: 74,
      nablLab: 70,
      proximity: 80,
      campusCapacity: 75,
      trackRecord: 80,
      overallMatchScore: 88,
    },
  },
  {
    ticketId: "JAG-3221",
    title: "Heavy metal runoff monitoring for Kharkai river",
    district: "East Singhbhum",
    domain: "Heavy Metals & River Runoff",
    priority: "State Priority",
    summary: "Build an affordable sensor and sampling workflow for river runoff monitoring.",
    shortTag: "Kharkai river monitoring",
    statePoolINR: 250000,
    csrMatching: "Corporate CSR Pool",
    aiMatch: 81,
    status: "OPEN_FOR_BIDS",
    skills: ["Material Testing", "Sensors", "Environmental Monitoring"],
    timelineWeeks: 12,
    xai: {
      domainExpertise: 82,
      facultyAvailability: 74,
      nablLab: 70,
      proximity: 96,
      campusCapacity: 75,
      trackRecord: 80,
      overallMatchScore: 81,
    },
  },
];



export interface InstitutionProfile {
  id: string;
  name: string;
  cell: string;
  district: string;
  departments: string[];
  labs: string[];
  facultyWithPatents: number;
  activeProjects: number;
  focusDomains: string[];
  contactEmail: string;
}

export const institutions: InstitutionProfile[] = [
  {
    id: "bit-mesra",
    name: "Birla Institute of Technology, Mesra",
    cell: "Innovation & EDC Cell",
    district: "Ranchi",
    departments: ["Environmental Engineering", "Mechanical Engineering", "Chemistry"],
    labs: ["Water Quality Lab", "Advanced Fabrication Lab", "Sensor Systems Lab"],
    facultyWithPatents: 34,
    activeProjects: 18,
    focusDomains: ["Water & Public Health", "Cold chain", "Sensors"],
    contactEmail: "edc@bitmesra.ac.in",
  },
  {
    id: "nit-jamshedpur",
    name: "National Institute of Technology, Jamshedpur",
    cell: "Incubation Centre",
    district: "East Singhbhum",
    departments: ["Metallurgy", "Electrical Engineering", "Production Engineering"],
    labs: ["Solar Energy Lab", "Materials Testing Lab", "IoT & Embedded Lab"],
    facultyWithPatents: 27,
    activeProjects: 14,
    focusDomains: ["Solar thermal", "Cold chain", "IoT metering"],
    contactEmail: "incubation@nitjsr.ac.in",
  },
  {
    id: "bau-ranchi",
    name: "Birsa Agricultural University",
    cell: "Agri-Innovation Cell",
    district: "Ranchi",
    departments: ["Agronomy", "Forestry", "Food Processing"],
    labs: ["Post-Harvest Lab", "Soil & Compost Lab", "Seed Science Lab"],
    facultyWithPatents: 19,
    activeProjects: 22,
    focusDomains: ["Agri & Forest Produce", "Circular Economy", "Composting"],
    contactEmail: "innovation@bauranchi.ac.in",
  },
];

export const grantSummary = {
  activeGrantsLakh: 14.5,
  activeGrantsLabel: "Active Grants: Rs. 14.50 Lakh",
  statePoolTotalINR: 980000,
  openTickets: 3,
};

export function formatINR(amount: number): string {
  return "Rs. " + amount.toLocaleString("en-IN");
}
