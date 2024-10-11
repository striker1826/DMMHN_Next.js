import React from 'react';
import styles from './page.module.scss';
import kakao_icon from '@/../public/KakaoTalk_logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.login_container}>
        <h1 className={styles.title}>카카오로 로그인</h1>
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`}
        >
          <Image className={styles.kakao_icon} src={kakao_icon} alt="kakao_icon" />
        </Link>
      </div>
    </div>
  );
};

export default page;
