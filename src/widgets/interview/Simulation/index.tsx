'use client';

import { End, Ready, Start } from '@/components/interview';
import { useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/api/user/userApi';

export const Simulation = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'ready' | 'start' | 'end'>('ready');
  const { data: isLogin } = useQuery(userApi.queryOptions());
  if (!isLogin) {
    router.push('/signin');
  }

  let content = <Ready onChangeStatus={setStatus} />;

  if (status === 'start') {
    content = <Start handleInterviewStatus={setStatus} />;
  } else if (status === 'end') {
    content = <End />;
  }

  return <div className={styles.layout}>{content}</div>;
};
