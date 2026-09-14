export type StatewideLanguage = 'en' | 'hi' | 'sat';

export type ChallengeDomain = 'all' | 'water' | 'agritech' | 'energy' | 'healthcare' | 'ecology';

export type ChallengeStage = 'all' | 'bidding' | 'prototyping' | 'deployment' | 'maturation';

export interface MacroMetrics {
  solvedProblemsCount: string;
  solvedProblemsLabel: { en: string; hi: string; sat: string };
  solvedProblemsSub: { en: string; hi: string; sat: string };
  
  activeProjectsCount: string;
  activeProjectsLabel: { en: string; hi: string; sat: string };
  activeProjectsSub: { en: string; hi: string; sat: string };
  
  institutionsCount: string;
  institutionsLabel: { en: string; hi: string; sat: string };
  institutionsSub: { en: string; hi: string; sat: string };
  
  fundsMobilizedAmount: string;
  fundsMobilizedLabel: { en: string; hi: string; sat: string };
  fundsMobilizedSub: { en: string; hi: string; sat: string };

  nepCreditsCount: string;
  nepCreditsLabel: { en: string; hi: string; sat: string };

  patentsFiledCount: string;
  patentsFiledLabel: { en: string; hi: string; sat: string };

  panchayatsImpactedCount: string;
  panchayatsImpactedLabel: { en: string; hi: string; sat: string };
}

export interface OngoingProjectItem {
  id: string;
  ticketId: string;
  domainKey: ChallengeDomain;
  stageKey: ChallengeStage;
  title: { en: string; hi: string; sat: string };
  location: { en: string; hi: string; sat: string };
  institution: { en: string; hi: string; sat: string };
  facultyPi: { en: string; hi: string; sat: string };
  liveStageLabel: { en: string; hi: string; sat: string };
  stageBadgeColor: 'amber' | 'blue' | 'emerald' | 'purple';
  stageProgressPct: number;
  stageCountdown?: { en: string; hi: string; sat: string };
  escrowStatus: { en: string; hi: string; sat: string };
  fieldHealth: { en: string; hi: string; sat: string };
  mentorOrCompliance?: { en: string; hi: string; sat: string };
  inspectUrl: string;
}

export interface SolvedProblemItem {
  ticketId: string;
  title: { en: string; hi: string; sat: string };
  date: { en: string; hi: string; sat: string };
  location: { en: string; hi: string; sat: string };
  quorumScore: string;
  grantAmount: string;
  impactSnippet: { en: string; hi: string; sat: string };
}

export interface UniversityLeaderboardItem {
  id: string;
  rank: number;
  name: { en: string; hi: string; sat: string };
  badge: { en: string; hi: string; sat: string };
  solvedCount: number;
  ongoingCount: number;
  patentsCount: number;
  totalGrants: string;
  coreExpertise: { en: string[]; hi: string[]; sat: string[] };
  solvedPortfolio: SolvedProblemItem[];
}

export interface DistrictResolutionItem {
  districtName: { en: string; hi: string; sat: string };
  problemsReceived: number;
  problemsSolved: number;
  activeUniversities: number;
  avgResolutionWeeks: { en: string; hi: string; sat: string };
  satisfactionQuorumScore: string;
  statusTag: { en: string; hi: string; sat: string };
}

