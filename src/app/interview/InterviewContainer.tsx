'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { End, Ready, Stacks, Start } from '@/widgets/interview';
import { Stack } from '@/shared/types/stack';
import styles from './InterviewContainer.module.scss';

export type InterviewStatus = 'stacks' | 'ready' | 'start' | 'end';

interface Props {
  stacks: Stack[];
  accessToken?: string;
}

const Simulation = ({ stacks, accessToken }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<InterviewStatus>('stacks');
  const [interviewChatResult, setInterviewChatResult] = useState<
    {
      question: string;
      answer: string;
    }[]
  >([]);

  const handleChangeInterviewChatResult = (
    interviewChatResult: { question: string; answer: string }[],
  ) => {
    setInterviewChatResult(prev => [...prev, ...interviewChatResult]);
  };

  useEffect(() => {
    if (!searchParams.has('stacks')) {
      setStatus('stacks');
      router.push('/interview');
    }
  }, [router, searchParams, accessToken]);

  let content = <Stacks stacks={stacks} onChangeStatus={setStatus} />;

  if (status === 'ready') {
    content = <Ready onChangeStatus={setStatus} />;
  } else if (status === 'start') {
    content = (
      <Start
        handleInterviewStatus={setStatus}
        handleChangeInterviewChatResult={handleChangeInterviewChatResult}
      />
    );
  } else if (status === 'end') {
    content = <End />;
  }

  return <main className={styles.container}>{content}</main>;
};

export default Simulation;
