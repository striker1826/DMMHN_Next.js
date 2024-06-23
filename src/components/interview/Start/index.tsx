import styles from './Start.module.scss';
import { useRef, useState } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useQuery } from '@tanstack/react-query';
import { questionApi } from '@/api/question/questionApi';
import { useHandleInterview } from '@/models/simulation/useHandleInterview';

interface Props {
  handleInterviewStatus: (status: 'ready' | 'start' | 'end') => void;
}

export const Start = ({ handleInterviewStatus }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { handleStartRecording, handleStopRecording, recording, handleDownload } =
    useVideoHandler(videoRef);
  const { data: questionList } = useQuery(questionApi.queryOptions());

  const {
    interview,
    currentQuestion,
    startInterview,
    loadNextQuestion,
    endInterview,
    quitInterview,
  } = useHandleInterview(
    handleInterviewStatus,
    { handleStartRecording, handleStopRecording, handleDownload },
    questionList,
  );

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
        <video className={styles.recoding_display} ref={videoRef} autoPlay muted />
      </div>

      <button
        className={interview.isStart ? styles.next_btn_none : styles.next_btn}
        onClick={startInterview}
      >
        면접 시작하기
      </button>
      <button
        className={
          currentQuestion.currentNumber === currentQuestion.totalCount || !interview.isStart
            ? styles.next_btn_none
            : styles.next_btn
        }
        onClick={loadNextQuestion}
      >
        다음 질문으로 &gt;
      </button>

      {currentQuestion.currentNumber === currentQuestion.totalCount && (
        <button
          className={interview.isEnd ? styles.next_btn_none : styles.next_btn}
          onClick={endInterview}
        >
          녹화 중료하기
        </button>
      )}
      {interview.isEnd && (
        <button className={styles.next_btn} onClick={quitInterview}>
          면접 종료하기
        </button>
      )}
    </>
  );
};
