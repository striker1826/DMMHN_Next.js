'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/queries/user/userApi';
import { End, Ready, Start } from '@/widgets/interview';

const Page = ({}) => {
  const router = useRouter();
  const [status, setStatus] = useState<'ready' | 'start' | 'end'>('ready');
  const { data: isLogin, isFetched } = useUserInfo();

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

  return (
    <div className={styles.wrap}>
      <main className={styles.layout}>
        <div className={styles.simulation_layout}>{content}</div>
      </main>
    </div>
  );
};

export default Page;
