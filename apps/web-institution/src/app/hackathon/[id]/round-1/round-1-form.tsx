"use client";
import { useState } from "react";
import { Upload, Video, CheckCircle2, AlertTriangle } from "lucide-react";

const MAX_MB = 10;

export function isVideoUrl(v: string): boolean {
  if (!v.trim()) return false;
  try {
    const u = new URL(v.trim());
    const h = u.hostname.toLowerCase();
    return h.includes("youtube.com") || h.includes("youtu.be") || h.includes("loom.com") || h.includes("vimeo.com");
  } catch {
    return false;
  }
}

export default function Round1Form({ ticketId, onToast }: { ticketId: string; onToast: (m: string) => void }) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileErr, setFileErr] = useState<string | null>(null);
  const [video, setVideo] = useState("");
  const [narrative, setNarrative] = useState("");

  function onFile(f: File | undefined) {
    setFileErr(null);
    if (!f) return;
    if (f.type !== "application/pdf") {
      setFileErr("Only PDF pitch decks are accepted.");
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setFileErr(`Deck exceeds 10 MB (got ${(f.size / 1048576).toFixed(1)} MB). Compress to max 5 slides.`);
      return;
    }
    setFileName(`${f.name} (${(f.size / 1048576).toFixed(2)} MB)`);
  }

  const videoOk = isVideoUrl(video);
  const ready = !!fileName && !fileErr && videoOk && narrative.trim().length >= 40;

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
      <h3 className="flex items-center gap-1.5 text-sm font-bold"><Upload className="h-4 w-4" /> PDF Pitch Deck (max 5 slides, 10 MB)</h3>
      <label className="mt-3 block cursor-pointer rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center hover:border-[#4F46E5]">
        <input type="file" accept="application/pdf" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
        <span className="text-sm font-semibold text-slate-800">Click to upload PDF</span>
        <span className="mt-1 block text-xs text-slate-500">Client-validated: PDF only, max 10 MB, confirm 5-slide count</span>
      </label>
      {fileName && !fileErr && <p role="status" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-800"><CheckCircle2 className="h-3.5 w-3.5" />{fileName}</p>}
      {fileErr && <p role="alert" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-red-700"><AlertTriangle className="h-3.5 w-3.5" />{fileErr}</p>}
      <div className="mt-4">
        <label htmlFor="r1-video" className="flex items-center gap-1.5 text-sm font-bold"><Video className="h-4 w-4" /> 2-min video (YouTube / Loom)</label>
        <input id="r1-video" value={video} onChange={(e) => setVideo(e.target.value)} placeholder="https://loom.com/share/… or https://youtu.be/…" className="mt-2 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-[#4F46E5]" />
        {video && !videoOk && <p role="alert" className="mt-1 text-xs font-semibold text-red-700">Enter a valid YouTube / youtu.be / Loom / Vimeo link.</p>}
        {videoOk && <p role="status" className="mt-1 text-xs font-semibold text-emerald-800">Video link looks valid.</p>}
      </div>
      <div className="mt-4">
        <label htmlFor="r1-narrative" className="text-sm font-bold">Approach narrative (min 40 chars)</label>
        <textarea id="r1-narrative" value={narrative} onChange={(e) => setNarrative(e.target.value)} rows={4} placeholder="Problem, local insight, method, 14-day test plan…" className="mt-2 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-[#4F46E5]" />
      </div>
      <button disabled={!ready} onClick={() => onToast(`Round 1 locked for ${ticketId}. Deck + video queued for shortlisting.`)} className="mt-4 w-full rounded-lg bg-[#044728] px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300">
        Submit Round 1 entry
      </button>
    </div>
  );
}
