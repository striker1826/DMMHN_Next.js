import 'regenerator-runtime/runtime';
import { useRef, useState } from 'react';

import Button from '@/shared/components/Button/Button';
import styles from './Ready.module.scss';
import { useVideoHandler } from '@/models/simulation/video';
import { useSTT } from '@/models/audio/useSTT';

interface Props {
  onChangeStatus: (status: 'stacks' | 'ready' | 'start' | 'end') => void;
}

export const Ready = ({ onChangeStatus }: Props) => {
  const videoRef = useRef(null);
  useVideoHandler(videoRef);

  const { text, isListen, handleRecAudio, handleStopRecAudio } = useSTT();

  const handleAudio = () => {
    return isListen ? handleStopRecAudio() : handleRecAudio();
  };

  return (
    <div className={styles.layout}>
      <div className={styles.content_layout}>
        <div className={styles.description}>
          <h1>카메라와 마이크를 준비해주세요!</h1>
          <div className={styles.description_wrap}>
            <p>1. 마이크를 충분히 가까이 하신 후 시작해주세요. </p>
            <p>2. 발음이 불분명하거나 빠르게 말할 경우 인식이 어려울 수 있습니다.</p>
            <p>3. 답을 완전히 말씀하신 후 1초 정도 뒤에 버튼을 눌러주세요.</p>
            <div className={styles.stt_text_container}>{text.current}</div>
          </div>
        </div>
        <div className={styles.video_wrap}>
          <video ref={videoRef} autoPlay muted />
          <button className={styles.recording} onClick={handleAudio}>
            {isListen ? '녹음 중지!' : '녹음을 테스트 해보세요!'}
          </button>
        </div>
      </div>
      <div className={styles.btn_container}>
        <Button text="이전으로" onClick={() => onChangeStatus('stacks')} />
        <Button text="시작" onClick={() => onChangeStatus('start')} />
      </div>
    </div>
  );
};
