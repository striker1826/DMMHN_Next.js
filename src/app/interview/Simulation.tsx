'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserInfo } from '@/queries/user/userApi';
import { End, Ready, Stacks, Start } from '@/widgets/interview';
import { Stack } from '@/shared/types/stack';
import styles from './page.module.scss';

export type InterviewStatus = 'stacks' | 'ready' | 'start' | 'end';

interface Props {
  stacks: Stack[];
}

const Simulation = ({ stacks }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<InterviewStatus>('stacks');
  const { data: isLogin, isFetched } = useUserInfo();

  useEffect(() => {
    if (isFetched && !isLogin) {
      router.push('/signin');
    }

    if (!searchParams.has('stacks')) {
      setStatus('stacks');
      router.push('/interview');
    }
  }, [isFetched, isLogin, router, searchParams]);

  let content = <Stacks stacks={stacks} onChangeStatus={setStatus} />;

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
