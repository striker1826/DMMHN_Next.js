'use client';

// import 'regenerator-runtime/runtime';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './UserProfile.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  isError: boolean;
}

export const UserProfile = ({ isError }: Props) => {
  const profileImg = localStorage.getItem('profileImg');

  return (
    <>
      {profileImg && !isError ? (
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
