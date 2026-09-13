"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ShieldCheck, Building2, Landmark, FolderLock, FlaskConical, Rocket, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import type { UserRole } from "@jagrit/contracts";

const ALLOWED = ["bitmesra.ac.in", "nitjsr.ac.in", "iitism.ac.in"];
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@(bitmesra\.ac\.in|nitjsr\.ac\.in|iitism\.ac\.in)$/;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function save(name: string, role: UserRole, mail: string) {
    try { localStorage.setItem("jagrit-institution-session", JSON.stringify({ name, role, email: mail, ts: new Date().toISOString() })); } catch {}
  }
  function sso(e: React.FormEvent) {
    e.preventDefault(); setError(null); setNotice(null);
    const v = email.trim().toLowerCase();
    if (!EMAIL_RE.test(v)) { setError(`Use institutional email (${ALLOWED.map((d) => "@" + d).join(", ")}).`); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters (SSO mock)."); return; }
    save(v.split("@")[0], "FACULTY_PI", v);
    setNotice("SSO verified. Redirecting to Discovery Feed…");
    setTimeout(() => router.push("/dashboard"), 450);
  }
  function demo(name: string, role: UserRole, mail: string) {
    save(name, role, mail);
    setNotice(`Signed in as ${name}. Opening Discovery Feed…`);
    setTimeout(() => router.push("/dashboard"), 350);
  }
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#4F46E5]">
            <Building2 className="h-3.5 w-3.5" /> Institutional SSO Portal
          </p>
          <h1 className="mt-3 text-2xl font-bold text-[#0F172A]">Academic Auth</h1>
          <p className="mt-1 text-sm text-slate-600">Only @bitmesra.ac.in, @nitjsr.ac.in, @iitism.ac.in accepted.</p>
          <form onSubmit={sso} className="mt-5 space-y-3" noValidate>
            <label className="block">
              <span className="text-xs font-semibold text-slate-700">Institutional email</span>
              <span className="mt-1 flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-3 py-2 focus-within:border-[#4F46E5]">
                <Mail className="h-4 w-4 text-slate-400" />
                <input type="email" placeholder="you@bitmesra.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
              </span>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-700">SSO password</span>
              <span className="mt-1 flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-3 py-2 focus-within:border-[#4F46E5]">
                <Lock className="h-4 w-4 text-slate-400" />
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
              </span>
            </label>
            {error && (<p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>)}
            {notice && (<p role="status" className="flex items-start gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-800"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />{notice}</p>)}
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
              <ShieldCheck className="h-4 w-4" /> Login with Institutional SSO
            </button>
          </form>
          <div className="mt-5 border-t border-dashed border-[#E2E8F0] pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Federated login</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <button onClick={() => setNotice("Redirecting to Jan Parichay (Govt SSO)… (mock)")} className="flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100">
                <Landmark className="h-4 w-4 text-[#1E3A8A]" /> Login via Jan Parichay (Govt SSO)
              </button>
              <button onClick={() => setNotice("Redirecting to NAD / DigiLocker… (mock)")} className="flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100">
                <FolderLock className="h-4 w-4 text-[#2563EB]" /> National Academic Depository (NAD / DigiLocker)
              </button>
            </div>
          </div>
        </section>
        <aside className="flex flex-col gap-4">
          <section className="rounded-2xl border border-blue-900/20 bg-[#1E3A8A] p-6 text-white shadow-sm">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"><Rocket className="h-3.5 w-3.5 text-sky-300" /> Instant Demo Quick-Login</p>
            <h2 className="mt-2 text-lg font-bold">Skip the IdP for the demo</h2>
            <div className="mt-4 space-y-2">
              <button onClick={() => demo("Dr. R. K. Verma", "FACULTY_PI", "rk.verma@bitmesra.ac.in")} className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-left text-slate-900 hover:bg-blue-50">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F172A] text-white"><FlaskConical className="h-4 w-4" /></span>
                <span><span className="block text-sm font-semibold">Demo as Faculty PI (Dr. Verma)</span><span className="block text-xs text-slate-500">rk.verma@bitmesra.ac.in</span></span>
              </button>
              <button onClick={() => demo("Ananya Sharma", "STUDENT", "ananya.s23@bitmesra.ac.in")} className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-left text-slate-900 hover:bg-blue-50">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F172A] text-white"><GraduationCap className="h-4 w-4" /></span>
                <span><span className="block text-sm font-semibold">Demo as Student Lead (Ananya Sharma)</span><span className="block text-xs text-slate-500">ananya.s23@bitmesra.ac.in</span></span>
              </button>
            </div>
          </section>
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 text-xs leading-relaxed text-slate-600">
            <p className="font-semibold text-slate-800">Why institutional SSO?</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Binds every bid to verifiable faculty / student identity.</li>
              <li>NAD / DigiLocker verifies degrees; Jan Parichay verifies govt affiliation.</li>
              <li>APAAR IDs validated again during team nomination.</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

