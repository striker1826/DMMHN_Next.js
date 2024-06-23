'use client';

import { End, Ready, Start } from '@/components/interview';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/api/user/userApi';

export const Simulation = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'ready' | 'start' | 'end'>('ready');
  const { data: isLogin, isFetched } = useQuery(userApi.queryOptions());

  useEffect(() => {
    if (isFetched && !isLogin) {
      router.push('/signin');
    }
  }, [isFetched, isLogin, router]);

  let content = <Ready onChangeStatus={setStatus} />;

  if (status === 'start') {
    content = <Start handleInterviewStatus={setStatus} />;
  } else if (status === 'end') {
    content = <End />;
  }

  return <div className={styles.layout}>{content}</div>;
};
