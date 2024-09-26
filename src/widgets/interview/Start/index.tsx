import { useRef } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useHandleInterview } from '@/models/simulation/useHandleInterview';
import SimulationBtn from '@/shared/components/Button/SimulationBtn/SimulationBtn';
import styles from './Start.module.scss';

interface Props {
  handleInterviewStatus: (status: 'ready' | 'start' | 'end') => void;
  firstQuestion: string;
  accessToken?: string;
}

export const Start = ({ handleInterviewStatus, firstQuestion, accessToken }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { handleStartRecording, handleStopRecording, handleDownload } = useVideoHandler(videoRef);

  const {
    interview,
    currentQuestion,
    loadNext,
    startInterview,
    loadNextQuestion,
    endInterview,
    quitInterview,
  } = useHandleInterview(
    handleInterviewStatus,
    { handleStartRecording, handleStopRecording, handleDownload },
    firstQuestion,
    accessToken,
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
          <SimulationBtn
            text="면접을 종료하는 중..."
            onClick={() => {
              handleInterviewStatus('end');
              quitInterview();
            }}
          />
        ) : (
          <SimulationBtn
            text="면접 종료하기"
            onClick={() => {
              handleInterviewStatus('end');
              quitInterview();
            }}
          />
        ))}
    </>
  );
};
