'use client';

import styles from './page.module.scss';
import { useKakaoLogin } from '@/queries/auth/kakaoLogin';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
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
  if (!code) {
    code = '';
  }

  const { isError } = useKakaoLogin({ code });

  if (isError) {
    alert('로그인에 실패했습니다.');
    router.push('/');
    return;
  }

  router.push('/');

  return (
    <div className={styles.spinnerWrapper}>
      <MoonLoader color="#02592A" loading speedMultiplier={0} />
    </div>
  );
};

export default page;
