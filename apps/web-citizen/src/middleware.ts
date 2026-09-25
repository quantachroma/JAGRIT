import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = [
  '/dashboard',
  '/pledge-support',
  '/university',
  '/industry',
  '/government',
  '/feedback',
  '/samvaad',
  '/repository',
  '/time-machine',
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected) {
    const sessionCookie = request.cookies.get('jagrit_session')?.value;
    let isAuthenticated = false;

    if (sessionCookie) {
      try {
        const decoded = decodeURIComponent(sessionCookie);
        const parsed = JSON.parse(decoded);
        if (parsed && (parsed.role || parsed.isAuthenticated || parsed.email || parsed.phone)) {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated) {
      let role = 'citizen';
      if (pathname.startsWith('/university')) {
        role = 'university';
      } else if (pathname.startsWith('/industry')) {
        role = 'industry';
      } else if (pathname.startsWith('/government')) {
        role = 'govt';
      }

      const redirectUrl = new URL('/', request.url);
      redirectUrl.searchParams.set('login', 'true');
      redirectUrl.searchParams.set('role', role);
      redirectUrl.searchParams.set('redirect', pathname + search);

      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/pledge-support/:path*',
    '/university/:path*',
    '/industry/:path*',
    '/government/:path*',
    '/feedback/:path*',
    '/samvaad/:path*',
    '/repository/:path*',
    '/time-machine/:path*',
  ],
};

