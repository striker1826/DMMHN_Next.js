'use client';

import styles from './page.module.scss';
import { useKakaoLogin } from '@/queries/auth/kakaoLogin';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

const page = () => {
  return (
    <Suspense
      fallback={
        <div className={styles.spinnerWrapper}>
          <MoonLoader color="#02592A" loading speedMultiplier={0} />
        </div>
      }
    >
      <KakaoRedirectComponent />
    </Suspense>
  );
};

const KakaoRedirectComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let code = searchParams.get('code');

  const { data, isLoading, isError } = useKakaoLogin({ code: code || '' });

  useEffect(() => {
    if (isError) {
      alert('로그인에 실패했습니다.');
      router.push('/');
      return;
    }

    if (data) {
      localStorage.setItem('profileImg', data?.user.profileImg);
    }
  }, [isLoading, data, isError, router]);

  router.push('/');

  return (
    <div className={styles.spinnerWrapper}>
      <MoonLoader color="#02592A" loading speedMultiplier={0} />
    </div>
  );
};

export default page;
