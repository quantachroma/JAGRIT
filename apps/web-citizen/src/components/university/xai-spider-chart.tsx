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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute dynamic 6-Axis values based on the ticket
  const isPalamuWater =
    ticketId?.includes('PAL') ||
    data?.domain?.includes('Water') ||
    data?.domainExpertise > 90;

  const isEastSinghbhumMining =
    ticketId?.includes('EAS') ||
    ticketId?.includes('M5') ||
    data?.domain?.includes('Metal') ||
    data?.domain?.includes('Mining');

  const isKhuntiLac =
    ticketId?.includes('KHT') ||
    data?.domain?.includes('Agri') ||
    data?.domain?.includes('Lac');

  // Dynamic values per domain (Formula 4)
  let domainExp = data?.domainExpertise ?? 75;
  let facultyAvail = data?.facultyAvailability ?? 70;
  let nablLab = data?.nablLab ?? 60;
  let proximity = data?.proximity ?? 75;
  let campusCap = data?.campusCapacity ?? 70;
  let trackRecord = data?.trackRecord ?? 80;

  if (isPalamuWater) {
    // Palamu Water Challenge -> BIT Mesra has Fluoride patents + NABL Water Lab
    domainExp = data?.domainExpertise ?? 96;
    facultyAvail = data?.facultyAvailability ?? 88;
    nablLab = data?.nablLab ?? 100;
    proximity = data?.proximity ?? 85;
    campusCap = data?.campusCapacity ?? 78;
    trackRecord = data?.trackRecord ?? 98;
  } else if (isEastSinghbhumMining) {
    // East Singhbhum (Kharkai River / Acid Mine) -> NIT Jamshedpur local, different profile
    domainExp = 82;
    facultyAvail = 74;
    nablLab = 70;
    proximity = 95; // Local to Jamshedpur basin
    campusCap = 85;
    trackRecord = 80;
  } else if (isKhuntiLac) {
    // Khunti Lac / Agriculture -> Agri domain profile
    domainExp = 60;
    facultyAvail = 65;
    nablLab = 50;
    proximity = 80;
    campusCap = 72;
    trackRecord = 76;
  }

  // Canonical 6 Axes from PRD Formula 4 (Hexagon)
  const chartData = [
    { subject: 'Domain Expertise (25%)', score: domainExp },
    { subject: 'Faculty Availability (20%)', score: facultyAvail },
    { subject: 'NABL Lab (20%)', score: nablLab },
    { subject: 'Proximity (15%)', score: proximity },
    { subject: 'Campus Capacity (10%)', score: campusCap },
    { subject: 'Track Record (10%)', score: trackRecord },
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
            fill="#3B82F6"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}