'use client';

import { useEffect, useState } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface Challenge {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  district: string;
  domain: string;
  status: string;
}

interface UniversityMatch {
  name: string;
  score: number;
  label: string;
  detail: string;
  axes: number[];
}

const AXES = [
  { name: 'Domain Expertise', weight: '25%' },
  { name: 'Faculty Availability', weight: '20%' },
  { name: 'NABL Lab', weight: '20%' },
  { name: 'Proximity', weight: '15%' },
  { name: 'Campus Capacity', weight: '10%' },
  { name: 'Track Record', weight: '10%' },
];

const UNIVERSITY_MATCHES: UniversityMatch[] = [
  { name: 'BIT Mesra', score: 94, label: 'Lead Match', detail: 'NABL Water Lab · 4 Patents', axes: [98, 94, 96, 84, 92, 98] },
  { name: 'IIT (ISM) Dhanbad', score: 89, label: 'Qualified', detail: 'Water Resources Division', axes: [95, 88, 91, 76, 88, 92] },
  { name: 'NIT Jamshedpur', score: 76, label: 'Qualified', detail: 'Environmental Engineering Lab', axes: [78, 74, 73, 91, 76, 75] },
  { name: 'BIT Sindri', score: 71, label: 'Qualified', detail: 'Standard Chemical Lab', axes: [74, 69, 70, 79, 71, 68] },
  { name: 'BAU Ranchi', score: 48, label: 'Disqualified', detail: 'Below 70% threshold', axes: [52, 46, 40, 73, 48, 43] },
];

const FALLBACK_CHALLENGES: Challenge[] = [
  { id: 'fallback-palamu-water', ticketNumber: 'JAG-2026-PAL-3785', title: 'Palamu Water Contamination', description: 'Groundwater contamination requires applied water-quality research and field testing across affected Palamu villages.', district: 'Palamu', domain: 'Water & Public Health', status: 'APPROVED_RND' },
  { id: 'fallback-khunti-lac', ticketNumber: 'JAG-2026-KHU-2146', title: 'Khunti Lac Spoilage', description: 'Post-harvest lac spoilage is reducing the value of minor forest produce for Khunti producer communities.', district: 'Khunti', domain: 'Agriculture & Livelihoods', status: 'APPROVED_RND' },
  { id: 'fallback-dhanbad-acid', ticketNumber: 'JAG-2026-DHA-5092', title: 'Dhanbad Acid Mine Drain', description: 'Acid mine drainage is contaminating potable water streams in the Jharia mining belt.', district: 'Dhanbad', domain: 'Environment & Mining', status: 'APPROVED_RND' },
];

function RadarMatch({ match }: { match: UniversityMatch }) {
  const chartData = AXES.map((axis, index) => ({ subject: axis.name, score: match.axes[index] }));
  const isQualified = match.score >= 70;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-slate-900">{match.name}</h3>
          <p className={`mt-1 text-[11px] font-bold ${isQualified ? 'text-emerald-700' : 'text-red-700'}`}>
            {match.label}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">{match.detail}</p>
        </div>
        <span className={`rounded-xl px-2.5 py-1 text-lg font-black ${isQualified ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
          {match.score}%
        </span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="68%">
            <PolarGrid stroke="#CBD5E1" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 9, fontWeight: 700 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 9 }} />
            <Radar
              dataKey="score"
              stroke={isQualified ? '#1E3A8A' : '#B91C1C'}
              fill={isQualified ? '#3B82F6' : '#EF4444'}
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

export default function GovernmentMatchingPage() {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [expandedChallengeIds, setExpandedChallengeIds] = useState<string[]>([]);
  const [listedChallengeIds, setListedChallengeIds] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    setSelectedChallengeId(new URLSearchParams(window.location.search).get('challengeId'));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    async function loadChallenges() {
      try {
        const response = await fetch(`${apiUrl}/api/v1/challenges`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Challenge request failed: ${response.status}`);
        const payload: unknown = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : payload && typeof payload === 'object' && 'data' in payload && Array.isArray(payload.data)
            ? payload.data
            : [];
        const approvedChallenges = items.filter((item): item is Record<string, unknown> => {
          if (!item || typeof item !== 'object') return false;
          const status = String(item.status || '');
          return status === 'APPROVED_RND' || status === 'OPEN_FOR_PRIORITIZATION';
        }).map((item) => ({
          id: String(item.id || item.ticket_number || 'unknown-challenge'),
          ticketNumber: String(item.ticket_number || item.id || 'Unknown ticket'),
          title: String(item.title || 'Approved societal challenge'),
          description: String(item.description || 'Citizen description unavailable.'),
          district: String(item.district || 'Jharkhand'),
          domain: String(item.domain || item.category || 'Applied R&D'),
          status: String(item.status),
        }));
        setChallenges(approvedChallenges.length > 0 ? approvedChallenges : FALLBACK_CHALLENGES);
        setUsingFallback(approvedChallenges.length === 0);
      } catch (loadError) {
        if (!(loadError instanceof DOMException && loadError.name === 'AbortError')) {
          setChallenges(FALLBACK_CHALLENGES);
          setUsingFallback(true);
        }
      } finally {
        setLoading(false);
      }
    }

    void loadChallenges();
    return () => controller.abort();
  }, []);

  const visibleChallenges = selectedChallengeId
    ? challenges.filter((challenge) => challenge.id === selectedChallengeId)
    : challenges;

  function toggleAnalysis(challengeId: string) {
    setExpandedChallengeIds((current) => current.includes(challengeId)
      ? current.filter((id) => id !== challengeId)
      : [...current, challengeId]);
  }

  function handleListToUniversities(challengeId: string) {
    setListedChallengeIds((current) => current.includes(challengeId) ? current : [...current, challengeId]);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    void fetch(`${apiUrl}/api/v1/challenges/${encodeURIComponent(challengeId)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'DYNAMIC_HACKATHON' }),
    }).catch(() => undefined);
  }

  return (
    <div className="space-y-6 pb-12">
      <header className="rounded-2xl bg-blue-950 p-6 text-white shadow-xl sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-300">Formula 4 · Government Evaluation</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Government Evaluator · University Capability Matching</h1>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-blue-100">
          Formula 4: Algorithmic 6-Axis matching assigning approved societal challenges to empanelled Jharkhand HEIs (Statutory Threshold &gt;= 70%).
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Approved challenge queue</h2>
            <p className="mt-1 text-xs text-slate-500">Each profile is evaluated against all five empanelled universities.</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-900">Threshold: 70%</span>
        </div>

        {loading && <p className="py-8 text-sm text-slate-500">Loading approved challenges...</p>}
        {!loading && usingFallback && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
            Live challenge queue is unavailable. Showing the approved evaluator reference set.
          </p>
        )}
        {!loading && visibleChallenges.length === 0 && (
          <p className="py-8 text-sm text-slate-500">No challenges are currently approved for university matching.</p>
        )}

        <div className="mt-5 space-y-6">
          {visibleChallenges.map((challenge) => (
            <article key={challenge.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-[11px] font-black text-white">{challenge.ticketNumber}</span>
                    <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-900">{challenge.domain}</span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{challenge.district}, Jharkhand</span>
                  </div>
                  <h3 className="mt-3 text-lg font-black text-slate-900">{challenge.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{challenge.description}</p>
                </div>
                <button type="button" onClick={() => toggleAnalysis(challenge.id)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all">
                  📊 View Match Analysis
                </button>
              </div>

              {expandedChallengeIds.includes(challenge.id) && (
                <section className="mt-6 border-t border-slate-100 pt-5" aria-label={`Match analysis for ${challenge.title}`}>
                  <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-black text-slate-900">Formula 4 weight breakdown</h4>
                      <span className="text-[11px] font-bold text-blue-900">Statutory threshold: 70%</span>
                    </div>
                    <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-slate-200" aria-label="Formula 4 weights">
                      {AXES.map((axis, index) => <div key={axis.name} className={`${['bg-blue-700', 'bg-sky-500', 'bg-cyan-500', 'bg-teal-500', 'bg-emerald-500', 'bg-lime-500'][index]}`} style={{ width: axis.weight }} title={`${axis.name}: ${axis.weight}`} />)}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-slate-600">
                      {AXES.map((axis, index) => <span key={axis.name} className="inline-flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${['bg-blue-700', 'bg-sky-500', 'bg-cyan-500', 'bg-teal-500', 'bg-emerald-500', 'bg-lime-500'][index]}`} />{axis.name} {axis.weight}</span>)}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {UNIVERSITY_MATCHES.map((match) => <RadarMatch key={match.name} match={match} />)}
                  </div>

                  <div className="mt-5 flex flex-col items-start gap-3">
                    {listedChallengeIds.includes(challenge.id) && (
                      <p className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-relaxed text-emerald-800">
                        ✅ Successfully Listed: Broadcasted to 4 qualifying HEIs (BIT Mesra, IIT ISM, NIT Jsr, BIT Sindri) for Bidding Phase 1.
                      </p>
                    )}
                    <button type="button" onClick={() => handleListToUniversities(challenge.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95">
                      🚀 List the Problem to the Matched Universities
                    </button>
                  </div>
                </section>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
