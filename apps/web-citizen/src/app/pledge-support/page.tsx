'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, HeartHandshake, MapPin, Search, ShieldCheck, Wrench } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type Resource = { id: number; name: string; description: string; location: string; availability: string; contactPreference: string };
const OPEN_TICKETS = [
  { id: 'JAG-2026-RAN-0104', title: 'Handpump Repair and Borewell Desilting in Kanke Ward 4' },
  { id: 'JAG-2026-KHU-0034', title: 'Post-Harvest Spoilage in Lac Produce' },
  { id: 'JAG-2026-WSH-0071', title: 'Solar Microgrid Voltage Drop in Rural Health Centre' },
];
const STORAGE_KEY = 'jagrit_pledge_support';

export default function PledgeSupportPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'donate' | 'resource'>('donate');
  const [amount, setAmount] = useState('500');
  const [customAmount, setCustomAmount] = useState('');
  const [note, setNote] = useState('');
  const [destination, setDestination] = useState('general');
  const [ticketSearch, setTicketSearch] = useState('');
  const [pledgedThisMonth, setPledgedThisMonth] = useState(12850);
  const [message, setMessage] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceForm, setResourceForm] = useState({ name: '', description: '', location: '', availability: '', contactPreference: 'Phone call' });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      setPledgedThisMonth(saved.pledgedThisMonth || 12850);
      setResources(saved.resources || []);
    } catch { /* Keep demo defaults when storage is malformed. */ }
  }, []);

  const matchingTickets = useMemo(() => {
    const query = ticketSearch.trim().toLowerCase();
    return (query ? OPEN_TICKETS.filter((ticket) => `${ticket.id} ${ticket.title}`.toLowerCase().includes(query)) : OPEN_TICKETS);
  }, [ticketSearch]);
  const persist = (nextPledged: number, nextResources: Resource[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify({ pledgedThisMonth: nextPledged, resources: nextResources }));

  const handleDonate = (event: FormEvent) => {
    event.preventDefault();
    const value = amount === 'custom' ? Number(customAmount) : Number(amount);
    if (!value || value <= 0) return;
    const nextTotal = pledgedThisMonth + value;
    setPledgedThisMonth(nextTotal);
    persist(nextTotal, resources);
    setMessage(`Thank you. Your ₹${value.toLocaleString('en-IN')} pledge has been recorded.`);
    setNote('');
  };

  const handleResource = (event: FormEvent) => {
    event.preventDefault();
    if (!resourceForm.name || !resourceForm.location || !resourceForm.availability) return;
    const nextResources = [{ id: Date.now(), ...resourceForm }, ...resources];
    setResources(nextResources);
    persist(pledgedThisMonth, nextResources);
    setResourceForm({ name: '', description: '', location: '', availability: '', contactPreference: 'Phone call' });
    setMessage('Resource listed in the directory. It is currently marked Unverified.');
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
            <HeartHandshake className="h-3.5 w-3.5" /> {t.pledgeSupport.communityBadge}
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{t.pledgeSupport.title}</h1>
          <p className="mt-1 text-sm font-medium text-slate-600">{t.pledgeSupport.subtitle}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-900">{t.pledgeSupport.pledgedThisMonth}</p>
          <p className="mt-1 text-3xl font-black tracking-tight text-blue-700">₹{pledgedThisMonth.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="flex gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-1 sm:w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('donate')}
          className={`rounded-xl px-5 py-3 text-xs font-bold transition-all ${activeTab === 'donate' ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-600 hover:text-blue-700'}`}
        >
          {t.pledgeSupport.tabDonate}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('resource')}
          className={`rounded-xl px-5 py-3 text-xs font-bold transition-all ${activeTab === 'resource' ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-600 hover:text-blue-700'}`}
        >
          {t.pledgeSupport.tabResource}
        </button>
      </div>

      {message && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          <CheckCircle2 className="h-4 w-4" />{message}
        </div>
      )}

      {activeTab === 'donate' ? (
        <form onSubmit={handleDonate} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div>
              <h2 className="text-lg font-black text-slate-900">{t.pledgeSupport.makePledgeTitle}</h2>
              <p className="mt-1 text-xs text-slate-500">{t.pledgeSupport.makePledgeSub}</p>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">{t.pledgeSupport.amountLabel}</label>
              <div className="grid grid-cols-4 gap-2">
                {['100', '500', '1000', 'custom'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    className={`rounded-xl border px-2 py-3 text-xs font-bold ${amount === value ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-200 text-slate-700 hover:border-blue-300'}`}
                  >
                    {value === 'custom' ? t.pledgeSupport.customLabel : `₹${value}`}
                  </button>
                ))}
              </div>
              {amount === 'custom' && (
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  placeholder={t.pledgeSupport.customPlaceholder}
                  className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                />
              )}
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">{t.pledgeSupport.noteLabel}</label>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                placeholder={t.pledgeSupport.notePlaceholder}
                className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"
            >
              {t.pledgeSupport.recordBtn}
            </button>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div>
              <h2 className="text-lg font-black text-slate-900">{t.pledgeSupport.destinationTitle}</h2>
              <p className="mt-1 text-xs text-slate-500">{t.pledgeSupport.destinationSub}</p>
            </div>
            <label className={`block rounded-2xl border p-4 ${destination === 'general' ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
              <input type="radio" checked={destination === 'general'} onChange={() => setDestination('general')} className="mr-3 accent-blue-700" />
              <span className="text-sm font-bold text-slate-800">{t.pledgeSupport.destGeneral}</span>
            </label>
            <label className={`block rounded-2xl border p-4 ${destination === 'ticket' ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
              <input type="radio" checked={destination === 'ticket'} onChange={() => setDestination('ticket')} className="mr-3 accent-blue-700" />
              <span className="text-sm font-bold text-slate-800">{t.pledgeSupport.destTicket}</span>
              {destination === 'ticket' && (
                <div className="mt-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      value={ticketSearch}
                      onChange={(event) => setTicketSearch(event.target.value)}
                      placeholder={t.pledgeSupport.searchTicketPlaceholder}
                      className="w-full rounded-xl border border-slate-300 py-2.5 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mt-2 space-y-1">
                    {matchingTickets.map((ticket) => (
                      <button
                        key={ticket.id}
                        type="button"
                        onClick={() => setTicketSearch(ticket.id)}
                        className="block w-full rounded-lg px-2 py-2 text-left text-[11px] text-slate-600 hover:bg-white"
                      >
                        <span className="font-bold text-blue-700">{ticket.id}</span> · {ticket.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </label>
          </section>
        </form>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <form onSubmit={handleResource} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div>
              <h2 className="text-lg font-black text-slate-900">{t.pledgeSupport.listResourceTitle}</h2>
              <p className="mt-1 text-xs text-slate-500">{t.pledgeSupport.listResourceSub}</p>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">{t.pledgeSupport.resourceName}</label>
              <input
                required
                value={resourceForm.name}
                onChange={(event) => setResourceForm({ ...resourceForm, name: event.target.value })}
                placeholder={t.pledgeSupport.resourceNamePlaceholder}
                className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">{t.pledgeSupport.locationLabel}</label>
              <input
                required
                value={resourceForm.location}
                onChange={(event) => setResourceForm({ ...resourceForm, location: event.target.value })}
                placeholder={t.pledgeSupport.locationPlaceholder}
                className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">{t.pledgeSupport.availabilityLabel}</label>
              <input
                required
                value={resourceForm.availability}
                onChange={(event) => setResourceForm({ ...resourceForm, availability: event.target.value })}
                placeholder={t.pledgeSupport.availabilityPlaceholder}
                className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">{t.pledgeSupport.descLabel}</label>
              <textarea
                value={resourceForm.description}
                onChange={(event) => setResourceForm({ ...resourceForm, description: event.target.value })}
                rows={3}
                placeholder={t.pledgeSupport.descPlaceholder}
                className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">{t.pledgeSupport.contactPrefLabel}</label>
              <select
                value={resourceForm.contactPreference}
                onChange={(event) => setResourceForm({ ...resourceForm, contactPreference: event.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option>Phone call</option>
                <option>WhatsApp message</option>
                <option>Email</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 px-4 py-3.5 text-sm font-bold text-white hover:bg-blue-800"
            >
              {t.pledgeSupport.listBtn}
            </button>
          </form>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">{t.pledgeSupport.directoryTitle}</h2>
                <p className="mt-1 text-xs text-slate-500">{t.pledgeSupport.directorySub}</p>
              </div>
              <Wrench className="h-5 w-5 text-blue-700" />
            </div>
            {resources.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                {t.pledgeSupport.noResources}
              </div>
            ) : (
              resources.map((resource) => (
                <article key={resource.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-slate-900">{resource.name}</h3>
                      <p className="mt-1 text-sm text-slate-600">{resource.description || 'Community resource available for local initiatives.'}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                      {t.pledgeSupport.unverifiedBadge}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-blue-600" />
                      {resource.location}
                    </span>
                    <span>{resource.availability}</span>
                    <span>{resource.contactPreference}</span>
                  </div>
                  <p className="mt-3 inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5" /> {t.pledgeSupport.verificationNotice}
                  </p>
                </article>
              ))
            )}
          </section>
        </div>
      )}
    </div>
  );
}