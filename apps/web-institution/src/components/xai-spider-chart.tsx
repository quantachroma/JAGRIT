"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import type { XAISpiderChartData } from "@jagrit/contracts";

export default function XaiSpiderChart({ data }: { data: XAISpiderChartData }) {
  const chart = [
    { axis: "Lab", value: data.labCapability },
    { axis: "Patents", value: data.facultyPatents },
    { axis: "Proximity", value: data.geographicProximity },
    { axis: "Track record", value: data.trackRecord },
  ];
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <RadarChart data={chart}>
          <PolarGrid />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} />
          <Radar dataKey="value" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
