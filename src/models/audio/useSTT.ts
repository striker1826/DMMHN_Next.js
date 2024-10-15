'use client';

import { useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

/**

	•	Web Speech API를 사용하여 음성 인식을 관리하는 커스텀 훅.
	•	이 훅은 오디오 녹음을 시작하고 중지하며, 음성 인식 결과를 텍스트로 캡처합니다.
	•	
	•	@returns {Object} - 현재 인식된 텍스트와 녹음을 시작 및 중지하는 함수들을 반환합니다.
	•	@property {React.MutableRefObject} text - 현재 인식된 텍스트를 저장하는 참조 객체입니다.
	•	@property {Function} handleRecAudio - 오디오 입력을 녹음하고 인식하는 과정을 시작하는 함수입니다.
	•	@property {Function} handleStopRecAudio - 녹음을 중지하고 인식된 텍스트를 저장하는 함수입니다.
*/
export const useSTT = () => {
  const text = useRef<string>();
  const [isListen, setIsListen] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  /**
   * 녹음을 시작하고 한국어로 음성을 인식합니다.
   * 녹음 시작 전 인식된 텍스트를 빈 문자열로 초기화합니다.
   * @returns {void}
   */
  const handleRecAudio = () => {
    setIsListen(true);
    text.current = '';
    SpeechRecognition.startListening({ continuous: true, language: 'ko' });
  };

  /**
   * 현재 녹음을 중지하고, 인식된 텍스트를 저장합니다.
   * 또한, 다음 녹음을 위해 인식된 텍스트를 초기화합니다.
   */
  const handleStopRecAudio = () => {
    setIsListen(false);
    SpeechRecognition.abortListening();
    text.current = transcript;
    resetTranscript();
  };

  return {
    text,
    isListen,
    handleRecAudio,
    handleStopRecAudio,
  };
};
