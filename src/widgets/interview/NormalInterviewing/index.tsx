'use client';

import { useEffect, useRef } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useHandleInterview } from '@/models/simulation/useHandleInterview';
import { InterviewingWithVideoView } from '@/components/interview';
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

export const NormalInterviewing = ({
  selectedStacks,
  interviewChatResult,
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
    <InterviewingWithVideoView>
      <Chat
        questionList={questionList}
        interviewChatResult={interviewChatResult}
        handleChangeInterviewChatResult={handleChangeInterviewChatResult}
        handleInterviewStatus={handleInterviewStatus}
      />
    </InterviewingWithVideoView>
  );
};
