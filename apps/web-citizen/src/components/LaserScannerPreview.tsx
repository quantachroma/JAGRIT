/* eslint-disable @next/next/no-img-element */
'use client';

import { DragEvent, useEffect, useRef, useState } from 'react';
import { Camera, CheckCircle2, FileImage, Loader2, ScanLine } from 'lucide-react';

export interface ScannerDefect { id: string; label: string; category: string; confidence: number; box: { x: number; y: number; width: number; height: number }; details: string; }
interface LaserScannerPreviewProps { language?: 'en' | 'hi' | 'sat'; onFileReady?: (file: File, previewUrl: string, stats: { originalSizeKb: number; compressedSizeKb: number; ratio: number }) => void; onScanComplete?: (data: { detected: boolean; defects: ScannerDefect[] }) => void; }

const defects: ScannerDefect[] = [
  { id: 'water', label: 'Water Contamination', category: 'Visual Defect Analysis', confidence: .94, box: { x: 46, y: 50, width: 42, height: 36 }, details: 'Possible sediment and contamination signature.' },
  { id: 'structure', label: 'Structural Failure', category: 'Visual Defect Analysis', confidence: .89, box: { x: 14, y: 24, width: 30, height: 34 }, details: 'Possible corrosion or structural fracture.' },
];

async function compressToWebp(file: File, limitBytes = 500 * 1024): Promise<File> {
  const sourceUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => { const element = new Image(); element.onload = () => resolve(element); element.onerror = reject; element.src = sourceUrl; });
    let width = image.naturalWidth;
    let height = image.naturalHeight;
    const canvas = document.createElement('canvas');
    for (let attempt = 0; attempt < 12; attempt += 1) {
      canvas.width = width; canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas is unavailable.');
      context.drawImage(image, 0, 0, width, height);
      for (const quality of [.86, .7, .55, .4, .25, .1]) {
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
        if (blob && blob.type === 'image/webp' && blob.size <= limitBytes) return new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.webp', { type: 'image/webp', lastModified: Date.now() });
      }
      width = Math.max(320, Math.floor(width * .78));
      height = Math.max(240, Math.floor(height * .78));
    }
    throw new Error('Image could not be compressed below 500 KB.');
  } finally { URL.revokeObjectURL(sourceUrl); }
}

export default function LaserScannerPreview({ language = 'en', onFileReady, onScanComplete }: LaserScannerPreviewProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [laserPosition, setLaserPosition] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const handleFile = async (file?: File) => {
    if (!file?.type.startsWith('image/')) return;
    setError(null); setScanning(true);
    try {
      const compressed = await compressToWebp(file);
      const url = URL.createObjectURL(compressed);
      setPreviewUrl((previous) => { if (previous) URL.revokeObjectURL(previous); return url; });
      onFileReady?.(compressed, url, { originalSizeKb: Math.round(file.size / 1024), compressedSizeKb: Math.round(compressed.size / 1024), ratio: Math.max(0, Math.round((1 - compressed.size / file.size) * 100)) });
      let started = 0;
      const animate = (timestamp: number) => { if (!started) started = timestamp; const progress = Math.min((timestamp - started) / 1600, 1); setLaserPosition(progress * 100); if (progress < 1) requestAnimationFrame(animate); else { setScanning(false); onScanComplete?.({ detected: true, defects }); } };
      requestAnimationFrame(animate);
    } catch (compressionError) { setError(compressionError instanceof Error ? compressionError.message : 'Image compression failed.'); setScanning(false); }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); void handleFile(event.dataTransfer.files[0]); };
  const labels = language === 'hi' ? { replace: 'स्थल फ़ोटो बदलें', upload: 'फ़ोटो लें या चित्र यहां डालें', hint: 'JPEG/PNG को WebP में बदला जाएगा, अधिकतम ५०० केबी', running: 'दृश्य विश्लेषण जारी', complete: 'विश्लेषण पूर्ण', ready: 'फ़ोटो ५०० केबी से कम अपलोड के लिए तैयार है', alt: 'स्थल प्रमाण फ़ोटो' } : language === 'sat' ? { replace: 'ᱴᱷᱟᱶ ᱪᱤᱛᱟᱹᱨ ᱵᱚᱫᱚᱞ ᱢᱮ', upload: 'ᱪᱤᱛᱟᱹᱨ ᱟᱹᱜᱩᱭ ᱢᱮ', hint: 'JPEG/PNG WebP ᱨᱮ ᱵᱚᱫᱚᱞ, ᱵᱟᱹᱲᱛᱤ ᱕᱐᱐ KB', running: 'ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱪᱟᱞᱟᱜ', complete: 'ᱧᱮᱞ ᱥᱟᱹᱛ', ready: 'ᱪᱤᱛᱟᱹᱨ ᱕᱐᱐ KB ᱠᱷᱚᱱ ᱠᱟᱹᱴᱤᱡ ᱥᱮᱫ ᱟᱠᱟᱱᱟ', alt: 'ᱴᱷᱟᱶ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ' } : { replace: 'Replace site photo', upload: 'Take a photo or drop an image here', hint: 'JPEG/PNG converted to WebP, maximum 500 KB', running: 'Visual analysis running', complete: 'Analysis complete', ready: 'Client compressed and ready for upload under 500 KB', alt: 'Uploaded site evidence' };
  return <div className="space-y-3">
    <div onDrop={handleDrop} onDragOver={(event) => event.preventDefault()} className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-5 text-center">
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/*" capture="environment" onChange={(event) => void handleFile(event.target.files?.[0])} className="hidden" />
      <button type="button" onClick={() => inputRef.current?.click()} className="mx-auto flex flex-col items-center gap-2 text-sm font-black text-slate-800"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white"><Camera className="h-6 w-6" /></span><span>{previewUrl ? labels.replace : labels.upload}</span><span className="text-xs font-medium text-slate-500">{labels.hint}</span></button>
    </div>
    {error && <p role="alert" className="text-xs font-bold text-red-700">{error}</p>}
    {previewUrl && <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-950"><img src={previewUrl} alt={labels.alt} className="h-full w-full object-cover" />{scanning && <div className="absolute left-0 right-0 z-20 h-1 bg-emerald-300 shadow-[0_0_20px_6px_#10b981]" style={{ top: `${laserPosition}%` }} />}<div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-slate-950/80 px-2.5 py-1.5 text-[11px] font-bold text-emerald-200">{scanning ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />} {scanning ? labels.running : labels.complete}</div><svg className="absolute inset-0 h-full w-full">{!scanning && defects.map((defect) => <g key={defect.id}><rect x={`${defect.box.x}%`} y={`${defect.box.y}%`} width={`${defect.box.width}%`} height={`${defect.box.height}%`} fill="rgba(16,185,129,.14)" stroke="#34d399" strokeWidth="2" strokeDasharray="6 4" /><foreignObject x={`${defect.box.x}%`} y={`${Math.max(defect.box.y - 11, 2)}%`} width="220" height="30"><div className="rounded bg-emerald-950/90 px-2 py-1 text-[10px] font-bold text-emerald-200">{defect.label} · {(defect.confidence * 100).toFixed(0)}%</div></foreignObject></g>)}</svg></div>}
    {previewUrl && <div className="flex items-center gap-2 text-xs font-bold text-emerald-800"><FileImage className="h-4 w-4" /> {labels.ready} <ScanLine className="ml-auto h-4 w-4" /></div>}
  </div>;
}