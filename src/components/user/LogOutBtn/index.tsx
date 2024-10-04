'use client';

import { useRouter } from 'next/navigation';
import { removeCookie } from '@/shared/utils/cookies';
import styles from './LogOutBtn.module.scss';

export const LogOutBtn = () => {
  const router = useRouter();

  const handleLogout = () => {
    removeCookie('accessToken', '/');
    removeCookie('profileImg', '/');
    router.refresh();
  };
  return (
    <button type="submit" className={styles.logout_btn} onClick={handleLogout}>
      로그아웃
    </button>
  );
};
