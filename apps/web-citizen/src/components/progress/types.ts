export type ProgressStageStatus = 'COMPLETED' | 'IN_PROGRESS' | 'SCHEDULED';

export interface ProgressStage {
  id: number;
  titleEn: string;
  titleHi: string;
  titleSat: string;
  subtitleEn: string;
  subtitleHi: string;
  subtitleSat: string;
  status: ProgressStageStatus;
  completedDate?: string;
  deliverablesEn: string[];
  deliverablesHi: string[];
  deliverablesSat: string[];
  signOffAuthorityEn: string;
  signOffAuthorityHi: string;
  signOffAuthoritySat: string;
  auditRef: string;
}

export interface EscrowTranche {
  trancheNumber: number;
  percentage: number;
  amount: string;
  milestoneTitleEn: string;
  milestoneTitleHi: string;
  milestoneTitleSat: string;
  status: 'DISBURSED' | 'LOCKED';
  disbursedDate?: string;
  verificationBadgeEn: string;
  verificationBadgeHi: string;
  verificationBadgeSat: string;
  attachmentRef: string;
}

export interface AuditDocument {
  id: string;
  cardLetter: 'A' | 'B' | 'C';
  titleEn: string;
  titleHi: string;
  titleSat: string;
  badgeEn: string;
  badgeHi: string;
  badgeSat: string;
  summaryEn: string;
  summaryHi: string;
  summarySat: string;
  documentNumber: string;
  issueDate: string;
  signatoryEn: string;
  signatoryHi: string;
  signatorySat: string;
  details: {
    type: 'LAB_REPORT' | 'PESA_NOC' | 'HANDOVER_CERT';
    metrics?: {
      parameterEn: string;
      parameterHi: string;
      parameterSat: string;
      rawGroundwater: string;
      treatedWater: string;
      whoStandard: string;
      status: 'PASS' | 'SAFE';
    }[];
    pesaData?: {
      villagePanchayatEn: string;
      villagePanchayatHi: string;
      villagePanchayatSat: string;
      attendeesTotal: number;
      tribalQuorumPct: string;
      statutoryClause: string;
      resolutionExcerptEn: string;
      resolutionExcerptHi: string;
      resolutionExcerptSat: string;
    };
    handoverData?: {
      sahiyas: { nameEn: string; nameHi: string; nameSat: string; roleEn: string; roleHi: string; roleSat: string }[];
      trainingHours: number;
      spareInventoryEn: string[];
      spareInventoryHi: string[];
      spareInventorySat: string[];
      emergencySla: string;
    };
  };
}

export interface QuorumData {
  villagePopulation: number;
  formulaString: string;
  quorumNeeded: number;
  quorumPolled: number;
  percentMet: number;
  passVotes: number;
  passPercentage: number;
  failVotes: number;
  failPercentage: number;
  nlpFilterStatusEn: string;
  nlpFilterStatusHi: string;
  nlpFilterStatusSat: string;
  cosmeticGrievancesCount: number;
  criticalDefectsCount: number;
}

export interface AcademicCreditData {
  hoursLogged: number;
  creditsEarned: number;
  ncrfFormula: string;
  apaarStatusEn: string;
  apaarStatusHi: string;
  apaarStatusSat: string;
  apaarRegistryId: string;
  facultyApiPoints: number;
  facultyCasScheme: string;
  studentLeads: {
    name: string;
    program: string;
    roleEn: string;
    roleHi: string;
    roleSat: string;
  }[];
}

export interface ProjectProgressData {
  ticketId: string;
  titleEn: string;
  titleHi: string;
  titleSat: string;
  domainEn: string;
  domainHi: string;
  domainSat: string;
  locationEn: string;
  locationHi: string;
  locationSat: string;
  institutionEn: string;
  institutionHi: string;
  institutionSat: string;
  nablTagEn: string;
  nablTagHi: string;
  nablTagSat: string;
  facultyPi: string;
  facultyDeptEn: string;
  facultyDeptHi: string;
  facultyDeptSat: string;
  studentScholarsCount: number;
  csrSponsorEn: string;
  csrSponsorHi: string;
  csrSponsorSat: string;
  csrAmount: string;
  dhteGrantAmount: string;
  totalBudget: string;
  currentDay: number;
  totalMaturationDays: number;
  maturationPercentage: number;
  stages: ProgressStage[];
  escrowTranches: EscrowTranche[];
  auditVault: AuditDocument[];
  quorum: QuorumData;
  academicCredits: AcademicCreditData;
}

