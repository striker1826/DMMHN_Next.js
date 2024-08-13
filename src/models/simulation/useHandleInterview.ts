'use client';

import 'regenerator-runtime/runtime';
import { Question } from '@/shared/types/question';
import { getSpeech } from '@striker1826/use-tts';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';

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
  const [answerText, setAnswerText] = useState<string[]>([]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    console.log(listening);
  }, [listening]);

  const handleAnswerStart = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleAnswerStop = () => {
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

    handleAnswerStart();
    questionSetting();
    handleStartRecording();
    setInterview(prev => {
      return {
        ...prev,
        isStart: true,
      };
    });

    getSpeech(questionList[currentQuestion.currentNumber].question);
  };

  const loadNextQuestion = () => {
    if (!questionList) return;
    handleAnswerStop();

    setCurrentQuestion(prev => {
      return {
        ...prev,
        currentNumber: prev.currentNumber + 1,
        question: questionList[currentQuestion.currentNumber].question,
      };
    });

    handleAnswerStart();
    getSpeech(questionList[currentQuestion.currentNumber].question);
  };

  const endInterview = () => {
    setAnswerText((prev: string[]) => [...prev, transcript]);
    handleStopRecording();
    SpeechRecognition.abortListening();
    console.log(answerText);
    setInterview(prev => {
      return {
        ...prev,
        isEnd: true,
      };
    });
  };

  const quitInterview = () => {
    handleDownload();
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
