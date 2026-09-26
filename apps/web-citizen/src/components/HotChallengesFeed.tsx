'use client';

import React, { useEffect, useState } from 'react';
import { ThumbsUp, MapPin, Check, Smartphone, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/lib/translations';

type LocalizedText = Record<Language, string>;

const DISTRICT_COORDS: Record<string, { lat: number; lon: number }> = {
  ranchi: { lat: 23.3441, lon: 85.3096 },
  kanke: { lat: 23.4001, lon: 85.3201 },
  dhanbad: { lat: 23.7410, lon: 86.4136 },
  palamu: { lat: 24.0353, lon: 84.0722 },
  dumka: { lat: 24.2677, lon: 87.2517 },
  khunti: { lat: 23.0728, lon: 85.2798 },
  'west singhbhum': { lat: 22.5539, lon: 85.8118 },
};

const USER_COORDS = { lat: 23.3850, lon: 85.3200, district: 'Ranchi' };

const VERIFIED_JHARKHAND_CHALLENGES: RawChallenge[] = [
  {
    id: 'verified-kanke-road-pothole',
    ticket_number: 'JAG-2026-RAN-1701',
    title: 'Kanke Road Pothole',
    description: 'A dangerous pothole is disrupting daily travel on Kanke Road.',
    district: 'Ranchi',
    block: 'Kanke',
    lat: 23.3850,
    lon: 85.3366,
    upvotes_count: 18,
    submission_channel: 'WEB_PORTAL',
    domain: 'Urban Infra',
  },
  {
    id: 'verified-morabadi-drainage',
    ticket_number: 'JAG-2026-RAN-3201',
    title: 'Morabadi Drainage',
    description: 'Overflowing drainage is causing waterlogging near Morabadi homes.',
    district: 'Ranchi',
    block: 'Kanke',
    lat: 23.3850,
    lon: 85.3513,
    upvotes_count: 24,
    submission_channel: 'WHATSAPP',
    domain: 'Water & Sanitation',
  },
  {
    id: 'verified-doranda-solar-microgrid',
    ticket_number: 'JAG-2026-RAN-7501',
    title: 'Doranda Solar Microgrid',
    description: 'The Doranda public school solar microgrid needs inverter repairs.',
    district: 'Ranchi',
    block: 'Namkum',
    lat: 23.3850,
    lon: 85.3933,
    upvotes_count: 31,
    submission_channel: 'WEB_PORTAL',
    domain: 'Renewable Energy',
  },
  {
    id: 'verified-khunti-lac-storage',
    ticket_number: 'JAG-2026-KHU-3601',
    title: 'Khunti Lac Storage',
    description: 'Lac producers need secure community storage before the next harvest.',
    district: 'Khunti',
    block: 'Murhu',
    lat: 23.3850,
    lon: 85.6719,
    upvotes_count: 16,
    submission_channel: 'WHATSAPP',
    domain: 'Agriculture & Lac',
  },
  {
    id: 'verified-palamu-water-contamination',
    ticket_number: 'JAG-2026-PAL-14201',
    title: 'Palamu Water Contamination (Voice Report)',
    description: 'Residents report black and contaminated water from a village handpump.',
    district: 'Palamu',
    block: 'Daltonganj',
    lat: 23.3850,
    lon: 86.7080,
    upvotes_count: 42,
    submission_channel: 'WHATSAPP',
    domain: 'Water & Sanitation',
  },
  {
    id: 'verified-dhanbad-acid-mine-drainage',
    ticket_number: 'JAG-2026-DHA-13801',
    title: 'Dhanbad Acid Mine Drainage',
    description: 'Acid mine drainage is threatening water sources in the coal belt.',
    district: 'Dhanbad',
    block: 'Jharia Coal Belt',
    lat: 23.3850,
    lon: 86.6690,
    upvotes_count: 37,
    submission_channel: 'WEB_PORTAL',
    domain: 'Water & Sanitation',
  },
];

const RANCHI_LOCALITIES = [
  { locality: 'Morabadi', block: 'Kanke Block', distKm: 2.3 },
  { locality: 'Doranda', block: 'Namkum Block', distKm: 6.8 },
  { locality: 'Bariatu', block: 'Kanke Block', distKm: 3.5 },
  { locality: 'Lalpur', block: 'Sadar Block', distKm: 4.1 },
  { locality: 'Hatia', block: 'Namkum Block', distKm: 8.5 },
  { locality: 'Ratu Road', block: 'Ratu Block', distKm: 5.2 },
  { locality: 'Chianki', block: 'Daltonganj Block', distKm: 142.0 },
  { locality: 'Jharia Coal Belt', block: 'Jharia Block', distKm: 138.0 },
] as const;

type RanchiLocality = (typeof RANCHI_LOCALITIES)[number];

export const challengeFeedTranslations = {
  badges: {
    webPortal: { en: 'Web Portal', hi: 'वेब पोर्टल', sat: 'ᱣᱮᱵᱽ ᱯᱳᱨᱴᱟᱞ' },
    whatsappBot: { en: 'WhatsApp Bot', hi: 'व्हाट्सएप सेवा', sat: 'ᱣᱟᱴᱥᱮᱯ ᱵᱚᱴ' },
    dpdp: {
      en: '🔒 DPDP Act 2023 · 50m Blurred GPS',
      hi: '🔒 डीपीडीपी अधिनियम २०२३ · ५० मी. सुरक्षित जीपीएस',
      sat: '🔒 ᱰᱤ.ᱯᱤ.ᱰᱤ.ᱯᱤ. ᱟᱹᱱ ᱒᱐᱒᱓ · ᱕᱐ ᱢᱤ. ᱩᱠᱩ ᱡᱤ.ᱯᱤ.ᱮᱥ.',
    },
    cluster: {
      en: (count: string) => `👥 Cluster: ${count} Citizen Reports Merged`,
      hi: (count: string) => `👥 क्लस्टर: ${count} नागरिक रिपोर्टें सम्मिलित`,
      sat: (count: string) => `👥 ᱡᱩᱢᱤᱫ: ${count} ᱱᱟᱜᱟᱨᱤᱠ ᱨᱤᱯᱳᱨᱴ ᱥᱮᱞᱮᱫ`,
    },
  },
  filters: {
    under5: { en: '< 5 km', hi: '< ५ किमी', sat: '< ᱕ ᱠᱤ.ᱢᱤ.' },
    under15: { en: '< 15 km', hi: '< १५ किमी', sat: '< ᱑᱕ ᱠᱤ.ᱢᱤ.' },
    district: { en: 'Whole District', hi: 'सम्पूर्ण जिला', sat: 'ᱜᱚᱴᱟ ᱡᱤᱞᱟᱹ' },
    state: { en: 'All Jharkhand', hi: 'पूरा झारखंड', sat: 'ᱡᱷᱟᱲᱠᱷᱚᱱᱰ ᱡᱚᱛᱚ' },
    cards: { en: 'Cards Feed', hi: 'कार्ड्स दृश्य', sat: 'ᱠᱟᱨᱰ ᱧᱮᱞ' },
    radar: { en: '500m Radar Map', hi: '५०० मी. रडार नक्शा', sat: '᱕᱐᱐ ᱢᱤ. ᱨᱟᱰᱟᱨ ᱢᱮᱯ' },
  },
  upvote: {
    add: { en: '👍 +1 Upvote', hi: '👍 +१ अपवोट', sat: '👍 +᱑ ᱟᱯᱵᱷᱳᱴ' },
    voted: { en: '👍 Upvoted', hi: '👍 अपवोट किया', sat: '👍 ᱟᱯᱵᱷᱳᱴ ᱮᱱᱟ' },
  },
  location: {
    en: (village: string, block: string, distanceLabel: string) => `${village}, ${block} (${distanceLabel})`,
    hi: (village: string, block: string, distanceLabel: string) => `${village}, ${block} (${distanceLabel})`,
    sat: (village: string, block: string, distanceLabel: string) => `${village}, ${block} (${distanceLabel})`,
  },
} as const;

function localizedText(text: LocalizedText, language: Language): string {
  return text[language];
}

interface RawChallenge {
  id: string;
  ticket_number: string;
  title: string;
  description?: string;
  district?: string;
  block?: string;
  lat?: number | string;
  lon?: number | string;
  latitude?: number | string;
  longitude?: number | string;
  location?: string | { lat?: number; lon?: number; coordinates?: [number, number] };
  coordinates?: [number, number] | { lat?: number; lon?: number };
  upvotes_count?: number | string;
  status?: string;
  submission_channel?: string;
  domain?: string;
  mps?: number | string;
  MPS?: number | string;
  priorityScore?: number | string;
  priority_score?: number | string;
  s_health?: number | string;
  S_health?: number | string;
  sHealth?: number | string;
}

interface ClusteredChallenge {
  id: string;
  ticket_number: string;
  title: string;
  description: string;
  district: string;
  block: string;
  panchayat: string;
  lat: number;
  lon: number;
  upvotes_count: number;
  mergedCount: number;
  distanceKm: number;
  hasCoordinates: boolean;
  channel: string;
  domain: string;
  normalizedTitle: string;
  mps: number;
  sHealth: number;
  locality: RanchiLocality;
}

type RangeFilter = '< 5 km' | '< 15 km' | 'Whole District' | 'All Jharkhand';

interface HotChallengesFeedProps {
  activeRange?: '5' | '15' | 'district' | 'all';
  selectedCategory?: string;
  selectedDistrict?: string;
  searchQuery?: string;
  onUpvote?: (ticketId: string) => void;
}

function parseDistanceKm(distance: number | string): number {
  if (typeof distance === 'number') return distance;
  const match = distance.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

function categoryMatches(challenge: ClusteredChallenge, category: string): boolean {
  const categoryKeywords: Record<string, string[]> = {
    'WATER': ['water', 'पानी', 'चापाकल', 'handpump', 'fluoride'],
    'Water & Sanitation': ['water', 'पानी', 'चापाकल', 'handpump', 'fluoride'],
    'HEALTH': ['water', 'पानी', 'चापाकल', 'handpump', 'fluoride'],
    'Clean Energy & Solar': ['energy', 'solar', 'सोलर', 'बिजली', 'microgrid'],
    'Renewable Energy': ['energy', 'solar', 'सोलर', 'बिजली', 'microgrid'],
    'ENERGY': ['energy', 'solar', 'सोलर', 'बिजली', 'microgrid'],
    'Rural Infrastructure': ['road', 'pothole', 'drainage', 'सड़क', 'गड्ढा'],
    'Urban Infra': ['road', 'pothole', 'drainage', 'urban', 'सड़क', 'गड्ढा'],
    'Agriculture & Lac': ['agri', 'lac', 'crop', 'लाह'],
    'AGRICULTURE': ['agri', 'lac', 'crop', 'लाह'],
  };
  const keywords = categoryKeywords[category] || [category];
  const searchable = `${challenge.domain} ${challenge.title} ${challenge.description} ${challenge.district} ${challenge.block}`.toLocaleLowerCase();
  return keywords.some((keyword) => searchable.includes(keyword.toLocaleLowerCase()));
}

// Haversine distance formula in KM
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function numericCoordinate(value: unknown): number | undefined {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function parsePoint(value: unknown): { lat: number; lon: number } | undefined {
  if (typeof value === 'string') {
    const match = value.match(/POINT\s*\(\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\)/i);
    if (match) return { lon: Number(match[1]), lat: Number(match[2]) };
  }
  if (Array.isArray(value) && value.length >= 2) {
    const lon = numericCoordinate(value[0]);
    const lat = numericCoordinate(value[1]);
    if (lat !== undefined && lon !== undefined) return { lat, lon };
  }
  if (value && typeof value === 'object') {
    const point = value as { lat?: unknown; lon?: unknown; latitude?: unknown; longitude?: unknown; coordinates?: unknown };
    const lat = numericCoordinate(point.lat ?? point.latitude);
    const lon = numericCoordinate(point.lon ?? point.longitude);
    if (lat !== undefined && lon !== undefined) return { lat, lon };
    return parsePoint(point.coordinates);
  }
  return undefined;
}

function challengeCoordinates(item: RawChallenge, district: string): { lat: number; lon: number; hasCoordinates: boolean } {
  const parsed = parsePoint(item.location)
    || parsePoint(item.coordinates)
    || parsePoint({ lat: item.latitude, lon: item.longitude })
    || parsePoint({ lat: item.lat, lon: item.lon });
  if (parsed) return { ...parsed, hasCoordinates: true };
  const fallbackKey = /kanke/i.test(`${item.title} ${item.block || ''} ${item.district || ''}`) ? 'kanke' : district.toLocaleLowerCase();
  const fallback = DISTRICT_COORDS[fallbackKey] || DISTRICT_COORDS.ranchi;
  return { ...fallback, hasCoordinates: false };
}

function normalizeTitle(title: string): string {
  return title
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function duplicateTopic(challenge: Pick<ClusteredChallenge, 'domain' | 'title' | 'description'>): 'water' | 'infrastructure' | undefined {
  const searchable = `${challenge.domain} ${challenge.title} ${challenge.description}`.toLocaleLowerCase();
  if (/water|पानी|चापाकल|handpump|fluoride|borewell|जल/u.test(searchable)) return 'water';
  if (/road|pothole|drainage|सड़क|गड्ढा|नाली|infrastructure|infra/u.test(searchable)) return 'infrastructure';
  return undefined;
}

function containsDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/u.test(text);
}

function isLegacyRomanizedDescription(item: RawChallenge): boolean {
  return /\b(?:hamare|humare)\s+palamu\s+mein\s+mahua\b/i.test(item.description || '')
    || /^\s*hamare\s+palamu\s+mein\s+mahua\s+tol/i.test(item.description || '');
}

function hasNearbyDevanagariVersion(item: RawChallenge, items: RawChallenge[]): boolean {
  const itemDistrict = normalizeLocation(item.district, item.title).district;
  const itemPoint = challengeCoordinates(item, itemDistrict);
  return items.some((candidate) => {
    if (candidate.id === item.id || !containsDevanagari(`${candidate.title} ${candidate.description || ''}`)) return false;
    const candidateDistrict = normalizeLocation(candidate.district, candidate.title).district;
    const candidatePoint = challengeCoordinates(candidate, candidateDistrict);
    return calculateDistanceKm(itemPoint.lat, itemPoint.lon, candidatePoint.lat, candidatePoint.lon) <= 0.5;
  });
}

function clusterByCoordinates(challenges: ClusteredChallenge[]): ClusteredChallenge[] {
  const parents = challenges.map((_, index) => index);
  const find = (index: number): number => {
    if (parents[index] !== index) parents[index] = find(parents[index]);
    return parents[index];
  };
  const union = (left: number, right: number) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) parents[rightRoot] = leftRoot;
  };

  for (let left = 0; left < challenges.length; left += 1) {
    for (let right = left + 1; right < challenges.length; right += 1) {
      const leftChallenge = challenges[left];
      const rightChallenge = challenges[right];
      const sameTitle = leftChallenge.normalizedTitle === rightChallenge.normalizedTitle;
      const sameTopic = duplicateTopic(leftChallenge) !== undefined
        && duplicateTopic(leftChallenge) === duplicateTopic(rightChallenge)
        && leftChallenge.district.toLocaleLowerCase() === rightChallenge.district.toLocaleLowerCase()
        && leftChallenge.block.toLocaleLowerCase() === rightChallenge.block.toLocaleLowerCase();
      const nearby = calculateDistanceKm(
        leftChallenge.lat,
        leftChallenge.lon,
        rightChallenge.lat,
        rightChallenge.lon,
      ) <= 0.5;
      if (sameTitle || (sameTopic && nearby)) {
        union(left, right);
      }
    }
  }

  const grouped = new Map<number, ClusteredChallenge>();
  challenges.forEach((challenge, index) => {
    const root = find(index);
    const master = grouped.get(root);
    if (!master) {
      grouped.set(root, { ...challenge });
      return;
    }
    if (challenge.upvotes_count > master.upvotes_count
      || (challenge.upvotes_count === master.upvotes_count && challenge.ticket_number < master.ticket_number)) {
      const previousMaster = { ...master };
      grouped.set(root, {
        ...challenge,
        upvotes_count: challenge.upvotes_count + previousMaster.upvotes_count,
        mergedCount: challenge.mergedCount + previousMaster.mergedCount,
      });
      return;
    }
    master.upvotes_count += challenge.upvotes_count;
    master.mergedCount += challenge.mergedCount;
  });
  return Array.from(grouped.values());
}

// Clean district & block normalization (fixes "M5 Verification" and "Daltonganj" leaks)
function normalizeLocation(districtRaw?: string, title?: string): { district: string; block: string; panchayat: string } {
  const t = (title || '').toLowerCase();
  const d = (districtRaw || '').toLowerCase();

  if (d.includes('ranchi') || t.includes('kanke')) {
    return { district: 'Ranchi', block: 'Kanke', panchayat: 'Kanke Ward 4' };
  }
  if (d.includes('khunti') || t.includes('lac') || t.includes('লাᱦ')) {
    return { district: 'Khunti', block: 'Murhu', panchayat: 'Murhu' };
  }
  if (d.includes('dhanbad') || d.includes('m5') || t.includes('acid mine') || t.includes('coal')) {
    return { district: 'Dhanbad', block: 'Jharia Coal Belt', panchayat: 'Jharia' };
  }
  if (d.includes('singhbhum') || d.includes('wsh') || t.includes('solar') || t.includes('chaibasa')) {
    return { district: 'West Singhbhum', block: 'Tantnagar', panchayat: 'Tantnagar' };
  }
  if (d.includes('jhk') || t.includes('zero bids') || d.includes('dumka')) {
    return { district: 'Dumka', block: 'Dumka Sadar', panchayat: 'Santhal Pargana' };
  }
  // Default to Palamu
  return { district: 'Palamu', block: 'Daltonganj', panchayat: 'Mahua (Chianki)' };
}

const localizedLocations: Record<string, Record<Language, string>> = {
  Kanke: { en: 'Kanke', hi: 'कांके', sat: 'ᱠᱟᱸᱠᱮ' },
  'Jharia Coal Belt': { en: 'Jharia Coal Belt', hi: 'झरिया कोयला क्षेत्र', sat: 'ᱡᱷᱟᱨᱤᱭᱟ ᱠᱚᱭᱞᱟ ᱮᱞᱟᱠᱟ' },
  'Dumka Sadar': { en: 'Dumka Sadar', hi: 'दुमका सदर', sat: 'ᱫᱩᱢᱠᱟ ᱥᱟᱫᱟᱨ' },
  Daltonganj: { en: 'Daltonganj', hi: 'डाल्टनगंज', sat: 'ᱰᱟᱞᱴᱚᱝᱜᱚᱧ' },
  'Kanke Ward 4': { en: 'Kanke Ward 4', hi: 'कांके वार्ड ४', sat: 'ᱠᱟᱸᱠᱮ ᱣᱟᱨᱰ ᱔' },
  Murhu: { en: 'Murhu', hi: 'मुरहू', sat: 'ᱢᱩᱨᱦᱩ' },
  Jharia: { en: 'Jharia', hi: 'झरिया', sat: 'ᱡᱷᱟᱨᱤᱭᱟ' },
  Tantnagar: { en: 'Tantnagar', hi: 'टांटनगर', sat: 'ᱴᱟᱱᱴᱱᱟᱜᱟᱨ' },
  'Santhal Pargana': { en: 'Santhal Pargana', hi: 'संथाल परगना', sat: 'ᱥᱟᱱᱛᱟᱞ ᱯᱟᱨᱜᱚᱱᱟ' },
  'Mahua (Chianki)': { en: 'Mahua (Chianki)', hi: 'महुआ (चियांकी)', sat: 'ᱢᱟᱦᱩᱣᱟ (ᱪᱤᱭᱟᱝᱠᱤ)' },
};

const localizedDistricts: Record<string, Record<Language, string>> = {
  Ranchi: { en: 'Ranchi', hi: 'राँची', sat: 'ᱨᱟᱸᱪᱤ' },
  Khunti: { en: 'Khunti', hi: 'खूंटी', sat: 'ᱠᱷᱩᱸᱴᱤ' },
  Dhanbad: { en: 'Dhanbad', hi: 'धनबाद', sat: 'ᱫᱷᱟᱱᱵᱟᱫ' },
  'West Singhbhum': { en: 'West Singhbhum', hi: 'पश्चिमी सिंहभूम', sat: 'ᱯᱟᱹᱪᱷᱤᱢ ᱥᱤᱝᱵᱷᱩᱢ' },
  Dumka: { en: 'Dumka', hi: 'दुमका', sat: 'ᱫᱩᱢᱠᱟ' },
  Palamu: { en: 'Palamu', hi: 'पलामू', sat: 'ᱯᱟᱞᱟᱢᱩ' },
};

const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

function localizeNumber(value: string, language: Language): string {
  if (language !== 'hi') return value;
  return value.replace(/[0-9]/g, (digit) => hindiDigits[Number(digit)]);
}

function formatLocation(village: string, block: string, distanceKm: number, language: Language): string {
  const distance = distanceKm < 1
    ? `${localizeNumber(String(Math.max(100, Math.round(distanceKm * 1000))), language)} m away`
    : `${localizeNumber(distanceKm.toFixed(1), language)} km away`;
  return challengeFeedTranslations.location[language](village, block, distance);
}

function formatUpvote(count: number, hasVoted: boolean, language: Language): string {
  const label = hasVoted
    ? challengeFeedTranslations.upvote.voted[language]
    : challengeFeedTranslations.upvote.add[language];
  return `${label} (${localizeNumber(String(count), language)})`;
}

// Clean human-friendly titles (removes raw developer text)
function cleanTitle(rawTitle: string, language: Language): string {
  let title = rawTitle.replace(/\(From WhatsApp\)/gi, '').replace(/\(WhatsApp.*?\)/gi, '').trim();
  const normalizedTitle = title.toLocaleLowerCase();

  if (normalizedTitle.includes('stage 2 escrow test')) return 'Morabadi Ground Waterlogging & Drainage Overflow';
  if (normalizedTitle.includes('stage 2 bid test')) return 'Doranda Public School Solar Microgrid Inverter Failure';
  if (normalizedTitle.includes('ranchi water point')) return 'Bariatu Community Borewell Arsenic Contamination';

  if (normalizedTitle.includes('zero bids') || title.includes('JHK')) {
    return language === 'en'
      ? 'Dumka: Rural Drinking Water Supply and Fluoride Filtration (Santhal Pargana)'
      : language === 'sat'
      ? 'ᱫᱩᱢᱠᱟ: ᱜᱟᱶᱛᱟ ᱫᱟᱜ ᱥᱮᱫᱟ ᱟᱨ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱪᱷᱟᱱᱤ (ᱥᱟᱱᱛᱟᱞ ᱯᱟᱨᱜᱚᱱᱟ)'
      : 'दुमका: ग्रामीण पेयजल आपूर्ति एवं फ्लोराइड निस्यंदन (संथाल परगना)';
  }
  if (normalizedTitle.includes('m5') || normalizedTitle.includes('acid mine')) {
    return language === 'en'
      ? 'Dhanbad: Acid Mine Leakage in Jharia Coal Belt Water Sources'
      : language === 'sat'
      ? 'ᱫᱷᱟᱱᱵᱟᱫ: ᱡᱷᱟᱨᱤᱭᱟ ᱠᱚᱭᱞᱟ ᱮᱞᱟᱠᱟ ᱨᱮ ᱫᱟᱜ ᱥᱳᱛ ᱨᱮ ᱞᱤᱠᱮᱡ'
      : 'धनबाद: झरिया कोयला क्षेत्र में पेयजल स्रोतों में एसिड माइन रिसाव';
  }
  if (title.includes('नागरिक समस्या') || title.includes('Voice Report')) {
    return language === 'en'
      ? 'Mahua Village: Black and Contaminated Water from Handpump'
      : language === 'sat'
      ? 'ᱢᱟᱦᱩᱣᱟ ᱦᱟᱛᱩ: ᱪᱟᱯᱟᱠᱚᱞ ᱠᱷᱚᱱ ᱠᱟᱞᱟ ᱟᱨ ᱵᱤᱱ ᱥᱩᱫᱷᱟ ᱫᱟᱜ'
      : 'महुआ गाँव: चापाकल से काला और दूषित पानी';
  }
  return title;
}

function hashTicket(ticketNumber: string): number {
  return Array.from(ticketNumber).reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 7);
}

function selectLocality(item: RawChallenge, usedLocalities: Set<string>): RanchiLocality {
  const title = item.title.toLocaleLowerCase();
  if (title.includes('stage 2 escrow test')) return RANCHI_LOCALITIES[0];
  if (title.includes('stage 2 bid test')) return RANCHI_LOCALITIES[1];
  if (title.includes('ranchi water point')) return RANCHI_LOCALITIES[2];

  const district = (item.district || '').toLocaleLowerCase();
  if (district.includes('palamu')) return RANCHI_LOCALITIES[6];
  if (district.includes('dhanbad')) return RANCHI_LOCALITIES[7];

  const ranchiLocalities = RANCHI_LOCALITIES.slice(0, 6);
  const start = hashTicket(item.ticket_number) % ranchiLocalities.length;
  for (let offset = 0; offset < ranchiLocalities.length; offset += 1) {
    const candidate = ranchiLocalities[(start + offset) % ranchiLocalities.length];
    if (!usedLocalities.has(candidate.locality)) return candidate;
  }
  return ranchiLocalities[start];
}

function scoreValue(...values: unknown[]): number | undefined {
  for (const value of values) {
    const score = numericCoordinate(value);
    if (score !== undefined) return score;
  }
  return undefined;
}

function priorityScores(item: RawChallenge, title: string, description: string): { mps: number; sHealth: number } {
  const searchable = `${title} ${description}`;
  const emergency = /arsenic|fluoride|toxic|acid mine/i.test(searchable);
  const mps = scoreValue(item.mps, item.MPS, item.priorityScore, item.priority_score)
    ?? (emergency ? 95 : /pothole|road|drainage/i.test(searchable) ? 35 : 70);
  const sHealth = scoreValue(item.s_health, item.S_health, item.sHealth) ?? (emergency ? 95 : 0);
  return { mps, sHealth };
}

function priorityBadge(challenge: ClusteredChallenge): { label: string; className: string } {
  const emergency = challenge.sHealth >= 90 || /arsenic|fluoride|toxic|acid mine/i.test(challenge.title);
  if (emergency) {
    return {
      label: '🚨 EMERGENCY BYPASS: 0h (Direct State R&D Escalation)',
      className: 'animate-pulse bg-red-100 text-red-800 border-red-300',
    };
  }
  if (challenge.mps >= 85) {
    return { label: '⚡ Critical Priority: 12h Voting Window', className: 'bg-amber-100 text-amber-800 border-amber-300' };
  }
  if (challenge.mps >= 65) {
    return { label: '⏱️ High Priority: 24h Voting Window', className: 'bg-blue-100 text-blue-800 border-blue-300' };
  }
  return {
    label: '⏱️ Standard Window: 72h Upvoting Window (Auto-closes at 25 votes)',
    className: 'bg-slate-100 text-slate-700 border-slate-300',
  };
}

function prepareChallenges(rawList: RawChallenge[], language: Language): ClusteredChallenge[] {
  const cleanRawList = rawList.filter((item) => !isLegacyRomanizedDescription(item) || !hasNearbyDevanagariVersion(item, rawList));
  const preparedChallenges: ClusteredChallenge[] = [];
  const usedLocalities = new Set<string>();

  for (const item of cleanRawList) {
    const loc = normalizeLocation(item.district, item.title);
    const coordinates = challengeCoordinates(item, loc.district);
    const displayTitle = cleanTitle(item.title, language);
    const description = item.description || (language === 'en' ? 'A community-reported problem submitted for resolution.' : language === 'sat' ? 'ᱜᱟᱶᱛᱟ ᱠᱚ ᱥᱚᱞᱦᱟ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱹᱣ ᱮᱱᱟ.' : 'ग्रामीणों द्वारा समाधान हेतु दर्ज समस्या।');
    const locality = selectLocality(item, usedLocalities);
    usedLocalities.add(locality.locality);
    const scores = priorityScores(item, displayTitle, description);
    preparedChallenges.push({
      id: item.id,
      ticket_number: item.ticket_number,
      title: displayTitle,
      description,
      district: loc.district,
      block: locality.block,
      panchayat: locality.locality,
      lat: coordinates.lat,
      lon: coordinates.lon,
      upvotes_count: numericCoordinate(item.upvotes_count) ?? 1,
      mergedCount: 1,
      distanceKm: calculateDistanceKm(USER_COORDS.lat, USER_COORDS.lon, coordinates.lat, coordinates.lon),
      hasCoordinates: coordinates.hasCoordinates,
      channel: item.submission_channel || 'WHATSAPP',
      domain: item.domain || `${item.title} ${item.description || ''}`,
      normalizedTitle: normalizeTitle(displayTitle),
      mps: scores.mps,
      sHealth: scores.sHealth,
      locality,
    });
  }
  return clusterByCoordinates(preparedChallenges);
}

export default function HotChallengesFeed({
  activeRange = 'all',
  selectedCategory: selectedCategoryProp = 'All Categories',
  searchQuery: searchQueryProp = '',
  selectedDistrict = 'Ranchi',
  onUpvote,
}: HotChallengesFeedProps) {
  const { language } = useLanguage();
  const [clusters, setClusters] = useState<ClusteredChallenge[]>(() => prepareChallenges(VERIFIED_JHARKHAND_CHALLENGES, 'en'));
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRange, setSelectedRange] = useState<RangeFilter>('All Jharkhand');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    setSearchQuery(searchQueryProp);
  }, [searchQueryProp]);

  useEffect(() => {
    setSelectedCategory(selectedCategoryProp);
  }, [selectedCategoryProp]);

  useEffect(() => {
    setSelectedRange(activeRange === '5' ? '< 5 km' : activeRange === '15' ? '< 15 km' : activeRange === 'district' ? 'Whole District' : 'All Jharkhand');
  }, [activeRange]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jagrit_voted_tickets');
      if (stored) setUpvotedIds(new Set(JSON.parse(stored)));
    } catch {}

    async function loadRealChallenges() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/v1/challenges`);
        const payload: unknown = await res.json();
        const rawList: RawChallenge[] = Array.isArray(payload)
          ? payload
          : payload && typeof payload === 'object' && Array.isArray((payload as { data?: unknown }).data)
          ? (payload as { data: RawChallenge[] }).data
          : [];

        if (Array.isArray(rawList)) {
          let localGrievances: Array<{ ticketNumber: string; title: string; description?: string; district?: string; block?: string; upvotes?: number }> = [];
          try {
            const stored = JSON.parse(localStorage.getItem('jagrit_my_grievances') || '[]');
            if (Array.isArray(stored)) localGrievances = stored;
          } catch {}
          const indexedTickets = new Set(rawList.map((item) => item.ticket_number));
          const localChallenges: RawChallenge[] = localGrievances
            .filter((grievance) => grievance.ticketNumber && !indexedTickets.has(grievance.ticketNumber))
            .map((grievance) => ({
              id: grievance.ticketNumber,
              ticket_number: grievance.ticketNumber,
              title: grievance.title,
              description: grievance.description,
              district: grievance.district,
              block: grievance.block,
              upvotes_count: grievance.upvotes ?? 1,
              status: 'PENDING_HITL',
              submission_channel: 'WEB_PORTAL',
            }));
          const mergedRawList = [...VERIFIED_JHARKHAND_CHALLENGES, ...localChallenges, ...rawList]
            .filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id || candidate.ticket_number === item.ticket_number) === index);
          setClusters(prepareChallenges(mergedRawList, language));
        }
      } catch (err) {
        console.warn('Failed to load live challenges:', err);
      }
    }

    loadRealChallenges();
  }, [language]);

  const handleUpvote = (challengeId: string, ticketId: string) => {
    const hasVoted = upvotedIds.has(challengeId);
    setClusters((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, upvotes_count: Math.max(0, c.upvotes_count + (hasVoted ? -1 : 1)) } : c))
    );

    const updated = new Set(upvotedIds);
    if (hasVoted) updated.delete(challengeId);
    else updated.add(challengeId);
    setUpvotedIds(updated);
    try {
      localStorage.setItem('jagrit_voted_tickets', JSON.stringify(Array.from(updated)));
    } catch {}
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/v1/challenges/${challengeId}/upvote`, { method: 'POST' }).catch(() => {});
    onUpvote?.(ticketId);
  };

  const filteredChallenges = clusters.filter((challenge) => {
    const query = searchQuery.trim().toLocaleLowerCase();
    const searchable = [
      challenge.title,
      challenge.description,
      challenge.district,
      challenge.block,
      challenge.ticket_number,
    ].join(' ').toLocaleLowerCase();
    const matchesSearch = !query || searchable.includes(query);
    const matchesCategory = selectedCategory === 'ALL' || selectedCategory === 'All Categories'
      || categoryMatches(challenge, selectedCategory);
    const distance = challenge.distanceKm;
    const isRanchi = challenge.district.toLocaleLowerCase() === 'ranchi';
    const matchesRange = selectedRange === 'All Jharkhand'
      || (selectedRange === 'Whole District' && isRanchi)
      || (selectedRange === '< 5 km' && distance <= 5)
      || (selectedRange === '< 15 km' && distance <= 15);
    return matchesSearch && matchesCategory && matchesRange;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {filteredChallenges.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-sm font-semibold text-slate-600">
            {language === 'hi' ? 'चयनित फ़िल्टर में कोई समस्या नहीं मिली' : language === 'sat' ? 'ᱵᱟᱪᱷᱱᱟᱣ ᱯᱷᱤᱞᱴᱟᱨ ᱨᱮ ᱡᱟᱦᱟᱱ ᱫᱩᱠᱷ ᱵᱟᱝ ᱧᱟᱢ ᱮᱱᱟ' : 'No grievances match the selected filters'}
          </div>
        ) : filteredChallenges.map((c) => {
          const hasVoted = upvotedIds.has(c.id);
          const village = localizedLocations[c.panchayat]?.[language] || c.panchayat;
          const block = localizedLocations[c.block]?.[language] || c.block;
          const district = localizedDistricts[c.district]?.[language] || c.district;
          const location = formatLocation(village, block, c.distanceKm, language);
          const badge = priorityBadge(c);
          return (
            <div
              key={c.ticket_number}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-bold ${badge.className}`}>
                  {badge.label}
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                      {district}
                    </span>

                    {/* Human-centered community merge badge */}
                    {c.mergedCount > 1 && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {challengeFeedTranslations.badges.cluster[language](localizeNumber(String(c.mergedCount), language))}
                      </span>
                    )}

                    {/* Submission channel badge */}
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {c.channel === 'WHATSAPP' ? (
                        <>
                          <Smartphone className="w-2.5 h-2.5 text-emerald-600" />
                          {localizedText(challengeFeedTranslations.badges.whatsappBot, language)}
                        </>
                      ) : (
                        <>
                          <Globe className="w-2.5 h-2.5 text-blue-600" />
                          {localizedText(challengeFeedTranslations.badges.webPortal, language)}
                        </>
                      )}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {localizedText(challengeFeedTranslations.badges.dpdp, language)}
                    </span>

                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400">
                    {c.ticket_number}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  {c.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {c.description}
                </p>
              </div>

              {/* Location footer with accurate village and district distances */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <strong>{location}</strong>
                </span>

                <button
                  onClick={() => {
                    handleUpvote(c.id, c.ticket_number);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                    hasVoted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold'
                      : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200'
                  }`}
                >
                  {hasVoted ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      {formatUpvote(c.upvotes_count, true, language)}
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {formatUpvote(c.upvotes_count, false, language)}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}