import { useEffect, useRef } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useHandleInterview } from '@/models/simulation/useHandleInterview';
import styles from './Interviewing.module.scss';
import Chat from '@/widgets/chat/Chat';

interface Props {
  transcript: string;
  selectedStacks: string[];
  handleInterviewStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
  handleChangeInterviewChatResult: (
    interviewChatResult: { question: string; answer: string }[],
  ) => void;
}

export const Interviewing = ({
  transcript,
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
      <div className={styles.video_wrap}>
        <video ref={videoRef} autoPlay playsInline muted />
      </div>
      <div className={styles.chat_area}>
        <Chat
          transcript={transcript}
          questionList={questionList}
          handleInterviewStatus={handleInterviewStatus}
          handleChangeInterviewChatResult={handleChangeInterviewChatResult}
        />
      </div>
    </div>
  );
};
