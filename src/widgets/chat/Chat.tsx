'use client';

import 'regenerator-runtime/runtime';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import ChattingList from '@/component_list/chattingList/ChattingList';
import { useHandleChat } from '@/models/chat/useHandleChat';
import { QuestionResponse } from '@/shared/types/question';
import INTERVIER_PROFILE_IMG from '../../../public/Logo.png';
import { Button } from '@chakra-ui/react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface Props {
  questionList: QuestionResponse[];
  handleChangeInterviewChatResult: (
    interviewChatResult: { question: string; answer: string }[],
  ) => void;
  handleInterviewStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
}

const Chat = ({ questionList, handleInterviewStatus, handleChangeInterviewChatResult }: Props) => {
  const { transcript: sttText, listening, resetTranscript } = useSpeechRecognition();
  const [isSubmit, setIsSubmit] = useState(false);
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
    const questionAndAnswer = chatInfoList.slice(1, -3);

    // 데이터를 question과 answer로 매핑
    const formattedData = questionAndAnswer.reduce<{ question: string; answer: string }[]>(
      (acc, curr, index, array) => {
        if (curr.type === 'other') {
          acc.push({ question: curr.message, answer: '' });
        } else if (curr.type === 'mine') {
          const lastItem = acc[acc.length - 1];
          if (lastItem) {
            lastItem.answer = curr.message;
          }
        }
        return acc;
      },
      [],
    );

    handleChangeInterviewChatResult(formattedData);
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
        submitAnswer(sttText, resetTranscript);
      }
      setIsSubmit(false);
    }, 1500);
  };

  useEffect(() => {
    if (sttText && !listening) {
      submitAnswer(sttText, resetTranscript);
      setIsSubmit(false);
    }
  }, [listening, submitAnswer, sttText, resetTranscript]);

  return (
    <div className={styles.layout}>
      <div className={styles.chat_container} ref={chatContainerRef}>
        <ChattingList
          content={chatInfoList}
          recordingBox={recordingBox}
          handleToExitChat={handleToExitChat}
          onChangeIsAnswering={handleChangeIsAnswering}
          onChangeRecordingBoxState={handleChangeRecordingBox}
        />
      </div>
      <Button
        onClick={() => handleDelayStopListening()}
        disabled={!isAnswering || isSubmit}
        colorScheme="green"
        variant="solid"
        size="lg"
        paddingY="10px"
        borderRadius="lg"
      >
        {isSubmit
          ? '답변을 제출 중입니다...'
          : chatInfoList[chatInfoList.length - 1].type === 'exit'
          ? '면접이 끝났어요!'
          : isAnswering
          ? '답변을 마쳤어요!'
          : '문제를 출제중입니다...'}
      </Button>
    </div>
  );
};

export default Chat;
