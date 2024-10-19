'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Feedback, Interviewing, Ready, Stacks } from '@/widgets/interview';
import { Stack } from '@/shared/types/stack';
import styles from './InterviewContainer.module.scss';

export type InterviewStatus = 'stacks' | 'ready' | 'interviewing' | 'feedback';

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

  return (
    <main className={styles.container}>
      {status === 'stacks' && <Stacks stacks={stacks} onChangeStatus={setStatus} />}
      {status === 'ready' && <Ready onChangeStatus={setStatus} />}
      {status === 'interviewing' && (
        <Interviewing
          handleInterviewStatus={setStatus}
          handleChangeInterviewChatResult={handleChangeInterviewChatResult}
        />
      )}
      {status === 'feedback' && (
        <Feedback interviewResult={interviewChatResult} accessToken={accessToken} />
      )}
    </main>
  );
};

export default Simulation;
