import 'regenerator-runtime/runtime';
import { useState } from 'react';

import Button from '@/shared/components/Button/Button';
import styles from './Ready.module.scss';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface Props {
  onChangeStatus: (status: 'ready' | 'start' | 'end') => void;
}

export const Ready = ({ onChangeStatus }: Props) => {
  const [micScript, setMicScript] = useState('음성인식 테스트');

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    setMicScript('음성인식 중지');
    SpeechRecognition.startListening({ continuous: true, language: 'ko' });
  };

  const stopListening = () => {
    setMicScript('음성인식 종료중...');
    SpeechRecognition.stopListening();

    setTimeout(() => {
      resetTranscript();
      setMicScript('음성인식 테스트');
    }, 2500);
  };

  return (
    <>
      <h2>준비가 되셨나요?</h2>
      <p>1. 마이크를 충분히 가까이 하신 후 시작해주세요. </p>
      <p>2. 발음이 불분명하거나 빠르게 말할 경우 인식이 어려울 수 있습니다.</p>
      <p>3. 답을 완전히 말씀하신 후 1초 정도 뒤에 버튼을 눌러주세요.</p>
      <div>
        {listening ? (
          <button onClick={stopListening}>{micScript}</button>
        ) : (
          <button onClick={startListening}>{micScript}</button>
        )}
        <p>{transcript}</p>
      </div>
      <p>준비가 완료되셨다면 시작버튼을 클릭해주세요.</p>
      <Button text="시작" onClick={() => onChangeStatus('start')} />
    </>
  );
};
