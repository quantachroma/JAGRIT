'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useCitizen } from '@/context/CitizenContext';
import { MOCK_PROGRESS_PROJECT, getMockProjectData } from '@/components/progress/mock-progress-data';
import ProgressHeader from '@/components/progress/progress-header';
import LifecycleStepper from '@/components/progress/lifecycle-stepper';
import EscrowLedger from '@/components/progress/escrow-ledger';
import AuditVault from '@/components/progress/audit-vault';
import MaturationQuorum from '@/components/progress/maturation-quorum';
import NepAcademicCard from '@/components/progress/nep-academic-card';
import { Sparkles } from 'lucide-react';

export default function ProblemProgressPage() {
  const params = useParams();
  const { language } = useCitizen();

  const ticketId = useMemo(() => {
    if (!params?.id) return 'JAG-PLM-0082';
    const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
    return decodeURIComponent(rawId);
  }, [params]);

  // Project data customized with ticketId from route param
  const projectData = useMemo(() => {
    return getMockProjectData(ticketId);
  }, [ticketId]);

  return (
    <div className="max-w-7xl mx-auto space-y-7 pb-20 animate-in fade-in duration-300">
      {/* 1. PROJECT HEADER & METADATA BAR */}
      <ProgressHeader
        project={projectData}
        language={language}
      />

      {/* 2. INTERACTIVE 5-STAGE LIFECYCLE PROGRESS STEPPER */}
      <LifecycleStepper
        stages={projectData.stages}
        currentDay={projectData.currentDay}
        totalDays={projectData.totalMaturationDays}
        language={language}
      />

      {/* 3. TRANCHE-BASED ESCROW FINANCIAL HEALTH LEDGER */}
      <EscrowLedger
        tranches={projectData.escrowTranches}
        totalBudget={projectData.totalBudget}
        language={language}
      />

      {/* 4. COMPLIANCE & TRIBAL GOVERNANCE AUDIT VAULT */}
      <AuditVault
        documents={projectData.auditVault}
        language={language}
      />

      {/* 5. 45-DAY MATURATION BUFFER & REAL-TIME QUORUM STATUS */}
      <MaturationQuorum
        currentDay={projectData.currentDay}
        totalDays={projectData.totalMaturationDays}
        maturationPct={projectData.maturationPercentage}
        quorum={projectData.quorum}
        language={language}
      />

      {/* 6. NEP 2020 ACADEMIC CREDIT & IMPACT SETTLEMENT CARD */}
      <NepAcademicCard
        data={projectData.academicCredits}
        language={language}
      />
    </div>
  );
}

