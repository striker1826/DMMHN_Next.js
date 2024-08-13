'use client';

// import 'regenerator-runtime/runtime';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './UserProfile.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/shared/store/userStore';

export const UserProfile = () => {
  const { userProfileImg } = useUserStore();

  return (
    <>
      {userProfileImg ? (
        <>
          <Image
            src={userProfileImg}
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
