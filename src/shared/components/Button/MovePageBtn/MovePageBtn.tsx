'use client';

import React from 'react';
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
    <button
      className={`py-[18px] w-full rounded-[42.5px] bg-[#fff9c1] text-[#025729] text-[24px] r-lg:text-[40px] font-[700] hover:bg-[#d3ce9f] transition-colors duration-100 ease-in-out`}
      onClick={() => handleMovePage(route)}
    >
      시작하기
    </button>
  );
};

export default MovePageBtn;
