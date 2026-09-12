'use client';

import React, { useState } from 'react';
import { Camera, Scan, CheckCircle, AlertCircle } from 'lucide-react';

interface CVLaserScannerProps {
  onScanComplete?: (defectDetected: boolean, label: string) => void;
}

export default function CVLaserScanner({ onScanComplete }: CVLaserScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ detected: boolean; label: string; confidence: number } | null>(null);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const res = {
        detected: true,
        label: 'Subsurface Pipe Corrosion / Silt Blockage',
        confidence: 0.94,
      };
      setScanResult(res);
      if (onScanComplete) {
        onScanComplete(res.detected, res.label);
      }
    }, 1800);
  };

  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
          <Scan className="w-4 h-4 text-[#044728]" />
          <span>CV Visual Defect Inspector</span>
        </h4>
        <button
          type="button"
          onClick={simulateScan}
          disabled={scanning}
          className="bg-[#044728] hover:bg-[#03361e] text-white text-[11px] font-semibold px-3 py-1.5 rounded transition-all disabled:opacity-50"
        >
          {scanning ? 'Scanning...' : 'Simulate CV Scan'}
        </button>
      </div>

      {scanResult && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-[#044728] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{scanResult.label}</p>
            <p className="text-[11px] text-emerald-700">Confidence: {(scanResult.confidence * 100).toFixed(0)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

