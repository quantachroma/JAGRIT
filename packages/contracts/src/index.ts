// System Roles
export type UserRole = 'CITIZEN' | 'PRI_OFFICER' | 'STUDENT' | 'FACULTY_PI' | 'INDUSTRY_MENTOR' | 'EVALUATOR' | 'ADMIN';

// Challenge Statuses from PRD
export type ChallengeStatus = 
  | 'PENDING_HITL'
  | 'ROUTED_CIVIC'
  | 'OPEN_FOR_BIDS'
  | 'DYNAMIC_HACKATHON'
  | 'DIRECT_RND'
  | 'IN_PILOT'
  | 'RESOLVED'
  | 'FAILED';

export interface GeoLocation {
  lat: number;
  lon: number;
  district: string;
  block?: string;
  panchayat?: string;
}

// Ingestion Payload (Role 1 -> Role 3 & 4)
export interface ChallengeSubmissionPayload {
  title: string;
  description: string;
  rawAudioUrl?: string;
  mediaUrls: string[];
  location: GeoLocation;
  preferredLanguage: 'hi' | 'sat' | 'en';
}

// AI Analysis Output (Role 4 -> Role 3)
export interface AIAnalysisResult {
  detectedDomain: string;
  categoryType: 'CIVIC_ROUTINE' | 'HEI_RESEARCH';
  confidenceScore: number;
  duplicateMatchedTicketId?: string;
  semanticSimilarityScore?: number;
  recommendedUniversities: string[];
  suggestedTimelineWeeks: number;
}

// XAI Spider Chart Data (Role 2)
export interface XAISpiderChartData {
  labCapability: number;      // 0 - 100
  facultyPatents: number;     // 0 - 100
  geographicProximity: number;// 0 - 100
  trackRecord: number;        // 0 - 100
  overallMatchScore: number;  // 0 - 100
}

// Escrow Milestone Schema (Role 3)
export interface EscrowMilestone {
  milestoneNumber: 1 | 2 | 3;
  percentage: 30 | 40 | 30;
  amountINR: number;
  isDisbursed: boolean;
  requiredProof: 'PROPOSAL_APPROVAL' | 'NABL_CERTIFICATE' | 'PESA_GRAM_SABHA_NOC';
}

// Quorum Feedback (Role 1 & 3)
export interface QuorumFeedbackPayload {
  challengeId: string;
  isCoreFunctionalPass: boolean;
  complaintType: 'NONE' | 'COSMETIC_GRIEVANCE' | 'CRITICAL_DEFECT';
  rawVoiceUrl?: string;
  voterLocation: GeoLocation;
}