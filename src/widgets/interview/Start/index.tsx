import { useEffect, useRef } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useHandleInterview } from '@/models/simulation/useHandleInterview';
import styles from './Start.module.scss';
import Chat from '@/widgets/chat/Chat';

interface Props {
  handleInterviewStatus: (status: 'stacks' | 'ready' | 'start' | 'end') => void;
  handleChangeInterviewChatResult: (
    interviewChatResult: { question: string; answer: string }[],
  ) => void;
}

export const Start = ({ handleInterviewStatus, handleChangeInterviewChatResult }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoHandler(videoRef);

  const { questionList, handleLoadQuestionList } = useHandleInterview();

  useEffect(() => {
    handleLoadQuestionList();
  }, [handleLoadQuestionList]);

  return (
    <div className={styles.layout}>
      <div className={styles.video_area}>
        <video className={styles.recoding_display} ref={videoRef} autoPlay muted />
      </div>
      <div className={styles.chat_area}>
        <Chat
          questionList={questionList}
          handleInterviewStatus={handleInterviewStatus}
          handleChangeInterviewChatResult={handleChangeInterviewChatResult}
        />
      </div>
    </div>
  );
};
