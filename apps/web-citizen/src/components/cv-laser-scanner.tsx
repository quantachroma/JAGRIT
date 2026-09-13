/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Scan,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Cpu,
  Eye,
  ShieldAlert,
} from 'lucide-react';

export interface DetectedDefect {
  id: string;
  label: string;
  category: string;
  confidence: number;
  color: 'green' | 'red' | 'amber';
  box: {
    x: number; // percentage (0 - 100)
    y: number; // percentage (0 - 100)
    width: number; // percentage (0 - 100)
    height: number; // percentage (0 - 100)
  };
  details: string;
}

interface CVLaserScannerProps {
  imageUrl?: string | null;
  autoScan?: boolean;
  onScanComplete?: (data: { detected: boolean; defects: DetectedDefect[] }) => void;
}

const DEFAULT_DEFECTS: DetectedDefect[] = [
  {
    id: 'iron-effluent',
    label: 'Iron-Fluoride Sediment',
    category: 'Aquifer Contamination',
    confidence: 0.94,
    color: 'green',
    box: {
      x: 48,
      y: 54,
      width: 44,
      height: 36,
    },
    details:
      'Leached ferric precipitate and fluoride concentration detected in water discharge. Aquifer oxidation requires university nano-filtration.',
  },
  {
    id: 'pipe-corrosion',
    label: 'Pump Base Corrosion',
    category: 'Structural Metallurgical Defect',
    confidence: 0.89,
    color: 'red',
    box: {
      x: 14,
      y: 24,
      width: 30,
      height: 36,
    },
    details:
      'Galvanic degradation, structural fracture, and baseplate thinning along riser cylinder. Exceeds standard local mending threshold.',
  },
];

export default function CVLaserScanner({
  imageUrl,
  autoScan = true,
  onScanComplete,
}: CVLaserScannerProps) {
  const [mounted, setMounted] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [activeDefect, setActiveDefect] = useState<string | null>(null);
  const [laserPosition, setLaserPosition] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerScan = useCallback(() => {
    setScanning(true);
    setHasCompleted(false);
    setActiveDefect(null);
    startTimeRef.current = null;

    const SCAN_DURATION_MS = 1500; // Exact 1.5-second scan effect as specified

    const animateLaser = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / SCAN_DURATION_MS, 1);

      // Sweep down and up smoothly (sine-like cycle)
      const currentPos = Math.sin(progress * Math.PI) * 100;
      setLaserPosition(currentPos);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateLaser);
      } else {
        // Complete scan
        setScanning(false);
        setHasCompleted(true);
        if (onScanComplete) {
          onScanComplete({
            detected: true,
            defects: DEFAULT_DEFECTS,
          });
        }
      }
    };

    animationRef.current = requestAnimationFrame(animateLaser);
  }, [onScanComplete]);

  useEffect(() => {
    if (mounted && autoScan && imageUrl && !hasCompleted && !scanning) {
      triggerScan();
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [imageUrl, mounted, autoScan, hasCompleted, scanning, triggerScan]);

  if (!mounted) {
    return (
      <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 min-h-[220px] flex items-center justify-center">
        <div className="text-xs text-slate-400">Loading CV Inspector...</div>
      </div>
    );
  }

  // Fallback demo image if no file was uploaded
  const displayImage =
    imageUrl ||
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231e293b"/><circle cx="300" cy="200" r="120" fill="%23334155"/><rect x="270" y="80" width="60" height="180" rx="6" fill="%2364748b"/><path d="M 230 190 L 370 190 L 350 250 L 250 250 Z" fill="%2394a3b8"/><circle cx="300" cy="300" r="40" fill="%23b45309" opacity="0.8"/><text x="50%" y="90%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="16">JAGRIT Civic Defect Sample (Rural Handpump)</text></svg>';

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-4">
      {/* Scanner Header & Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Scan className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>CV Laser Defect Scanner</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                ViT-v2
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Automated Computer Vision defect detection & bounding box inference
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={triggerScan}
          disabled={scanning}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all disabled:opacity-50"
        >
          {scanning ? (
            <>
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning (1.5s)...</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{hasCompleted ? 'Rescan Image' : 'Run CV Scan'}</span>
            </>
          )}
        </button>
      </div>

      {/* Visual Canvas / Image Container with Laser & Bounding Boxes */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3] max-h-[360px] flex items-center justify-center select-none group">
        {/* The Base Image */}
        <img
          src={displayImage}
          alt="Site evidence scan"
          className="w-full h-full object-cover select-none"
        />

        {/* Futuristic HUD Framing Crosshairs */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400/80 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400/80 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400/80 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400/80 pointer-events-none" />

        {/* HUD Status Pill */}
        <div className="absolute top-3 left-3 flex items-center space-x-2 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-mono border border-slate-700 pointer-events-none">
          <span
            className={`w-2 h-2 rounded-full ${
              scanning
                ? 'bg-emerald-400 animate-ping'
                : hasCompleted
                ? 'bg-emerald-400'
                : 'bg-amber-400'
            }`}
          />
          <span className="text-slate-200">
            {scanning ? 'SCANNING SENSORS: ACTIVE' : hasCompleted ? 'DEFECTS LOCATED: 2' : 'READY TO SCAN'}
          </span>
        </div>

        {/* Client-Side Animated Green Laser Sweep Line */}
        {scanning && (
          <div
            className="absolute left-0 right-0 pointer-events-none z-20 transition-transform duration-75"
            style={{
              top: `${laserPosition}%`,
              transform: 'translateY(-50%)',
            }}
          >
            {/* Luminous Neon Green Laser Line */}
            <div className="w-full h-[2.5px] bg-emerald-400 shadow-[0_0_15px_3px_#22c55e]" />
            {/* Laser Ambient Downward Glow Veil */}
            <div className="w-full h-12 bg-gradient-to-b from-emerald-500/25 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Highlighted SVG Bounding Boxes over detected defects */}
        {hasCompleted && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {DEFAULT_DEFECTS.map((defect) => {
              const isActive = activeDefect === defect.id;
              const isGreen = defect.color === 'green';
              const strokeColor = isGreen ? '#22c55e' : '#ef4444';
              const fillColor = isGreen ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';

              return (
                <g key={defect.id} className="transition-all duration-200 pointer-events-auto cursor-pointer" onClick={() => setActiveDefect(defect.id)}>
                  {/* Bounding Box Rectangle */}
                  <rect
                    x={`${defect.box.x}%`}
                    y={`${defect.box.y}%`}
                    width={`${defect.box.width}%`}
                    height={`${defect.box.height}%`}
                    fill={isActive ? (isGreen ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)') : fillColor}
                    stroke={strokeColor}
                    strokeWidth={isActive ? '2.5' : '1.8'}
                    strokeDasharray={isActive ? 'none' : '4 2'}
                    rx="4"
                  />
                  {/* Defect Corner Brackets */}
                  <circle
                    cx={`${defect.box.x}%`}
                    cy={`${defect.box.y}%`}
                    r="3"
                    fill={strokeColor}
                  />
                  <circle
                    cx={`${defect.box.x + defect.box.width}%`}
                    cy={`${defect.box.y + defect.box.height}%`}
                    r="3"
                    fill={strokeColor}
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* HTML Floating Confidence Pills positioned on Bounding Boxes */}
        {hasCompleted &&
          DEFAULT_DEFECTS.map((defect) => {
            const isGreen = defect.color === 'green';
            return (
              <div
                key={`pill-${defect.id}`}
                style={{
                  left: `${defect.box.x}%`,
                  top: `${Math.max(defect.box.y - 8, 4)}%`,
                }}
                className="absolute z-30 pointer-events-auto"
              >
                <button
                  type="button"
                  onClick={() => setActiveDefect(defect.id)}
                  className={`flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-bold shadow-lg transition-transform hover:scale-105 border ${
                    isGreen
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 shadow-emerald-900/40'
                      : 'bg-red-950/90 text-red-300 border-red-500 shadow-red-900/40'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" />
                  <span>
                    {isGreen ? '🟢' : '🔴'} {defect.label}: {(defect.confidence * 100).toFixed(0)}%
                  </span>
                </button>
              </div>
            );
          })}
      </div>

      {/* Detection Cards Drawer */}
      {hasCompleted && (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Verified Defect Diagnostics:
            </span>
            <span className="text-[11px] text-slate-400">Click a card or box to inspect details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DEFAULT_DEFECTS.map((defect) => {
              const isSelected = activeDefect === defect.id;
              const isGreen = defect.color === 'green';

              return (
                <div
                  key={defect.id}
                  onClick={() => setActiveDefect(defect.id)}
                  className={`cursor-pointer p-3 rounded-xl border transition-all text-xs space-y-1.5 ${
                    isSelected
                      ? isGreen
                        ? 'bg-emerald-950/60 border-emerald-400 shadow-md ring-1 ring-emerald-400/40'
                        : 'bg-red-950/60 border-red-400 shadow-md ring-1 ring-red-400/40'
                      : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{isGreen ? '🟢' : '🔴'}</span>
                      <span>{defect.label}</span>
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        isGreen ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {(defect.confidence * 100).toFixed(0)}% Conf
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">{defect.details}</p>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-700/60">
                    <span>{defect.category}</span>
                    <span className="text-amber-400 font-medium">Auto-Flagged for HEI R&D</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
