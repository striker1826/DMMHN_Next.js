import styles from './Start.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useQuestion } from '@/queries/question/questionApi';
import { useHandleInterview } from '@/models/simulation/useHandleInterview';
import SimulationBtn from '@/shared/components/Button/SimulationBtn/SimulationBtn';
import { useGetGradingResult } from '@/mutation/grading/getGradingResult';
import { useGradingStore } from '@/shared/store/gradingStore';

interface Props {
  handleInterviewStatus: (status: 'ready' | 'start' | 'end') => void;
}

export const Start = ({ handleInterviewStatus }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setGradingResult } = useGradingStore();
  const { handleStartRecording, handleStopRecording, handleDownload } = useVideoHandler(videoRef);

  const { mutateAsync } = useGetGradingResult();
  const { data: questionList } = useQuestion();

  const {
    interview,
    currentQuestion,
    grading,
    loadNext,
    startInterview,
    loadNextQuestion,
    endInterview,
    quitInterview,
  } = useHandleInterview(
    handleInterviewStatus,
    { handleStartRecording, handleStopRecording, handleDownload },
    mutateAsync,
    questionList,
  );

  useEffect(() => {
    if (questionList?.length === grading.length) {
      setGradingResult(grading);
      handleInterviewStatus('end');
    }
  }, [grading, questionList, setGradingResult, handleInterviewStatus]);

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

      {!interview.isStart &&
        (loadNext ? (
          <SimulationBtn text="면접을 불러오는 중..." onClick={() => {}} />
        ) : (
          <SimulationBtn text="면접 시작하기" onClick={startInterview} />
        ))}
      {!(currentQuestion.currentNumber === currentQuestion.totalCount || !interview.isStart) &&
        (loadNext ? (
          <SimulationBtn text="답변 저장중..." onClick={() => {}} />
        ) : (
          <SimulationBtn text="다음 질문으로 &gt;" onClick={loadNextQuestion} />
        ))}

      {currentQuestion.currentNumber === currentQuestion.totalCount &&
        !interview.isEnd &&
        (loadNext ? (
          <SimulationBtn text="답변 저장중..." onClick={() => {}} />
        ) : (
          <SimulationBtn text="녹화 종료하기" onClick={endInterview} />
        ))}
      {interview.isEnd &&
        (loadNext ? (
          <SimulationBtn text="면접을 종료하는 중..." onClick={quitInterview} />
        ) : (
          <SimulationBtn text="면접 종료하기" onClick={quitInterview} />
        ))}
    </>
  );
};
