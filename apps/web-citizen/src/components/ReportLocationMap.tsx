'use client';

import { useEffect, useRef, useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';

export interface ReportLocation { lat: number; lon: number; district: string; block: string; panchayat: string; }
interface ReportLocationMapProps { value: ReportLocation; onChange: (location: ReportLocation) => void; language?: 'en' | 'hi' | 'sat'; }
const RANCHI: ReportLocation = { lat: 23.3441, lon: 85.3096, district: 'Ranchi', block: 'Kanke', panchayat: 'Kanke Panchayat' };
const markerIcon = new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41] });

function Recenter({ location }: { location: ReportLocation }) { const map = useMap(); useEffect(() => { map.setView([location.lat, location.lon]); }, [location.lat, location.lon, map]); return null; }

export default function ReportLocationMap({ value, onChange, language = 'en' }: ReportLocationMapProps) {
  const [location, setLocation] = useState(value.lat ? value : RANCHI);
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  useEffect(() => { setLocation(value.lat ? value : RANCHI); }, [value]);
  const reverseGeocode = async (lat: number, lon: number) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Reverse geocoding failed');
    const data = await response.json() as { address?: { state_district?: string; city?: string; county?: string; suburb?: string; town?: string; village?: string } };
    return {
      district: data.address?.state_district || data.address?.city || data.address?.county || location.district,
      block: data.address?.suburb || data.address?.town || data.address?.village || location.block,
    };
  };
  const useCurrentLocation = () => {
    navigator.geolocation?.getCurrentPosition(async ({ coords }) => {
      const lat = Number(coords.latitude.toFixed(4));
      const lon = Number(coords.longitude.toFixed(4));
      try {
        const place = await reverseGeocode(lat, lon);
        update(lat, lon, place.district, place.block);
      } catch {
        update(lat, lon);
      }
    });
  };
  const update = (lat: number, lon: number, district = location.district, block = location.block) => { const next = { ...location, lat, lon, district, block }; setLocation(next); onChange(next); };
  const labels = language === 'hi' ? { gps: 'वर्तमान स्थान का उपयोग करें', radius: 'हरा रडार क्षेत्र: 500 मीटर PostGIS उम्मीदवार क्षेत्र। पिन खींचकर स्थान ठीक करें।' } : language === 'sat' ? { gps: 'ᱱᱤᱛᱚᱜ ᱴᱷᱟᱶ ᱵᱮᱣᱦᱟᱨ ᱢᱮ', radius: 'ᱦᱟᱨᱤᱭᱟᱲ ᱨᱟᱰᱟᱨ ᱡᱚᱱ: ᱕᱐᱐ ᱢᱤᱴᱟᱨ PostGIS ᱴᱷᱟᱶ᱾ ᱯᱤᱱ ᱚᱨ ᱠᱟᱛᱮ ᱴᱷᱟᱶ ᱴᱷᱤᱠ ᱢᱮ᱾' } : { gps: 'Use current location', radius: 'Green radar zone: 500 m PostGIS candidate radius. Drag the marker to refine.' };
  return <div className="space-y-3"><div className="relative z-0 h-72 overflow-hidden rounded-2xl border border-slate-300"><MapContainer center={[location.lat, location.lon]} zoom={11} scrollWheelZoom className="h-full w-full"><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Recenter location={location} /><Marker position={[location.lat, location.lon]} icon={markerIcon} draggable eventHandlers={{ dragend: (event) => { const marker = event.target as L.Marker; const point = marker.getLatLng(); update(point.lat, point.lng); } }} /><Circle center={[location.lat, location.lon]} radius={500} pathOptions={{ color: '#059669', fillColor: '#10b981', fillOpacity: .18, className: 'jagrit-radar-pulse' }} /></MapContainer></div><div className="flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-900"><MapPin className="h-3.5 w-3.5" /> {location.district}, {location.block}, {location.panchayat}</span><button type="button" onClick={useCurrentLocation} className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700"><Navigation className="h-3.5 w-3.5" /> {labels.gps}</button></div><p className="text-[11px] text-slate-500">{labels.radius}</p></div>;
}