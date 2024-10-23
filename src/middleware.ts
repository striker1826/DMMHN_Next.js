import { NextRequest, NextResponse, userAgent } from 'next/server';
import { apiInstance } from '@/shared/utils/axios';

const PROTECTED_PATHS = ['/interview'];

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const kakao_code = searchParams.get('code');

  const accessToken = req.cookies.get('accessToken')?.value;
  const oneDay = 24 * 60 * 60 * 1000;

  const { device, browser } = userAgent(req);
  console.log(device, browser);

  const isMobile = device.type === 'mobile';
  const isChrome = browser.name === 'Chrome';

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

  // 모바일로 접근 시 안내 페이지로 리다이렉트합니다.
  if (isMobile) {
    return NextResponse.redirect(new URL('/mobile-page', req.url));
  }

  // 크롬이 아닌 브라우저로 접근 시 안내 페이지로 리다이렉트합니다.
  if (!isChrome) {
    return NextResponse.redirect(new URL('/browser-not-supported', req.url));
  }

  // 보호 경로에 접근 시 토큰이 없는 경우 비보호 경로로 리다이렉트 합니다.
  if (PROTECTED_PATHS.includes(pathname) && !accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path', '/interview/:path', '/api/:path*'],
};
