'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { GeoLocation } from '@jagrit/contracts';
import { useCitizen } from '@/context/CitizenContext';
import {
  MapPin,
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  ThumbsUp,
  Camera,
  Info,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export interface NearbyChallenge {
  id: string;
  title: string;
  category: string;
  distanceMeters: number;
  similarityScore: number; // 0 to 1 (e.g. 0.89 = 89%)
  upvotes: number;
  date: string;
  reporter: string;
  status: 'PENDING_HITL' | 'ROUTED_CIVIC' | 'OPEN_FOR_BIDS' | 'DYNAMIC_HACKATHON' | 'IN_PILOT' | 'RESOLVED';
  coordinates: { lat: number; lon: number };
  originalPhotoUrl?: string;
  currentPhotoUrl?: string;
  description: string;
  defectLabel?: string;
  hasMerged?: boolean;
}

export interface SpatialRadarMapProps {
  centerLocation?: GeoLocation;
  nearbyRadiusMeters?: number; // 500 meters (ADR-002)
  challenges?: NearbyChallenge[];
  currentPhotoPreview?: string;
  onMergeUpvote?: (challenge: NearbyChallenge) => void;
  compact?: boolean;
}

const DEFAULT_NEARBY_CHALLENGES: NearbyChallenge[] = [
  {
    id: 'JAG-2026-RAN-0098',
    title: 'कांके वार्ड 4 में चापाकल से गंदा फ्लोराइड व गाद युक्त पानी',
    category: 'drinking_water',
    distanceMeters: 180,
    similarityScore: 0.89,
    upvotes: 42,
    date: '11 Sep 2026, 04:30 PM',
    reporter: 'रमेश मुंडा (Ramesh Munda), Ward 4',
    status: 'OPEN_FOR_BIDS',
    coordinates: { lat: 23.3452, lon: 85.3108 },
    description: 'चापाकल से अत्यधिक मटमैला एवं आयरन/फ्लोराइड युक्त पानी आ रहा है। फिल्टर व पाइपलाइन गाद से बंद है। 40 घर प्रभावित हैं।',
    defectLabel: 'Iron/Silt Sedimentation (ViT: 94%)',
  },
  {
    id: 'JAG-2026-RAN-0104',
    title: 'कांके ब्लॉक चौक: सबमर्सिबल बोरवेल मोटर खराबी',
    category: 'drinking_water',
    distanceMeters: 320,
    similarityScore: 0.92,
    upvotes: 28,
    date: '10 Sep 2026, 11:15 AM',
    reporter: 'सोमरा उरांव (PRI Member)',
    status: 'PENDING_HITL',
    coordinates: { lat: 23.3425, lon: 85.3082 },
    description: 'सार्वजनिक बोरवेल की मोटर जल गई है और पाइपलाइन में गाद भरी हुई है। ग्रामीणों को दूर से पानी लाना पड़ रहा है।',
    defectLabel: 'Subsurface Pump Failure (ViT: 89%)',
  },
  {
    id: 'JAG-2026-RAN-0112',
    title: 'पंचायत भवन के सामने सोलर स्ट्रीट लाइट इन्वर्टर खराबी',
    category: 'electricity',
    distanceMeters: 460,
    similarityScore: 0.64,
    upvotes: 19,
    date: '09 Sep 2026, 02:00 PM',
    reporter: 'बीरबल महतो (Birbal Mahto)',
    status: 'ROUTED_CIVIC',
    coordinates: { lat: 23.3468, lon: 85.3071 },
    description: 'सोलर बैटरी चार्ज नहीं ले रही है। शाम को पूरे चौक पर अंधेरा रहता है।',
    defectLabel: 'Battery Disconnect (ViT: 78%)',
  },
  {
    id: 'JAG-2026-RAN-0125',
    title: 'कृषि नाला गाद भराव एवं चेकडैम रिसाव',
    category: 'agriculture',
    distanceMeters: 620,
    similarityScore: 0.41,
    upvotes: 15,
    date: '08 Sep 2026, 09:40 AM',
    reporter: 'मंगरा उरांव (Mangra Oraon)',
    status: 'DYNAMIC_HACKATHON',
    coordinates: { lat: 23.3485, lon: 85.3142 },
    description: 'चेकडैम की दीवार से पानी रिस रहा है जिससे खरीफ की सिंचाई प्रभावित हो रही है।',
    defectLabel: 'Masonry Micro-fracture (ViT: 65%)',
  },
];

export default function SpatialRadarMap({
  centerLocation,
  nearbyRadiusMeters = 500,
  challenges = DEFAULT_NEARBY_CHALLENGES,
  currentPhotoPreview,
  onMergeUpvote,
  compact = false,
}: SpatialRadarMapProps) {
  const { currentLocation, language, t } = useCitizen();

  const effectiveLocation = centerLocation || currentLocation || {
    lat: 23.3441,
    lon: 85.3096,
    district: 'Ranchi',
    block: 'Kanke',
    panchayat: 'Kanke Panchayat',
  };

  // State
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedChallenge, setSelectedChallenge] = useState<NearbyChallenge | null>(null);
  const [nearbyList, setNearbyList] = useState<NearbyChallenge[]>(challenges);
  const [optimisticMergedIds, setOptimisticMergedIds] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync external challenges
  useEffect(() => {
    setNearbyList(challenges);
  }, [challenges]);

  // Handle Optimistic Upvote & Merge (ADR-002)
  const handleMergeAndUpvote = (challenge: NearbyChallenge) => {
    const currentUpvotes = optimisticMergedIds[challenge.id] !== undefined
      ? optimisticMergedIds[challenge.id]
      : challenge.upvotes;
    
    const newUpvotes = currentUpvotes + 1;

    setOptimisticMergedIds((prev) => ({
      ...prev,
      [challenge.id]: newUpvotes,
    }));

    setNearbyList((prevList) =>
      prevList.map((item) =>
        item.id === challenge.id
          ? { ...item, upvotes: newUpvotes, hasMerged: true }
          : item
      )
    );

    if (selectedChallenge && selectedChallenge.id === challenge.id) {
      setSelectedChallenge({
        ...selectedChallenge,
        upvotes: newUpvotes,
        hasMerged: true,
      });
    }

    setToastMessage(
      language === 'hi'
        ? `सफलतापूर्वक मास्टर टिकट #${challenge.id} में विलय कर समर्थन (+1) दर्ज किया गया!`
        : `Successfully merged and upvoted (+1) into Master Ticket #${challenge.id}!`
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);

    if (onMergeUpvote) {
      onMergeUpvote({
        ...challenge,
        upvotes: newUpvotes,
        hasMerged: true,
      });
    }
  };

  // Pan controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // 500m scale calculation for SVG coordinates (viewBox 600 x 400, center at 300, 200)
  // 500m radius corresponds to 140px at 1x zoom
  const centerCoord = { x: 300, y: 200 };
  const bufferRadiusPx = 140 * zoomLevel;

  return (
    <div className="relative w-full bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden select-none">
      {/* HUD Telemetry Top Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white text-xs">
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center justify-center">
            <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="absolute w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
          </div>
          <div>
            <span className="font-bold text-emerald-400 tracking-wide">POSTGIS 500m RADAR</span>
            <span className="text-[10px] text-slate-400 ml-1.5 hidden sm:inline font-mono">
              (ADR-002 ST_DWithin)
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2 py-0.5 rounded text-[11px] font-mono text-emerald-300 border border-emerald-900/40">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>
              {effectiveLocation.lat.toFixed(4)}°N, {effectiveLocation.lon.toFixed(4)}°E
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1 text-[10px] text-slate-400">
            <span>Buffer:</span>
            <span className="font-bold text-emerald-400">{nearbyRadiusMeters}m</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full ${compact ? 'h-64 sm:h-72' : 'h-80 sm:h-96'} bg-slate-950 cursor-grab active:cursor-grabbing overflow-hidden`}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Radar Sweep Radial Gradient */}
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.35)" />
              <stop offset="70%" stopColor="rgba(16, 185, 129, 0.12)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.0)" />
            </radialGradient>

            {/* Glowing 500m Perimeter Filter */}
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(51, 65, 85, 0.3)" strokeWidth="0.75" />
            </pattern>
          </defs>

          {/* Tactical Background Grid with Pan/Zoom Transform */}
          <g transform={`translate(${panOffset.x}, ${panOffset.y})`}>
            <rect width="600" height="400" fill="url(#grid)" />

            {/* Topographical Contour Outlines (Rural Jharkhand Landscape) */}
            <path
              d="M 60 90 Q 200 40, 360 80 T 540 120 Q 580 240, 480 320 T 180 340 Q 40 260, 60 90 Z"
              fill="rgba(15, 23, 42, 0.6)"
              stroke="rgba(71, 85, 105, 0.35)"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <path
              d="M 140 130 Q 260 90, 400 130 T 480 230 Q 440 310, 280 300 T 140 210 Z"
              fill="rgba(4, 71, 40, 0.08)"
              stroke="rgba(16, 185, 129, 0.2)"
              strokeWidth="1"
            />

            {/* 100m, 250m, and 500m Concentric Radar Circles */}
            {/* 100m circle */}
            <circle
              cx={centerCoord.x}
              cy={centerCoord.y}
              r={bufferRadiusPx * 0.2}
              fill="none"
              stroke="rgba(16, 185, 129, 0.25)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            {/* 250m circle */}
            <circle
              cx={centerCoord.x}
              cy={centerCoord.y}
              r={bufferRadiusPx * 0.5}
              fill="none"
              stroke="rgba(16, 185, 129, 0.35)"
              strokeWidth="1"
              strokeDasharray="4 2"
            />

            {/* Pulsing 500-Meter Exact Deduplication Buffer Circle (ADR-002) */}
            <circle
              cx={centerCoord.x}
              cy={centerCoord.y}
              r={bufferRadiusPx}
              fill="url(#radarSweep)"
              stroke="#10b981"
              strokeWidth="2"
              filter="url(#glowGreen)"
              className="transition-all duration-300"
            />

            {/* Animated Expanding Pulse Ring */}
            <circle
              cx={centerCoord.x}
              cy={centerCoord.y}
              r={bufferRadiusPx}
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              opacity="0.4"
              className="animate-ping"
              style={{ transformOrigin: `${centerCoord.x}px ${centerCoord.y}px`, animationDuration: '3.5s' }}
            />

            {/* Rotating Radar Sweep Beam */}
            <g
              style={{
                transformOrigin: `${centerCoord.x}px ${centerCoord.y}px`,
                animation: 'spin 6s linear infinite',
              }}
            >
              <line
                x1={centerCoord.x}
                y1={centerCoord.y}
                x2={centerCoord.x + bufferRadiusPx}
                y2={centerCoord.y}
                stroke="rgba(52, 211, 153, 0.85)"
                strokeWidth="2"
              />
              <path
                d={`M ${centerCoord.x} ${centerCoord.y} L ${centerCoord.x + bufferRadiusPx} ${centerCoord.y} A ${bufferRadiusPx} ${bufferRadiusPx} 0 0 0 ${centerCoord.x + bufferRadiusPx * 0.866} ${centerCoord.y - bufferRadiusPx * 0.5} Z`}
                fill="rgba(16, 185, 129, 0.25)"
              />
            </g>

            {/* Range Annotations */}
            <text
              x={centerCoord.x + bufferRadiusPx * 0.5 + 4}
              y={centerCoord.y - 4}
              fill="rgba(52, 211, 153, 0.7)"
              fontSize="9"
              fontFamily="monospace"
            >
              250m
            </text>
            <text
              x={centerCoord.x + bufferRadiusPx + 4}
              y={centerCoord.y - 4}
              fill="#34d399"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              500m BUFFER
            </text>

            {/* Center GPS User Pin (Observer) */}
            <g transform={`translate(${centerCoord.x}, ${centerCoord.y})`}>
              <circle r="16" fill="rgba(245, 158, 11, 0.15)" className="animate-pulse" />
              <circle r="8" fill="rgba(245, 158, 11, 0.4)" />
              <circle r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />

              {/* Callout Label */}
              <rect
                x="-42"
                y="-32"
                width="84"
                height="16"
                rx="4"
                fill="#0f172a"
                stroke="#f59e0b"
                strokeWidth="1"
              />
              <text
                x="0"
                y="-21"
                fill="#fde68a"
                fontSize="8.5"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                YOU (Current GPS)
              </text>
            </g>

            {/* Nearby Challenge Markers (Within & Around 500m Buffer) */}
            {nearbyList.map((ch, idx) => {
              // Convert distance & bearing to x,y relative to center
              // Angle distributed for visualization
              const angles = [35, 140, 245, 310, 80];
              const angleDeg = angles[idx % angles.length];
              const angleRad = (angleDeg * Math.PI) / 180;
              const normalizedDist = (ch.distanceMeters / 500) * bufferRadiusPx;
              const markerX = centerCoord.x + normalizedDist * Math.cos(angleRad);
              const markerY = centerCoord.y + normalizedDist * Math.sin(angleRad);

              const isWithinBuffer = ch.distanceMeters <= nearbyRadiusMeters;
              const isHighSimilarity = ch.similarityScore >= 0.85; // ADR-002 Rule
              const isSelected = selectedChallenge?.id === ch.id;
              const upvotesCount = optimisticMergedIds[ch.id] !== undefined
                ? optimisticMergedIds[ch.id]
                : ch.upvotes;

              return (
                <g
                  key={ch.id}
                  transform={`translate(${markerX}, ${markerY})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChallenge(ch);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Beacon for High Similarity Candidates */}
                  {isHighSimilarity && (
                    <circle
                      r={isSelected ? '22' : '16'}
                      fill="rgba(239, 68, 68, 0.2)"
                      className="animate-ping"
                      style={{ animationDuration: '2.5s' }}
                    />
                  )}

                  {/* Marker Pin Head */}
                  <circle
                    r={isSelected ? '14' : '11'}
                    fill={isHighSimilarity ? '#ef4444' : isWithinBuffer ? '#f59e0b' : '#64748b'}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-200 group-hover:scale-125"
                  />

                  {/* Marker Icon Dot */}
                  <circle
                    r="4"
                    fill={isHighSimilarity ? '#ffffff' : '#0f172a'}
                  />

                  {/* Distance & Match Floating Label */}
                  <g transform="translate(0, -18)">
                    <rect
                      x="-38"
                      y="-12"
                      width="76"
                      height="15"
                      rx="3"
                      fill="#0f172a"
                      stroke={isHighSimilarity ? '#ef4444' : '#475569'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="-2"
                      fill={isHighSimilarity ? '#fca5a5' : '#e2e8f0'}
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {ch.distanceMeters}m • {Math.round(ch.similarityScore * 100)}%
                    </text>
                  </g>

                  {/* Merged Badge if already upvoted/merged */}
                  {(ch.hasMerged || optimisticMergedIds[ch.id]) && (
                    <g transform="translate(10, -10)">
                      <circle r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                      <path
                        d="M -2 0 L -0.5 1.5 L 2.5 -1.5"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Map Controls: Zoom +, Zoom -, Reset, Attribution */}
        <div className="absolute top-3 right-3 z-10 flex flex-col space-y-1.5">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(2, Number((z + 0.25).toFixed(2))))}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center text-xs shadow-md transition-all active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))))}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center text-xs shadow-md transition-all active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center text-xs shadow-md transition-all active:scale-95"
            title="Reset to GPS Center"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* ADR-002 Compliance Status Floating Pill */}
        <div className="absolute bottom-3 left-3 z-10 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-[11px] text-slate-300 flex items-center space-x-2 shadow-lg max-w-[280px] sm:max-w-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <span className="font-semibold text-emerald-400">ADR-002 Active:</span>{' '}
            <span className="text-[10px] text-slate-300">
              Matches within 500m &amp; &ge;85% cosine similarity merge into master ticket.
            </span>
          </div>
        </div>

        {/* Nearby Markers Quick Legend */}
        <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center space-x-2 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> &ge;85% Match
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> &lt;85% Overlap
          </span>
        </div>
      </div>

      {/* Instant Feedback Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-emerald-950/95 text-emerald-100 border-2 border-emerald-500/80 px-4 py-2 rounded-xl text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top duration-300 max-w-[90%] text-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Animated Comparison Drawer (Sliding Up from Bottom) */}
      {selectedChallenge && (
        <div className="relative z-30 border-t border-slate-800 bg-slate-900/98 backdrop-blur-lg p-4 sm:p-5 text-white animate-in slide-in-from-bottom duration-300 space-y-4">
          {/* Drawer Header */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  {selectedChallenge.id}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{selectedChallenge.distanceMeters}m away from your GPS</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  Status: {selectedChallenge.status}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {selectedChallenge.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setSelectedChallenge(null)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Side-by-Side Photo Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Original Master Ticket Photo */}
            <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  Original Ticket Evidence
                </span>
                <span className="text-[10px] text-slate-400">{selectedChallenge.date}</span>
              </div>

              {/* Photo Representation with ViT Bounding Box Tag */}
              <div className="relative h-32 bg-slate-800/60 rounded-lg overflow-hidden flex flex-col items-center justify-center border border-slate-700/60">
                <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950/40 flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-xs font-mono text-slate-400">
                    {selectedChallenge.category === 'drinking_water'
                      ? '📸 Broken Handpump / Borewell Casing'
                      : '📸 Damaged Infrastructure Site'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    Reported by: {selectedChallenge.reporter}
                  </span>
                </div>

                {/* ViT Defect Tag */}
                {selectedChallenge.defectLabel && (
                  <div className="absolute top-2 left-2 bg-red-950/80 text-red-300 text-[9px] font-mono px-2 py-0.5 rounded border border-red-700/60 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-red-400" />
                    <span>{selectedChallenge.defectLabel}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Current Problem Photo (Citizen's Submission) */}
            <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Your Current Upload / Live Pin
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">Just Now</span>
              </div>

              <div className="relative h-32 bg-slate-800/60 rounded-lg overflow-hidden flex flex-col items-center justify-center border border-slate-700/60">
                {currentPhotoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentPhotoPreview}
                    alt="Your current report"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-amber-950/40 flex flex-col items-center justify-center p-3 text-center">
                    <Camera className="w-6 h-6 text-amber-400 mb-1 opacity-70" />
                    <span className="text-xs text-amber-200 font-medium">Current Grievance Evidence</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      GPS: {effectiveLocation.district}, {effectiveLocation.block}
                    </span>
                  </div>
                )}

                <div className="absolute top-2 left-2 bg-emerald-950/80 text-emerald-300 text-[9px] font-mono px-2 py-0.5 rounded border border-emerald-700/60">
                  Target Buffer: {selectedChallenge.distanceMeters}m
                </div>
              </div>
            </div>
          </div>

          {/* Semantic Similarity Progress Bar (ADR-002: OpenAI text-embedding-3-large 1536d) */}
          <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-slate-200">Semantic &amp; Geospatial Similarity</span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                  (text-embedding-3-large + ST_DWithin)
                </span>
              </div>
              <span
                className={`font-mono font-bold text-sm ${
                  selectedChallenge.similarityScore >= 0.85 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {Math.round(selectedChallenge.similarityScore * 100)}% Match
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className={`h-full transition-all duration-700 rounded-full ${
                  selectedChallenge.similarityScore >= 0.85
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                }`}
                style={{ width: `${Math.round(selectedChallenge.similarityScore * 100)}%` }}
              />
              {/* 85% Deduplication Threshold Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-sm z-10"
                style={{ left: '85%' }}
                title="ADR-002 85% Deduplication Threshold"
              />
            </div>

            {/* Threshold Feedback Note */}
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-400">
                Threshold: <strong className="text-white">&ge;85% cosine match</strong>
              </span>
              {selectedChallenge.similarityScore >= 0.85 ? (
                <span className="text-emerald-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ADR-002 Duplicate Detected &bull; Auto-Merge Recommended
                </span>
              ) : (
                <span className="text-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Below 85% threshold &bull; Can be registered as separate ticket
                </span>
              )}
            </div>
          </div>

          {/* Primary Action Button: "Merge & Upvote Master Ticket (+1)" */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => handleMergeAndUpvote(selectedChallenge)}
              disabled={selectedChallenge.hasMerged || Boolean(optimisticMergedIds[selectedChallenge.id])}
              className={`w-full sm:flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 ${
                selectedChallenge.hasMerged || optimisticMergedIds[selectedChallenge.id]
                  ? 'bg-emerald-800 text-emerald-100 cursor-not-allowed border border-emerald-600'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50 hover:shadow-emerald-700/40'
              }`}
            >
              {selectedChallenge.hasMerged || optimisticMergedIds[selectedChallenge.id] ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Merged &amp; Upvoted (+1) &bull; Master Ticket Supported</span>
                </>
              ) : (
                <>
                  <ThumbsUp className="w-4 h-4 text-amber-300" />
                  <span>
                    {language === 'hi'
                      ? 'मास्टर टिकट में विलय करें और समर्थन दें (+1)'
                      : 'Merge & Upvote Master Ticket (+1)'}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSelectedChallenge(null)}
              className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
            >
              {language === 'hi' ? 'बंद करें' : 'Close Drawer'}
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center">
            Per ADR-002, merging prevents municipal fragmentation and elevates priority for university hackathon triage.
          </p>
        </div>
      )}
    </div>
  );
}
