import type { Metadata } from 'next';
import './globals.css';
import { CitizenProvider } from '@/context/CitizenContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'JAGRIT — Jharkhand Societal Innovation Collaboration Portal',
  description: 'Empowering rural Jharkhand communities through Higher Education R&D and Civic Collaboration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body className="bg-white text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <CitizenProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-600 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
              <p className="font-semibold text-primary">
                जागृत (JAGRIT) — Jharkhand Societal Innovation Collaboration Portal
              </p>
              <p className="text-xs text-slate-500">
                Department of Higher & Technical Education, Government of Jharkhand | NEP 2020 & PESA 1996 Aligned
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-slate-400 pt-2">
                <span>Ranchi • Dhanbad • Jamshedpur • Dumka • Hazaribagh</span>
              </div>
            </div>
          </footer>
        </CitizenProvider>
      </body>
    </html>
  );
}

