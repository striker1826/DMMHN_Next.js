import { NextRequest, NextResponse } from 'next/server';
import { apiInstance } from '@/shared/utils/axios';
import { protectRoute } from '@/shared/utils/protectRoute';

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const code = searchParams.get('code');

  if (code) {
    try {
      const response: unknown = await apiInstance.post('/auth/v2/kakao', {
        code,
      });
      const { access_token, user } = response as {
        access_token: string;
        user: { profileImg: string };
      };

      const res = NextResponse.redirect(new URL('/', req.url));
      res.cookies.set('accessToken', access_token);
      res.cookies.set('profileImg', user.profileImg);

      return res;
    } catch (error) {
      console.error('로그인 처리 중 오류 발생:', error);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  const protectResponse = protectRoute({ req, route: 'interview' });
  if (protectResponse) return protectResponse;

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
  matcher: ['/:path*', '/api/:path*'],
};
