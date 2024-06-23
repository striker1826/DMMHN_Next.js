import { Question } from '@/shared/types/question';
import { Dispatch, SetStateAction, useState } from 'react';
import { useVideoHandler } from './video';

interface Recording {
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleDownload: () => void;
}

export const useHandleInterview = (
  handleInterviewStatus: (status: 'ready' | 'start' | 'end') => void,
  { handleStartRecording, handleStopRecording, handleDownload }: Recording,
  questionList?: Question[],
) => {
  const [interview, setInterview] = useState<{ isStart: boolean; isEnd: boolean }>({
    isStart: false,
    isEnd: false,
  });
  const [currentQuestion, setCurrentQuestion] = useState<{
    totalCount: number;
    currentNumber: number;
    question: string;
  }>({
    totalCount: 500,
    currentNumber: 0,
    question: '면접 시작 전입니다',
  });

  const questionSetting = () => {
    if (!questionList) return;
    if (!questionList[0].question) {
      alert('준비된 질문이 없습니다.');
      handleInterviewStatus('end');
    }

    setCurrentQuestion(prev => {
      return {
        ...prev,
        totalCount: questionList?.length,
        currentNumber: prev.currentNumber + 1,
        question: questionList[prev.currentNumber].question,
      };
    });
  };

  const startInterview = () => {
    questionSetting();
    handleStartRecording();
    setInterview(prev => {
      return {
        ...prev,
        isStart: true,
      };
    });
  };

  const loadNextQuestion = () => {
    if (!questionList) return;

    setCurrentQuestion(prev => {
      return {
        ...prev,
        currentNumber: prev.currentNumber + 1,
        question: questionList[currentQuestion.currentNumber].question,
      };
    });
  };

  const endInterview = () => {
    handleStopRecording();
    setInterview(prev => {
      return {
        ...prev,
        isEnd: true,
      };
    });
  };

  const quitInterview = () => {
    handleDownload();
    console.log(handleInterviewStatus);
    handleInterviewStatus('end');
  };

  return {
    interview,
    currentQuestion,
    startInterview,
    loadNextQuestion,
    endInterview,
    quitInterview,
  };
};
