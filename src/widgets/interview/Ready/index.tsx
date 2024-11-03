import 'regenerator-runtime/runtime';
import { useEffect, useRef, useState } from 'react';

import styles from './Ready.module.scss';
import { useVideoHandler } from '@/models/simulation/video';
import { useSTT } from '@/models/audio/useSTT';
import PrimaryBtn from '@/shared/components/Button/PrimaryBtn/PrimaryBtn';
import { timeSleep } from '@/shared/utils/sleep';
import { Button } from '@chakra-ui/react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

interface Props {
  transcript?: string;
  handleResetCurrentScript: () => void;
  onChangeStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
}

export const Ready = ({ transcript, handleResetCurrentScript, onChangeStatus }: Props) => {
  const videoRef = useRef(null);
  useVideoHandler(videoRef);

  const { isListen, handleRecAudio, handleStopRecAudio } = useSTT();

  const handleAudio = async () => {
    if (isListen) {
      handleResetCurrentScript();
      handleStopRecAudio();
      return;
    } else {
      handleRecAudio();
      return;
    }
  };

  const sliceTranscript = (transcript: string) => {
    if (transcript.length > 15) {
      return `${transcript.slice(0, 15)}...`;
    } else {
      return transcript;
    }
  };

  return (
    <div className={styles.layout}>
      <h1>카메라와 마이크를 준비해주세요!</h1>
      <div className={styles.content_layout}>
        <div className={styles.video_wrap}>
          <video ref={videoRef} autoPlay muted />
        </div>
        <div className={styles.description}>
          <h2>주의사항</h2>
          <ul className={styles.description_wrap}>
            <li>마이크를 충분히 가까이 하신 후 시작해주세요.</li>
            <li>발음이 불분명하거나 빠르게 말할 경우 인식이 어려울 수 있습니다.</li>
            <li>답을 완전히 말씀하신 후 1초 정도 뒤에 버튼을 눌러주세요.</li>
          </ul>
          <Button onClick={handleAudio} colorScheme="green" fontSize="20px" paddingY="12px">
            {isListen ? '녹음 중지!' : '녹음을 테스트 해보세요!'}
          </Button>
          <div className={styles.stt_text_container}>
            {transcript ? sliceTranscript(transcript) : '녹음된 음성이 Text로 표시됩니다!'}
          </div>
        </div>
      </div>
      <Button onClick={() => onChangeStatus('stacks')} variant="arrowLeft">
        <SlArrowLeft />
      </Button>
      <Button
        onClick={() => {
          onChangeStatus('interviewing');
        }}
        variant="arrowRight"
      >
        <SlArrowRight />
      </Button>
    </div>
  );
};
