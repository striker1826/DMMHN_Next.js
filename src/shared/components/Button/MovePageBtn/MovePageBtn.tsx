'use client';

import React from 'react';
import styles from './MovePageBtn.module.scss';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/shared/utils/cookies';
import { modalStore } from '@/shared/store/modalStore';

interface Props {
  route: string;
}

const MovePageBtn = ({ route }: Props) => {
  const router = useRouter();
  const { setKey, openModal } = modalStore(); // openModal 추가

  const handleMovePage = (route: string) => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      setKey('login');
      openModal(); // 모달 열기
    } else {
      router.push(route);
    }
  };

  return (
    <button className={styles.interviewBtn} onClick={() => handleMovePage(route)}>
      시작하기
    </button>
  );
};

export default MovePageBtn;
