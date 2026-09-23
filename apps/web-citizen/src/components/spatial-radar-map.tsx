'use client';

import { useEffect, useState } from 'react';
import { Circle, CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { GeoLocation } from '@jagrit/contracts';
import { MapPin } from 'lucide-react';

export interface NearbyChallenge {
  id: string;
  title: string;
  category: string;
  distanceMeters: number;
  similarityScore: number;
  upvotes: number;
  date: string;
  reporter: string;
  status: 'PENDING_HITL' | 'ROUTED_CIVIC' | 'OPEN_FOR_BIDS' | 'DYNAMIC_HACKATHON' | 'IN_PILOT' | 'RESOLVED';
  coordinates: { lat: number; lon: number };
  originalPhotoUrl?: string;
  currentPhotoUrl?: string;
  description: string;
  defectLabel?: string;
  hasMerged?: boolean;
}

export interface SpatialRadarMapProps {
  centerLocation?: GeoLocation;
  nearbyRadiusMeters?: number;
  challenges?: NearbyChallenge[];
  currentPhotoPreview?: string;
  onMergeUpvote?: (challenge: NearbyChallenge) => void;
  compact?: boolean;
}

const DEFAULT_CENTER: GeoLocation = { lat: 23.3441, lon: 85.3096, district: 'Ranchi', block: 'Kanke', panchayat: 'Kanke Panchayat' };
const DEFAULT_CHALLENGES: NearbyChallenge[] = [
  { id: 'JAG-2026-RAN-0098', title: 'Kanke Ward 4 handpump contamination', category: 'Water', distanceMeters: 180, similarityScore: 0.89, upvotes: 42, date: '12 Sep 2026', reporter: 'Ward 4 Gram Sabha', status: 'OPEN_FOR_BIDS', coordinates: { lat: 23.3452, lon: 85.3108 }, description: 'Iron and fluoride sediment in public handpump.', defectLabel: 'Water contamination' },
  { id: 'JAG-2026-RAN-0112', title: 'Panchayat solar street light inverter failure', category: 'Energy', distanceMeters: 460, similarityScore: 0.64, upvotes: 19, date: '09 Sep 2026', reporter: 'Birbal Mahto', status: 'ROUTED_CIVIC', coordinates: { lat: 23.3468, lon: 85.3071 }, description: 'Solar battery pack is failing to retain charge.', defectLabel: 'Solar battery fault' },
  { id: 'JAG-2026-RAN-0125', title: 'Irrigation channel check dam seepage', category: 'Agriculture', distanceMeters: 620, similarityScore: 0.41, upvotes: 15, date: '08 Sep 2026', reporter: 'Mangra Oraon', status: 'DYNAMIC_HACKATHON', coordinates: { lat: 23.3485, lon: 85.3142 }, description: 'Masonry micro-fracture is causing water loss.', defectLabel: 'Check dam seepage' },
];

const markerIcon = new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41] });

function Recenter({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(position); }, [map, position]);
  return null;
}

export default function SpatialRadarMap({ centerLocation, nearbyRadiusMeters = 500, challenges = DEFAULT_CHALLENGES, compact = false }: SpatialRadarMapProps) {
  const [position, setPosition] = useState<[number, number]>([centerLocation?.lat || DEFAULT_CENTER.lat, centerLocation?.lon || DEFAULT_CENTER.lon]);
  useEffect(() => { if (centerLocation?.lat && centerLocation?.lon) setPosition([centerLocation.lat, centerLocation.lon]); }, [centerLocation?.lat, centerLocation?.lon]);
  useEffect(() => { navigator.geolocation?.getCurrentPosition(({ coords }) => setPosition([coords.latitude, coords.longitude]), () => undefined, { enableHighAccuracy: true, timeout: 5000 }); }, []);
  const inside = challenges.filter((item) => item.distanceMeters <= nearbyRadiusMeters).length;
  return <div className={`relative z-0 overflow-hidden rounded-2xl border border-emerald-900/40 bg-slate-950 shadow-xl ${compact ? 'h-[360px]' : 'h-[440px]'}`}><MapContainer center={position} zoom={13} scrollWheelZoom className="h-full w-full"><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Recenter position={position} /><Marker position={position} icon={markerIcon}><Popup><strong>Citizen GPS</strong><br />Duplicate candidate search origin</Popup></Marker><Circle center={position} radius={nearbyRadiusMeters} pathOptions={{ color: '#059669', fillColor: '#10b981', fillOpacity: 0.16, weight: 3, className: 'jagrit-radar-pulse' }} />{challenges.map((challenge) => <CircleMarker key={challenge.id} center={[challenge.coordinates.lat, challenge.coordinates.lon]} radius={challenge.distanceMeters <= nearbyRadiusMeters ? 8 : 6} pathOptions={{ color: challenge.distanceMeters <= nearbyRadiusMeters ? '#047857' : '#64748b', fillColor: challenge.distanceMeters <= nearbyRadiusMeters ? '#34d399' : '#94a3b8', fillOpacity: 0.9, weight: 2 }}><Popup><strong>{challenge.id}</strong><br />{challenge.title}<br /><span>{challenge.distanceMeters} m from citizen GPS · {challenge.category}</span></Popup></CircleMarker>)}</MapContainer><div className="pointer-events-none absolute bottom-3 left-3 z-[400] flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-slate-950/90 px-3 py-2 text-[11px] text-white shadow-lg"><MapPin className="h-4 w-4 text-emerald-400" /><span><strong className="text-emerald-300">500 m radar active</strong><br />Green boundary = duplicate candidate zone</span></div><div className="pointer-events-none absolute right-3 top-3 z-[400] rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-black text-slate-700 shadow">{inside} inside · {challenges.length - inside} outside</div></div>;
}
