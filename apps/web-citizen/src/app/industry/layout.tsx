import IndustryNavSidebar from '@/components/industry/IndustryNavSidebar';
import CsrAiAssistantDrawer from '@/components/industry/CsrAiAssistantDrawer';

export default function IndustryPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50/70 w-full overflow-hidden">
      <IndustryNavSidebar />
      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-8">{children}</main>
      <CsrAiAssistantDrawer />
    </div>
  );
}