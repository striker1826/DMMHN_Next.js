'use client';

import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

/**
 * Web Speech API를 사용하여 음성 인식을 관리하는 커스텀 훅.
 * 이 훅은 오디오 녹음을 시작하고 중지하며, 음성 인식 결과를 텍스트로 캡처합니다.
 *
 * @returns {Object} - 현재 인식된 텍스트와 녹음을 시작 및 중지하는 함수들을 반환합니다.
 * @property {string} text - 현재 인식된 텍스트를 저장하는 상태값입니다.
 * @property {boolean} isListen - 현재 음성 인식이 활성화되어 있는지 여부를 나타냅니다.
 * @property {Function} handleRecAudio - 오디오 입력을 녹음하고 인식하는 과정을 시작하는 함수입니다.
 * @property {Function} handleStopRecAudio - 녹음을 중지하고 인식된 텍스트를 저장하는 함수입니다.
 */
export const useSTT = () => {
  const [text, setText] = useState('');
  const [isListen, setIsListen] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  /**
   * 녹음을 시작하고 한국어로 음성을 인식합니다.
   * 녹음 시작 전 인식된 텍스트를 빈 문자열로 초기화합니다.
   * @returns {void}
   */
  const handleRecAudio = async (): Promise<void> => {
    setIsListen(true);
    setText(''); // 녹음 시작 시 텍스트 초기화
    SpeechRecognition.startListening({ language: 'ko', interimResults: true, continuous: true });
  };

  /**
   * 현재 녹음을 중지하고, 인식된 텍스트를 저장합니다.
   * 또한, 다음 녹음을 위해 인식된 텍스트를 초기화합니다.
   */
  const handleStopRecAudio = () => {
    setIsListen(false);
    SpeechRecognition.abortListening();
    setText(transcript); // 녹음이 끝난 후 텍스트 설정

    // 인식된 텍스트를 초기화
    resetTranscript();
  };

  /**
   * transcript가 변경될 때마다 text 상태를 업데이트합니다.
   */
  useEffect(() => {
    if (transcript !== '') {
      setText(transcript);
    }
  }, [transcript]);

  return {
    text,
    isListen,
    handleRecAudio,
    handleStopRecAudio,
  };
};
