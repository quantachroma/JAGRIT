import DedicatedUniversitySidebar from '@/components/university/DedicatedUniversitySidebar';
import HeiaiAssistantDrawer from '@/components/university/HeiaiAssistantDrawer';

export default function UniversityPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50/70 w-full overflow-hidden">
      <DedicatedUniversitySidebar />
      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-8">{children}</main>
      <HeiaiAssistantDrawer />
    </div>
  );
}