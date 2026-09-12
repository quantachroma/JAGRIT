'use client';

import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import type { GeoLocation } from '@jagrit/contracts';

interface SpatialRadarMapProps {
  centerLocation?: GeoLocation;
  nearbyRadiusMeters?: number;
  duplicateCount?: number;
}

export default function SpatialRadarMap({
  centerLocation = { lat: 23.3441, lon: 85.3096, district: 'Ranchi', block: 'Kanke' },
  nearbyRadiusMeters = 500,
  duplicateCount = 3,
}: SpatialRadarMapProps) {
  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm space-y-3 relative overflow-hidden border border-slate-800">
      <div className="flex items-center justify-between text-xs z-10 relative">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-bold">PostGIS 500m Radar Buffer</span>
        </div>
        <span className="text-[11px] font-mono text-emerald-300">
          Radius: {nearbyRadiusMeters}m
        </span>
      </div>

      <div className="h-32 bg-slate-950/60 rounded-lg flex items-center justify-center relative border border-slate-800">
        {/* Concentric radar circles */}
        <div className="absolute w-28 h-28 rounded-full border border-emerald-500/20" />
        <div className="absolute w-20 h-20 rounded-full border border-emerald-500/40" />
        <div className="absolute w-10 h-10 rounded-full border border-emerald-500/60" />

        {/* Center pin */}
        <div className="relative z-10 flex flex-col items-center">
          <MapPin className="w-5 h-5 text-amber-400 drop-shadow" />
          <span className="text-[9px] text-amber-200 mt-0.5 font-mono">
            {centerLocation.district}
          </span>
        </div>
      </div>

      <div className="flex justify-between text-[11px] text-slate-400 pt-1">
        <span>Nearby Submissions: {duplicateCount}</span>
        <span>Semantic Match: 0.89</span>
      </div>
    </div>
  );
}

