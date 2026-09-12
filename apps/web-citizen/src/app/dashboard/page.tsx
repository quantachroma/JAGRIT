'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import {
  LayoutDashboard,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ThumbsUp,
  AlertTriangle,
  ExternalLink,
  MapPin,
  ArrowRight,
} from 'lucide-react';

interface MockTicket {
  id: string;
  title: string;
  category: string;
  location: string;
  status: 'PENDING_HITL' | 'ROUTED_CIVIC' | 'OPEN_FOR_BIDS' | 'DYNAMIC_HACKATHON' | 'IN_PILOT' | 'RESOLVED';
  upvotes: number;
  date: string;
  description: string;
}

export default function DashboardPage() {
  const { t, language } = useCitizen();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const mockTickets: MockTicket[] = [
    {
      id: 'JAG-2026-RAN-0104',
      title: language === 'hi' ? 'कांके ब्लॉक में चापाकल मरम्मत' : language === 'sat' ? 'ᱪᱟᱯᱟᱠᱚᱞ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ' : 'Handpump Repair in Kanke Block',
      category: 'drinking_water',
      location: 'Ranchi, Kanke Panchayat',
      status: 'PENDING_HITL',
      upvotes: 14,
      date: '12 Sep 2026',
      description: 'Handpump non-functional for 3 months. Suspected subsurface silt blockage.',
    },
    {
      id: 'JAG-2026-DHN-0089',
      title: language === 'hi' ? 'तोपचांची में सोलर माइक्रोग्रिड इन्वर्टर खराबी' : language === 'sat' ? 'ᱥᱮᱸᱜᱮᱞ ᱵᱤᱡᱞᱤ ᱠᱷᱟᱹᱢᱤ' : 'Solar Microgrid Inverter Failure in Topchanchi',
      category: 'electricity',
      location: 'Dhanbad, Topchanchi',
      status: 'DYNAMIC_HACKATHON',
      upvotes: 38,
      date: '02 Sep 2026',
      description: 'BIT Sindri team prototype in Stage 2 mentoring with Tata Steel CSR.',
    },
    {
      id: 'JAG-2026-DUM-0042',
      title: language === 'hi' ? 'शिकारीपाड़ा में जल संचयन चेकडैम डिसिल्टिंग' : language === 'sat' ? 'ᱫᱟᱜ ᱯᱟᱴᱟᱣ ᱪᱮᱠᱰᱮᱢ' : 'Checkdam Desilting & Filtration in Shikaripara',
      category: 'agriculture',
      location: 'Dumka, Shikaripara',
      status: 'IN_PILOT',
      upvotes: 52,
      date: '18 Aug 2026',
      description: '45-Day Maturation testing underway. Gram Sabha quorum voting open.',
    },
    {
      id: 'JAG-2026-HZB-0012',
      title: language === 'hi' ? 'इचाक प्राथमिक विद्यालय छत मरम्मत एवं जल निकासी' : language === 'sat' ? 'ᱤᱥᱠᱩᱞ ᱚᱲᱟᱜ ᱢᱟᱨᱟᱢᱚᱛ' : 'School Roof Repair & Drainage at Ichak',
      category: 'education',
      location: 'Hazaribagh, Ichak',
      status: 'RESOLVED',
      upvotes: 89,
      date: '25 Jul 2026',
      description: 'Completed and verified by Gram Sabha PESA Act NOC.',
    },
  ];

  const getStatusBadge = (status: MockTicket['status']) => {
    switch (status) {
      case 'PENDING_HITL':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3 text-amber-700" />
            {t('dashboard.statuses', 'PENDING_HITL', 'Pending HITL')}
          </span>
        );
      case 'DYNAMIC_HACKATHON':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            {t('dashboard.statuses', 'DYNAMIC_HACKATHON', 'Hackathon Solution')}
          </span>
        );
      case 'IN_PILOT':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3 text-blue-700" />
            {t('dashboard.statuses', 'IN_PILOT', 'Field Pilot (45-Day)')}
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            {t('dashboard.statuses', 'RESOLVED', 'Resolved & Approved')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || ticket.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#044728]" />
            <span>{t('dashboard', 'title', 'My Grievances & Civic Progress')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t('dashboard', 'subtitle', 'Track your registered issues through AI triage, University Hackathons, and Gram Sabha verification.')}
          </p>
        </div>

        <Link
          href="/report"
          className="inline-flex items-center justify-center space-x-2 bg-[#044728] hover:bg-[#03361e] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm self-start sm:self-auto"
        >
          <span>+ {language === 'hi' ? 'नई समस्या दर्ज करें' : language === 'sat' ? 'ᱱᱟᱣᱟ ᱥᱚᱢᱚᱥᱭᱟ ᱚᱞ' : 'Report Issue'}</span>
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('dashboard', 'searchPlaceholder', 'Search by ticket ID or village...')}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044728]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#044728]"
          >
            <option value="ALL">All Domains / श्रेणियां</option>
            <option value="drinking_water">Drinking Water / पेयजल</option>
            <option value="electricity">Electricity / बिजली</option>
            <option value="agriculture">Agriculture / कृषि</option>
            <option value="education">Education / शिक्षा</option>
          </select>
        </div>
      </div>

      {/* Ticket List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 shadow-sm space-y-3 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-[#044728] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {ticket.id}
                </span>
                <span className="text-xs text-slate-400">• {ticket.date}</span>
              </div>
              <div>{getStatusBadge(ticket.status)}</div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{ticket.title}</h3>
              <p className="text-xs text-slate-600 mt-1">{ticket.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{ticket.location}</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center space-x-1 text-slate-700 font-medium">
                  <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                  <span>{ticket.upvotes} {t('dashboard', 'upvotes', 'Upvotes')}</span>
                </span>

                <Link
                  href="/time-machine"
                  className="inline-flex items-center space-x-1 text-[#044728] font-semibold hover:underline"
                >
                  <span>{language === 'hi' ? 'सत्यापन देखें' : language === 'sat' ? 'ᱥᱟᱹᱨᱤ ᱧᱮᱞ' : 'View Quorum'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

