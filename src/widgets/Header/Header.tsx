import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import { cookies } from 'next/headers';
import { UserProfileHamburger } from '@/components/user/UserProfile';

const Header = () => {
  const cookieStore = cookies();
  const profileImg = cookieStore.get('profileImg')?.value;
  const accessToken = cookieStore.get('accessToken')?.value;

  return (
    <header className={styles.layout}>
      <nav className={styles.nav}>
        <Link href={accessToken ? '/interview' : '/'} className={styles.logo_container}>
          <div className={styles.logo_image}>
            <Image fill src="/Logo.png" alt="logo" />
          </div>
          <p className={styles.logo_text}>떨면뭐하니</p>
        </Link>
        {profileImg && accessToken && <UserProfileHamburger profileImg={profileImg} />}
      </nav>
    </header>
  );
};

export default Header;
