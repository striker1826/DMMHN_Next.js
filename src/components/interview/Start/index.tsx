import styles from './Start.module.scss';
import { useEffect, useRef } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useQuery } from '@tanstack/react-query';
import { questionApi } from '@/api/question/questionApi';
import { useHandleInterview } from '@/models/simulation/useHandleInterview';
import SimulationBtn from '@/shared/components/Button/SimulationBtn/SimulationBtn';
import { getSpeech } from '@/models/simulation/getSpeech';

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

      {!interview.isStart && <SimulationBtn text="면접 시작하기" onClick={startInterview} />}
      {!(currentQuestion.currentNumber === currentQuestion.totalCount || !interview.isStart) && (
        <SimulationBtn text="다음 질문으로 &gt;" onClick={loadNextQuestion} />
      )}

      {currentQuestion.currentNumber === currentQuestion.totalCount && !interview.isEnd && (
        <SimulationBtn text="녹화 종료하기" onClick={endInterview} />
      )}
      {interview.isEnd && <SimulationBtn text="면접 종료하기" onClick={quitInterview} />}
    </>
  );
};
