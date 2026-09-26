'use client';

import React from 'react';
import GovtSidebar from '@/components/government/GovtSidebar';

export default function InstitutionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50/70">
      <GovtSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}