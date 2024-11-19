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
import { useChatStore } from '@/shared/store/chatStore';

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
  const { setIsSubmit } = useChatStore();

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

  const handleDelayStopListening = (noAnswer?: string) => {
    setIsSubmit(true);
    setTimeout(() => {
      SpeechRecognition.stopListening();

      if (!sttText && listening) {
        submitAnswer(
          noAnswer ? '잘 모르겠습니다.' : sttText,
          chatInfoList,
          resetTranscript,
          handleChangeInterviewChatResult,
        );
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
    setIsSubmit,
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
          onDelayStopListening={handleDelayStopListening}
        />
      </div>
    </div>
  );
};
