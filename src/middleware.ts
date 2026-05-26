import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const LOCALES = ['en', 'ru', 'de', 'tr'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files, API, next internals
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico'
  ) {
    return;
  }

  // Check if pathname starts with a locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // If visiting root '/', serve the splash page directly (do not redirect)
  if (pathname === '/') {
    return;
  }

  // Redirect other unlocalized paths to /en/[path]
  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Apply middleware to all paths except Next.js internals and APIs
    '/((?!_next|api|favicon.ico).*)',
  ],
};
