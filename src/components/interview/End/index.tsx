'use client';

import { useRouter } from 'next/navigation';
import styles from './End.module.scss';
import { PiHandsClappingFill } from 'react-icons/pi';

export const End = () => {
  const router = useRouter();

  return (
    <>
      <PiHandsClappingFill size="106px" color="#fff" />
      <p className={styles.description}>
        면접이 모두 종료되었습니다
        <br /> 수고하셨습니다 :)
      </p>
      <button className={styles.end_btn} onClick={() => router.push('/')}>
        종료
      </button>
    </>
  );
};
