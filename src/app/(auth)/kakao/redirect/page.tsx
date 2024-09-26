'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/shared/store/userStore';
import { useKakaoLogin } from '@/queries/auth/kakaoLogin';
import { MoonLoader } from 'react-spinners';
import { setCookie } from '@/shared/utils/cookies';
import styles from './page.module.scss';

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
  const { setUserProfileImg } = useUserStore();
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
      const profileImg = data?.user.profileImg;
      setUserProfileImg(profileImg);
      setCookie('accessToken', data.access_token);
      router.push('/');
    }
  }, [isLoading, data, isError, router, setUserProfileImg]);

  return (
    <div className={styles.spinnerWrapper}>
      <MoonLoader color="#02592A" loading speedMultiplier={0} />
    </div>
  );
};

export default page;
