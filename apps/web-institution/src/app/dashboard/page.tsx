import DashboardClient from "./dashboard-client";
import { openChallenges, grantSummary } from "@/lib/mock-data";

export default function DashboardPage() {
  return <DashboardClient challenges={openChallenges} summary={grantSummary} />;
}
