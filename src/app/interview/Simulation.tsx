'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/queries/user/userApi';
import { End, Ready, Stacks, Start } from '@/widgets/interview';

export type InterviewStatus = 'stacks' | 'ready' | 'start' | 'end';

const Simulation = ({}) => {
  const router = useRouter();
  const [status, setStatus] = useState<InterviewStatus>('stacks');
  const { data: isLogin, isFetched } = useUserInfo();

  useEffect(() => {
    if (isFetched && !isLogin) {
      router.push('/signin');
    }
  }, [isFetched, isLogin, router]);

  let content = <Stacks onChangeStatus={setStatus} />;

  if (status === 'ready') {
    content = <Ready onChangeStatus={setStatus} />;
  } else if (status === 'start') {
    content = <Start handleInterviewStatus={setStatus} />;
  } else if (status === 'end') {
    content = <End />;
  }

  return (
    <div className={styles.wrap}>
      <main className={styles.layout}>
        <div className={styles.simulation_layout}>{content}</div>
      </main>
    </div>
  );
};

export default Simulation;
