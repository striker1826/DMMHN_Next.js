import { NextRequest, NextResponse } from 'next/server';

export function protectRoute({ req, route }: { req: NextRequest; route: string }) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith(`/${route}`)) {
    const accessToken = req.cookies.get('accessToken');

    if (!accessToken || accessToken.toString().length < 1) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }

  return NextResponse.next();
}
