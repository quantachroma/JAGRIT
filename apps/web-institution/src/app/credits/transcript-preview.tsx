"use client";
export default function TranscriptPreview(p: { name: string; apaar: string; courseCode: string; courseTitle: string; hours: number; credits: number; ticket: string; pi: string; checksum: string }) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#044728]">
      <div className="bg-[#044728] px-4 py-3 text-center text-white">
        <p className="text-[11px] uppercase tracking-widest text-emerald-200">Government of Jharkhand · DHTE</p>
        <p className="text-base font-bold">DigiLocker / APAAR Academic Transcript</p>
        <p className="text-[11px] text-emerald-100">National Academic Depository · Academic Bank of Credits</p>
      </div>
      <div className="bg-white p-4 text-sm">
        <div className="flex items-center justify-between gap-2">
          <p className="font-bold">{p.name}</p>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-bold text-[#044728]">Faculty verified</span>
        </div>
        <p className="mt-1 text-xs text-slate-600">APAAR ID: {p.apaar} · Project {p.ticket} · PI {p.pi}</p>
        <div className="mt-3 rounded-lg border p-3">
          <p className="text-xs font-semibold text-slate-500">Course mapping</p>
          <p className="font-bold">{p.courseTitle} (Course Code: {p.courseCode})</p>
          <p className="mt-1 text-xs text-slate-600">{p.hours} verified hours → <span className="font-bold text-[#044728]">{p.credits} Credits</span> (NCrF 30 hrs = 1)</p>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Seal: DHTE Jharkhand</span><span>Checksum {p.checksum}</span>
        </div>
      </div>
    </div>
  );
}
