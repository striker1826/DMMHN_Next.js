import { NextRequest, NextResponse } from 'next/server';
import { AxiosResponse } from 'axios';
import { apiInstance } from './shared/utils/axios';

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const code = searchParams.get('code');

  if (code) {
    try {
      // 카카오 API에 요청하여 사용자 정보 및 토큰 가져오기
      const response: unknown = await apiInstance.post('/auth/v2/kakao', {
        code,
      });
      const { access_token, user } = response as {
        access_token: string;
        user: { profileImg: string };
      };

      // 쿠키에 토큰 및 사용자 정보 저장
      const res = NextResponse.redirect(new URL('/', req.url));
      res.cookies.set('accessToken', access_token);
      res.cookies.set('profileImg', user.profileImg);

      // 홈 페이지로 리다이렉트
      return res;
    } catch (error) {
      console.error('로그인 처리 중 오류 발생:', error);
      return NextResponse.redirect(new URL('/', req.url)); // 오류 페이지로 리다이렉트
    }
  }

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
  matcher: ['/:path*', '/api/:path*'],
};
