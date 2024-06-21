'use client';

import { authApi } from '@/api/auth/kakaoLogin';
/* eslint-disable react-hooks/rules-of-hooks */

import { setCookie } from '@/shared/utils/cookies';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const page = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <KakaoRedirectComponent />
    </Suspense>
  );
};

const KakaoRedirectComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  if (!code) {
    router.push('/');
    return;
  }

  const { data, isFetched } = useQuery(authApi.queryOptions({ code }));
  console.log(process.env.KAKAO_CLIENT_ID);
  console.log(process.env.REDIRECT_URI);

  useEffect(() => {
    if (isFetched && data) {
      if (data.access_token) {
        const access_token = data?.access_token;
        setCookie('token', access_token);
        router.push('/');
      } else {
        alert('로그인 실패');
        router.push('/signin');
      }
    }
  }, [isFetched, data, router]);

  return <div>redirect</div>;
};

export default page;
