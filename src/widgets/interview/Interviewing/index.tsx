'use client';

import { useEffect, useRef } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useHandleInterview } from '@/models/simulation/useHandleInterview';
import styles from './Interviewing.module.scss';
import Chat from '@/widgets/chat/Chat';

interface Props {
  selectedStacks: string[];
  handleInterviewStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
  handleChangeInterviewChatResult: (
    interviewChatResult: { question: string; answer: string }[],
  ) => void;
}

export const Interviewing = ({
  selectedStacks,
  handleInterviewStatus,
  handleChangeInterviewChatResult,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoHandler(videoRef);

  const { questionList, handleLoadQuestionList } = useHandleInterview();

  useEffect(() => {
    handleLoadQuestionList(selectedStacks);
  }, [selectedStacks, handleLoadQuestionList]);

  return (
    <div className={styles.layout}>
      <div className={styles.content_layout}>
        <div className={styles.video_wrap}>
          <video ref={videoRef} autoPlay playsInline muted />
        </div>
        <div className={styles.chat_layout}>
          <Chat
            questionList={questionList}
            handleInterviewStatus={handleInterviewStatus}
            handleChangeInterviewChatResult={handleChangeInterviewChatResult}
          />
        </div>
      </div>
    </div>
  );
};
