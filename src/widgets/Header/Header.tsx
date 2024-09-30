import Image from 'next/image';
import Link from 'next/link';
import { LogInBtn, UserProfile } from '@/components/user';
import styles from './Header.module.scss';
import { cookies } from 'next/headers';

const Header = () => {
  const cookieStore = cookies();
  const profileImg = cookieStore.get('profileImg')?.value;

  return (
    <header className={styles.layout}>
      <nav className={styles.nav}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src="/Logo.png" width={70} height={70} alt="logo" />
            <p>떨면뭐하니</p>
          </div>
        </Link>
      </nav>
      {profileImg ? <UserProfile profileImg={profileImg} /> : <LogInBtn />}
    </header>
  );
};

export default Header;
