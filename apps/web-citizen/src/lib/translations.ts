export type Language = 'en' | 'hi' | 'sat';

export interface DashboardTranslations {
  title: string;
  subtitle: string;
  reportBtn: string;
  verifiedQuorum: string;
  resolvedCount: string;
  resolvedLabel: string;
  resolvedSub: string;
  universityRnd: string;
  activeCount: string;
  activeLabel: string;
  activeSub: string;
  escrowLedger: string;
  fundsAmount: string;
  fundsLabel: string;
  fundsSub: string;
  problemsNearTitle: string;
  problemsNearSubtitle: string;
  cardsFeed: string;
  radarMap: string;
  range: string;
  allCategories: string;
  searchPlaceholder: string;
  timeline: string;
  daysLeft: string;
  aiMatch: string;
  aiFit: string;
  grant: string;
  heiPartner: string;
  upvoteBtn: string;
  upvotedBtn: string;
}

export interface NavTranslations {
  citizen: string;
  whatsapp: string;
  university: string;
  industry: string;
  govt: string;
  samvaad: string;
  hackathon: string;
  rndFailures: string;
  feedback: string;
  progress: string;
  pledgeSupport: string;
}

export interface FeedbackTranslations {
  reviewBadge: string;
  title: string;
  subtitle: string;
  voteQuestion: string;
  solvedBtn: string;
  partialBtn: string;
  failedBtn: string;
  addIssueBtn: string;
  addIssueDesc: string;
  issueInputPlaceholder: string;
  submitFeedback: string;
  activeReviewDays: string;
  recordedTitle: string;
  recordedDesc: string;
  routingNotice: string;
}

export interface SsoTranslations {
  back: string;
  ssoTitle: string;
  tabs: {
    citizen: string;
    university: string;
    industry: string;
    govt: string;
  };
  fieldLabels: {
    citizen: string;
    university: string;
    industry: string;
    govt: string;
  };
  placeholders: {
    citizen: string;
    university: string;
    industry: string;
    govt: string;
  };
  passwordLabel: string;
  passwordPlaceholder: string;
  signInBtn: string;
  fastPassHeading: string;
  fastPassRoles: {
    citizen: string;
    university: string;
    industry: string;
    govt: string;
  };
  trackerBtn: string;
  newCitizenPrompt: string;
  registerHere: string;
  backToSignIn: string;
  formatHints: {
    phone: string;
    voterId: string;
    aadhaar: string;
  };
  dpdpConsentLabel: string;
  demoModeBadge: string;
  demoModeDesc: string;
}

export interface SamvaadTranslations {
  badge: string;
  title: string;
  subtitle: string;
  filterAll: string;
  filterWater: string;
  filterAgritech: string;
  filterEnergy: string;
  filterLivelihoods: string;
  composerPlaceholder: string;
  composerWater: string;
  composerAgritech: string;
  composerEnergy: string;
  composerLivelihoods: string;
  postBtn: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptySub: string;
  like: string;
  reply: string;
  share: string;
  replyPlaceholder: string;
  noReplies: string;
  toastReplySuccess: string;
  toastPostSuccess: string;
  toastLinkCopied: string;
  roles: {
    researcher: string;
    student: string;
    citizen: string;
  };
}

export interface UniversityTranslations {
  acceptedProjectsTitle: string;
  acceptedProjectsSub: string;
  activeCountLabel: string;
  openWorkspaceBtn: string;
  facultyPiPrefix: string;
  discoveryFeedTag: string;
  discoveryFeedTitle: string;
  openTicketsSuffix: string;
  statePoolSuffix: string;
  searchPlaceholder: string;
  filterAll: string;
  filterWater: string;
  filterAgritech: string;
  filterEnergy: string;
  filterHealth: string;
  timelineLabel: string;
  daysLeftSuffix: string;
  aiMatchLabel: string;
  grantLabel: string;
  reviewBtn: string;
  matchAnalysisModalTitle: string;
  juryTip: string;
  acceptNominateBtn: string;
  closeBtn: string;
}

export interface HackathonTranslations {
  backToDashboard: string;
  viewAllArchives: string;
  arenaBadge: string;
  dhteDept: string;
  mainTitle: string;
  heldAnnually: string;
  mandateQuote: string;
  mandateSub: string;
  countdownHeader: string;
  annualCycle: string;
  days: string;
  hours: string;
  mins: string;
  secs: string;
  submissionWindow: string;
  openToAll: string;
  stages: {
    s1Title: string;
    s1Desc: string;
    s1Escrow: string;
    s2Title: string;
    s2Desc: string;
    s2Escrow: string;
    s3Title: string;
    s3Desc: string;
    s3Escrow: string;
  };
  competitiveHeading: string;
  failureStatementsTitle: string;
  statementsSub: string;
  originalProblemLabel: string;
  whyFailedLabel: string;
  challengeScopeLabel: string;
  prizePoolLabel: string;
  registerTeamBtn: string;
  registrationModal: {
    title: string;
    tag: string;
    teamNameLabel: string;
    teamNamePlaceholder: string;
    heiLabel: string;
    teamLeadLabel: string;
    leadApaarLabel: string;
    teamSizeLabel: string;
    prizeNoteTitle: string;
    prizeNoteDesc: string;
    cancelBtn: string;
    submitBtn: string;
    successTitle: string;
    successSub: string;
    returnBtn: string;
  };
}

export interface RepositoryTranslations {
  bannerBadge: string;
  bannerTitle: string;
  bannerDesc: string;
  bannerCta: string;
  tagline: string;
  title: string;
  archivesSummary: string;
  searchPlaceholder: string;
  tabAll: string;
  tabMinor: string;
  tabMajor: string;
  noMatch: string;
  rootCauseLabel: string;
  attemptedSolutionLabel: string;
  failureModeLabel: string;
  lessonsLabel: string;
  reengineeringLabel: string;
  whatAttemptedLabel: string;
  downloadDprBtn: string;
  cloneRepoBtn: string;
  selectedHackathonBadge: string;
  promotedPanIndiaBadge: string;
  closeBtn: string;
}

export interface PledgeSupportTranslations {
  communityBadge: string;
  title: string;
  subtitle: string;
  pledgedThisMonth: string;
  tabDonate: string;
  tabResource: string;
  makePledgeTitle: string;
  makePledgeSub: string;
  amountLabel: string;
  customLabel: string;
  customPlaceholder: string;
  noteLabel: string;
  notePlaceholder: string;
  recordBtn: string;
  destinationTitle: string;
  destinationSub: string;
  destGeneral: string;
  destTicket: string;
  searchTicketPlaceholder: string;
  listResourceTitle: string;
  listResourceSub: string;
  resourceName: string;
  resourceNamePlaceholder: string;
  locationLabel: string;
  locationPlaceholder: string;
  availabilityLabel: string;
  availabilityPlaceholder: string;
  descLabel: string;
  descPlaceholder: string;
  contactPrefLabel: string;
  listBtn: string;
  directoryTitle: string;
  directorySub: string;
  noResources: string;
  unverifiedBadge: string;
  verificationNotice: string;
}

export interface ProgressTrackerTranslations {
  navOverview: string;
  navPipeline: string;
  navUniversities: string;
  navDistricts: string;
  reportIssueBtn: string;
  calloutBadge: string;
  calloutTitle: string;
  calloutDesc: string;
  reportProblemBtn: string;
  joinSamvaadBtn: string;
  backBtn: string;
  activeSprintBadge: string;
  locationPrefix: string;
  timelineTitle: string;
  timelineSub: string;
  openSamvaadBtn: string;
  viewDprBtn: string;
  downloadDprBtn: string;
  closeBtn: string;
}

export interface TranslationDictionary {
  stateHeader: string;
  heading: string;
  subheading: string;
  reportBtn: string;
  resolvedTitle: string;
  resolvedCount: string;
  resolvedSub: string;
  resolvedDesc: string;
  activeTitle: string;
  activeCount: string;
  activeSub: string;
  activeDesc: string;
  escrowTitle: string;
  escrowAmt: string;
  escrowSub: string;
  escrowDesc: string;
  problemsTitle: string;
  problemsSub: string;
  cardsFeed: string;
  radarMap: string;
  rangeLabel: string;
  searchPlaceholder: string;
  allCategories: string;
  timeline: string;
  aiMatch: string;
  grant: string;
  heiPartner: string;
  openBids: string;
  fieldTesting: string;
  aiAssistant: string;
  signOut: string;

  // Extensions for site-wide purity and component compatibility
  gridBadge: string;
  aiCopilotBtn: string;
  daysLeft: string;
  aiFit: string;
  upvoteBtn: string;
  upvotedBtn: string;
  dashboard: DashboardTranslations;
  nav: NavTranslations;
  feedback: FeedbackTranslations;
  sso: SsoTranslations;
  samvaad: SamvaadTranslations;
  university: UniversityTranslations;
  hackathon: HackathonTranslations;
  repository: RepositoryTranslations;
  pledgeSupport: PledgeSupportTranslations;
  progressTracker: ProgressTrackerTranslations;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    stateHeader: "STATE SOCIETAL INNOVATION PORTAL",
    heading: "Local Issues & Solutions",
    subheading: "Grassroots Problems Connected to Academic Research & Tranche Grants.",
    reportBtn: "+ Report New Issue",
    resolvedTitle: "VERIFIED QUORUM",
    resolvedCount: "412",
    resolvedSub: "Issues Resolved",
    resolvedDesc: "Verified on Ground",
    activeTitle: "UNIVERSITY R&D",
    activeCount: "184",
    activeSub: "Active Solutions",
    activeDesc: "In University Labs",
    escrowTitle: "ESCROW LEDGER",
    escrowAmt: "₹1.8 Cr",
    escrowSub: "Funds Allocated",
    escrowDesc: "Milestone Grants",
    problemsTitle: "Problems in Your Area",
    problemsSub: "Vote to prioritize your village issues",
    cardsFeed: "Cards Feed",
    radarMap: "500m Radar Map",
    rangeLabel: "Range:",
    searchPlaceholder: "Search tickets or villages...",
    allCategories: "All Categories",
    timeline: "TIMELINE",
    aiMatch: "AI MATCH",
    grant: "GRANT",
    heiPartner: "HEI Partner:",
    openBids: "Open for University Bids",
    fieldTesting: "Field Testing and Durability Pilot",
    aiAssistant: "AI Assistant",
    signOut: "Sign Out",

    gridBadge: "Jharkhand State Innovation Grid",
    aiCopilotBtn: "AI Assistant",
    daysLeft: "Days Left",
    aiFit: "AI Fit:",
    upvoteBtn: "Upvote",
    upvotedBtn: "Upvoted",
    dashboard: {
      title: "Local Issues & Solutions",
      subtitle: "Grassroots Problems Connected to Academic Research & Tranche Grants.",
      reportBtn: "+ Report New Issue",
      verifiedQuorum: "VERIFIED QUORUM",
      resolvedCount: "412",
      resolvedLabel: "Issues Resolved",
      resolvedSub: "Verified on Ground",
      universityRnd: "UNIVERSITY R&D",
      activeCount: "184",
      activeLabel: "Active Solutions",
      activeSub: "In University Labs",
      escrowLedger: "ESCROW LEDGER",
      fundsAmount: "₹1.8 Cr",
      fundsLabel: "Funds Allocated",
      fundsSub: "Milestone Grants",
      problemsNearTitle: "Problems in Your Area",
      problemsNearSubtitle: "Vote to prioritize your village issues",
      cardsFeed: "Cards Feed",
      radarMap: "500m Radar Map",
      range: "Range:",
      allCategories: "All Categories",
      searchPlaceholder: "Search tickets or villages...",
      timeline: "TIMELINE",
      daysLeft: "Days Left",
      aiMatch: "AI MATCH",
      aiFit: "AI Fit:",
      grant: "GRANT",
      heiPartner: "HEI Partner:",
      upvoteBtn: "Upvote",
      upvotedBtn: "Upvoted"
    },
    nav: {
      citizen: "Citizen",
      whatsapp: "WhatsApp Bot",
      university: "University",
      industry: "Industry / CSR",
      govt: "Govt DHTE",
      samvaad: "Samvaad",
      hackathon: "Hackathon",
      rndFailures: "R&D Failures",
      feedback: "Citizen Feedback",
      progress: "Progress Tracker",
      pledgeSupport: "Pledge & Support"
    },
    feedback: {
      reviewBadge: "45-Day Post-Implementation Review",
      title: "Citizen Quorum & Feedback Portal",
      subtitle: "Review resolved projects after 45 days of unassisted use. Vote on efficacy and report lingering defects.",
      voteQuestion: "How is the solution performing after 45 days on the ground?",
      solvedBtn: "Fully Solved (Satisfactory)",
      partialBtn: "Partially Solved (Minor Issues)",
      failedBtn: "Failed / Ineffective",
      addIssueBtn: "Add New Issue / Report Defect to this Problem",
      addIssueDesc: "Submitting here routes directly back to the assigned university R&D team for an iterative repair sprint.",
      issueInputPlaceholder: "Describe the lingering defect or new problem in detail...",
      submitFeedback: "Submit Quorum Vote & Feedback",
      activeReviewDays: "Day 46 of 45 (Review Active)",
      recordedTitle: "Feedback Recorded Successfully!",
      recordedDesc: "Your feedback has been incorporated into the Gram Sabha quorum and forwarded to the university team.",
      routingNotice: "⚡ Submitting here automatically routes an iterative repair sprint ticket back to the assigned HEI."
    },
    sso: {
      back: "Back",
      ssoTitle: "JAGRIT Single Sign-On",
      tabs: {
        citizen: "Citizen",
        university: "University",
        industry: "Industry",
        govt: "Govt"
      },
      fieldLabels: {
        citizen: "Phone / Voter ID / Aadhaar Virtual ID",
        university: "Campus + Faculty Employee or Student ID",
        industry: "Corporate CIN / Form CSR-1 Registration No.",
        govt: "State Department + Official Govt Service Code"
      },
      placeholders: {
        citizen: "+91 98765 43210",
        university: "BIT Mesra · AISHE-U-0204",
        industry: "CIN: L27100MH1907PLC000260",
        govt: "JH-GOV-DHTE-001"
      },
      passwordLabel: "Security Password / Passcode",
      passwordPlaceholder: "Enter your security password / passcode",
      signInBtn: "Sign In to Portal ➔",
      fastPassHeading: "⚡ Quick Demo Fast-Pass (1-Click Login):",
      fastPassRoles: {
        citizen: "👥 Citizen",
        university: "🎓 University",
        industry: "💼 Industry",
        govt: "🏛️ Govt"
      },
      trackerBtn: "Statewide Progress & Resolution Tracker",
      newCitizenPrompt: "New citizen?",
      registerHere: "Register here",
      backToSignIn: "Back to Sign In",
      formatHints: {
        phone: "📱 Phone: 10-digit mobile number (e.g. 9876543210)",
        voterId: "🪪 Voter ID (EPIC): 3 letters + 7 digits (e.g. ABC1234567)",
        aadhaar: "🔒 Aadhaar VID: 16-digit Virtual ID (e.g. 1234 5678 9012 3456)"
      },
      dpdpConsentLabel: "I consent to identity verification under the Digital Personal Data Protection (DPDP) Act, 2023 for authentication on the JAGRIT Portal.",
      demoModeBadge: "🛠️ DEMO / EVALUATION MODE (NON-PRODUCTION)",
      demoModeDesc: "One-click mock credentials for live jury evaluation and test benchmarking."
    },
    samvaad: {
      badge: "🗣️ Samvaad · Community Microblogging Feed",
      title: "Samvaad",
      subtitle: "Open research and grassroots discussion forum connecting citizens, researchers, and student innovators across Jharkhand.",
      filterAll: "All Threads",
      filterWater: "Water Research",
      filterAgritech: "Agritech",
      filterEnergy: "Energy",
      filterLivelihoods: "Livelihoods",
      composerPlaceholder: "Start a research discussion or ask scientists...",
      composerWater: "Water Research",
      composerAgritech: "Agritech",
      composerEnergy: "Energy",
      composerLivelihoods: "Livelihoods",
      postBtn: "Post",
      searchPlaceholder: "Search discussions, researchers, or topics...",
      emptyTitle: "No discussions in this category yet",
      emptySub: "Be the first to post a research query or insight above!",
      like: "Like",
      reply: "Reply",
      share: "Share",
      replyPlaceholder: "Write a research reply or inquiry...",
      noReplies: "No replies yet. Start the conversation!",
      toastReplySuccess: "Reply posted successfully!",
      toastPostSuccess: "Research discussion posted to Samvaad feed!",
      toastLinkCopied: "Discussion thread link copied to clipboard!",
      roles: {
        researcher: "Researcher",
        student: "Student Lead",
        citizen: "Citizen"
      }
    },
    university: {
      acceptedProjectsTitle: "🚀 My Accepted Projects / Active Sprints",
      acceptedProjectsSub: "Active university research sprint & tranche milestone governance",
      activeCountLabel: "Active Projects",
      openWorkspaceBtn: "Open Project Workspace",
      facultyPiPrefix: "Faculty PI:",
      discoveryFeedTag: "University Discovery Feed",
      discoveryFeedTitle: "Open Jharkhand challenges",
      openTicketsSuffix: "open tickets",
      statePoolSuffix: "combined state pool",
      searchPlaceholder: "Search tickets, districts, domains…",
      filterAll: "All",
      filterWater: "Water & Sanitation",
      filterAgritech: "Agritech & Lac",
      filterEnergy: "Renewable Energy",
      filterHealth: "Tribal Health",
      timelineLabel: "Timeline",
      daysLeftSuffix: "Days Left",
      aiMatchLabel: "AI Match",
      grantLabel: "Grant",
      reviewBtn: "Review Challenge & Match Analysis",
      matchAnalysisModalTitle: "Match Analysis",
      juryTip: "Evaluator tip — enable Jury Presentation Mode in the top bar to score this team live (Feasibility 40 / Sustainability 30 / Cost 30).",
      acceptNominateBtn: "Accept & Nominate Team",
      closeBtn: "Close"
    },
    hackathon: {
      backToDashboard: "Back to University Dashboard",
      viewAllArchives: "View All R&D Failure Archives",
      arenaBadge: "Jharkhand State Innovation Arena",
      dhteDept: "Department of Higher & Technical Education (DHTE)",
      mainTitle: "🏆 Jharkhand Annual State Innovation Hackathon",
      heldAnnually: "(Held Once a Year)",
      mandateQuote: "“Transforming Past Micro & Minor Engineering Failures into Breakthrough Academic Solutions”",
      mandateSub: "Instead of theoretical toy projects, university teams solve verified engineering bottlenecks from past Jharkhand R&D pilots. Selected student teams receive milestone escrow funding, corporate CSR sponsorship, and 4 NEP 2020 APAAR Innovation Credits.",
      countdownHeader: "Statewide Hackathon Kickoff Countdown",
      annualCycle: "Annual Cycle 2026",
      days: "Days",
      hours: "Hours",
      mins: "Mins",
      secs: "Secs",
      submissionWindow: "Phase 1 Abstract & Root-Cause Submission Window",
      openToAll: "Open to all Jharkhand HEIs",
      stages: {
        s1Title: "Stage 1: Failure Root-Cause Analysis",
        s1Desc: "14-day ideation sprint diagnosing exact metallurgical, thermal, or microbiological breakdown triggers.",
        s1Escrow: "30% Initial Escrow Release",
        s2Title: "Stage 2: Bench & Lab Prototyping",
        s2Desc: "21-day fabrication with corporate CSR technical mentorship and laboratory test telemetry integration.",
        s2Escrow: "40% Milestone Escrow Release",
        s3Title: "Stage 3: DPR Defense at DHTE Ranchi",
        s3Desc: "Final defense before state academic jury + Gram Sabha verification lead + commercial patent licensing.",
        s3Escrow: "30% Final Grant + 4 APAAR Credits"
      },
      competitiveHeading: "Competitive R&D Problem Statements",
      failureStatementsTitle: "Micro & Minor Engineering Failure Statements",
      statementsSub: "Derived directly from documented field pilots in Palamu, Khunti, and Chaibasa. Open for student team registration.",
      originalProblemLabel: "Original Problem:",
      whyFailedLabel: "Why Previous Solution Failed:",
      challengeScopeLabel: "Hackathon Challenge Scope:",
      prizePoolLabel: "State + CSR Prize Pool:",
      registerTeamBtn: "Register Student Team for Hackathon",
      registrationModal: {
        title: "Annual State Hackathon Registration",
        tag: "Annual State Hackathon Registration",
        teamNameLabel: "Team Name *",
        teamNamePlaceholder: "e.g. Team Jal-Suraksha Innovators",
        heiLabel: "University / Higher Education Institution (HEI) *",
        teamLeadLabel: "Team Lead Full Name *",
        leadApaarLabel: "Lead Student APAAR ID (12-Digit) *",
        teamSizeLabel: "Team Size (Students)",
        prizeNoteTitle: "🏆 State + CSR Prize Eligibility:",
        prizeNoteDesc: "Upon registration, your team will be assigned a faculty mentor and industry CSR guide for Stage 1 Failure Root-Cause Analysis.",
        cancelBtn: "Cancel",
        submitBtn: "Confirm Registration ➔",
        successTitle: "Team Registration Confirmed!",
        successSub: "has been successfully registered under the Jharkhand Annual State University Hackathon.",
        returnBtn: "Return to Problem Statement Directory"
      }
    },
    repository: {
      bannerBadge: "State University Hackathon (Held Once a Year)",
      bannerTitle: "📢 Micro and Minor Failures are open for the Annual State University Hackathon (Held Once a Year)! Students can re-engineer these challenges.",
      bannerDesc: "Turn past hardware, metallurgical, and thermal setbacks into award-winning university capstone solutions with state escrow grants up to ₹2,50,000 + 4 NEP 2020 APAAR credits.",
      bannerCta: "🏆 View Annual State Hackathon Challenges ➔",
      tagline: "ADR-009 · Screen 10 · rnd_failure_repository",
      title: "R&D Failure Knowledge Base",
      archivesSummary: "archives across Jharkhand HEIs.",
      searchPlaceholder: "Search title, campus, district, root cause…",
      tabAll: "All Archives",
      tabMinor: "Minor (Re-engineering)",
      tabMajor: "Major (Pan-India)",
      noMatch: "No archives match. Try another keyword or tab.",
      rootCauseLabel: "Root Cause Breakdown:",
      attemptedSolutionLabel: "Attempted Solution:",
      failureModeLabel: "Failure Mode:",
      lessonsLabel: "Key Lessons Learned:",
      reengineeringLabel: "Re-engineering Opportunity:",
      whatAttemptedLabel: "What Was Attempted",
      downloadDprBtn: "📄 Download Past DPR Report (PDF)",
      cloneRepoBtn: "💻 Clone Project Repository",
      selectedHackathonBadge: "🎯 Selected for Annual Hackathon",
      promotedPanIndiaBadge: "Promoted to Pan-India National Hackathon Statement",
      closeBtn: "Close"
    },
    pledgeSupport: {
      communityBadge: "Community support",
      title: "Pledge & Support",
      subtitle: "Back local solutions with funds, tools, time, or space.",
      pledgedThisMonth: "Pledged this month",
      tabDonate: "Donate",
      tabResource: "Offer a Resource",
      makePledgeTitle: "Make a cash pledge",
      makePledgeSub: "Choose an amount and tell us what it should help unlock.",
      amountLabel: "Pledge amount",
      customLabel: "Custom",
      customPlaceholder: "Enter amount",
      noteLabel: "Optional note",
      notePlaceholder: "What would you like this pledge to support?",
      recordBtn: "Record pledge",
      destinationTitle: "Choose a destination",
      destinationSub: "Pledges are recorded for follow-up with the receiving project.",
      destGeneral: "General Community Fund",
      destTicket: "Support an open ticket",
      searchTicketPlaceholder: "Search by ticket ID or title",
      listResourceTitle: "List a community resource",
      listResourceSub: "Offer equipment or space that can help a local project.",
      resourceName: "Resource name",
      resourceNamePlaceholder: "3D printer, tools, vehicle...",
      locationLabel: "Location / village",
      locationPlaceholder: "Kanke, Ranchi",
      availabilityLabel: "Availability",
      availabilityPlaceholder: "Dates or ongoing",
      descLabel: "Description",
      descPlaceholder: "Add useful details about condition, capacity, or access.",
      contactPrefLabel: "Contact preference",
      listBtn: "List resource",
      directoryTitle: "Resource directory",
      directorySub: "Community offers available for project teams.",
      noResources: "No resources listed yet.",
      unverifiedBadge: "Unverified",
      verificationNotice: "Verification by PRI or Institution pending"
    },
    progressTracker: {
      navOverview: "Overview & Impact",
      navPipeline: "Live Ongoing Pipeline",
      navUniversities: "University Resolution Leaderboard",
      navDistricts: "District Spread Breakdown",
      reportIssueBtn: "Report New Issue",
      calloutBadge: "Citizen Participation & Empowerment",
      calloutTitle: "Have a civic engineering challenge in your village?",
      calloutDesc: "Submit drinking water, electricity, agriculture, or sanitation challenges directly to 42 university research labs.",
      reportProblemBtn: "Report a Problem",
      joinSamvaadBtn: "Join Jan Samvaad",
      backBtn: "← Back to Grievance Dashboard",
      activeSprintBadge: "ACTIVE UNIVERSITY R&D SPRINT",
      locationPrefix: "Location:",
      timelineTitle: "5-Stage Solution Progress Timeline",
      timelineSub: "Verifiable audit chain from grassroots submission to academic field deployment",
      openSamvaadBtn: "💬 Open Samvaad Research Thread",
      viewDprBtn: "📊 View Technical DPR Report (PDF)",
      downloadDprBtn: "Download Official DPR PDF",
      closeBtn: "Close"
    }
  },
  hi: {
    stateHeader: "राजकीय सामाजिक नवाचार पोर्टल",
    heading: "जनसमस्याएं एवं समाधान",
    subheading: "शैक्षणिक अनुसंधान और अनुदान से जुड़ी जमीनी समस्याएं।",
    reportBtn: "+ नई समस्या दर्ज करें",
    resolvedTitle: "सत्यापित कोरम",
    resolvedCount: "४१२",
    resolvedSub: "हल हुई समस्याएं",
    resolvedDesc: "जमीन पर सत्यापित",
    activeTitle: "विश्वविद्यालय अनुसंधान",
    activeCount: "१८४",
    activeSub: "सक्रिय समाधान",
    activeDesc: "विश्वविद्यालय प्रयोगशाला में",
    escrowTitle: "एस्क्रो खाता",
    escrowAmt: "₹१.८ करोड़",
    escrowSub: "आवंटित राशि",
    escrowDesc: "माइलस्टोन अनुदान",
    problemsTitle: "आपके क्षेत्र की समस्याएं",
    problemsSub: "अपनी गांव की समस्याओं को प्राथमिकता देने के लिए वोट करें",
    cardsFeed: "कार्ड फीड",
    radarMap: "५०० मीटर रडार मैप",
    rangeLabel: "दायरा:",
    searchPlaceholder: "टिकट नंबर या गांव खोजें...",
    allCategories: "सभी श्रेणियां",
    timeline: "समय-सीमा",
    aiMatch: "एआई मिलान",
    grant: "अनुदान",
    heiPartner: "विश्वविद्यालय भागीदार:",
    openBids: "विश्वविद्यालय प्रस्ताव के लिए खुला",
    fieldTesting: "क्षेत्र परीक्षण और स्थायित्व पायलट",
    aiAssistant: "एआई सहायक",
    signOut: "साइन आउट",

    gridBadge: "झारखंड राज्य नवाचार ग्रिड",
    aiCopilotBtn: "एआई सहायक",
    daysLeft: "दिन शेष",
    aiFit: "एआई मिलान:",
    upvoteBtn: "वोट दें",
    upvotedBtn: "वोट दिया",
    dashboard: {
      title: "जनसमस्याएं एवं समाधान",
      subtitle: "शैक्षणिक अनुसंधान और अनुदान से जुड़ी जमीनी समस्याएं।",
      reportBtn: "+ नई समस्या दर्ज करें",
      verifiedQuorum: "सत्यापित कोरम",
      resolvedCount: "४१२",
      resolvedLabel: "हल हुई समस्याएं",
      resolvedSub: "जमीन पर सत्यापित",
      universityRnd: "विश्वविद्यालय अनुसंधान",
      activeCount: "१८४",
      activeLabel: "सक्रिय समाधान",
      activeSub: "विश्वविद्यालय प्रयोगशाला में",
      escrowLedger: "एस्क्रो खाता",
      fundsAmount: "₹१.८ करोड़",
      fundsLabel: "आवंटित राशि",
      fundsSub: "माइलस्टोन अनुदान",
      problemsNearTitle: "आपके क्षेत्र की समस्याएं",
      problemsNearSubtitle: "अपनी गांव की समस्याओं को प्राथमिकता देने के लिए वोट करें",
      cardsFeed: "कार्ड फीड",
      radarMap: "५०० मीटर रडार मैप",
      range: "दायरा:",
      allCategories: "सभी श्रेणियां",
      searchPlaceholder: "टिकट नंबर या गांव खोजें...",
      timeline: "समय-सीमा",
      daysLeft: "दिन शेष",
      aiMatch: "एआई मिलान",
      aiFit: "एआई मिलान:",
      grant: "अनुदान",
      heiPartner: "विश्वविद्यालय भागीदार:",
      upvoteBtn: "वोट दें",
      upvotedBtn: "वोट दिया"
    },
    nav: {
      citizen: "नागरिक",
      whatsapp: "व्हाट्सएप बॉट",
      university: "विश्वविद्यालय",
      industry: "उद्योग / सीएसआर",
      govt: "सरकारी पोर्टल",
      samvaad: "संवाद",
      hackathon: "हैकाथॉन",
      rndFailures: "आरएंडडी विफलताएं",
      feedback: "नागरिक प्रतिक्रिया",
      progress: "प्रगति ट्रैकर",
      pledgeSupport: "सहयोग एवं दान"
    },
    feedback: {
      reviewBadge: "४५ दिवसीय कार्यान्वयन पश्चात समीक्षा",
      title: "नागरिक कोरम एवं प्रतिक्रिया पोर्टल",
      subtitle: "४५ दिनों के अप्रतिबंधित उपयोग के बाद समाधान की समीक्षा करें। प्रभावशीलता पर वोट करें एवं नए दोष दर्ज करें।",
      voteQuestion: "जमीन पर ४५ दिनों के बाद यह समाधान कैसा काम कर रहा है?",
      solvedBtn: "पूर्णतः हल (संतुष्ट)",
      partialBtn: "आंशिक हल (छोटी समस्याएं)",
      failedBtn: "विफल / अप्रभावी",
      addIssueBtn: "इस समस्या में नया दोष या मुद्दा जोड़ें",
      addIssueDesc: "यहाँ शिकायत दर्ज करने पर यह सीधे संबंधित विश्वविद्यालय टीम को पुनः सुधार के लिए प्रेषित होगी।",
      issueInputPlaceholder: "बचे हुए दोष या नई समस्या का विस्तार से वर्णन करें...",
      submitFeedback: "कोरम वोट एवं प्रतिक्रिया दर्ज करें",
      activeReviewDays: "४५ दिनों में से दिन ४६ (सक्रिय समीक्षा)",
      recordedTitle: "प्रतिक्रिया सफलतापूर्वक दर्ज की गई!",
      recordedDesc: "आपकी प्रतिक्रिया ग्राम सभा कोरम में शामिल कर ली गई है और विश्वविद्यालय टीम को अग्रेषित कर दी गई है।",
      routingNotice: "⚡ यहाँ दर्ज करने पर स्वचालित रूप से विश्वविद्यालय टीम को सुधारात्मक स्प्रिंट टिकट भेजा जाता है।"
    },
    sso: {
      back: "वापस",
      ssoTitle: "जागृत सिंगल साइन-ऑन",
      tabs: {
        citizen: "नागरिक",
        university: "विश्वविद्यालय",
        industry: "उद्योग",
        govt: "प्रशासन"
      },
      fieldLabels: {
        citizen: "फोन / मतदाता पहचान पत्र / आधार वर्चुअल आईडी",
        university: "परिसर + संकाय कर्मचारी अथवा छात्र आईडी",
        industry: "कॉर्पोरेट सीआईएन / फॉर्म सीएसआर-1 पंजीकरण संख्या",
        govt: "राज्य विभाग + आधिकारिक सरकारी सेवा कोड"
      },
      placeholders: {
        citizen: "+91 98765 43210",
        university: "बीआईटी मेसरा · AISHE-U-0204",
        industry: "सीआईएन: L27100MH1907PLC000260",
        govt: "JH-GOV-DHTE-001"
      },
      passwordLabel: "सुरक्षा पासवर्ड / पासकोड",
      passwordPlaceholder: "सुरक्षा पासवर्ड / पासकोड दर्ज करें",
      signInBtn: "पोर्टल में साइन इन करें ➔",
      fastPassHeading: "⚡ त्वरित डेमो फास्ट-पास (१-क्लिक लॉगिन):",
      fastPassRoles: {
        citizen: "👥 नागरिक",
        university: "🎓 विश्वविद्यालय",
        industry: "💼 उद्योग",
        govt: "🏛️ प्रशासन"
      },
      trackerBtn: "राज्यव्यापी प्रगति एवं समाधान ट्रैकर",
      newCitizenPrompt: "नए नागरिक हैं?",
      registerHere: "यहाँ पंजीकरण करें",
      backToSignIn: "लॉगिन पर वापस जाएं",
      formatHints: {
        phone: "📱 मोबाइल: १०-अंकों का नंबर (उदा. 9876543210)",
        voterId: "🪪 मतदाता पहचान पत्र (EPIC): ३ अक्षर + ७ अंक (उदा. ABC1234567)",
        aadhaar: "🔒 आधार वीआईडी: १६-अंकों का वर्चुअल आईडी (उदा. 1234 5678 9012 3456)"
      },
      dpdpConsentLabel: "मैं डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम २०२३ के तहत पहचान सत्यापन हेतु सहमति प्रदान करता/करती हूँ।",
      demoModeBadge: "🛠️ डेमो / मूल्यांकन मोड (गैर-उत्पादन)",
      demoModeDesc: "निर्णायक मंडल एवं त्वरित तकनीकी परीक्षण हेतु एकल-क्लिक प्रमाणीकरण।"
    },
    samvaad: {
      badge: "🗣️ संवाद · सामुदायिक विचार-विमर्श मंच",
      title: "संवाद",
      subtitle: "झारखंड के नागरिकों, शोधकर्ताओं और छात्र नवप्रवर्तकों को जोड़ने वाला खुला जमीनी अनुसंधान मंच।",
      filterAll: "सभी संवाद",
      filterWater: "जल अनुसंधान",
      filterAgritech: "कृषि तकनीक",
      filterEnergy: "ऊर्जा",
      filterLivelihoods: "आजीविका",
      composerPlaceholder: "अनुसंधान चर्चा शुरू करें अथवा वैज्ञानिकों से पूछें...",
      composerWater: "जल अनुसंधान",
      composerAgritech: "कृषि तकनीक",
      composerEnergy: "ऊर्जा",
      composerLivelihoods: "आजीविका",
      postBtn: "दर्ज करें",
      searchPlaceholder: "चर्चा, शोधकर्ता अथवा विषय खोजें...",
      emptyTitle: "इस श्रेणी में अभी कोई चर्चा उपलब्ध नहीं है",
      emptySub: "उपरोक्त बॉक्स में पहला अनुसंधान प्रश्न अथवा विचार दर्ज करें!",
      like: "पसंद",
      reply: "उत्तर दें",
      share: "साझा करें",
      replyPlaceholder: "अनुसंधान उत्तर अथवा पूछताछ लिखें...",
      noReplies: "अभी कोई उत्तर नहीं है। संवाद शुरू करें!",
      toastReplySuccess: "उत्तर सफलतापूर्वक प्रेषित किया गया!",
      toastPostSuccess: "संवाद मंच पर विचार दर्ज किया गया!",
      toastLinkCopied: "संवाद लिंक क्लिपबोर्ड पर कॉपी हो गया!",
      roles: {
        researcher: "शोधकर्ता",
        student: "छात्र दल प्रमुख",
        citizen: "नागरिक"
      }
    },
    university: {
      acceptedProjectsTitle: "🚀 मेरी स्वीकृत परियोजनाएं / सक्रिय स्प्रिंट",
      acceptedProjectsSub: "विश्वविद्यालय अनुसंधान स्प्रिंट एवं किश्त मील के पत्थर का प्रबंधन",
      activeCountLabel: "सक्रिय परियोजनाएं",
      openWorkspaceBtn: "परियोजना कार्यक्षेत्र खोलें",
      facultyPiPrefix: "संकाय प्रमुख:",
      discoveryFeedTag: "विश्वविद्यालय खोज फीड",
      discoveryFeedTitle: "झारखंड की खुली चुनौतियां",
      openTicketsSuffix: "खुले टिकट",
      statePoolSuffix: "कुल राज्य कोष",
      searchPlaceholder: "टिकट, ज़िला, अथवा डोमेन खोजें…",
      filterAll: "सभी",
      filterWater: "जल एवं स्वच्छता",
      filterAgritech: "कृषि तकनीक एवं लाह",
      filterEnergy: "नवीकरणीय ऊर्जा",
      filterHealth: "जनजातीय स्वास्थ्य",
      timelineLabel: "समय-सीमा",
      daysLeftSuffix: "दिन शेष",
      aiMatchLabel: "एआई मिलान",
      grantLabel: "अनुदान",
      reviewBtn: "चुनौती समीक्षा एवं मिलान विश्लेषण",
      matchAnalysisModalTitle: "मिलान विश्लेषण",
      juryTip: "मूल्यांकनकर्ता सलाह — इस टीम को लाइव अंक देने हेतु शीर्ष पट्टी में जूरी प्रस्तुति मोड सक्षम करें।",
      acceptNominateBtn: "स्वीकार करें एवं टीम नामित करें",
      closeBtn: "बंद करें"
    },
    hackathon: {
      backToDashboard: "विश्वविद्यालय डैशबोर्ड पर वापस जाएं",
      viewAllArchives: "आरएंडडी विफलता अभिलेखागार देखें",
      arenaBadge: "झारखंड राज्य नवाचार अखाड़ा",
      dhteDept: "उच्च एवं तकनीकी शिक्षा विभाग (DHTE)",
      mainTitle: "🏆 झारखंड वार्षिक राज्य नवाचार हैकाथॉन",
      heldAnnually: "(वर्ष में एक बार आयोजित)",
      mandateQuote: "“विगत सूक्ष्म एवं लघु इंजीनियरिंग विफलताओं को उत्कृष्ट शैक्षणिक समाधानों में रूपांतरित करना”",
      mandateSub: "सैद्धांतिक परियोजनाओं के बजाय, छात्र दल विगत सरकारी परीक्षणों की वास्तविक तकनीकी बाधाओं को सुलझाते हैं। चयनित दलों को किश्त-आधारित एस्क्रो वित्तपोषण, कॉर्पोरेट सीएसआर सहयोग और ४ एनईपी २०२० अपार क्रेडिट प्राप्त होते हैं।",
      countdownHeader: "राज्यव्यापी हैकाथॉन शुभारंभ उलटी गिनती",
      annualCycle: "वार्षिक चक्र २०२६",
      days: "दिन",
      hours: "घंटे",
      mins: "मिनट",
      secs: "सेकंड",
      submissionWindow: "चरण १ सारांश एवं मूल कारण प्रस्तुति खिड़की",
      openToAll: "झारखंड के सभी उच्च शिक्षण संस्थानों के लिए खुला",
      stages: {
        s1Title: "चरण १: विफलता मूल-कारण विश्लेषण",
        s1Desc: "धातु संबंधी, तापीय अथवा सूक्ष्मजैविक खराबी के सटीक कारणों का १४-दिवसीय निदान।",
        s1Escrow: "३०% प्रारंभिक एस्क्रो राशि",
        s2Title: "चरण २: प्रयोगशाला बेंच प्रोटोटाइपिंग",
        s2Desc: "कॉर्पोरेट सीएसआर तकनीकी मार्गदर्शन एवं टेलीमेट्री एकीकरण के साथ २१-दिवसीय निर्माण।",
        s2Escrow: "४०% मील का पत्थर एस्क्रो राशि",
        s3Title: "चरण ३: रांची में विस्तृत डीपीआर बचाव",
        s3Desc: "राज्य शैक्षणिक जूरी + ग्राम सभा सत्यापन प्रमुख के समक्ष अंतिम बचाव एवं पेटेंट व्यावसायीकरण।",
        s3Escrow: "३०% अंतिम अनुदान + ४ अपार क्रेडिट"
      },
      competitiveHeading: "प्रतिस्पर्धी अनुसंधान समस्या विवरण",
      failureStatementsTitle: "सूक्ष्म एवं लघु इंजीनियरिंग विफलता विवरण",
      statementsSub: "पलामू, खूंटी और चाईबासा में दर्ज क्षेत्रीय पायलटों से सीधे प्राप्त। छात्र दल पंजीकरण हेतु उपलब्ध।",
      originalProblemLabel: "मूल समस्या:",
      whyFailedLabel: "पिछला समाधान क्यों विफल हुआ:",
      challengeScopeLabel: "हैकाथॉन चुनौती का दायरा:",
      prizePoolLabel: "राज्य + सीएसआर पुरस्कार राशि:",
      registerTeamBtn: "हैकाथॉन हेतु छात्र दल पंजीकृत करें",
      registrationModal: {
        title: "वार्षिक राज्य हैकाथॉन पंजीकरण",
        tag: "वार्षिक राज्य हैकाथॉन पंजीकरण",
        teamNameLabel: "दल का नाम *",
        teamNamePlaceholder: "उदा. टीम जल-सुरक्षा नवप्रवर्तक",
        heiLabel: "विश्वविद्यालय / उच्च शिक्षण संस्थान (HEI) *",
        teamLeadLabel: "दल प्रमुख का पूरा नाम *",
        leadApaarLabel: "दल प्रमुख अपार आईडी (१२-अंक) *",
        teamSizeLabel: "दल का आकार (छात्र)",
        prizeNoteTitle: "🏆 राज्य + सीएसआर पुरस्कार पात्रता:",
        prizeNoteDesc: "पंजीकरण के उपरांत, चरण १ मूल-कारण विश्लेषण हेतु आपके दल को एक संकाय संरक्षक एवं उद्योग सीएसआर मार्गदर्शक आवंटित किया जाएगा।",
        cancelBtn: "रद्द करें",
        submitBtn: "पंजीकरण सुनिश्चित करें ➔",
        successTitle: "दल पंजीकरण सुनिश्चित हुआ!",
        successSub: "झारखंड वार्षिक राज्य विश्वविद्यालय हैकाथॉन के तहत सफलतापूर्वक पंजीकृत किया गया है।",
        returnBtn: "समस्या विवरण निर्देशिका पर लौटें"
      }
    },
    repository: {
      bannerBadge: "राज्य विश्वविद्यालय हैकाथॉन (वर्ष में एक बार)",
      bannerTitle: "📢 वार्षिक राज्य विश्वविद्यालय हैकाथॉन हेतु सूक्ष्म एवं लघु विफलताएं खुली हैं! छात्र इन चुनौतियों का पुनर्रचना कर सकते हैं।",
      bannerDesc: "विगत हार्डवेयर, धातुकर्म और तापीय विफलताओं को राज्य एस्क्रो अनुदान (₹२,५०,००० तक) और ४ एनईपी अपार क्रेडिट के साथ समाधान में बदलें।",
      bannerCta: "🏆 वार्षिक राज्य हैकाथॉन चुनौतियां देखें ➔",
      tagline: "ADR-009 · स्क्रीन 10 · rnd_failure_repository",
      title: "आरएंडडी विफलता ज्ञान भंडार",
      archivesSummary: "झारखंड के विश्वविद्यालयों से जुड़े अभिलेखागार।",
      searchPlaceholder: "शीर्षक, परिसर, ज़िला, अथवा मूल कारण खोजें…",
      tabAll: "सभी अभिलेखागार",
      tabMinor: "लघु विफलता (पुनर्रचना)",
      tabMajor: "प्रमुख विफलता (अखिल भारतीय)",
      noMatch: "कोई अभिलेख मेल नहीं खाता। अन्य कीवर्ड या टैब आज़माएं।",
      rootCauseLabel: "मूल कारण विश्लेषण:",
      attemptedSolutionLabel: "प्रयास किया गया समाधान:",
      failureModeLabel: "विफलता का प्रकार:",
      lessonsLabel: "सीखे गए मुख्य सबक:",
      reengineeringLabel: "पुनर्रचना का अवसर:",
      whatAttemptedLabel: "क्या प्रयास किया गया था",
      downloadDprBtn: "📄 विगत डीपीआर रिपोर्ट डाउनलोड करें (PDF)",
      cloneRepoBtn: "💻 प्रोजेक्ट रिपॉजिटरी क्लोन करें",
      selectedHackathonBadge: "🎯 वार्षिक हैकाथॉन हेतु चयनित",
      promotedPanIndiaBadge: "अखिल भारतीय राष्ट्रीय हैकाथॉन हेतु अनुशंसित",
      closeBtn: "बंद करें"
    },
    pledgeSupport: {
      communityBadge: "सामुदायिक सहयोग",
      title: "सहयोग एवं दान",
      subtitle: "धन, उपकरण, समय अथवा स्थान से स्थानीय नवाचारों का समर्थन करें।",
      pledgedThisMonth: "इस माह दिया गया सहयोग",
      tabDonate: "धनराशि सहयोग",
      tabResource: "संसाधन उपलब्ध कराएं",
      makePledgeTitle: "नकद सहयोग दर्ज करें",
      makePledgeSub: "राशि चुनें और बताएं कि यह किस कार्य में सहायक हो।",
      amountLabel: "सहयोग राशि",
      customLabel: "अन्य राशि",
      customPlaceholder: "राशि दर्ज करें",
      noteLabel: "वैकल्पिक टिप्पणी",
      notePlaceholder: "आप इस सहयोग से क्या कार्य कराना चाहते हैं?",
      recordBtn: "सहयोग दर्ज करें",
      destinationTitle: "गंतव्य चुनें",
      destinationSub: "सहयोग को संबंधित परियोजना टीम के साथ समन्वय हेतु दर्ज किया जाता है।",
      destGeneral: "सामान्य सामुदायिक कोष",
      destTicket: "खुले टिकट का समर्थन करें",
      searchTicketPlaceholder: "टिकट आईडी अथवा शीर्षक से खोजें",
      listResourceTitle: "सामुदायिक संसाधन सूचीबद्ध करें",
      listResourceSub: "उपकरण अथवा स्थान साझा करें जो स्थानीय परियोजना में सहायक हो सके।",
      resourceName: "संसाधन का नाम",
      resourceNamePlaceholder: "3D प्रिंटर, औजार, वाहन...",
      locationLabel: "स्थान / गाँव",
      locationPlaceholder: "कांके, रांची",
      availabilityLabel: "उपलब्धता",
      availabilityPlaceholder: "तिथियां अथवा नियमित",
      descLabel: "विवरण",
      descPlaceholder: "स्थिति, क्षमता अथवा पहुंच के संबंध में उपयोगी जानकारी जोड़ें।",
      contactPrefLabel: "संपर्क प्राथमिकता",
      listBtn: "संसाधन दर्ज करें",
      directoryTitle: "संसाधन निर्देशिका",
      directorySub: "परियोजना दलों हेतु उपलब्ध सामुदायिक सहयोग।",
      noResources: "अभी कोई संसाधन सूचीबद्ध नहीं है।",
      unverifiedBadge: "असत्यापित",
      verificationNotice: "पीआरआई अथवा संस्थान द्वारा सत्यापन लंबित है"
    },
    progressTracker: {
      navOverview: "समग्र प्रभाव व सांख्यिकी",
      navPipeline: "सक्रिय परियोजना पाइपलाइन",
      navUniversities: "विश्वविद्यालय समाधान लीडरबोर्ड",
      navDistricts: "ज़िलावार भौगोलिक विश्लेषण",
      reportIssueBtn: "नई समस्या दर्ज करें",
      calloutBadge: "नागरिक सशक्तिकरण एवं सहभागिता",
      calloutTitle: "क्या आपके गाँव में कोई गंभीर तकनीकी समस्या है?",
      calloutDesc: "जल, विद्युत, कृषि अथवा स्वास्थ्य संबंधी समस्याओं को सीधे राज्य के ४२ उच्च शिक्षण संस्थानों के संज्ञान में लाएं।",
      reportProblemBtn: "समस्या दर्ज करें",
      joinSamvaadBtn: "जन संवाद में भाग लें",
      backBtn: "← जनसमस्या डैशबोर्ड पर वापस जाएं",
      activeSprintBadge: "सक्रिय विश्वविद्यालय आरएंडडी स्प्रिंट",
      locationPrefix: "स्थान:",
      timelineTitle: "५-चरणीय समाधान प्रगति समय-रेखा",
      timelineSub: "नागरिक शिकायत से लेकर विश्वविद्यालय प्रोटोटाइपिंग एवं क्षेत्र सत्यापन तक की आधिकारिक प्रगति",
      openSamvaadBtn: "💬 संवाद अनुसंधान मंच खोलें",
      viewDprBtn: "📊 तकनीकी डीपीआर रिपोर्ट देखें (पीडीएफ)",
      downloadDprBtn: "आधिकारिक डीपीआर पीडीएफ डाउनलोड करें",
      closeBtn: "बंद करें"
    }
  },
  // =========================================================================
  // SANTHALI LOCALE (sat) - FLAGGED FOR NATIVE HUMAN / TRIBAL REVIEW
  // Audit Reference: docs/SANTHALI_TRANSLATION_AUDIT.md
  // NOTE: Do not silently auto-correct or guess-fix individual words without
  // consulting a native speaker or verified Ol Chiki reference dictionary.
  // =========================================================================
  sat: {
    stateHeader: "ᱯᱚᱱᱚᱛ ᱥᱟᱶᱛᱟ ᱱᱟᱣᱟ ᱵᱷᱟᱵᱽᱱᱟ ᱯᱳᱨᱴᱟᱞ", // [AUDIT FLAG: Ol Chiki standardization]
    heading: "Aatu Reah Samasya ar Hal", // [AUDIT FLAG: Latin script; uses Hindi loan "Samasya"]
    subheading: "Grassroots Problems Connected to Academic Research", // [AUDIT FLAG: Untranslated English]
    reportBtn: "+ Nawa Samasya Olme",
    resolvedTitle: "VERIFIED QUORUM", // [AUDIT FLAG: Untranslated English]
    resolvedCount: "412",
    resolvedSub: "Hal Ena",
    resolvedDesc: "Sari Ena",
    activeTitle: "UNIVERSITY R&D", // [AUDIT FLAG: Untranslated English]
    activeCount: "184",
    activeSub: "Chalu Menah-a",
    activeDesc: "University Re",
    escrowTitle: "ESCROW LEDGER",
    escrowAmt: "₹1.8 Cr",
    escrowSub: "Paisa Taka",
    escrowDesc: "Milestone Grants",
    problemsTitle: "Sur Reah Samasya",
    problemsSub: "Vote emme",
    cardsFeed: "Cards Feed",
    radarMap: "500m Radar Map",
    rangeLabel: "Range:",
    searchPlaceholder: "Search tickets...",
    allCategories: "Joto Lekan",
    timeline: "TIMELINE",
    aiMatch: "AI MATCH",
    grant: "GRANT",
    heiPartner: "HEI Partner:",
    openBids: "Open for Bids",
    fieldTesting: "Field Testing",
    aiAssistant: "AI Goroic",
    signOut: "ᱚᱰᱚᱠᱚᱜ ᱢᱮ",

    gridBadge: "Jharkhand Rajya Nawa Bhabna Grid",
    aiCopilotBtn: "AI Goroic",
    daysLeft: "Maha Baki",
    aiFit: "AI Milaw:",
    upvoteBtn: "Vote Emme",
    upvotedBtn: "Vote Ena",
    dashboard: {
      title: "Aatu Reah Samasya ar Hal",
      subtitle: "Grassroots Problems Connected to Academic Research",
      reportBtn: "+ Nawa Samasya Olme",
      verifiedQuorum: "VERIFIED QUORUM",
      resolvedCount: "412",
      resolvedLabel: "Hal Ena",
      resolvedSub: "Sari Ena",
      universityRnd: "UNIVERSITY R&D",
      activeCount: "184",
      activeLabel: "Chalu Menah-a",
      activeSub: "University Re",
      escrowLedger: "ESCROW LEDGER",
      fundsAmount: "₹1.8 Cr",
      fundsLabel: "Paisa Taka",
      fundsSub: "Milestone Grants",
      problemsNearTitle: "Sur Reah Samasya",
      problemsNearSubtitle: "Vote emme",
      cardsFeed: "Cards Feed",
      radarMap: "500m Radar Map",
      range: "Range:",
      allCategories: "Joto Lekan",
      searchPlaceholder: "Search tickets...",
      timeline: "TIMELINE",
      daysLeft: "Maha Baki",
      aiMatch: "AI MATCH",
      aiFit: "AI Milaw:",
      grant: "GRANT",
      heiPartner: "HEI Partner:",
      upvoteBtn: "Vote Emme",
      upvotedBtn: "Vote Ena"
    },
    nav: {
      citizen: "Aatu Hor", // [AUDIT FLAG: Latin script; literally "Village People", check vs Rasiya/Nagrik]
      whatsapp: "WhatsApp Bot", // [AUDIT FLAG: Untranslated English]
      university: "Birdausul", // [AUDIT FLAG: Latin script; check vs Jeget Birdausul / ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ]
      industry: "Karkhana/CSR", // [AUDIT FLAG: Mixes Hindi loan "Karkhana" and untranslated "CSR"]
      govt: "Sarkar DHTE", // [AUDIT FLAG: Untranslated acronym DHTE]
      samvaad: "Galmarao", // [AUDIT FLAG: Latin script; "Galmarao" = Conversation/Discussion]
      hackathon: "Hal Heprao", // [AUDIT FLAG: Latin script; literally "Solution Contest"]
      rndFailures: "Bidaw Bạṛij Khata", // [AUDIT FLAG: Colloquial phrasing "Trial Ruined Ledger"]
      feedback: "Aatu Bichar", // [AUDIT FLAG: Latin script; "Bichar" = Deliberation/Opinion]
      progress: "Lahanti Tracker", // [AUDIT FLAG: Mixed Santhali "Lahanti" + English "Tracker"]
      pledgeSupport: "Goro ar Taka"
    },
    feedback: {
      reviewBadge: "45-Maha Tayom Bichar",
      title: "Aatu Quorum ar Bichar Portal",
      subtitle: "45 maha beohar tayom hal reah bichar emme. Sari aakan se ban nelme.",
      voteQuestion: "45 maha beohar tayom noa hal cheleka chalu menah-a?",
      solvedBtn: "Pura Hal Ena (Bes Geya)",
      partialBtn: "Bạṛich Hal Ena (Katiñ Samasya)",
      failedBtn: "Bange Hal Ena / Bạṛij Ena",
      addIssueBtn: "Nawa Samasya / Bạṛij Olme",
      addIssueDesc: "Nonde ol lekhankhan dohorate Birdausul team thech banaw laigi senoh-a.",
      issueInputPlaceholder: "Baki menah bạṛij se nawa samasya bistar te olme...",
      submitFeedback: "Quorum Vote ar Bichar Darj Me",
      activeReviewDays: "Day 46 of 45 (Bichar Chalu)",
      recordedTitle: "Bichar Darj Ena!",
      recordedDesc: "Aapka feedback Gram Sabha quorum me shamil kar liya gaya hai.",
      routingNotice: "⚡ Nonde ol lekhankhan dohorate Birdausul team thech senoh-a."
    },
    sso: {
      back: "ᱨᱩᱣᱟᱹᱲ",
      ssoTitle: "ᱡᱟᱜᱽᱨᱤᱛ ᱢᱤᱫ ᱥᱟᱭᱤᱱ-ᱚᱱ",
      tabs: {
        citizen: "ᱨᱟᱹᱥᱤᱭᱟᱹ",
        university: "ᱵᱤᱨᱫᱟᱹᱜᱟᱲ",
        industry: "ᱠᱟᱹᱨᱜᱟᱲ",
        govt: "ᱥᱚᱨᱠᱟᱨ"
      },
      fieldLabels: {
        citizen: "ᱯᱷᱳᱱ / ᱵᱷᱳᱴᱟᱨ ᱠᱟᱨᱰ / ᱟᱫᱷᱟᱨ ᱵᱷᱟᱨᱪᱩᱣᱟᱞ ᱟᱭᱰᱤ",
        university: "ᱠᱮᱢᱯᱟᱥ + ᱯᱨᱚᱯᱷᱮᱥᱟᱨ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱥᱮ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱟᱭᱰᱤ",
        industry: "ᱠᱚᱨᱯᱳᱨᱮᱴ CIN / ᱯᱷᱳᱨᱢ CSR-1 ᱨᱮᱡᱤᱥᱴᱨᱮᱥᱚᱱ ᱱᱚᱢᱵᱚᱨ",
        govt: "ᱯᱚᱱᱚᱛ ᱵᱤᱵᱷᱟᱜᱽ + ᱥᱚᱨᱠᱟᱨᱤ ᱥᱮᱵᱟ ᱠᱳᱰ"
      },
      placeholders: {
        citizen: "+91 98765 43210",
        university: "BIT Mesra · AISHE-U-0204",
        industry: "CIN: L27100MH1907PLC000260",
        govt: "JH-GOV-DHTE-001"
      },
      passwordLabel: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱯᱟᱥᱣᱟᱨᱰ / ᱯᱟᱥᱠᱳᱰ",
      passwordPlaceholder: "ᱯᱟᱥᱣᱟᱨᱰ ᱚᱞ ᱢᱮ",
      signInBtn: "ᱯᱳᱨᱴᱟᱞ ᱨᱮ ᱥᱟᱭᱤᱱ ᱤᱱ ᱢᱮ ➔",
      fastPassHeading: "⚡ ᱞᱚᱜᱚᱱ ᱰᱮᱢᱳ ᱯᱷᱟᱥᱴ-ᱯᱟᱥ (᱑-ᱠᱞᱤᱠ ᱵᱚᱞᱚᱱ):",
      fastPassRoles: {
        citizen: "👥 ᱨᱟᱹᱥᱤᱭᱟᱹ",
        university: "🎓 ᱵᱤᱨᱫᱟᱹᱜᱟᱲ",
        industry: "💼 ᱠᱟᱹᱨᱜᱟᱲ",
        govt: "🏛️ ᱥᱚᱨᱠᱟᱨ"
      },
      trackerBtn: "ᱯᱚᱱᱚᱛ ᱡᱟᱠᱟᱛ ᱞᱟᱦᱟᱱᱛᱤ ᱟᱨ ᱥᱚᱞᱦᱮ ᱴᱨᱮᱠᱟᱨ",
      newCitizenPrompt: "ᱱᱟᱣᱟ ᱨᱟᱹᱥᱤᱭᱟᱹ ᱠᱟᱱᱟᱢ?",
      registerHere: "ᱱᱚᱸᱰᱮ ᱨᱮᱡᱤᱥᱴᱟᱨ ᱢᱮ",
      backToSignIn: "ᱥᱟᱭᱤᱱ ᱤᱱ ᱛᱮ ᱨᱩᱣᱟᱹᱲ",
      formatHints: {
        phone: "📱 ᱯᱷᱳᱱ: ᱑᱐ ᱮᱞ (ᱫᱟᱹᱭᱠᱟᱹ: 9876543210)",
        voterId: "🪪 ᱵᱷᱳᱴᱟᱨ ᱠᱟᱨᱰ: ᱓ ᱟᱠᱷᱚᱨ + ᱗ ᱮᱞ (ᱫᱟᱹᱭᱠᱟᱹ: ABC1234567)",
        aadhaar: "🔒 ᱟᱫᱷᱟᱨ VID: ᱑᱖ ᱮᱞ (ᱫᱟᱹᱭᱠᱟᱹ: 1234 5678 9012 3456)"
      },
      dpdpConsentLabel: "ᱤᱧ DPDP Act 2023 ᱦᱤᱥᱟᱹᱵᱽ ᱛᱮ ᱩᱯᱨᱩᱢ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱨᱮ ᱨᱮᱵᱮᱱ ᱢᱮᱱᱟᱹᱧᱟ᱾",
      demoModeBadge: "🛠️ ᱰᱮᱢᱳ ᱢᱳᱰ (ᱯᱚᱨᱛᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱥᱩᱢᱩᱝ)",
      demoModeDesc: "ᱡᱩᱨᱤ ᱟᱨ ᱵᱤᱰᱟᱹᱣ ᱞᱟᱹᱜᱤᱫ ᱑-ᱠᱞᱤᱠ ᱵᱚᱞᱚᱱ ᱵᱮᱵᱚᱥᱛᱷᱟ᱾"
    },
    samvaad: {
      badge: "🗣️ ᱜᱟᱞᱢᱟᱨᱟᱣ · ᱟᱹᱛᱩ ᱦᱚᱲ ᱨᱚᱯᱚᱲ ᱯᱷᱤᱰ",
      title: "ᱜᱟᱞᱢᱟᱨᱟᱣ",
      subtitle: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱤᱱ ᱟᱹᱛᱩ ᱦᱚᱲ, ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱤᱭᱟᱹ ᱟᱨ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱡᱚᱲᱟᱣ ᱮᱫ ᱡᱷᱤᱡ ᱢᱮᱞᱟᱝᱠᱤ᱾",
      filterAll: "ᱡᱚᱛᱚ ᱜᱟᱞᱢᱟᱨᱟᱣ",
      filterWater: "ᱫᱟᱜ ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ",
      filterAgritech: "ᱪᱟᱥ ᱦᱩᱱᱟᱹᱨ",
      filterEnergy: "ᱵᱤᱡᱽᱞᱤ ᱫᱟᱲᱮ",
      filterLivelihoods: "ᱟᱹᱥᱩᱞᱚᱜ ᱦᱚᱨ",
      composerPlaceholder: "ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ ᱨᱚᱯᱚᱲ ᱮᱛᱚᱦᱚᱵ ᱢᱮ ᱥᱮ ᱥᱟᱬᱮᱥᱤᱭᱟᱹ ᱠᱚ ᱠᱩᱞᱤ ᱠᱚᱣᱟ...",
      composerWater: "ᱫᱟᱜ ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ",
      composerAgritech: "ᱪᱟᱥ ᱦᱩᱱᱟᱹᱨ",
      composerEnergy: "ᱵᱤᱡᱽᱞᱤ ᱫᱟᱲᱮ",
      composerLivelihoods: "ᱟᱹᱥᱩᱞᱚᱜ ᱦᱚᱨ",
      postBtn: "ᱚᱞ ᱢᱮ",
      searchPlaceholder: "ᱜᱟᱞᱢᱟᱨᱟᱣ ᱥᱮ ᱥᱟᱛᱟᱢ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ...",
      emptyTitle: "ᱱᱚᱣᱟ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱱᱤᱛᱚᱜ ᱪᱮᱫ ᱜᱟᱞᱢᱟᱨᱟᱣ ᱵᱟᱹᱱᱩᱜ-ᱟ",
      emptySub: "ᱪᱮᱛᱟᱱ ᱨᱮ ᱯᱩᱭᱞᱩ ᱠᱩᱠᱞᱤ ᱥᱮ ᱵᱤᱪᱟᱹᱨ ᱚᱞ ᱢᱮ!",
      like: "ᱠᱩᱥᱤ",
      reply: "ᱛᱮᱞᱟ",
      share: "ᱦᱟᱹᱴᱤᱧ",
      replyPlaceholder: "ᱛᱮᱞᱟ ᱚᱞ ᱢᱮ...",
      noReplies: "ᱱᱤᱛ ᱫᱷᱟᱹᱵᱤᱡ ᱛᱮᱞᱟ ᱵᱟᱹᱱᱩᱜ-ᱟ᱾ ᱨᱚᱯᱚᱲ ᱮᱦᱚᱵ ᱢᱮ!",
      toastReplySuccess: "ᱛᱮᱞᱟ ᱥᱟᱹᱛ ᱛᱮ ᱵᱷᱮᱡᱟ ᱮᱱᱟ!",
      toastPostSuccess: "ᱜᱟᱞᱢᱟᱨᱟᱣ ᱯᱷᱤᱰ ᱨᱮ ᱚᱞ ᱮᱱᱟ!",
      toastLinkCopied: "ᱞᱤᱝᱠ ᱠᱚᱯᱤ ᱮᱱᱟ!",
      roles: {
        researcher: "ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱤᱭᱟᱹ",
        student: "ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱟᱹᱭᱩᱨᱤᱭᱟᱹ",
        citizen: "ᱨᱟᱹᱥᱤᱭᱟᱹ"
      }
    },
    university: {
      acceptedProjectsTitle: "🚀 ᱤᱧᱟᱜ ᱦᱟᱛᱟᱣ ᱟᱠᱟᱱ ᱯᱨᱚᱡᱮᱠᱴ / ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱠᱟᱹᱢᱤ",
      acceptedProjectsSub: "ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ ᱟᱨ ᱯᱷᱟᱱᱰ ᱦᱟᱹᱴᱤᱧ ᱧᱮᱞ",
      activeCountLabel: "ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱠᱟᱹᱢᱤ",
      openWorkspaceBtn: "ᱯᱨᱚᱡᱮᱠᱴ ᱠᱟᱹᱢᱤ ᱴᱷᱟᱶ ᱡᱷᱤᱡ ᱢᱮ",
      facultyPiPrefix: "ᱯᱨᱚᱯᱷᱮᱥᱟᱨ ᱟᱹᱭᱩᱨᱤᱭᱟᱹ:",
      discoveryFeedTag: "ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱥᱮᱸᱫᱽᱨᱟ ᱯᱷᱤᱰ",
      discoveryFeedTitle: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱡᱷᱤᱡ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ",
      openTicketsSuffix: "ᱡᱷᱤᱡ ᱴᱤᱠᱮᱴ",
      statePoolSuffix: "ᱯᱚᱱᱚᱛ ᱯᱷᱟᱱᱰ",
      searchPlaceholder: "ᱴᱤᱠᱮᱴ, ᱡᱤᱞᱟᱹ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ…",
      filterAll: "ᱡᱚᱛᱚ",
      filterWater: "ᱫᱟᱜ ᱟᱨ ᱥᱟᱯᱷᱟ",
      filterAgritech: "ᱪᱟᱥ ᱟᱨ ᱞᱟᱦ",
      filterEnergy: "ᱵᱤᱡᱽᱞᱤ ᱫᱟᱲᱮ",
      filterHealth: "ᱟᱹᱛᱩ ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ",
      timelineLabel: "ᱚᱠᱛᱚ",
      daysLeftSuffix: "ᱢᱟᱦᱟᱸ ᱥᱟᱨᱮᱪ",
      aiMatchLabel: "AI ᱢᱤᱞᱟᱹᱣ",
      grantLabel: "ᱜᱚᱲᱚ ᱴᱟᱠᱟ",
      reviewBtn: "ᱮᱴᱠᱮᱴᱚᱬᱮ ᱟᱨ ᱢᱤᱞᱟᱹᱣ ᱵᱤᱰᱟᱹᱣ ᱧᱮᱞ ᱢᱮ",
      matchAnalysisModalTitle: "ᱢᱤᱞᱟᱹᱣ ᱵᱤᱰᱟᱹᱣ",
      juryTip: "ᱡᱩᱨᱤ ᱞᱟᱹᱜᱤᱫ — ᱪᱮᱛᱟᱱ ᱨᱮ ᱡᱩᱨᱤ ᱢᱳᱰ ᱡᱷᱤᱡ ᱠᱟᱛᱮ ᱱᱚᱢᱵᱚᱨ ᱮᱢ ᱢᱮ᱾",
      acceptNominateBtn: "ᱦᱟᱛᱟᱣ ᱢᱮ ᱟᱨ ᱴᱤᱢ ᱵᱟᱪᱷᱟᱣ ᱢᱮ",
      closeBtn: "ᱵᱚᱸᱫᱽ ᱢᱮ"
    },
    hackathon: {
      backToDashboard: "ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱰᱮᱥᱠ ᱛᱮ ᱨᱩᱣᱟᱹᱲ",
      viewAllArchives: "ᱡᱚᱛᱚ R&D ᱵᱟᱹᱲᱤᱡ ᱠᱷᱟᱛᱟ ᱧᱮᱞ ᱢᱮ",
      arenaBadge: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱯᱚᱱᱚᱛ ᱱᱟᱣᱟ ᱦᱮᱯᱨᱟᱣ ᱴᱷᱟᱶ",
      dhteDept: "ᱪᱮᱛᱟᱱ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱥᱮᱪᱮᱫ ᱵᱤᱵᱷᱟᱜᱽ (DHTE)",
      mainTitle: "🏆 ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱯᱚᱱᱚᱛ ᱦᱮᱯᱨᱟᱣ",
      heldAnnually: "(ᱥᱮᱨᱢᱟ ᱨᱮ ᱢᱤᱫ ᱫᱷᱟᱣ)",
      mandateQuote: "“ᱢᱟᱬᱟᱝ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱴᱤᱡ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ ᱵᱟᱹᱲᱤᱡ ᱠᱚ ᱱᱟᱣᱟ ᱥᱚᱞᱦᱮ ᱨᱮ ᱵᱚᱫᱚᱞ”",
      mandateSub: "ᱛᱷᱤᱭᱚᱨᱤ ᱯᱨᱚᱡᱮᱠᱴ ᱵᱟᱹᱜᱤ ᱠᱟᱛᱮ, ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱴᱤᱢ ᱠᱚ ᱢᱟᱬᱟᱝ ᱯᱟᱭᱞᱚᱴ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱥᱚᱞᱦᱮᱭᱟ᱾ ᱡᱤᱛᱠᱟᱹᱨ ᱴᱤᱢ ᱠᱚ ᱯᱷᱟᱱᱰ ᱟᱨ ᱔ ᱮᱠᱟᱰᱮᱢᱤᱠ ᱠᱨᱮᱰᱤᱴ ᱠᱚ ᱧᱟᱢᱟ᱾",
      countdownHeader: "ᱯᱚᱱᱚᱛ ᱡᱟᱠᱟᱛ ᱦᱮᱯᱨᱟᱣ ᱮᱛᱚᱦᱚᱵ ᱞᱮᱠᱷᱟ",
      annualCycle: "ᱥᱮᱨᱢᱟ ᱒᱐᱒᱖",
      days: "ᱢᱟᱦᱟᱸ",
      hours: "ᱴᱟᱲᱟᱝ",
      mins: "ᱴᱤᱯᱤᱡ",
      secs: "ᱛᱤᱲᱤᱡ",
      submissionWindow: "ᱯᱩᱭᱞᱩ ᱫᱷᱟᱯ ᱟᱨ ᱵᱟᱹᱲᱤᱡ ᱨᱮᱦᱮᱫ ᱡᱚᱢᱟ ᱚᱠᱛᱚ",
      openToAll: "ᱡᱚᱛᱚ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱞᱟᱹᱜᱤᱫ ᱡᱷᱤᱡ",
      stages: {
        s1Title: "ᱫᱷᱟᱯ ᱑: ᱵᱟᱹᱲᱤᱡ ᱨᱮᱦᱮᱫ ᱵᱤᱪᱟᱹᱨ",
        s1Desc: "᱑᱔ ᱢᱟᱦᱟᱸ ᱨᱮ ᱫᱟᱜ, ᱢᱮᱬᱦᱮᱫ ᱥᱮ ᱥᱟᱬᱮᱥ ᱵᱟᱹᱲᱤᱡ ᱨᱮᱱᱟᱜ ᱠᱟᱨᱚᱱ ᱯᱟᱱᱛᱷᱟ᱾",
        s1Escrow: "᱓᱐% ᱯᱩᱭᱞᱩ ᱯᱷᱟᱱᱰ",
        s2Title: "ᱫᱷᱟᱯ ᱒: ᱞᱮᱵᱽ ᱯᱨᱚᱴᱳᱴᱟᱭᱤᱯ ᱵᱮᱱᱟᱣ",
        s2Desc: "᱒᱑ ᱢᱟᱦᱟᱸ ᱨᱮ ᱠᱟᱹᱨᱜᱟᱲ ᱜᱚᱲᱚ ᱛᱮ ᱞᱮᱵᱽ ᱨᱮ ᱵᱮᱱᱟᱣ ᱵᱤᱰᱟᱹᱣ᱾",
        s2Escrow: "᱔᱐% ᱫᱚᱥᱟᱨ ᱯᱷᱟᱱᱰ",
        s3Title: "ᱫᱷᱟᱯ ᱓: ᱨᱟᱺᱪᱤ ᱨᱮ DPR ᱥᱚᱫᱚᱨ",
        s3Desc: "ᱯᱚᱱᱚᱛ ᱡᱩᱨᱤ ᱟᱨ ᱟᱹᱛᱩ ᱦᱚᱲ ᱥᱟᱢᱟᱝ ᱨᱮ ᱥᱚᱫᱚᱨ ᱟᱨ ᱯᱮᱴᱮᱱᱴ ᱞᱟᱭᱥᱮᱱᱥ᱾",
        s3Escrow: "᱓᱐% ᱢᱩᱪᱟᱹᱫ ᱜᱚᱲᱚ + ᱔ ᱠᱨᱮᱰᱤᱴ"
      },
      competitiveHeading: "ᱦᱮᱯᱨᱟᱣ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ",
      failureStatementsTitle: "ᱠᱟᱹᱴᱤᱡ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ ᱵᱟᱹᱲᱤᱡ ᱠᱷᱟᱛᱟ ᱠᱚ",
      statementsSub: "ᱯᱟᱞᱟᱢᱩ, ᱠᱷᱩᱸᱴᱤ ᱟᱨ ᱪᱟᱭᱵᱟᱥᱟ ᱨᱮᱱᱟᱜ ᱯᱟᱭᱞᱚᱴ ᱠᱷᱚᱱ ᱦᱟᱛᱟᱣ ᱟᱠᱟᱱᱟ᱾ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱴᱤᱢ ᱨᱮᱡᱤᱥᱴᱟᱨ ᱞᱟᱹᱜᱤᱫ ᱡᱷᱤᱡ᱾",
      originalProblemLabel: "ᱢᱟᱬᱟᱝ ᱮᱴᱠᱮᱴᱚᱬᱮ:",
      whyFailedLabel: "ᱢᱟᱬᱟᱝ ᱥᱚᱞᱦᱮ ᱪᱮᱫᱟᱜ ᱵᱟᱹᱲᱤᱡ ᱮᱱᱟ:",
      challengeScopeLabel: "ᱦᱮᱯᱨᱟᱣ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱢᱤ:",
      prizePoolLabel: "ᱯᱚᱱᱚᱛ + CSR ᱥᱤᱨᱯᱷᱟᱹ ᱴᱟᱠᱟ:",
      registerTeamBtn: "ᱦᱮᱯᱨᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱴᱤᱢ ᱨᱮᱡᱤᱥᱴᱟᱨ ᱢᱮ",
      registrationModal: {
        title: "ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱯᱚᱱᱚᱛ ᱦᱮᱯᱨᱟᱣ ᱨᱮᱡᱤᱥᱴᱨᱮᱥᱚᱱ",
        tag: "ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱯᱚᱱᱚᱛ ᱦᱮᱯᱨᱟᱣ",
        teamNameLabel: "ᱴᱤᱢ ᱨᱮᱱᱟᱜ ᱧᱩᱛᱩᱢ *",
        teamNamePlaceholder: "ᱫᱟᱹᱭᱠᱟᱹ: ᱴᱤᱢ ᱫᱟᱜ-ᱨᱩᱠᱷᱤᱭᱟᱹ",
        heiLabel: "ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ (HEI) *",
        teamLeadLabel: "ᱴᱤᱢ ᱟᱹᱭᱩᱨᱤᱭᱟᱹ ᱧᱩᱛᱩᱢ *",
        leadApaarLabel: "ᱟᱹᱭᱩᱨᱤᱭᱟᱹ APAAR ᱟᱭᱰᱤ (᱑᱒ ᱮᱞ) *",
        teamSizeLabel: "ᱴᱤᱢ ᱨᱮ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱮᱞ",
        prizeNoteTitle: "🏆 ᱯᱚᱱᱚᱛ + CSR ᱥᱤᱨᱯᱷᱟᱹ ᱧᱟᱢ ᱦᱚᱨ:",
        prizeNoteDesc: "ᱨᱮᱡᱤᱥᱴᱟᱨ ᱛᱟᱭᱚᱢ, ᱫᱷᱟᱯ ᱑ ᱞᱟᱹᱜᱤᱫ ᱯᱨᱚᱯᱷᱮᱥᱟᱨ ᱟᱨ ᱠᱟᱹᱨᱜᱟᱲ ᱜᱟᱭᱰ ᱮᱢᱟ ᱯᱮᱭᱟᱠᱚ᱾",
        cancelBtn: "ᱵᱟᱹᱜᱤ ᱢᱮ",
        submitBtn: "ᱨᱮᱡᱤᱥᱴᱨᱮᱥᱚᱱ ᱥᱟᱹᱨᱤ ᱢᱮ ➔",
        successTitle: "ᱴᱤᱢ ᱨᱮᱡᱤᱥᱴᱨᱮᱥᱚᱱ ᱥᱟᱹᱛ ᱮᱱᱟ!",
        successSub: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱯᱚᱱᱚᱛ ᱦᱮᱯᱨᱟᱣ ᱨᱮ ᱥᱮᱞᱮᱫ ᱮᱱᱟ᱾",
        returnBtn: "ᱮᱴᱠᱮᱴᱚᱬᱮ ᱞᱤᱥᱴᱤ ᱛᱮ ᱨᱩᱣᱟᱹᱲ"
      }
    },
    repository: {
      bannerBadge: "ᱯᱚᱱᱚᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱦᱮᱯᱨᱟᱣ (ᱥᱮᱨᱢᱟ ᱨᱮ ᱢᱤᱫ ᱫᱷᱟᱣ)",
      bannerTitle: "📢 ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱦᱮᱯᱨᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱵᱟᱹᱲᱤᱡ ᱠᱷᱟᱛᱟ ᱡᱷᱤᱡ ᱟᱠᱟᱱᱟ! ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱱᱚᱣᱟ ᱠᱚ ᱱᱟᱣᱟ ᱛᱮ ᱵᱮᱱᱟᱣ ᱫᱟᱲᱮᱭᱟᱜ-ᱟᱠᱚ᱾",
      bannerDesc: "ᱢᱟᱬᱟᱝ ᱦᱟᱨᱰᱣᱮᱭᱟᱨ ᱟᱨ ᱢᱮᱬᱦᱮᱫ ᱵᱟᱹᱲᱤᱡ ᱠᱚ ₹᱒,᱕᱐,᱐᱐᱐ ᱜᱚᱲᱚ ᱯᱷᱟᱱᱰ ᱟᱨ ᱔ ᱠᱨᱮᱰᱤᱴ ᱥᱟᱶ ᱡᱤᱛᱠᱟᱹᱨ ᱥᱚᱞᱦᱮ ᱨᱮ ᱵᱚᱫᱚᱞ ᱢᱮ᱾",
      bannerCta: "🏆 ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱦᱮᱯᱨᱟᱣ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱧᱮᱞ ᱢᱮ ➔",
      tagline: "ADR-009 · Screen 10 · rnd_failure_repository",
      title: "R&D ᱵᱟᱹᱲᱤᱡ ᱜᱮᱭᱟᱱ ᱵᱷᱟᱱᱰᱟᱨ",
      archivesSummary: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱚ ᱨᱮᱱᱟᱜ ᱵᱟᱹᱲᱤᱡ ᱠᱷᱟᱛᱟ᱾",
      searchPlaceholder: "ᱧᱩᱛᱩᱢ, ᱠᱮᱢᱯᱟᱥ, ᱡᱤᱞᱟᱹ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ…",
      tabAll: "ᱡᱚᱛᱚ ᱠᱷᱟᱛᱟ",
      tabMinor: "ᱠᱟᱹᱴᱤᱡ ᱵᱟᱹᱲᱤᱡ (ᱱᱟᱣᱟ ᱵᱮᱱᱟᱣ)",
      tabMajor: "ᱢᱟᱨᱟᱝ ᱵᱟᱹᱲᱤᱡ (ᱵᱷᱟᱨᱚᱛ ᱡᱟᱠᱟᱛ)",
      noMatch: "ᱪᱮᱫ ᱠᱷᱟᱛᱟ ᱦᱚᱸ ᱵᱟᱝ ᱧᱟᱢ ᱞᱮᱱᱟ᱾ ᱮᱴᱟᱜ ᱟᱹᱲᱟᱹ ᱛᱮ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ᱾",
      rootCauseLabel: "ᱵᱟᱹᱲᱤᱡ ᱨᱮᱦᱮᱫ:",
      attemptedSolutionLabel: "ᱠᱩᱨᱩᱢᱩᱴᱩ ᱥᱚᱞᱦᱮ:",
      failureModeLabel: "ᱵᱟᱹᱲᱤᱡ ᱦᱩᱭᱮᱱ ᱦᱚᱨ:",
      lessonsLabel: "ᱪᱮᱫ ᱥᱮᱪᱮᱫ ᱧᱟᱢ ᱮᱱᱟ:",
      reengineeringLabel: "ᱱᱟᱣᱟ ᱵᱮᱱᱟᱣ ᱥᱩᱵᱤᱫᱷᱟ:",
      whatAttemptedLabel: "ᱪᱮᱫ ᱠᱩᱨᱩᱢᱩᱴᱩ ᱞᱮᱱᱟ",
      downloadDprBtn: "📄 ᱢᱟᱬᱟᱝ DPR ᱨᱤᱯᱚᱨᱴ ᱰᱟᱣᱩᱱᱞᱚᱰ (PDF)",
      cloneRepoBtn: "💻 ᱯᱨᱚᱡᱮᱠᱴ ᱨᱤᱯᱚᱡᱤᱴᱚᱨᱤ ᱠᱞᱳᱱ",
      selectedHackathonBadge: "🎯 ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱦᱮᱯᱨᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱵᱟᱪᱷᱟᱣ ᱟᱠᱟᱱᱟ",
      promotedPanIndiaBadge: "ᱵᱷᱟᱨᱚᱛ ᱡᱟᱠᱟᱛ ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱦᱮᱯᱨᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱩᱪᱷᱟᱹᱱ",
      closeBtn: "ᱵᱚᱸᱫᱽ"
    },
    pledgeSupport: {
      communityBadge: "ᱥᱟᱶᱛᱟ ᱜᱚᱲᱚ",
      title: "ᱜᱚᱲᱚ ᱟᱨ ᱫᱟᱱ",
      subtitle: "ᱴᱟᱠᱟ, ᱥᱟᱯᱟᱵ, ᱚᱠᱛᱚ ᱥᱮ ᱴᱷᱟᱶ ᱛᱮ ᱟᱹᱛᱩ ᱥᱚᱞᱦᱮ ᱠᱚ ᱜᱚᱲᱚᱣᱟᱜ ᱢᱮ᱾",
      pledgedThisMonth: "ᱱᱚᱣᱟ ᱪᱟᱸᱫᱚ ᱨᱮᱱᱟᱜ ᱜᱚᱲᱚ",
      tabDonate: "ᱴᱟᱠᱟ ᱮᱢ",
      tabResource: "ᱥᱟᱯᱟᱵ / ᱴᱷᱟᱶ ᱮᱢ",
      makePledgeTitle: "ᱴᱟᱠᱟ ᱜᱚᱲᱚ ᱮᱢ ᱢᱮ",
      makePledgeSub: "ᱴᱟᱠᱟ ᱮᱞ ᱵᱟᱪᱷᱟᱣ ᱢᱮ ᱟᱨ ᱚᱞ ᱢᱮ ᱪᱮᱫ ᱨᱮ ᱠᱟᱹᱢᱤ ᱞᱟᱜᱟᱜ-ᱟ᱾",
      amountLabel: "ᱜᱚᱲᱚ ᱴᱟᱠᱟ",
      customLabel: "ᱮᱴᱟᱜ ᱴᱟᱠᱟ",
      customPlaceholder: "ᱴᱟᱠᱟ ᱮᱞ ᱚᱞ ᱢᱮ",
      noteLabel: "ᱵᱤᱪᱟᱹᱨ ᱱᱳᱴ",
      notePlaceholder: "ᱱᱚᱣᱟ ᱴᱟᱠᱟ ᱛᱮ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱦᱩᱭᱩᱜ ᱥᱟᱱᱟᱭᱮᱫ ᱢᱮᱭᱟ?",
      recordBtn: "ᱜᱚᱲᱚ ᱚᱞ ᱢᱮ",
      destinationTitle: "ᱴᱷᱟᱶ ᱵᱟᱪᱷᱟᱣ ᱢᱮ",
      destinationSub: "ᱜᱚᱲᱚ ᱫᱚ ᱯᱨᱚᱡᱮᱠᱴ ᱴᱤᱢ ᱴᱷᱮᱱ ᱥᱮᱴᱮᱨ ᱞᱟᱹᱜᱤᱫ ᱚᱞ ᱫᱚᱦᱚᱜ-ᱟ᱾",
      destGeneral: "ᱥᱟᱱᱟᱢ ᱥᱟᱶᱛᱟ ᱯᱷᱟᱱᱰ",
      destTicket: "ᱢᱤᱫ ᱴᱤᱠᱮᱴ ᱨᱮ ᱜᱚᱲᱚ",
      searchTicketPlaceholder: "ᱴᱤᱠᱮᱴ ᱟᱭᱰᱤ ᱥᱮ ᱧᱩᱛᱩᱢ ᱛᱮ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ",
      listResourceTitle: "ᱥᱟᱶᱛᱟ ᱥᱟᱯᱟᱵ ᱛᱟᱹᱞᱠᱟᱹ ᱢᱮ",
      listResourceSub: "ᱥᱟᱯᱟᱵ ᱥᱮ ᱴᱷᱟᱶ ᱮᱢ ᱢᱮ ᱡᱟᱦᱟᱸ ᱛᱮ ᱟᱹᱛᱩ ᱠᱟᱹᱢᱤ ᱞᱟᱦᱟᱜ-ᱟ᱾",
      resourceName: "ᱥᱟᱯᱟᱵ ᱧᱩᱛᱩᱢ",
      resourceNamePlaceholder: "3D ᱯᱨᱤᱱᱴᱟᱨ, ᱦᱟᱹᱛᱷᱭᱟᱹᱨ, ᱜᱟᱹᱰᱤ...",
      locationLabel: "ᱴᱷᱟᱶ / ᱟᱹᱛᱩ",
      locationPlaceholder: "ᱠᱟᱝᱠᱮ, ᱨᱟᱺᱪᱤ",
      availabilityLabel: "ᱚᱠᱛᱚ ᱧᱟᱢᱚᱜ",
      availabilityPlaceholder: "ᱢᱟᱦᱟᱸ ᱥᱮ ᱡᱟᱣᱜᱮ",
      descLabel: "ᱵᱤᱵᱚᱨᱚᱬ",
      descPlaceholder: "ᱥᱟᱯᱟᱵ ᱨᱮᱱᱟᱜ ᱦᱟᱞᱚᱛ ᱟᱨ ᱵᱮᱵᱷᱟᱨ ᱵᱟᱵᱚᱛ ᱚᱞ ᱢᱮ᱾",
      contactPrefLabel: "ᱡᱚᱲᱟᱣ ᱦᱚᱨ",
      listBtn: "ᱥᱟᱯᱟᱵ ᱚᱞ ᱢᱮ",
      directoryTitle: "ᱥᱟᱯᱟᱵ ᱛᱟᱹᱞᱠᱟᱹ",
      directorySub: "ᱯᱨᱚᱡᱮᱠᱴ ᱴᱤᱢ ᱞᱟᱹᱜᱤᱫ ᱧᱟᱢᱚᱜ ᱠᱟᱱ ᱥᱟᱯᱟᱵ ᱠᱚ᱾",
      noResources: "ᱱᱤᱛ ᱫᱷᱟᱹᱵᱤᱡ ᱪᱮᱫ ᱥᱟᱯᱟᱵ ᱵᱟᱹᱱᱩᱜ-ᱟ᱾",
      unverifiedBadge: "ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱵᱟᱹᱠᱤ",
      verificationNotice: "PRI ᱥᱮ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱯᱟᱦᱴᱟ ᱠᱷᱚᱱ ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱛᱟᱺᱜᱤ ᱨᱮ"
    },
    progressTracker: {
      navOverview: "ᱢᱩᱬᱩᱛ ᱞᱟᱦᱟᱱᱛᱤ ᱧᱮᱞ",
      navPipeline: "ᱪᱟᱞᱟᱜ ᱠᱟᱱ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ",
      navUniversities: "ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱥᱚᱞᱦᱮ ᱨᱮᱸᱠ",
      navDistricts: "ᱡᱤᱞᱟᱹ ᱴᱚᱴᱷᱟ ᱦᱟᱹᱴᱤᱧ",
      reportIssueBtn: "ᱱᱟᱣᱟ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ",
      calloutBadge: "ᱦᱚᱲ ᱫᱟᱲᱮ ᱟᱨ ᱥᱮᱞᱮᱫ",
      calloutTitle: "ᱪᱮᱫ ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱨᱮ ᱡᱟᱦᱟᱸᱱ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱢᱮᱱᱟᱜ-ᱟ?",
      calloutDesc: "ᱫᱟᱜ, ᱵᱤᱡᱽᱞᱤ, ᱪᱟᱥ ᱟᱨ ᱦᱚᱲᱢᱚ ᱥᱟᱶᱟᱨ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱟᱡᱽ ᱨᱮᱱᱟᱜ ᱔᱒ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱚ ᱥᱟᱢᱟᱝ ᱨᱮ ᱥᱚᱫᱚᱨ ᱢᱮ᱾",
      reportProblemBtn: "ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ",
      joinSamvaadBtn: "ᱦᱚᱲ ᱨᱚᱯᱚᱲ ᱨᱮ ᱥᱮᱞᱮᱫᱚᱜ ᱢᱮ",
      backBtn: "← Aatu Samasya Dashboard Te Ruwar",
      activeSprintBadge: "CHALU BIRDAUSUL R&D SPRINT",
      locationPrefix: "Jaiga:",
      timelineTitle: "5-Dhap Samadhan Lahanti Okto",
      timelineSub: "Aatu hor ol khon laab bidaw dhabich sari katha",
      openSamvaadBtn: "💬 Galmarao Research Thread Jhin Me",
      viewDprBtn: "📊 Technical DPR Report (PDF) Ñel Me",
      downloadDprBtn: "Official DPR PDF Download Me",
      closeBtn: "ᱵᱚᱸᱫᱽ ᱢᱮ"
    }
  }
};
