'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const lang = searchParams.get('lang');
    const role = searchParams.get('role');
    const redirect = searchParams.get('redirect');

    const params = new URLSearchParams();
    params.set('login', 'true');
    if (lang) params.set('lang', lang);
    if (role) params.set('role', role);
    if (redirect) params.set('redirect', redirect);

    router.replace(`/?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <div className="text-center space-y-3">
      <div className="w-10 h-10 border-3 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-xs font-extrabold uppercase tracking-wider text-amber-200">
        Redirecting to JAGRIT Single Sign-On...
      </p>
    </div>
  );
}

export default function LoginPageRedirect() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#051120] text-sky-100">
      <Suspense fallback={
        <div className="w-10 h-10 border-3 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
      }>
        <LoginRedirectContent />
      </Suspense>
    </div>
  );
}
