export default function RoundPage({ params }: { params: { id: string } }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <h1 className="text-xl font-bold">Round 1 · Proposal · {params.id}</h1>
      <p className="mt-1 text-sm text-slate-600">Stage 0 placeholder. Bidding and proposal workspace lands in Stage 2.</p>
    </div>
  );
}
