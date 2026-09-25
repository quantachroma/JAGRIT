'use client';

import React, { useState, useEffect } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data?: any;
  ticketId?: string;
  studentPool?: number;
  lang?: any;
}

export default function XaiSpiderChart({ data, ticketId }: Props) {
  const [mounted, setMounted] = useState(false);
  const [match, setMatch] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const id = ticketId || data?.ticketId || '';
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setMatch(null);
    async function loadMatch() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/v1/challenges/${encodeURIComponent(id)}/match`);
        if (!response.ok) throw new Error(`Match request failed: ${response.status}`);
        const json = await response.json();
        if (!cancelled) setMatch(json.topMatch || json.selectedMatch || null);
      } catch (error) {
        console.warn('Could not load Formula 4 match:', error);
      }
    }
    void loadMatch();
    return () => { cancelled = true; };
  }, [id]);

  const topMatch = match || data || {};
  const chartData = [
    { subject: 'Domain Expertise (25%)', score: topMatch.domainExpertise ?? 0 },
    { subject: 'Faculty Availability (20%)', score: topMatch.facultyAvailability ?? 0 },
    { subject: 'NABL Lab (20%)', score: topMatch.nablLab ?? 0 },
    { subject: 'Proximity (15%)', score: topMatch.proximity ?? 0 },
    { subject: 'Campus Capacity (10%)', score: topMatch.campusCapacity ?? 0 },
    { subject: 'Track Record (10%)', score: topMatch.trackRecord ?? 0 },
  ];

  if (!mounted) {
    return <div className="h-64 flex items-center justify-center text-xs text-slate-400">Loading 6-Axis AI Chart...</div>;
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#CBD5E1" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#1E3A8A', fontSize: 10, fontWeight: 'bold' }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" />
          <Radar
            name="Compatibility"
            dataKey="score"
            stroke="#1E3A8A"
            fill={topMatch.isEligible === false ? '#EF4444' : '#3B82F6'}
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
      {match && (
        <p className="mt-2 rounded-full bg-blue-50 px-3 py-1.5 text-center text-[11px] font-semibold text-blue-900">
          📍 PostGIS Distance to Top HEI ({match.universityName}): {match.realDistanceKm} km | Formula 4 Score: {match.overallMatchScore}% ({match.isEligible ? 'Eligible to Bid' : 'Ineligible'})
        </p>
      )}
    </div>
  );
}
