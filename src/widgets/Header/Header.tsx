'use client';

import styles from './Header.module.scss';
import logo from '../../../public/Logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/shared/store/userStore';
import { UserProfile } from '@/components/user';

const Header = () => {
  return (
    <header className={styles.layout}>
      <nav className={styles.nav}>
        <Link href="/">
          <li className={styles.logo}>
            <Image src={logo} alt="logo" />
            <p>떨면뭐하니</p>
          </li>
        </Link>
      </nav>
      <UserProfile />
    </header>
  );
};

export default Header;
