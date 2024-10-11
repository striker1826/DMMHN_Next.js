'use client';

import 'regenerator-runtime/runtime';
import { Question } from '@/shared/types/question';
import { getSpeech } from '@striker1826/use-tts';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import { apiInstance } from '@/shared/utils/axios';

interface Recording {
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleDownload: () => void;
}

export const useHandleInterview = (
  handleInterviewStatus: (status: 'ready' | 'start' | 'end') => void,
  { handleStartRecording, handleStopRecording, handleDownload }: Recording,
  mutateAsync: any,
  questionList?: Question[],
) => {
  const [loadNext, setLoadNext] = useState(false);
  const [answerText, setAnswerText] = useState<string[]>([]);
  const [grading, setGrading] = useState([]);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleAnswerStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'ko' });
  };

  const gradingResult = async () => {
    const result = questionList?.map((value, index) => ({
      question: value.question,
      answer: answerText[index],
    }));

    const gradingResult = await mutateAsync(result);
    return gradingResult;
  };

  const handleAnswerStop = () => {
    SpeechRecognition.abortListening();
    setAnswerText((prev: string[]) => [...prev, transcript]);
    resetTranscript();
  };

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
    if (!questionList) return;

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

    // getSpeech(questionList[currentQuestion.currentNumber].speechText);
  };

  const loadNextQuestion = () => {
    if (!questionList) return;
    setLoadNext(true);
    setTimeout(() => {
      handleAnswerStop();
    }, 2000);

    setTimeout(() => {
      handleAnswerStart();
      setCurrentQuestion(prev => {
        return {
          ...prev,
          currentNumber: prev.currentNumber + 1,
          question: questionList[currentQuestion.currentNumber].question,
        };
      });
      setLoadNext(false);
    }, 2500);

    // getSpeech(questionList[currentQuestion.currentNumber].speechText);
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
    const result = await gradingResult();
    setGrading(result);
    setLoadNext(false);
  };

  return {
    interview,
    currentQuestion,
    grading,
    loadNext,
    startInterview,
    loadNextQuestion,
    endInterview,
    quitInterview,
  };
};
