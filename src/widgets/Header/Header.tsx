'use client';

import styles from './Header.module.scss';
import logo from '../../../public/Logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const Header = () => {
  let profileImg;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    profileImg = localStorage.getItem('profileImg');
  }, []);

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
      <div className={styles.menu}>{profileImg}</div>
    </header>
  );
};

export default Header;
