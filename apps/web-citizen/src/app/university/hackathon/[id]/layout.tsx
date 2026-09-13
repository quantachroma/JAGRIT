import ArenaStepper from "@/components/arena-stepper";

export default function HackathonArenaLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <div className="space-y-4">
      <ArenaStepper id={params.id} />
      {children}
    </div>
  );
}
