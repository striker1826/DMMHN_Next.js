'use client';

import 'regenerator-runtime/runtime';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { updateNextGPTQuestion } from '@/mutation/question/updateNextGPTQuestion';

interface Recording {
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleDownload: () => void;
}

export const useHandleInterview = (
  handleInterviewStatus: (status: 'ready' | 'start' | 'end') => void,
  { handleStartRecording, handleStopRecording, handleDownload }: Recording,
  firstQuestion: string,
  accessToken?: string,
) => {
  const searchParams = useSearchParams();
  const [loadNext, setLoadNext] = useState(false);
  const [answerText, setAnswerText] = useState<string[]>([]);
  const [interview, setInterview] = useState<{ isStart: boolean; isEnd: boolean }>({
    isStart: false,
    isEnd: false,
  });
  const [questionHistory, setQuestionHistory] = useState([firstQuestion]);
  const QUESTION_TOTAL_COUNT = 6;
  const [currentQuestion, setCurrentQuestion] = useState<{
    totalCount: number;
    currentNumber: number;
    question: string;
  }>({
    totalCount: QUESTION_TOTAL_COUNT,
    currentNumber: 0,
    question: '면접 시작 전입니다',
  });
  const { transcript, resetTranscript } = useSpeechRecognition();

  const questionSetting = () => {
    if (!firstQuestion) {
      alert('준비된 질문이 없습니다.');
      handleInterviewStatus('end');
    }

    setCurrentQuestion(prev => {
      return {
        ...prev,
        currentNumber: prev.currentNumber + 1,
        question: firstQuestion,
      };
    });
  };

  const handleAnswerStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'ko' });
  };

  const handleAnswerStop = () => {
    SpeechRecognition.abortListening();
    setAnswerText((prev: string[]) => [...prev, transcript]);
    resetTranscript();
  };

  const startInterview = () => {
    if (!firstQuestion) return;

    setLoadNext(true);
    handleAnswerStart();
    setTimeout(() => {
      questionSetting();
      handleStartRecording();
      setInterview(prev => {
        return {
          ...prev,
          isStart: true,
        };
      });
      setLoadNext(false);
    }, 2500);
  };

  const loadNextQuestion = async () => {
    if (!firstQuestion) return;
    setLoadNext(true);
    setTimeout(() => {
      handleAnswerStop();
    }, 2000);

    const GPTQuestionData = await updateNextGPTQuestion({
      stacksText: searchParams.get('stacks'),
      accessToken,
      question: firstQuestion,
      answer: transcript,
      previousQuestions: questionHistory,
    });

    setTimeout(() => {
      handleAnswerStart();
      setCurrentQuestion(prev => {
        return {
          ...prev,
          currentNumber: prev.currentNumber + 1,
          question: GPTQuestionData.result.message.content,
        };
      });
      setQuestionHistory(prev => [...prev, GPTQuestionData.result.message.content]);
      setLoadNext(false);
    }, 2500);
  };

  const endInterview = () => {
    handleStopRecording();
    handleAnswerStop();
    setInterview(prev => {
      return {
        ...prev,
        isEnd: true,
      };
    });
  };

  const quitInterview = async () => {
    setLoadNext(true);
    handleDownload();
    setLoadNext(false);
  };

  return {
    interview,
    currentQuestion,
    loadNext,
    startInterview,
    loadNextQuestion,
    endInterview,
    quitInterview,
  };
};
