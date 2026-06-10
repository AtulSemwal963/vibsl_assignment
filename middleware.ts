import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('session_token');

  // If user has a session token and visits the landing page or onboarding, redirect to dashboard
  if (sessionToken?.value && (pathname === '/' || pathname === '/onboarding')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/onboarding'],
};
