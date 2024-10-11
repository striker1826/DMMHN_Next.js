import { NextRequest, NextResponse } from 'next/server';
import { apiInstance } from './shared/utils/axios';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Avoid redirect loops for specific routes
  if (pathname === '/signin' || pathname === '/mobile-page') {
    return NextResponse.next();
  }

  const userAgent = req.headers.get('user-agent') || '';
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
    userAgent,
  );

  if (isMobile) {
    return NextResponse.redirect(new URL('/mobile-page', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Apply to all routes
};
