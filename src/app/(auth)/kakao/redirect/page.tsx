'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useKakaoLogin } from '@/models/auth/queries/kakaoLogin';
import { setCookie } from '@/shared/utils/cookies';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  if (!code) {
    router.push('/');
    return;
  }

  const { data, isFetched } = useKakaoLogin(code);

  useEffect(() => {
    if (isFetched) {
      const access_token = data?.data.access_token;
      setCookie('token', access_token);

      router.push('/');
    }
  }, [isFetched, data?.data, router]);
};

export default page;
