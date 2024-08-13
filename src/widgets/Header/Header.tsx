'use client';

import styles from './Header.module.scss';
import logo from '../../../public/Logo.png';
import Image from 'next/image';
import { useUserInfo } from '@/queries/user/userApi';
import Link from 'next/link';
import { UserProfile } from '@/components/user';
import { FaRegUserCircle } from 'react-icons/fa';
import { useEffect } from 'react';

const Header = () => {
  const { data: userData, isLoading, isError } = useUserInfo();

  useEffect(() => {
    if (userData) {
      localStorage.setItem('profileImg', userData?.profileImg);
    }
  }, [userData]);

  const userContent =
    isLoading && !userData ? <FaRegUserCircle size={32} /> : <UserProfile isError={isError} />;

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
      <div className={styles.menu}>{userContent}</div>
    </header>
  );
};

export default Header;
