import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LogInBtn, LogOutBtn, UserProfile } from '@/components/user';
import styles from './Header.module.scss';

const Header = () => {
  const cookieStore = cookies();
  const profileImg = cookieStore.get('profileImg')?.value;
  const accessToken = cookieStore.get('accessToken')?.value;

  return (
    <header className={styles.layout}>
      <nav className={styles.nav}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src="/Logo.png" width={70} height={70} alt="logo" />
            <p>떨면뭐하니</p>
          </div>
        </Link>
        <div className={styles.profile}>
          {profileImg && accessToken && <UserProfile profileImg={profileImg} />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
