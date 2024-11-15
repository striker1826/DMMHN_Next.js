'use client';

import 'regenerator-runtime/runtime';
import { useCallback, useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { useHandleChat } from '@/models/chat/useHandleChat';
import { QuestionResponse } from '@/shared/types/question';
import { ProgressHeader } from '@/components/chat';
import ChattingList from '@/component_list/chattingList/ChattingList';
import INTERVIER_PROFILE_IMG from '../../../../public/Logo.png';
import styles from './Chat.module.scss';

interface Props {
  questionList: QuestionResponse[];
  interviewChatResult: { question: string; answer: string }[];
  handleChangeInterviewChatResult: (interviewChatResult: {
    question: string;
    answer: string;
  }) => void;
  handleInterviewStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
}

export const NormalChat = ({
  questionList,
  interviewChatResult,
  handleInterviewStatus,
  handleChangeInterviewChatResult,
}: Props) => {
  const toast = useToast();
  const [progress, setProgress] = useState(0);

  const { transcript: sttText, listening, resetTranscript } = useSpeechRecognition();
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
    transcript: sttText,
    stopListening: SpeechRecognition.stopListening,
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

  const handleDelayStopListening = () => {
    setIsSubmit(true);
    setTimeout(() => {
      SpeechRecognition.stopListening();

      if (!sttText && listening) {
        submitAnswer(sttText, chatInfoList, resetTranscript, handleChangeInterviewChatResult);
        addProgressPercentage(20);
      }
      setIsSubmit(false);
    }, 1500);
  };

  useEffect(() => {
    if (sttText && !listening) {
      submitAnswer(sttText, chatInfoList, resetTranscript, handleChangeInterviewChatResult);
      addProgressPercentage(20);
      setIsSubmit(false);
    }
  }, [
    chatInfoList,
    listening,
    submitAnswer,
    sttText,
    resetTranscript,
    addProgressPercentage,
    handleChangeInterviewChatResult,
  ]);

  return (
    <div className={styles.layout}>
      <ProgressHeader progress={progress} handleToExitChat={handleToExitChat} />
      <div className={styles.chat_container} ref={chatContainerRef}>
        <ChattingList
          content={chatInfoList}
          recordingBox={recordingBox}
          handleToExitChat={handleToExitChat}
          onChangeIsAnswering={handleChangeIsAnswering}
          onChangeRecordingBoxState={handleChangeRecordingBox}
        />
      </div>
      <Flex borderTop="1px" borderColor="gray.400" w={'full'}>
        <Button
          onClick={() => handleDelayStopListening()}
          disabled={!isAnswering || isSubmit}
          colorScheme="green"
          variant="solid"
          size="lg"
          paddingY="10px"
          borderRadius="lg"
          borderTop="1px"
          marginTop="8px"
          w={'full'}
        >
          {isSubmit
            ? '답변을 제출 중입니다...'
            : chatInfoList[chatInfoList.length - 1].type === 'exit'
            ? '면접이 끝났어요!'
            : isAnswering
            ? '답변을 마쳤어요!'
            : '문제를 출제중입니다...'}
        </Button>
      </Flex>
    </div>
  );
};
