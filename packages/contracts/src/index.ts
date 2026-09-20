// ========================================================================
// JAGRIT — Universal Shared Type Contracts (@jagrit/contracts)
// Authority: Department of Higher & Technical Education, Government of Jharkhand
// Scope: Read-Only for M1–M5. Managed exclusively by Member 6 (Lead DBA & Integrator).
// ========================================================================

/**
 * System Stakeholder Personas & Roles
 */
export type UserRole =
  | 'CITIZEN'
  | 'PRI_OFFICER'
  | 'STUDENT'
  | 'FACULTY_PI'
  | 'INDUSTRY_MENTOR'
  | 'EVALUATOR'
  | 'ADMIN'
  | 'TRUSTEE';

// 5 Designated Community Trustees
export type TrusteeRole =
  | 'SCHOOL_HEADMASTER'
  | 'PRI_WARD_MEMBER'
  | 'INDEPENDENT_GRAM_SABHA_MEMBER'
  | 'BENEFICIARY_SC_ST_1'
  | 'BENEFICIARY_CITIZEN_2';

/**
 * Challenge Statuses from PRD
 */
export type ChallengeStatus =
  | 'PENDING_HITL'
  | 'ROUTED_CIVIC'
  | 'OPEN_FOR_BIDS'
  | 'DYNAMIC_HACKATHON'
  | 'DIRECT_RND'
  | 'IN_PILOT'
  | 'RESOLVED'
  | 'FAILED';

/**
 * Geographic Location Coordinates & Administrative Hierarchy
 */
export interface GeoLocation {
  lat: number;
  lon: number;
  district: string;
  block?: string;
  panchayat?: string;
}

/**
 * 1. ChallengePayload
 * Standardized Submission Payload
 * M1 / Citizen -> M4 / Core Backend
 */
export interface ChallengePayload {
  title: string;
  description: string;
  rawAudioUrl?: string;
  mediaUrls: string[];
  location: GeoLocation;
  preferredLanguage: 'hi' | 'sat' | 'en';
  submissionChannel?:
    | 'APP'
    | 'WEB'
    | 'WHATSAPP'
    | 'INSTITUTIONAL_DOSSIER'
    | 'FIELD_SURVEY';
  district?: string;
  block?: string;
  panchayat?: string;
}

/**
 * Backward compatibility alias for existing frontend imports
 */
export type ChallengeSubmissionPayload = ChallengePayload;

/**
 * 2. ClusterIncident
 * Composite Spatio-Temporal Cluster
 * ADR-003: D >= 0.72
 */
export interface ClusterIncident {
  id: string;
  clusterCode: string;
  centroid: GeoLocation;
  radiusMeters: number;
  incidentCount: number;
  status:
    | 'ACTIVE'
    | 'MERGED'
    | 'IN_PROGRESS'
    | 'RESOLVED'
    | 'ARCHIVED';
  primaryDomain: string;
  district: string;
  block?: string;
  panchayat?: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * 3. TrusteeVote
 * Dual-Lock Quorum Key 1
 * ADR-006: 4 of 5 Designated Community Trustees
 */
export type TrusteeVoteStatus =
  | 'PENDING'
  | 'AFFIRMATIVE'
  | 'REJECTED'
  | 'ABSTAIN';

export interface TrusteeVote {
  id: string;
  projectId: string;
  trusteeUserId: string;
  trusteeName?: string;
  designation: string;
  hasVoted: boolean;
  voteStatus: TrusteeVoteStatus;
  voteRemarks?: string;
  votedAt?: string;
  createdAt?: string;
}

/**
 * 4. EscrowTranche
 * Milestone-Based Escrow Release
 * ADR-005: 30% -> 40% -> 30%
 */
export type EscrowMilestoneNumber = 1 | 2 | 3;

export type EscrowProofRequirement =
  | 'PROPOSAL_APPROVAL'
  | 'NABL_CERTIFICATE'
  | 'PESA_GRAM_SABHA_NOC';

export interface EscrowTranche {
  milestoneNumber: EscrowMilestoneNumber;
  percentage: 30 | 40;
  amountINR: number;
  isDisbursed: boolean;
  requiredProof: EscrowProofRequirement;
  disbursedAt?: string;
  proofDocumentUrl?: string;
}

/**
 * Backward compatibility alias for existing escrow imports
 */
export type EscrowMilestone = EscrowTranche;

/**
 * 5. XAISpiderScores
 * Explainable AI Institutional Capability Radar
 * ADR-004 & M2
 */
export interface XAISpiderScores {
  labCapability: number;
  facultyPatents: number;
  geographicProximity: number;
  trackRecord: number;
  overallMatchScore: number;
  facultyStrength?: number;
}

/**
 * XAI Spider Chart Data
 * Updated to 6-Axis matching v14.1.0-PROD
 */
export interface XAISpiderChartData {
  domainExpertise: number;
  facultyAvailability: number;
  nablLab: number;
  proximity: number;
  campusCapacity: number;
  trackRecord: number;
  overallMatchScore: number;
}

/**
 * AI Analysis Result
 * M5 AI Service -> M4 Core Backend
 */
export interface AIAnalysisResult {
  detectedDomain: string;
  categoryType: 'CIVIC_ROUTINE' | 'HEI_RESEARCH';
  confidenceScore: number;
  duplicateMatchedTicketId?: string;
  semanticSimilarityScore?: number;
  compositeDeduplicationScore?: number;
  recommendedUniversities: string[];
  suggestedTimelineWeeks: number;
}

/**
 * Quorum Feedback
 * Role 1 & 3
 */
export interface QuorumFeedbackPayload {
  challengeId: string;
  projectId?: string;
  isCoreFunctionalPass: boolean;
  complaintType:
    | 'NONE'
    | 'COSMETIC_GRIEVANCE'
    | 'CRITICAL_DEFECT';
  rawVoiceUrl?: string;
  transcribedFeedback?: string;
  voterLocation: GeoLocation;
}

/**
 * Early Breakdown Alert
 * ADR-007: Days 1–44 Alert System
 */
export interface BreakdownAlertPayload {
  projectId: string;
  citizenId?: string;
  alertType:
    | 'TOTAL_HALT'
    | 'PARTIAL_BREAKDOWN'
    | 'WATER_QUALITY_DROP'
    | 'SAFETY_HAZARD';
  description: string;
  mediaUrl?: string;
  voiceNoteUrl?: string;
  alertLocation: GeoLocation;
}

/**
 * Verified Blueprint
 * ADR-009: 1-Click Solution Blueprint Cloning Engine
 */
export interface VerifiedBlueprint {
  id: string;
  projectId: string;
  challengeId: string;
  title: string;
  domain: string;
  bomJson: Array<{
    item: string;
    specification: string;
    quantity: number;
    unitCostINR: number;
    vendorSource?: string;
  }>;
  cadSchematicsUrl?: string;
  vernacularSopUrl?: string;
  estimatedReplicationCostINR: number;
  replicationDays: number;
  cloneCount: number;
  createdAt: string;
}

/**
 * R&D Failure Repository Entry
 * ADR-010: Failure Knowledge Base
 */
export interface FailureRepositoryEntry {
  id: string;
  projectId: string;
  failureClassification:
    | 'MATERIAL_FATIGUE'
    | 'CHEMICAL_CLOGGING'
    | 'BIO_FOULING'
    | 'POWER_INSTABILITY'
    | 'CIVIC_TAMPERING'
    | 'DESIGN_FLAW'
    | 'OTHER';
  rootCauseAnalysis: string;
  attemptedSolutionSummary: string;
  lessonsLearned: string;
  escalatedToNationalHackathon: boolean;
  createdAt: string;
}

/**
 * NEP 2020 Academic Credit Record
 * ADR-008: 30 hours = 1 Credit to APAAR / DigiLocker
 */
export interface AcademicCreditRecord {
  studentUserId: string;
  apaarId: string;
  projectId: string;
  challengeTitle: string;
  institutionName: string;
  verifiedWorkhours: number;
  academicCreditsEarned: number;
  creditCategory:
    | 'COMMUNITY_ENGAGEMENT'
    | 'EXPERIENTIAL_LEARNING'
    | 'CAPSTONE_PROJECT';
  signedPayloadSignature: string;
  depositedAt: string;
}

/**
 * Samvaad Community Thread Payload
 */
export interface CommunityThreadPayload {
  id?: string;
  authorId: string;
  authorName?: string;
  parentThreadId?: string;
  content: string;
  mediaAttachments?: string[];
  tags: string[];
  likesCount?: number;
  createdAt?: string;
}