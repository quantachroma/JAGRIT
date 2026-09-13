import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CitizenProvider } from '@/context/CitizenContext';
import GlobalRoleNav from '@/components/global-role-nav';
import Footer from '@/components/Footer';
import AIAssistantDrawer from '@/components/ai-assistant-drawer';

export const metadata: Metadata = {
  title: '🏛️ JAGRIT Jharkhand — Societal Innovation Collaboration Platform',
  description:
    'Department of Higher & Technical Education (DHTE), Government of Jharkhand. Jharkhand Academic & Grassroots Resolution for Innovation and Transformation.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1E3A8A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="bg-slate-50/70 text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full max-w-full">
        <LanguageProvider>
          <CitizenProvider>
            {/* Sticky Top Navigation Bar with Pure Blue/White Theme */}
            <GlobalRoleNav />

            {/* Main Application Canvas */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-6 overflow-x-hidden">
              {children}
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Global Floating AI Copilot Drawer */}
            <AIAssistantDrawer />
          </CitizenProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
