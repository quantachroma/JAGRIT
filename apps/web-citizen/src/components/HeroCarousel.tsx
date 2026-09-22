'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Camera, Mic, ShieldCheck, Sparkles } from 'lucide-react';

export type HeroPillar = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  icon: 'voice' | 'research' | 'quorum';
  stat: string;
  statLabel: string;
};

const icons = { voice: Mic, research: Sparkles, quorum: ShieldCheck };

export default function HeroCarousel({ pillars }: { pillars: HeroPillar[] }) {
  const [active, setActive] = useState(0);
  const pillar = pillars[active];
  const Icon = icons[pillar.icon];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % pillars.length), 6500);
    return () => window.clearInterval(timer);
  }, [pillars.length]);

  return (
    <section aria-label="JAGRIT core pillars" className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#10243b] text-white shadow-2xl shadow-slate-950/30">
      <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-90`} />
      <div className="relative grid min-h-[22rem] items-end gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_14rem]">
        <AnimatePresence mode="wait">
          <motion.div key={pillar.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="max-w-2xl">
            <div className="mb-7 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25"><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="text-xs font-black uppercase tracking-[0.2em] text-white/75">{pillar.eyebrow}</span></div>
            <h2 className="max-w-xl text-3xl font-black leading-[1.05] tracking-[-0.03em] sm:text-5xl">{pillar.title}</h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base">{pillar.description}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-end justify-between gap-4 lg:flex-col lg:items-end lg:justify-end"><div className="text-left lg:text-right"><div className="text-4xl font-black tracking-[-0.05em]">{pillar.stat}</div><div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">{pillar.statLabel}</div></div><div className="flex gap-2" role="tablist" aria-label="Choose JAGRIT pillar">{pillars.map((item, index) => <button key={item.title} type="button" role="tab" aria-selected={index === active} aria-label={`Show ${item.eyebrow}`} onClick={() => setActive(index)} className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${index === active ? 'w-10 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`} />)}</div></div>
      </div>
      <div className="absolute right-7 top-7 hidden items-center gap-2 text-xs font-bold text-white/60 sm:flex"><Camera className="h-4 w-4" aria-hidden="true" /> Voice + photo first <ArrowRight className="h-4 w-4" aria-hidden="true" /></div>
    </section>
  );
}