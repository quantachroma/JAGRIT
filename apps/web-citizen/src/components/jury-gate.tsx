"use client";
import { useJury } from "@/components/jury-provider";
import JuryScoreCard from "@/components/jury-score-card";

export default function JuryGate({ ticketId }: { ticketId: string }) {
  const { juryMode } = useJury();
  if (!juryMode) return null;
  return (
    <div className="mt-3">
      <JuryScoreCard ticketId={ticketId} />
    </div>
  );
}
