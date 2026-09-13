'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { GeoLocation } from '@jagrit/contracts';
import { useCitizen } from '@/context/CitizenContext';
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  X,
  ThumbsUp,
  Camera,
} from 'lucide-react';

export interface NearbyChallenge {
  id: string;
  title: string;
  category: string;
  distanceMeters: number;
  similarityScore: number; // 0 to 1
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
  nearbyRadiusMeters?: number;
  challenges?: NearbyChallenge[];
  currentPhotoPreview?: string;
  onMergeUpvote?: (challenge: NearbyChallenge) => void;
  compact?: boolean;
}

const ENGLISH_CHALLENGES: NearbyChallenge[] = [
  {
    id: 'JAG-2026-RAN-0098',
    title: 'Turbid fluoride and silt contamination in Kanke Ward 4 handpump',
    category: 'drinking_water',
    distanceMeters: 180,
    similarityScore: 0.89,
    upvotes: 42,
    date: '11 Sep 2026, 04:30 PM',
    reporter: 'Ramesh Munda, Ward 4',
    status: 'OPEN_FOR_BIDS',
    coordinates: { lat: 23.3452, lon: 85.3108 },
    description: 'Handpump discharging highly turbid water with reddish iron and fluoride sedimentation. Filter and riser pipe choked with silt. 40 households affected.',
    defectLabel: 'Iron & Silt Contamination',
  },
  {
    id: 'JAG-2026-RAN-0104',
    title: 'Kanke Block Chowk: Submersible borewell motor failure',
    category: 'drinking_water',
    distanceMeters: 320,
    similarityScore: 0.92,
    upvotes: 28,
    date: '10 Sep 2026, 11:15 AM',
    reporter: 'Somra Oraon, Village Council',
    status: 'PENDING_HITL',
    coordinates: { lat: 23.3425, lon: 85.3082 },
    description: 'Public borewell motor burnt out and pipeline choked with sand. Villagers forced to fetch water from distant streams.',
    defectLabel: 'Submersible Pump Burnout',
  },
  {
    id: 'JAG-2026-RAN-0112',
    title: 'Solar street light inverter failure in front of Panchayat Bhavan',
    category: 'electricity',
    distanceMeters: 460,
    similarityScore: 0.64,
    upvotes: 19,
    date: '09 Sep 2026, 02:00 PM',
    reporter: 'Birbal Mahto',
    status: 'ROUTED_CIVIC',
    coordinates: { lat: 23.3468, lon: 85.3071 },
    description: 'Solar battery pack failing to retain charge. Main village square completely dark after dusk.',
    defectLabel: 'Solar Battery Disconnection',
  },
  {
    id: 'JAG-2026-RAN-0125',
    title: 'Irrigation channel silt accumulation and check dam seepage',
    category: 'agriculture',
    distanceMeters: 620,
    similarityScore: 0.41,
    upvotes: 15,
    date: '08 Sep 2026, 09:40 AM',
    reporter: 'Mangra Oraon',
    status: 'DYNAMIC_HACKATHON',
    coordinates: { lat: 23.3485, lon: 85.3142 },
    description: 'Micro-fracture in masonry check dam wall causing water loss, impacting Kharif crop irrigation.',
    defectLabel: 'Masonry Checkdam Seepage',
  },
];

const HINDI_CHALLENGES: NearbyChallenge[] = [
  {
    id: 'JAG-2026-RAN-0098',
    title: 'कांके वार्ड ४ में चापाकल से मटमैला व फ्लोराइड युक्त दूषित जल',
    category: 'drinking_water',
    distanceMeters: 180,
    similarityScore: 0.89,
    upvotes: 42,
    date: '११ सितम्बर २०२६, शाम ०४:३०',
    reporter: 'रमेश मुंडा, वार्ड ४',
    status: 'OPEN_FOR_BIDS',
    coordinates: { lat: 23.3452, lon: 85.3108 },
    description: 'चापाकल से अत्यधिक मटमैला एवं आयरन युक्त पानी आ रहा है। फिल्टर व पाइपलाइन गाद से बंद है। ४० परिवार प्रभावित हैं।',
    defectLabel: 'आयरन एवं गाद जमाव',
  },
  {
    id: 'JAG-2026-RAN-0104',
    title: 'कांके चौक: सबमर्सिबल बोरवेल मोटर खराबी',
    category: 'drinking_water',
    distanceMeters: 320,
    similarityScore: 0.92,
    upvotes: 28,
    date: '१० सितम्बर २०२६, सुबह ११:१५',
    reporter: 'सोमरा उरांव, पंचायत सदस्य',
    status: 'PENDING_HITL',
    coordinates: { lat: 23.3425, lon: 85.3082 },
    description: 'सार्वजनिक बोरवेल की मोटर जल गई है और पाइपलाइन में गाद भरी है। ग्रामीणों को दूर से पानी लाना पड़ रहा है।',
    defectLabel: 'पंप मोटर खराबी',
  },
  {
    id: 'JAG-2026-RAN-0112',
    title: 'पंचायत भवन के सामने सौर स्ट्रीट लाइट इन्वर्टर खराबी',
    category: 'electricity',
    distanceMeters: 460,
    similarityScore: 0.64,
    upvotes: 19,
    date: '०९ सितम्बर २०२६, दोपहर ०२:००',
    reporter: 'बीरबल महतो',
    status: 'ROUTED_CIVIC',
    coordinates: { lat: 23.3468, lon: 85.3071 },
    description: 'सौर बैटरी चार्ज नहीं ले रही है। शाम को पूरे चौक पर अंधेरा रहता है।',
    defectLabel: 'सौर बैटरी खराबी',
  },
  {
    id: 'JAG-2026-RAN-0125',
    title: 'कृषि नाला गाद भराव एवं चेकडैम रिसाव',
    category: 'agriculture',
    distanceMeters: 620,
    similarityScore: 0.41,
    upvotes: 15,
    date: '०८ सितम्बर २०२६, सुबह ०९:४०',
    reporter: 'मंगरा उरांव',
    status: 'DYNAMIC_HACKATHON',
    coordinates: { lat: 23.3485, lon: 85.3142 },
    description: 'चेकडैम की दीवार से पानी रिस रहा है जिससे खरीफ की सिंचाई प्रभावित हो रही है।',
    defectLabel: 'चेकडैम दीवार रिसाव',
  },
];

const SANTHALI_CHALLENGES: NearbyChallenge[] = [
  {
    id: 'JAG-2026-RAN-0098',
    title: 'ᱠᱟᱸᱠᱮ ᱣᱟᱨᱰ ᱔ ᱨᱮ ᱪᱟᱯᱟᱠᱚᱞ ᱠᱷᱚᱱ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ',
    category: 'drinking_water',
    distanceMeters: 180,
    similarityScore: 0.89,
    upvotes: 42,
    date: '᱑᱑ ᱥᱮᱯᱴᱮᱢᱵᱚᱨ ᱒᱐᱒᱖, ᱐᱔:᱓᱐ ᱴᱟᱲᱟᱝ',
    reporter: 'ᱨᱚᱢᱮᱥ ᱢᱩᱱᱰᱟ, ᱣᱟᱨᱰ ᱔',
    status: 'OPEN_FOR_BIDS',
    coordinates: { lat: 23.3452, lon: 85.3108 },
    description: 'ᱪᱟᱯᱟᱠᱚᱞ ᱠᱷᱚᱱ ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ ᱟᱨ ᱯᱟᱭᱤᱯ ᱦᱚᱸ ᱵᱟᱹᱲᱤᱡ ᱟᱠᱟᱱᱟ᱾ ᱔᱐ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ᱾',
    defectLabel: 'ᱢᱮᱬᱦᱮᱫ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ',
  },
  {
    id: 'JAG-2026-RAN-0104',
    title: 'ᱠᱟᱸᱠᱮ ᱪᱷᱚᱠ: ᱵᱚᱨᱣᱮᱞ ᱢᱳᱴᱚᱨ ᱵᱟᱹᱲᱤᱡ ᱮᱱᱟ',
    category: 'drinking_water',
    distanceMeters: 320,
    similarityScore: 0.92,
    upvotes: 28,
    date: '᱑᱐ ᱥᱮᱯᱴᱮᱢᱵᱚᱨ ᱒᱐᱒᱖, ᱑᱑:᱑᱕ ᱴᱟᱲᱟᱝ',
    reporter: 'ᱥᱳᱢᱨᱟ ᱩᱨᱟᱶ, ᱯᱚᱧᱪᱟᱭᱚᱛ ᱥᱚᱦᱮᱫ',
    status: 'PENDING_HITL',
    coordinates: { lat: 23.3425, lon: 85.3082 },
    description: 'ᱥᱚᱨᱠᱟᱨᱤ ᱵᱚᱨᱣᱮᱞ ᱢᱳᱴᱚᱨ ᱵᱟᱹᱲᱤᱡ ᱮᱱᱟ ᱟᱨ ᱫᱟᱜ ᱵᱟᱝ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ᱾ ᱦᱚᱲ ᱥᱟᱺᱜᱤᱧ ᱠᱷᱚᱱ ᱫᱟᱜ ᱠᱚ ᱟᱹᱜᱩᱭᱮᱫᱟ᱾',
    defectLabel: 'ᱢᱳᱴᱚᱨ ᱵᱟᱹᱲᱤᱡ',
  },
  {
    id: 'JAG-2026-RAN-0112',
    title: 'ᱯᱚᱧᱪᱟᱭᱚᱛ ᱚᱲᱟᱜ ᱥᱟᱢᱟᱝ ᱨᱮ ᱵᱮᱨ ᱵᱤᱡᱽᱞᱤ ᱵᱟᱹᱲᱤᱡ',
    category: 'electricity',
    distanceMeters: 460,
    similarityScore: 0.64,
    upvotes: 19,
    date: '᱐᱙ ᱥᱮᱯᱴᱮᱢᱵᱚᱨ ᱒᱐᱒᱖, ᱐᱒:᱐᱐ ᱴᱟᱲᱟᱝ',
    reporter: 'ᱵᱤᱨᱵᱚᱞ ᱢᱟᱦᱛᱳ',
    status: 'ROUTED_CIVIC',
    coordinates: { lat: 23.3468, lon: 85.3071 },
    description: 'ᱵᱮᱨ ᱵᱤᱡᱽᱞᱤ ᱵᱮᱴᱨᱤ ᱵᱟᱝ ᱪᱟᱨᱡᱚᱜ ᱠᱟᱱᱟ᱾ ᱟᱹᱭᱩᱵ ᱵᱮᱲᱟ ᱧᱩᱛ ᱛᱟᱦᱮᱸᱱ ᱠᱟᱱᱟ᱾',
    defectLabel: 'ᱵᱮᱴᱨᱤ ᱵᱟᱹᱲᱤᱡ',
  },
  {
    id: 'JAG-2026-RAN-0125',
    title: 'ᱪᱟᱥ ᱱᱟᱞᱟ ᱦᱟᱥᱟ ᱯᱮᱨᱮᱡ ᱟᱨ ᱪᱮᱠᱰᱮᱢ ᱫᱟᱜ ᱡᱚᱨᱚ',
    category: 'agriculture',
    distanceMeters: 620,
    similarityScore: 0.41,
    upvotes: 15,
    date: '᱐᱘ ᱥᱮᱯᱴᱮᱢᱵᱚᱨ ᱒᱐᱒᱖, ᱐᱙:᱔᱐ ᱴᱟᱲᱟᱝ',
    reporter: 'ᱢᱚᱝᱜᱽᱨᱟ ᱩᱨᱟᱶ',
    status: 'DYNAMIC_HACKATHON',
    coordinates: { lat: 23.3485, lon: 85.3142 },
    description: 'ᱪᱮᱠᱰᱮᱢ ᱠᱷᱚᱱ ᱫᱟᱜ ᱡᱚᱨᱚ ᱠᱟᱱᱟ, ᱪᱟᱥ ᱠᱟᱹᱢᱤ ᱨᱮ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ᱾',
    defectLabel: 'ᱪᱮᱠᱰᱮᱢ ᱡᱚᱨᱚ',
  },
];

export default function SpatialRadarMap({
  centerLocation,
  nearbyRadiusMeters = 500,
  challenges,
  currentPhotoPreview,
  onMergeUpvote,
  compact = false,
}: SpatialRadarMapProps) {
  const { currentLocation, language } = useCitizen();

  const effectiveLocation = centerLocation || currentLocation || {
    lat: 23.3441,
    lon: 85.3096,
    district: 'Ranchi',
    block: 'Kanke',
    panchayat: 'Kanke Panchayat',
  };

  const defaultList =
    language === 'hi'
      ? HINDI_CHALLENGES
      : language === 'sat'
      ? SANTHALI_CHALLENGES
      : ENGLISH_CHALLENGES;

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedChallenge, setSelectedChallenge] = useState<NearbyChallenge | null>(null);
  const [nearbyList, setNearbyList] = useState<NearbyChallenge[]>(challenges || defaultList);
  const [optimisticMergedIds, setOptimisticMergedIds] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (challenges) {
      setNearbyList(challenges);
    } else {
      setNearbyList(defaultList);
    }
  }, [challenges, defaultList]);

  const handleMergeAndUpvote = (challenge: NearbyChallenge) => {
    const currentUpvotes =
      optimisticMergedIds[challenge.id] !== undefined
        ? optimisticMergedIds[challenge.id]
        : challenge.upvotes;

    const newUpvotes = currentUpvotes + 1;
    setOptimisticMergedIds((prev) => ({
      ...prev,
      [challenge.id]: newUpvotes,
    }));

    setNearbyList((prev) =>
      prev.map((item) =>
        item.id === challenge.id
          ? { ...item, upvotes: newUpvotes, hasMerged: true }
          : item
      )
    );

    const msg =
      language === 'hi'
        ? `सफलतापूर्वक समर्थन दर्ज! टिकट ${challenge.id} का समर्थन किया गया (+१)`
        : language === 'sat'
        ? `ᱥᱟᱹᱛ ᱛᱮ ᱥᱚᱦᱚᱫ ᱮᱢ ᱮᱱᱟ! ᱴᱤᱠᱮᱴ ${challenge.id} ᱞᱟᱹᱜᱤᱫ (+᱑)`
        : `Successfully supported existing ticket ${challenge.id} (+1)`;

    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);

    if (onMergeUpvote) {
      onMergeUpvote({ ...challenge, upvotes: newUpvotes, hasMerged: true });
    }
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const centerCoord = { x: 400, y: 225 };
  const bufferRadiusPx = 130 * zoomLevel;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-950 select-none shadow-xl ${
        compact ? 'aspect-[16/10] max-h-[360px]' : 'aspect-[16/9] min-h-[440px]'
      }`}
    >
      {/* Interactive Canvas */}
      <div
        className="w-full h-full relative cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          setIsPanning(true);
          setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
        }}
        onMouseMove={(e) => {
          if (!isPanning) return;
          setPanOffset({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
        }}
        onMouseUp={() => setIsPanning(false)}
        onMouseLeave={() => setIsPanning(false)}
      >
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(37, 99, 235, 0.25)" />
              <stop offset="85%" stopColor="rgba(37, 99, 235, 0.08)" />
              <stop offset="100%" stopColor="rgba(37, 99, 235, 0)" />
            </radialGradient>
            <filter id="glowBlue">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="800" height="450" fill="#0b1120" />

          {/* Grid lines */}
          <g stroke="#1e293b" strokeWidth="0.8" opacity="0.6">
            <line x1="0" y1="75" x2="800" y2="75" />
            <line x1="0" y1="150" x2="800" y2="150" />
            <line x1="0" y1="225" x2="800" y2="225" stroke="#334155" strokeWidth="1.2" />
            <line x1="0" y1="300" x2="800" y2="300" />
            <line x1="0" y1="375" x2="800" y2="375" />
            <line x1="160" y1="0" x2="160" y2="450" />
            <line x1="320" y1="0" x2="320" y2="450" />
            <line x1="400" y1="0" x2="400" y2="450" stroke="#334155" strokeWidth="1.2" />
            <line x1="480" y1="0" x2="480" y2="450" />
            <line x1="640" y1="0" x2="640" y2="450" />
          </g>

          {/* Group with panOffset */}
          <g transform={`translate(${panOffset.x}, ${panOffset.y})`}>
            {/* Concentric radar rings */}
            <circle
              cx={centerCoord.x}
              cy={centerCoord.y}
              r={bufferRadiusPx * 0.2}
              fill="none"
              stroke="rgba(59, 130, 246, 0.25)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle
              cx={centerCoord.x}
              cy={centerCoord.y}
              r={bufferRadiusPx * 0.5}
              fill="none"
              stroke="rgba(59, 130, 246, 0.35)"
              strokeWidth="1"
              strokeDasharray="4 2"
            />

            {/* 500m Buffer Circle */}
            <circle
              cx={centerCoord.x}
              cy={centerCoord.y}
              r={bufferRadiusPx}
              fill="url(#radarSweep)"
              stroke="#3b82f6"
              strokeWidth="2"
              filter="url(#glowBlue)"
              className="transition-all duration-300"
            />

            {/* Rotating Radar Sweep */}
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
                stroke="rgba(96, 165, 250, 0.8)"
                strokeWidth="2"
              />
              <path
                d={`M ${centerCoord.x} ${centerCoord.y} L ${centerCoord.x + bufferRadiusPx} ${centerCoord.y} A ${bufferRadiusPx} ${bufferRadiusPx} 0 0 0 ${centerCoord.x + bufferRadiusPx * 0.866} ${centerCoord.y - bufferRadiusPx * 0.5} Z`}
                fill="rgba(59, 130, 246, 0.2)"
              />
            </g>

            {/* Range Annotations */}
            <text
              x={centerCoord.x + bufferRadiusPx * 0.5 + 4}
              y={centerCoord.y - 4}
              fill="rgba(147, 197, 253, 0.7)"
              fontSize="9"
              fontFamily="monospace"
            >
              250m
            </text>
            <text
              x={centerCoord.x + bufferRadiusPx + 4}
              y={centerCoord.y - 4}
              fill="#60a5fa"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              500m
            </text>

            {/* Center GPS User Pin */}
            <g transform={`translate(${centerCoord.x}, ${centerCoord.y})`}>
              <circle r="16" fill="rgba(37, 99, 235, 0.2)" className="animate-pulse" />
              <circle r="8" fill="rgba(37, 99, 235, 0.5)" />
              <circle r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />

              <rect
                x="-45"
                y="-32"
                width="90"
                height="16"
                rx="4"
                fill="#0f172a"
                stroke="#3b82f6"
                strokeWidth="1"
              />
              <text
                x="0"
                y="-21"
                fill="#93c5fd"
                fontSize="8.5"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {language === 'hi'
                  ? 'आप (वर्तमान जीपीएस)'
                  : language === 'sat'
                  ? 'ᱟᱢ (ᱱᱤᱛᱚᱜᱟᱜ ᱴᱷᱟᱶ)'
                  : 'YOU (Current GPS)'}
              </text>
            </g>

            {/* Nearby Challenge Markers */}
            {nearbyList.map((ch, idx) => {
              const angles = [35, 140, 245, 310, 80];
              const angleDeg = angles[idx % angles.length];
              const angleRad = (angleDeg * Math.PI) / 180;
              const normalizedDist = (ch.distanceMeters / 500) * bufferRadiusPx;
              const markerX = centerCoord.x + normalizedDist * Math.cos(angleRad);
              const markerY = centerCoord.y + normalizedDist * Math.sin(angleRad);

              const isWithinBuffer = ch.distanceMeters <= nearbyRadiusMeters;
              const isHighSimilarity = ch.similarityScore >= 0.85;
              const isSelected = selectedChallenge?.id === ch.id;

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
                  {isHighSimilarity && (
                    <circle
                      r={isSelected ? '22' : '16'}
                      fill="rgba(239, 68, 68, 0.2)"
                      className="animate-ping"
                      style={{ animationDuration: '2.5s' }}
                    />
                  )}

                  <circle
                    r={isSelected ? '14' : '11'}
                    fill={isHighSimilarity ? '#ef4444' : isWithinBuffer ? '#f59e0b' : '#64748b'}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-200 group-hover:scale-125"
                  />

                  <circle
                    r="4"
                    fill={isHighSimilarity ? '#ffffff' : '#0f172a'}
                  />

                  {/* Floating Distance & Match */}
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

        {/* Zoom Controls */}
        <div className="absolute top-3 right-3 z-10 flex flex-col space-y-1.5">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(2, Number((z + 0.25).toFixed(2))))}
            className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center text-xs shadow-md transition-all active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))))}
            className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center text-xs shadow-md transition-all active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center text-xs shadow-md transition-all active:scale-95"
            title="Reset to Center"
          >
            <RotateCcw className="w-4 h-4 text-blue-400" />
          </button>
        </div>

        {/* Buffer Status Floating Pill */}
        <div className="absolute bottom-3 left-3 z-10 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-500/30 text-[11px] text-slate-300 flex items-center space-x-2 shadow-lg max-w-[280px] sm:max-w-none">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <div>
            <span className="font-semibold text-blue-400">
              {language === 'hi' ? 'स्वचालित मिलान:' : language === 'sat' ? 'ᱟᱡ ᱛᱮ ᱢᱤᱞᱟᱹᱣ:' : 'Deduplication Active:'}
            </span>{' '}
            <span className="text-[10px] text-slate-300">
              {language === 'hi'
                ? '५०० मीटर के भीतर समान समस्याओं का एकीकरण।'
                : language === 'sat'
                ? '᱕᱐᱐ ᱢᱤᱴᱚᱨ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱢᱤᱫ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱦᱩᱭᱩᱜᱼᱟ᱾'
                : 'Matches within 500m merge into primary ticket.'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center space-x-2 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />{' '}
            {language === 'hi' ? 'समान समस्या' : language === 'sat' ? 'ᱢᱤᱫ ᱞᱮᱠᱟᱱ' : 'High Match'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />{' '}
            {language === 'hi' ? 'आंशिक मिलान' : language === 'sat' ? 'ᱟᱫᱷᱟ ᱢᱤᱫ' : 'Partial Overlap'}
          </span>
        </div>
      </div>

      {/* Instant Toast */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-blue-950/95 text-blue-100 border-2 border-blue-500/80 px-4 py-2 rounded-xl text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top duration-300 max-w-[90%] text-center">
          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Comparison Drawer */}
      {selectedChallenge && (
        <div className="relative z-30 border-t border-slate-800 bg-slate-900/98 backdrop-blur-lg p-4 sm:p-5 text-white animate-in slide-in-from-bottom duration-300 space-y-4">
          <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                  {selectedChallenge.id}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>
                    {language === 'hi'
                      ? `आपके स्थान से ${selectedChallenge.distanceMeters} मीटर दूर`
                      : language === 'sat'
                      ? `ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱠᱷᱚᱱ ${selectedChallenge.distanceMeters} ᱢᱤᱴᱚᱨ`
                      : `${selectedChallenge.distanceMeters}m away from your GPS`}
                  </span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  {language === 'hi' ? 'स्थिति: सक्रिय' : language === 'sat' ? 'ᱦᱟᱞᱚᱛ: ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ' : 'Status: Active'}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {selectedChallenge.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setSelectedChallenge(null)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  {language === 'hi'
                    ? 'पूर्व दर्ज समस्या फ़ोटो'
                    : language === 'sat'
                    ? 'ᱞᱟᱦᱟ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ'
                    : 'Original Ticket Evidence'}
                </span>
                <span className="text-[10px] text-slate-400">{selectedChallenge.date}</span>
              </div>

              <div className="relative h-28 bg-slate-800/60 rounded-lg overflow-hidden flex flex-col items-center justify-center border border-slate-700/60">
                <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950/40 flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-xs font-mono text-slate-300">
                    {selectedChallenge.defectLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    {language === 'hi' ? 'दर्जकर्ता: ' : language === 'sat' ? 'ᱚᱞᱤᱡ: ' : 'Reported by: '}
                    {selectedChallenge.reporter}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'hi'
                    ? 'आपकी वर्तमान फ़ोटो / पिन'
                    : language === 'sat'
                    ? 'ᱟᱢᱟᱜ ᱱᱤᱛᱚᱜᱟᱜ ᱪᱤᱛᱟᱹᱨ'
                    : 'Your Current Upload / Live Pin'}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {language === 'hi' ? 'अभी' : language === 'sat' ? 'ᱱᱤᱛ' : 'Just Now'}
                </span>
              </div>

              <div className="relative h-28 bg-slate-800/60 rounded-lg overflow-hidden flex flex-col items-center justify-center border border-slate-700/60">
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
                    <span className="text-xs text-amber-200 font-medium">
                      {language === 'hi' ? 'वर्तमान समस्या फ़ोटो' : language === 'sat' ? 'ᱱᱤᱛᱚᱜᱟᱜ ᱪᱤᱛᱟᱹᱨ' : 'Current Grievance Evidence'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {effectiveLocation.district}, {effectiveLocation.block}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Similarity Progress */}
          <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-slate-200">
                  {language === 'hi'
                    ? 'स्थान एवं समस्या समानता'
                    : language === 'sat'
                    ? 'ᱴᱷᱟᱶ ᱟᱨ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱢᱤᱫ'
                    : 'Semantic & Spatial Similarity'}
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

            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className={`h-full transition-all duration-700 rounded-full ${
                  selectedChallenge.similarityScore >= 0.85
                    ? 'bg-gradient-to-r from-blue-500 to-emerald-400'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                }`}
                style={{ width: `${Math.round(selectedChallenge.similarityScore * 100)}%` }}
              />
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-sm z-10"
                style={{ left: '85%' }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => handleMergeAndUpvote(selectedChallenge)}
              disabled={selectedChallenge.hasMerged || Boolean(optimisticMergedIds[selectedChallenge.id])}
              className={`w-full sm:flex-1 py-3.5 px-4 min-h-[48px] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 ${
                selectedChallenge.hasMerged || optimisticMergedIds[selectedChallenge.id]
                  ? 'bg-emerald-800 text-emerald-100 cursor-not-allowed border border-emerald-600'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/50'
              }`}
            >
              {selectedChallenge.hasMerged || optimisticMergedIds[selectedChallenge.id] ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>
                    {language === 'hi'
                      ? 'समर्थन दर्ज (+१) • पूर्व समस्या का समर्थन किया गया'
                      : language === 'sat'
                      ? 'ᱥᱚᱦᱚᱫ ᱮᱢ ᱮᱱᱟ (+᱑)'
                      : 'Supported (+1) • Existing Ticket Supported'}
                  </span>
                </>
              ) : (
                <>
                  <ThumbsUp className="w-4 h-4 text-amber-300" />
                  <span>
                    {language === 'hi'
                      ? 'इस समस्या का समर्थन करें (+१)'
                      : language === 'sat'
                      ? 'ᱱᱚᱶᱟ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱥᱚᱦᱚᱫ ᱮᱢ ᱢᱮ (+᱑)'
                      : 'Support This Existing Report (+1)'}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSelectedChallenge(null)}
              className="w-full sm:w-auto py-3 px-4 min-h-[48px] rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 flex items-center justify-center"
            >
              {language === 'hi' ? 'बंद करें' : language === 'sat' ? 'ᱵᱚᱸᱫᱽ ᱢᱮ' : 'Close Details'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
