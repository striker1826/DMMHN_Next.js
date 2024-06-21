import styles from './Start.module.scss';
import { useRef, useState } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useQuery } from '@tanstack/react-query';
import { questionApi } from '@/api/question/questionApi';

interface Props {
  onChangeStatus: (status: 'ready' | 'start' | 'end') => void;
}

export const Start = ({ onChangeStatus }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { handleStartRecording, handleStopRecording, recording, handleDownload } =
    useVideoHandler(videoRef);
  const { data: questionList } = useQuery(questionApi.queryOptions());

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

  const handleLoadQuestionSetting = () => {
    if (!questionList) return;

    setCurrentQuestion(prev => {
      return {
        ...prev,
        totalCount: questionList?.length,
        currentNumber: currentQuestion.currentNumber + 1,
        question: questionList[currentQuestion.currentNumber].question,
      };
    });
  };

  const handleStartInterview = () => {
    handleLoadQuestionSetting();
    handleStartRecording();
    setInterview(prev => {
      return {
        ...prev,
        isStart: true,
      };
    });
  };

  const handleLoadNextQuestion = () => {
    if (!questionList) return;

    setCurrentQuestion(prev => {
      return {
        ...prev,
        currentNumber: prev.currentNumber + 1,
        question: questionList[currentQuestion.currentNumber].question,
      };
    });
  };

  const handleEndInterview = () => {
    handleStopRecording();
    setInterview(prev => {
      return {
        ...prev,
        isEnd: true,
      };
    });
  };

  const handleQuitInterview = () => {
    handleDownload();
    onChangeStatus('end');
  };

  return (
    <>
      <div className={styles.top_layout}>
        <div className={styles.question_information}>
          <div className={styles.question_type}>공통질문</div>
          <div className={styles.question_current_total}>
            Q{currentQuestion.currentNumber} / Q{currentQuestion.totalCount}
          </div>
        </div>
      </div>
      <p className={styles.question}>{currentQuestion.question}</p>
      <div className={styles.videoWrap}>
        <video className={styles.recoding_display} ref={videoRef} autoPlay />
      </div>

      <button
        className={interview.isStart ? styles.next_btn_none : styles.next_btn}
        onClick={handleStartInterview}
      >
        면접 시작하기
      </button>
      <button
        className={
          currentQuestion.currentNumber === currentQuestion.totalCount || !interview.isStart
            ? styles.next_btn_none
            : styles.next_btn
        }
        onClick={handleLoadNextQuestion}
      >
        다음 질문으로 &gt;
      </button>

      {currentQuestion.currentNumber === currentQuestion.totalCount && (
        <button
          className={interview.isEnd ? styles.next_btn_none : styles.next_btn}
          onClick={handleEndInterview}
        >
          녹화 중료하기
        </button>
      )}
      {interview.isEnd && (
        <button className={styles.next_btn} onClick={handleQuitInterview}>
          면접 종료하기
        </button>
      )}
    </>
  );
};
