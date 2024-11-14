'use client';

import { useEffect, useState } from 'react';
import { Feedback, Interviewing, Ready, Stacks } from '@/widgets/interview';
import { Stack } from '@/shared/types/stack';
import { Button, Flex } from '@chakra-ui/react';
import styles from './InterviewContainer.module.scss';
import InterviewType from '@/widgets/interview/InterviewType/InterviewType';
import { TInterviewType } from '@/shared/types/interviewType';

export type InterviewStatus = 'interviewType' | 'stacks' | 'ready' | 'interviewing' | 'feedback';

interface Props {
  stacks: Stack[];
  accessToken?: string;
}

const Simulation = ({ stacks, accessToken }: Props) => {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [interviewType, setInterviewType] = useState<TInterviewType>('normal');
  const [status, setStatus] = useState<InterviewStatus>('interviewType');
  const [interviewChatResult, setInterviewChatResult] = useState<
    {
      question: string;
      answer: string;
    }[]
  >([]);

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

  const handleChangeInterviewChatResult = (interviewChatResult: {
    question: string;
    answer: string;
  }) => {
    setInterviewChatResult(prev => [...prev, interviewChatResult]);
  };

  const handleClickReset = () => {
    const confirmReset = window.confirm(
      '현재 진행 중인 과정을 모두 잃고 처음으로 돌아갑니다. 정말 초기화하시겠습니까?',
    );
    if (confirmReset) {
      setInterviewChatResult([]);
      setSelectedStacks([]);
      setInterviewType('normal');
      setStatus('interviewType');
    }
  };

  return (
    <main className={styles.container}>
      {status === 'interviewType' && (
        <InterviewType
          selectedType={interviewType}
          selectInterviewType={setInterviewType}
          handleChangeStatus={setStatus}
        />
      )}
      {status === 'stacks' && (
        <Stacks
          stacks={stacks}
          selectedStacks={selectedStacks}
          onChangeStatus={setStatus}
          handleSelectStack={handleSelectStack}
        />
      )}
      {status === 'ready' && <Ready onChangeStatus={setStatus} />}
      {status === 'interviewing' && interviewType === 'normal' && (
        <Interviewing
          selectedStacks={selectedStacks}
          interviewChatResult={interviewChatResult}
          handleInterviewStatus={setStatus}
          handleChangeInterviewChatResult={handleChangeInterviewChatResult}
        />
      )}
      {status === 'interviewing' && interviewType === 'follow' && (
        <div>여기에 div 태그 대신 꼬리질문 면접을 넣으시면 됩니다.</div>
      )}
      {status === 'feedback' && (
        <Feedback
          interviewResult={interviewChatResult}
          accessToken={accessToken}
          handleClickReset={handleClickReset}
        />
      )}
      <Flex position="absolute" left="0" top="-8">
        <Button
          onClick={handleClickReset}
          colorScheme="red"
          borderRadius="xl"
          opacity="0.5"
          size="xs"
          _hover={{ opacity: '1' }}
        >
          과정 초기화
        </Button>
      </Flex>
    </main>
  );
};

export default Simulation;
