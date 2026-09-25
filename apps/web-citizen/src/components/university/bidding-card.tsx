"use client";

import { useEffect, useState, type FormEvent } from "react";
import Modal from "./modal";
import { STRINGS, num, type Lang } from "./i18n";

/** T_bid = max(3, ceil(10 * (1 - MPS / 100))) — dynamic acceptance window in days. */
export const computeBidWindowDays = (mps: number): number =>
  Math.max(3, Math.ceil(10 * (1 - mps / 100)));

// Demo: 3 days 14 hours left to accept (per Stage 1 brief).
const DEMO_REMAINING_MS = ((3 * 24) + 14) * 60 * 60 * 1000;
const TICKET_ID = "#JAG-PLM-0082";

function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(() => Math.max(0, targetMs - Date.now()));
  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, targetMs - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    expired: remaining <= 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (v: number) => String(v).padStart(2, "0");
const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]";
const primaryBtn =
  "rounded-lg bg-[#044728] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#03331d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#044728] focus-visible:ring-offset-2";
const secondaryBtn =
  "rounded-lg border border-[#1D4ED8] bg-white px-4 py-2.5 text-sm font-semibold text-[#1D4ED8] hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-2";
const ghostBtn =
  "rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]";

/* ---------------------------- Solo acceptance modal ---------------------------- */

function SoloForm({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const t = STRINGS[lang].solo;
  const [faculty, setFaculty] = useState("");
  const [ids, setIds] = useState<string[]>(["", "", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const facultyErr = submitted && faculty.trim() === "";
  const idErr = (v: string) => submitted && !/^\d{12}$/.test(v.trim());

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const valid = faculty.trim() !== "" && ids.every((v) => /^\d{12}$/.test(v.trim()));
    if (valid) setDone(true); // Mock only: no endpoint exists for bids in packages/contracts yet.
  };

  if (done) {
    return (
      <div>
        <p className="font-semibold text-[#044728]">{t.doneTitle}</p>
        <p className="mt-1 text-sm text-slate-700">{t.doneBody}</p>
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={onClose} className={primaryBtn}>
            {STRINGS[lang].close}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <p className="text-sm text-slate-600">{t.intro}</p>

      <div className="mt-4">
        <label className="block text-sm font-medium text-[#0F172A]" htmlFor="pi-name">
          {t.facultyLabel}
        </label>
        <input
          id="pi-name"
          className={inputClass}
          value={faculty}
          placeholder={t.facultyPlaceholder}
          aria-invalid={facultyErr}
          onChange={(e) => setFaculty(e.target.value)}
        />
        {facultyErr && <p className="mt-1 text-xs text-red-700">{t.errRequired}</p>}
      </div>

      {ids.map((value, i) => (
        <div className="mt-3" key={i}>
          <label className="block text-sm font-medium text-[#0F172A]" htmlFor={`student-${i}`}>
            {t.studentLabel(num(i + 1, lang))}
          </label>
          <input
            id={`student-${i}`}
            className={inputClass}
            value={value}
            inputMode="numeric"
            maxLength={12}
            placeholder={t.studentHint}
            aria-invalid={idErr(value)}
            onChange={(e) => {
              const next = [...ids];
              next[i] = e.target.value.replace(/\D/g, "");
              setIds(next);
            }}
          />
          {idErr(value) && (
            <p className="mt-1 text-xs text-red-700">{value.trim() === "" ? t.errRequired : t.errId}</p>
          )}
        </div>
      ))}

      <div className="mt-5 flex justify-end gap-2">
        <button type="button" onClick={onClose} className={ghostBtn}>
          {STRINGS[lang].cancel}
        </button>
        <button type="submit" className={primaryBtn}>
          {t.confirm}
        </button>
      </div>
    </form>
  );
}

/* --------------------------- Consortium proposal modal -------------------------- */

function ConsortiumForm({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const t = STRINGS[lang].cons;
  const [partner, setPartner] = useState<number | null>(null);
  const [share, setShare] = useState(60);
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (partner !== null) setDone(true); // Mock only.
  };

  if (done && partner !== null) {
    return (
      <div>
        <p className="font-semibold text-[#044728]">{t.doneTitle}</p>
        <p className="mt-1 text-sm text-slate-700">{t.doneBody(t.partners[partner])}</p>
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={onClose} className={primaryBtn}>
            {STRINGS[lang].close}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <p className="text-sm text-slate-600">{t.intro}</p>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-[#0F172A]">{t.partnerLabel}</legend>
        <div className="mt-2 space-y-2">
          {t.partners.map((name: string, i: number) => (
            <label
              key={name}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm ${
                partner === i ? "border-[#1D4ED8] bg-blue-50" : "border-slate-200 bg-white"
              }`}
            >
              <input
                type="radio"
                name="partner"
                checked={partner === i}
                onChange={() => setPartner(i)}
                className="h-4 w-4 accent-[#1D4ED8]"
              />
              <span className="text-[#0F172A]">{name}</span>
            </label>
          ))}
        </div>
        {submitted && partner === null && <p className="mt-1 text-xs text-red-700">{t.errPartner}</p>}
      </fieldset>

      <div className="mt-4">
        <label htmlFor="share" className="block text-sm font-medium text-[#0F172A]">
          {t.shareLabel}: <span className="font-semibold">{num(share, lang)}</span>
        </label>
        <input
          id="share"
          type="range"
          min={10}
          max={90}
          step={5}
          value={share}
          onChange={(e) => setShare(Number(e.target.value))}
          className="mt-2 w-full accent-[#1D4ED8]"
        />
        <p className="text-xs text-slate-600">{t.partnerShare(num(100 - share, lang))}</p>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button type="button" onClick={onClose} className={ghostBtn}>
          {STRINGS[lang].cancel}
        </button>
        <button type="submit" className={primaryBtn}>
          {t.confirm}
        </button>
      </div>
    </form>
  );
}

/* --------------------------------- Feed card --------------------------------- */

export default function BiddingCard({ lang }: { lang: Lang }) {
  const t = STRINGS[lang];
  const [deadline] = useState(() => Date.now() + DEMO_REMAINING_MS);
  const cd = useCountdown(deadline);
  const [modal, setModal] = useState<"solo" | "consortium" | null>(null);

  return (
    <section
      aria-labelledby="bid-title"
      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <p className="text-sm text-slate-600">{t.feedTitle}</p>
      <h2 id="bid-title" className="mt-1 text-xl font-semibold leading-snug text-[#0F172A] sm:text-2xl">
        {t.challengeTitle}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{TICKET_ID}</p>

      {/* Dynamic bidding clock (T_bid) */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
          {cd.expired ? t.countdownExpired : t.countdown(num(cd.days, lang), num(cd.hours, lang))}
        </p>
        {!cd.expired && (
          <span aria-hidden="true" className="rounded-lg bg-[#F8FAFC] px-2.5 py-2 text-sm tabular-nums text-slate-600">
            {num(`${pad(cd.minutes)}:${pad(cd.seconds)}`, lang)}
          </span>
        )}
      </div>

      <dl className="mt-4">
        <dt className="text-sm text-slate-600">{t.budgetLabel}</dt>
        <dd className="mt-0.5 text-base font-semibold text-[#0F172A]">{t.budgetValue}</dd>
      </dl>

      {/* Anti-speculation banner */}
      <div className="mt-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950">
        {t.advantage}
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button type="button" className={primaryBtn} onClick={() => setModal("solo")} disabled={cd.expired}>
          {t.accept}
        </button>
        <button type="button" className={secondaryBtn} onClick={() => setModal("consortium")} disabled={cd.expired}>
          {t.consortium}
        </button>
      </div>

      <Modal open={modal === "solo"} onClose={() => setModal(null)} title={t.solo.title} closeLabel={t.close}>
        <SoloForm lang={lang} onClose={() => setModal(null)} />
      </Modal>
      <Modal open={modal === "consortium"} onClose={() => setModal(null)} title={t.cons.title} closeLabel={t.close}>
        <ConsortiumForm lang={lang} onClose={() => setModal(null)} />
      </Modal>
    </section>
  );
}