import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CitizenProvider } from '@/context/CitizenContext';
import AppLayoutWrapper from '@/components/AppLayoutWrapper';

export const metadata: Metadata = {
  title: 'JAGRIT — Jharkhand Societal Innovation Collaboration Portal',
  description: 'Empowering rural Jharkhand communities through Higher Education R&D and Civic Collaboration.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1D4ED8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="bg-slate-50/50 text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full max-w-full">
        <LanguageProvider>
          <CitizenProvider>
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
          </CitizenProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
