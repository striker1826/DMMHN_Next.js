import { NextRequest, NextResponse, userAgent } from 'next/server';
import { apiInstance } from '@/shared/utils/axios';
import { cookies } from 'next/headers';

const PROTECTED_PATHS = ['/interview'];
const ONE_DAY_PER_SEC = 24 * 60 * 60;

export async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const { pathname, searchParams } = req.nextUrl;

  const kakao_code = searchParams.get('code');

  const accessToken = req.cookies.get('accessToken')?.value;

  const { device, browser } = userAgent(req);

  const isMobile = device.type === 'mobile';
  const isChrome = browser.name === 'Chrome';

  // 카카오 인증
  if (kakao_code) {
    try {
      const response: unknown = await apiInstance.post('/auth/v2/kakao', {
        code: kakao_code,
        context: process.env.KAKAO_REDIRECT_URI,
      });
      const { access_token, user, isEmail } = response as {
        access_token: string;
        user: { profileImg: string };
        isEmail: boolean;
      };

      let res;
      if (!isEmail) {
        res = NextResponse.redirect(new URL('/verify', req.url));
      } else {
        res = NextResponse.redirect(new URL('/interview', req.url));
      }

      res.cookies.set('accessToken', access_token, {
        maxAge: ONE_DAY_PER_SEC,
      });
      res.cookies.set('profileImg', user.profileImg, {
        maxAge: ONE_DAY_PER_SEC,
      });

      return res;
    } catch (error) {
      console.error('로그인 처리 중 오류 발생:', error);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 모바일로 접근 시 안내 페이지로 리다이렉트합니다.
  // if (isMobile) {
  //   return NextResponse.redirect(new URL('/mobile-page', req.url));
  // }

  // 크롬이 아닌 브라우저로 접근 시 안내 페이지로 리다이렉트합니다.
  // if (!isChrome) {
  //   return NextResponse.redirect(new URL('/browser-not-supported', req.url));
  // }

  // 토큰이 있으면 인터뷰 페이지로 리다이렉트합니다.
  if (pathname === '/' && accessToken) {
    return NextResponse.redirect(new URL('/interview', req.url));
  }

  // 보호 경로에 접근 시 토큰이 없는 경우 비보호 경로로 리다이렉트 합니다.
  if (PROTECTED_PATHS.includes(pathname) && !accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (PROTECTED_PATHS.includes(pathname) && accessToken) {
    console.log('accessToken', accessToken);
    const res = await fetch(`${process.env.BASE_URL}/auth/login/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('res', res.ok);
    if (!res.ok) {
      let res;
      res = NextResponse.redirect(new URL('/', req.url));
      res.cookies.delete('accessToken');
      res.cookies.delete('profileImg');
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|browser-not-supported|mobile-page).*)'],
};
