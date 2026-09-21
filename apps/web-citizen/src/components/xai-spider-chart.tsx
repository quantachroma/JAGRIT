'use client';
import React, { useEffect, useState } from 'react';
import type { XAISpiderChartData } from '@jagrit/contracts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface Props {
  data?: XAISpiderChartData;
  studentPool?: number;
  ticketId?: string;
}

export default function XaiSpiderChart({ data, studentPool = 82, ticketId }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = [
    { subject: 'NABL Labs', score: data?.nablLab ?? 95 },
    { subject: 'Faculty Availability', score: data?.facultyAvailability ?? 90 },
    { subject: 'Proximity', score: data?.proximity ?? 85 },
    { subject: 'Track Record', score: data?.trackRecord ?? 98 },
    { subject: 'Student Pool', score: studentPool },
  ];

  if (!mounted) {
    return <div className="h-64 flex items-center justify-center text-xs text-slate-400">Loading AI Chart...</div>;
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#1E3A8A', fontSize: 11, fontWeight: 'bold' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" />
          <Radar name="Compatibility" dataKey="score" stroke="#2563EB" fill="#3B82F6" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
