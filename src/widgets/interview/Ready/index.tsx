import 'regenerator-runtime/runtime';
import { useEffect, useRef, useState } from 'react';

import styles from './Ready.module.scss';
import { useVideoHandler } from '@/models/simulation/video';
import { useSTT } from '@/models/audio/useSTT';
import PrimaryBtn from '@/shared/components/Button/PrimaryBtn/PrimaryBtn';
import { timeSleep } from '@/shared/utils/sleep';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface Props {
  transcript?: string;
  handleResetCurrentScript: () => void;
  onChangeStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
}

export const Ready = ({ transcript, handleResetCurrentScript, onChangeStatus }: Props) => {
  const [currentScript, setCurrentScript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const videoRef = useRef(null);
  useVideoHandler(videoRef);

  const { transcript: sttText, listening, resetTranscript } = useSpeechRecognition();

  const handleAudio = async () => {
    console.log('listening', listening);
    if (isListening) {
      setIsListening(false);
      resetTranscript();
      SpeechRecognition.stopListening();
      setCurrentScript('');
      return;
    } else {
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
      return;
    }
  };

  useEffect(() => {
    setCurrentScript(sttText);
  }, [sttText]);

  const sliceTranscript = (transcript: string) => {
    if (transcript.length > 15) {
      return `${transcript.slice(0, 15)}...`;
    } else {
      return transcript;
    }
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
            <div className={styles.stt_text_container}>
              {currentScript ? sliceTranscript(currentScript) : '녹음된 음성이 Text로 표시됩니다!'}
            </div>
          </div>
        </div>
        <div className={styles.video_wrap}>
          <video ref={videoRef} autoPlay muted />
          <button className={styles.recording} onClick={handleAudio}>
            {isListening ? '녹음 중지!' : '녹음을 테스트 해보세요!'}
          </button>
        </div>
      </div>
      <div className={styles.btn_container}>
        <div className={styles.btn_wrapper}>
          <PrimaryBtn text="이전으로" onClick={() => onChangeStatus('stacks')} />
        </div>
        <div className={styles.btn_wrapper}>
          <PrimaryBtn
            text="시작"
            onClick={() => {
              resetTranscript();
              setTimeout(() => {
                onChangeStatus('interviewing');
              }, 1000);
            }}
          />
        </div>
      </div>
    </div>
  );
};
