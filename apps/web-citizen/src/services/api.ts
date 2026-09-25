'use client';

const API_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
export const OFFLINE_REPORT_QUEUE_KEY = 'jagrit_offline_reports';

export type ApiFixture = {
  ticketNumber: string;
  status: string;
  district: string;
  incidentCluster: string;
  source: 'backend' | 'offline-demo';
};

const FIXTURES = {
  palamu: { ticketNumber: 'JAG-PLM-0082', status: 'OPEN_FOR_BIDS', district: 'Palamu', incidentCluster: 'JAG-PLM-0082' },
  khunti: { ticketNumber: 'JAG-KHU-0034', status: 'IN_PILOT', district: 'Khunti', incidentCluster: 'JAG-KHU-0034' },
  chaibasa: { ticketNumber: 'JAG-WSH-0071', status: 'DYNAMIC_HACKATHON', district: 'West Singhbhum', incidentCluster: 'JAG-WSH-0071' },
} as const;

function fixtureFor(input = ''): ApiFixture {
  const value = input.toLowerCase();
  const fixture = value.includes('khunti') ? FIXTURES.khunti : value.includes('chaibasa') || value.includes('singhbhum') ? FIXTURES.chaibasa : FIXTURES.palamu;
  return { ...fixture, source: 'offline-demo' };
}

async function postJson<T>(path: string, payload: unknown, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_ROOT}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(`API ${response.status}`);
    return await response.json() as T;
  } catch {
    return fallback;
  }
}

export async function submitCitizenReport(formData: FormData): Promise<ApiFixture & Record<string, unknown>> {
  try {
    const response = await fetch(`${API_ROOT}/api/v1/challenges/submit`, { method: 'POST', body: formData });
    if (!response.ok) throw new Error(`API ${response.status}`);
    return await response.json() as ApiFixture & Record<string, unknown>;
  } catch {
    const description = String(formData.get('description') || formData.get('district') || 'Palamu');
    return { ...fixtureFor(description), ticketNumber: `OFFLINE-${Date.now().toString(36).toUpperCase()}` };
  }
}

export function sendWhatsAppWebhookPayload(payload: Record<string, unknown>) {
  return postJson('/api/v1/webhooks/whatsapp', payload, { accepted: true, status: 'SIMULATED', source: 'offline-demo', fixture: fixtureFor(JSON.stringify(payload)) });
}

export function triggerBreakdownAlarm(ticketId: string, reason: string) {
  return postJson('/api/v1/alarms/breakdown', { ticketId, reason }, { accepted: true, status: 'PAUSED_CLOCK', message: 'STATUS: PAUSED - CLOCK FROZEN (48H INSPECTION DISPATCHED)', ticketId, source: 'offline-demo' });
}

export function upvoteChallenge(ticketId: string, userHash: string) {
  return postJson(`/api/v1/challenges/${encodeURIComponent(ticketId)}/upvote`, { ticketId, userHash }, { accepted: true, ticketId, upvotes: 1, status: 'VOTE_RECORDED', source: 'offline-demo' });
}

async function dataUrlToFile(dataUrl: string, name: string) {
  const response = await fetch(dataUrl);
  return new File([await response.blob()], name, { type: response.headers.get('content-type') || 'application/octet-stream' });
}

export type QueuedReport = {
  title: string;
  description: string;
  category: string;
  language: string;
  imageData?: string;
  audioData?: string;
  location: { lat: number; lon: number; district: string; block: string; panchayat: string };
  defects?: unknown[];
};

export async function queuedReportToFormData(report: QueuedReport) {
  const formData = new FormData();
  formData.append('title', report.title);
  formData.append('description', report.description);
  formData.append('category', report.category);
  formData.append('language', report.language);
  if (report.language === 'hi') {
    formData.append('whisperLanguage', 'hi');
    formData.append('whisperPrompt', 'झारखंड के ग्रामीण नागरिक पेयजल, चापाकल, बिजली, सड़क, स्वास्थ्य की समस्या की शिकायत दर्ज कर रहे हैं।');
  }
  formData.append('latitude', String(report.location.lat));
  formData.append('longitude', String(report.location.lon));
  formData.append('district', report.location.district);
  formData.append('block', report.location.block);
  formData.append('panchayat', report.location.panchayat);
  formData.append('cvDefects', JSON.stringify(report.defects || []));
  if (report.imageData) formData.append('evidence', await dataUrlToFile(report.imageData, 'jagrit-evidence.webp'));
  if (report.audioData) formData.append('audioData', report.audioData);
  return formData;
}

export async function syncOfflineReportQueue() {
  if (typeof window === 'undefined' || !navigator.onLine) return 0;
  let queued: QueuedReport[] = [];
  try { queued = JSON.parse(localStorage.getItem(OFFLINE_REPORT_QUEUE_KEY) || '[]') as QueuedReport[]; } catch { localStorage.removeItem(OFFLINE_REPORT_QUEUE_KEY); }
  const remaining: QueuedReport[] = [];
  for (const report of queued) {
    try { await submitCitizenReport(await queuedReportToFormData(report)); } catch { remaining.push(report); }
  }
  localStorage.setItem(OFFLINE_REPORT_QUEUE_KEY, JSON.stringify(remaining));
  return queued.length - remaining.length;
}

export function registerOfflineReportSync() {
  if (typeof window === 'undefined') return () => undefined;
  const drain = () => { void syncOfflineReportQueue(); };
  window.addEventListener('online', drain);
  return () => window.removeEventListener('online', drain);
}
