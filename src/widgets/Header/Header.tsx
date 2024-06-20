'use client';

import styles from './Header.module.scss';
import logo from '../../../public/Logo.png';
import Image from 'next/image';
import { userApi } from '@/api/user/userApi';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { UserProfile } from '@/components/user';

const Header = () => {
  const { data: userData, isLoading } = useQuery(userApi.queryOptions());

  const userContent = isLoading ? <div>...loading</div> : <UserProfile userData={userData!} />;

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
