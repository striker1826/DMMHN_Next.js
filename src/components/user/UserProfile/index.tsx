'use client';

// import 'regenerator-runtime/runtime';
import styles from './UserProfile.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from '@/shared/utils/cookies';

export const UserProfile = () => {
  const profileImg = getCookie('profileImg');

  return (
    <>
      {profileImg ? (
        <>
          <Image
            src={profileImg}
            className={styles.profile_img}
            width={32}
            height={32}
            alt="profile"
          />
        </>
      ) : (
        <Link href="/signin">
          <div className={styles.login}>
            <p>로그인</p>
          </div>
        </Link>
      )}
    </>
  );
};
