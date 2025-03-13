// Chat.tsx
import 'regenerator-runtime/runtime';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import ChattingList from '@/component_list/chattingList/ChattingList';
import { useHandleChat } from '@/models/chat/useHandleChat';
import { QuestionResponse } from '@/shared/types/question';
import INTERVIER_PROFILE_IMG from '../../../public/Logo.png';
import { Flex, Progress, useToast, useBreakpointValue } from '@chakra-ui/react';

interface Props {
  questionList: QuestionResponse[];
  interviewChatResult: { question: string; answer: string }[];
  handleChangeInterviewChatResult: (interviewChatResult: {
    question: string;
    answer: string;
  }) => void;
  handleInterviewStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
}

const Chat = ({
  questionList,
  interviewChatResult,
  handleInterviewStatus,
  handleChangeInterviewChatResult,
}: Props) => {
  const toast = useToast();
  const [progress, setProgress] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const [isSubmit, setIsSubmit] = useState(false);

  const addProgressPercentage = useCallback((percentage: number) => {
    setProgress(prev => prev + percentage);
  }, []);

  const {
    chatInfoList,
    recordingBox,
    isAnswering,
    handleChangeRecordingBox,
    handleChangeIsAnswering,
    handleAddChatInfoList,
    addRecordingBox,
    submitAnswer,
  } = useHandleChat({
    questionList,
    handleInterviewStatus,
  });

  const handleToExitChat = () => {
    if (!interviewChatResult.length) {
      toast({
        title: '한 개 이상의 질문에 답이 필요합니다',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    handleInterviewStatus('feedback');
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let interviewerTimer = setTimeout(() => {
      handleAddChatInfoList({
        type: 'other',
        name: '면접관',
        message: questionList[0].question,
        profileImg: INTERVIER_PROFILE_IMG,
      });
    }, 5000);

    let recordingBoxTimer = setTimeout(() => {
      addRecordingBox();
    }, 7000);

    return () => {
      clearTimeout(interviewerTimer);
      clearTimeout(recordingBoxTimer);
    };
  }, [addRecordingBox, handleAddChatInfoList, questionList]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatInfoList]);

  const handleSubmitAnswer = () => {
    setIsSubmit(true);
    setTimeout(() => {
      submitAnswer(userAnswer, chatInfoList, handleChangeInterviewChatResult);
      addProgressPercentage(20);
      setIsSubmit(false);
      setUserAnswer('');
    }, 1500);
  };

  const screenHeight = innerHeight;
  const nextBtnHeight = useBreakpointValue({ base: screenHeight * 0.07, md: '100px' });

  return (
    <div className={styles.layout}>
      <Flex gap="12px" borderBottom="1px" borderColor={'gray.400'} paddingBottom="8px">
        <Progress
          borderRadius="8px"
          value={progress}
          width="100%"
          height="20px"
          hasStripe
          isAnimated
          minHeight="20px"
          colorScheme="green"
          h={'full'}
          min={0}
          max={100}
          flex={3}
        />
        <button
          className="bg-[#38A169] rounded-[8px] opacity-[0.5] hover:opacity-[1] text-[#fff] flex-[1] py-[4px]"
          onClick={handleToExitChat}
        >
          종료
        </button>
      </Flex>
      <div className={styles.chat_container} ref={chatContainerRef}>
        <ChattingList
          content={chatInfoList}
          recordingBox={recordingBox}
          handleToExitChat={handleToExitChat}
          onChangeIsAnswering={handleChangeIsAnswering}
          onChangeRecordingBoxState={handleChangeRecordingBox}
        />
      </div>
      <Flex
        borderTop="1px"
        borderColor="gray.400"
        w={'full'}
        alignItems={'center'}
        gap={'16px'}
        pt={'8px'}
        height={nextBtnHeight}
      >
        <textarea
          className="rounded-[0.5rem] border-[2px] w-full h-full flex-[2]"
          placeholder="답변을 입력하세요..."
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          disabled={!isAnswering || isSubmit}
        />
        <button
          onClick={handleSubmitAnswer}
          disabled={!isAnswering || isSubmit}
          className={`w-full h-full bg-[#38A169] px-[8px] text-[12px] text-[#fff] rounded-[0.5rem] flex-[1] ${
            !isAnswering || (isSubmit && 'opacity-[0.5]')
          }`}
        >
          {isSubmit ? '답변을 제출 중입니다...' : '답변 제출'}
        </button>
      </Flex>
    </div>
  );
};

export default Chat;
