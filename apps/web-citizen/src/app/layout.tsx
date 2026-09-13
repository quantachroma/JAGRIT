import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CitizenProvider } from '@/context/CitizenContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    <html lang="hi" className="overflow-x-hidden">
      <body className="bg-slate-50/50 text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full max-w-full">
        <CitizenProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-6 overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </CitizenProvider>
      </body>
    </html>
  );
}
