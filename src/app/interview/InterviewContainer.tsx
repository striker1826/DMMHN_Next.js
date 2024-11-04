'use client';

import { useState } from 'react';
import { Feedback, Interviewing, Ready, Stacks } from '@/widgets/interview';
import { Stack } from '@/shared/types/stack';
import styles from './InterviewContainer.module.scss';

export type InterviewStatus = 'stacks' | 'ready' | 'interviewing' | 'feedback';

interface Props {
  stacks: Stack[];
  accessToken?: string;
}

const Simulation = ({ stacks, accessToken }: Props) => {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [status, setStatus] = useState<InterviewStatus>('stacks');
  const [interviewChatResult, setInterviewChatResult] = useState<
    {
      question: string;
      answer: string;
    }[]
  >([]);

  const handleResetStack = () => {
    setSelectedStacks([]);
  };

  const handleSelectStack = (stack: string) => {
    setSelectedStacks(prev => {
      if (prev.includes(stack)) {
        return prev.filter(item => item !== stack);
      }
      if (prev.length >= 3) {
        alert('기술 스택은 최대 3개까지 선택 가능합니다!');
        return prev;
      }
      return [...prev, stack];
    });
  };

  const handleChangeInterviewChatResult = (
    interviewChatResult: { question: string; answer: string }[],
  ) => {
    setInterviewChatResult(prev => [...prev, ...interviewChatResult]);
  };

  return (
    <main className={styles.container}>
      {status === 'stacks' && (
        <Stacks
          stacks={stacks}
          selectedStacks={selectedStacks}
          onChangeStatus={setStatus}
          handleSelectStack={handleSelectStack}
        />
      )}
      {status === 'ready' && <Ready onChangeStatus={setStatus} />}
      {status === 'interviewing' && (
        <Interviewing
          selectedStacks={selectedStacks}
          handleInterviewStatus={setStatus}
          handleChangeInterviewChatResult={handleChangeInterviewChatResult}
        />
      )}
      {status === 'feedback' && (
        <Feedback
          interviewResult={interviewChatResult}
          handleResetStack={handleResetStack}
          accessToken={accessToken}
          handleInterviewStatus={setStatus}
        />
      )}
    </main>
  );
};

export default Simulation;
