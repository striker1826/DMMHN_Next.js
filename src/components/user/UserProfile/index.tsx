import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './UserProfile.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  userData: User;
  isError: boolean;
}

export const UserProfile = ({ userData, isError }: Props) => {
  return (
    <>
      {userData || !isError ? (
        <>
          <Image
            className={styles.profile_img}
            src={userData.profileImg}
            width={32}
            height={32}
            alt="profile"
          />
          <button className={styles.hamburger}>
            <RxHamburgerMenu size={32} />
          </button>
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
