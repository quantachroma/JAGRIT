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
    title: "High Fluoride & Arsenic Contamination in Palamu Groundwater",
    district: "Palamu",
    domain: "Water & Public Health",
    priority: "Drinking water safety",
    summary: "Community wells across Palamu blocks report fluoride above 1.5 mg/L with isolated arsenic traces. Needs a low-cost field-testable filtration pilot for 20 hamlets.",
    statePoolINR: 350000,
    csrMatching: "Tata Steel",
    aiMatch: 94,
    status: "OPEN_FOR_BIDS",
    skills: ["Environmental engineering", "Membrane filtration", "Field sensors"],
    timelineWeeks: 12,
    xai: { labCapability: 92, facultyPatents: 88, geographicProximity: 74, trackRecord: 90, overallMatchScore: 94 },
  },
  {
    ticketId: "JAG-3891",
    title: "Solar-Powered Cold Storage for Perishable Lac & Forest Produce in Khunti",
    district: "Khunti",
    domain: "Agri & Forest Produce",
    priority: "Post-harvest losses",
    summary: "Lac, tamarind and minor forest produce spoil within 48 hours in Khunti heat. Needs a 5MT solar cold room with pay-per-use metering for FPO clusters.",
    statePoolINR: 420000,
    aiMatch: 88,
    status: "OPEN_FOR_BIDS",
    skills: ["Solar thermal", "Cold chain", "IoT metering"],
    timelineWeeks: 14,
    xai: { labCapability: 86, facultyPatents: 72, geographicProximity: 81, trackRecord: 84, overallMatchScore: 88 },
  },
  {
    ticketId: "JAG-4022",
    title: "Non-Electric Bio-Waste Composter for Chaibasa Peri-Urban Schools",
    district: "Chaibasa",
    domain: "Sanitation & Circular Economy",
    priority: "School waste management",
    summary: "Peri-urban schools around Chaibasa generate mixed bio-waste with no reliable power. Needs a non-electric aerated composter sized for 500-student campuses.",
    statePoolINR: 210000,
    aiMatch: 79,
    status: "OPEN_FOR_BIDS",
    skills: ["Bio-process design", "Low-cost fabrication", "Behavioural ops"],
    timelineWeeks: 10,
    xai: { labCapability: 78, facultyPatents: 64, geographicProximity: 77, trackRecord: 80, overallMatchScore: 79 },
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
