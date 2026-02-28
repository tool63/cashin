import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routePatterns } from '@/lib/seo';

const ALWAYS_NOINDEX = [
  '/api/',
  '/admin/',
  '/private/',
  '/_next/',
  '/static/',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const shouldNoindex = checkNoindex(pathname);

  if (shouldNoindex) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  return NextResponse.next();
}

function checkNoindex(pathname: string): boolean {
  if (ALWAYS_NOINDEX.some(path => pathname.startsWith(path))) {
    return true;
  }

  for (const { pattern, seo } of routePatterns) {
    if (seo.noIndex) {
      if (typeof pattern === 'string' && pattern === pathname) {
        return true;
      }
      if (pattern instanceof RegExp && pattern.test(pathname)) {
        return true;
      }
    }
  }

  if (pathname.includes('?') && (
    pathname.includes('utm_') ||
    pathname.includes('fbclid') ||
    pathname.includes('gclid')
  )) {
    return true;
  }

  return false;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
