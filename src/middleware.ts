import { NextRequest, NextResponse } from 'next/server';
import { apiInstance } from '@/shared/utils/axios';

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const kakao_code = searchParams.get('code');
  const accessToken = req.cookies.get('accessToken')?.value;
  const oneDay = 24 * 60 * 60 * 1000;
  const userAgent = req.headers.get('user-agent') || '';
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
    userAgent,
  );

  // 모바일로 접근 시 안내페이지로 리다이렉트 합니다.
  if (isMobile) {
    return NextResponse.redirect(new URL('/mobile-page', req.url));
  }

  // / 은 비보호 경로입니다.
  if (pathname === '/') {
    return NextResponse.next();
  }

  // 토큰 없이 보호 경로에 접근시 비보호 경로로 리다이렉트 합니다.
  if (!accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 카카오 인증
  if (kakao_code) {
    try {
      const response: unknown = await apiInstance.post('/auth/v2/kakao', {
        code: kakao_code,
      });
      const { access_token, user } = response as {
        access_token: string;
        user: { profileImg: string };
      };

      const res = NextResponse.redirect(new URL('/', req.url));
      res.cookies.set('accessToken', access_token, { maxAge: oneDay });
      res.cookies.set('profileImg', user.profileImg, { maxAge: oneDay });

      return res;
    } catch (error) {
      console.error('로그인 처리 중 오류 발생:', error);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*', '/api/:path*'],
};
