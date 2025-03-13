'use client';

import { useEffect } from 'react';
import { useHandleInterview } from '@/models/simulation/useHandleInterview';
import styles from './Interviewing.module.scss';
import Chat from '@/widgets/chat/Chat';

interface Props {
  selectedStacks: string[];
  handleInterviewStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
  interviewChatResult: { question: string; answer: string }[];
  handleChangeInterviewChatResult: (interviewChatResult: {
    question: string;
    answer: string;
  }) => void;
}

export const Interviewing = ({
  selectedStacks,
  interviewChatResult,
  handleInterviewStatus,
  handleChangeInterviewChatResult,
}: Props) => {
  const { questionList, handleLoadQuestionList } = useHandleInterview();

  useEffect(() => {
    handleLoadQuestionList(selectedStacks);
  }, [selectedStacks, handleLoadQuestionList]);

  return (
    <div className={styles.layout}>
      <div className={styles.content_layout}>
        {/* <div className="hidden r-lg:block">
          <div
            className={`flex-3 rounded-md bg-black h-full shrink aspect-[15/16] overflow-hidden`}
          >
            <Video />
          </div>
        </div> */}
        <div className={styles.chat_layout}>
          <Chat
            interviewChatResult={interviewChatResult}
            questionList={questionList}
            handleInterviewStatus={handleInterviewStatus}
            handleChangeInterviewChatResult={handleChangeInterviewChatResult}
          />
        </div>
      </div>
    </div>
  );
};
