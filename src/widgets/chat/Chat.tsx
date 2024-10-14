'use client';

import 'regenerator-runtime/runtime';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import ChattingList from '@/component_list/chattingList/ChattingList';
import { useSTT } from '@/models/audio/useSTT';
import { useHandleChat } from '@/models/chat/useHandleChat';
import { QuestionResponse } from '@/shared/types/question';

interface Props {
  questionList: QuestionResponse[];
  handleChangeInterviewChatResult: (
    interviewChatResult: { question: string; answer: string }[],
  ) => void;
  handleInterviewStatus: (status: 'stacks' | 'ready' | 'start' | 'end') => void;
}

const Chat = ({ questionList, handleInterviewStatus, handleChangeInterviewChatResult }: Props) => {
  const { handleRecAudio } = useSTT();
  const [interviewHistory, setInterviewHistory] = useState<{ question: string; answer: string }[]>(
    [],
  );
  const {
    chatInfoList,
    recordingBox,
    isAnswering,
    handleChangeRecordingBox,
    handleChangeIsAnswering,
    handleChangeChatInfoList,
    addRecordingBox,
    submitAnswer,
  } = useHandleChat({ questionList, handleInterviewStatus });

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
    handleInterviewStatus('end');
  };

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let interviewerTimer = setTimeout(() => {
      handleChangeChatInfoList({
        type: 'other',
        name: '면접관',
        message: questionList[0].question,
      });
    }, 5000);

    let recordingBoxTimer = setTimeout(() => {
      addRecordingBox();
    }, 7000);

    return () => {
      clearTimeout(interviewerTimer);
      clearTimeout(recordingBoxTimer);
    };
  }, [addRecordingBox, handleChangeChatInfoList, questionList]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatInfoList]);

  return (
    <div className={styles.layout}>
      <div className={styles.chat} ref={chatContainerRef}>
        <ChattingList
          content={chatInfoList}
          recordingBox={recordingBox}
          handleToExitChat={handleToExitChat}
          onRecAudio={handleRecAudio}
          onChangeIsAnswering={handleChangeIsAnswering}
          onChangeRecordingBoxState={handleChangeRecordingBox}
        />
      </div>
      <button
        className={isAnswering ? styles.button : styles.not_active_btn}
        onClick={submitAnswer}
        disabled={!isAnswering}
      >
        {isAnswering ? '답변을 마쳤어요!' : '문제를 출제중입니다...'}
      </button>
    </div>
  );
};

export default Chat;
