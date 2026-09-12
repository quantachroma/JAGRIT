import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6">
      <h1 className="text-xl font-bold">Institution sign-in</h1>
      <p className="mt-1 text-sm text-slate-600">Stage 0 mock only. Continue to the discovery feed.</p>
      <Link href="/dashboard" className="mt-4 block rounded-lg bg-[#0F172A] px-4 py-2 text-center text-sm font-semibold text-white">
        Continue to dashboard
      </Link>
    </div>
  );
}
