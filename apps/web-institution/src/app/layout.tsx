import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/top-bar";
import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import CopilotPanel from "@/components/copilot-panel";
import { CopilotProvider } from "@/components/copilot-provider";
import { JuryProvider } from "@/components/jury-provider";

export const metadata: Metadata = {
  title: "JAGRIT Institution Portal",
  description: "Jharkhand Societal Innovation Collaboration Portal — Institutional R&D workspace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <CopilotProvider>
          <JuryProvider>
            <TopBar />
            <div className="mx-auto flex min-h-[calc(100vh-57px)] w-full max-w-[1400px] flex-col md:flex-row">
              <Sidebar />
              <main className="min-w-0 flex-1 px-4 py-6 pb-20 sm:px-6 md:pb-6 lg:px-8">{children}</main>
            </div>
            <MobileNav />
            <CopilotPanel />
          </JuryProvider>
        </CopilotProvider>
      </body>
    </html>
  );
}

