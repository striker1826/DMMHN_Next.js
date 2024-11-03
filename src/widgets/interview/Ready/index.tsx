import 'regenerator-runtime/runtime';
import { useRef } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { useSTT } from '@/models/audio/useSTT';
import { Button } from '@chakra-ui/react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { RiErrorWarningFill, RiMicFill, RiMicOffFill } from 'react-icons/ri';
import styles from './Ready.module.scss';

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
          <div className={styles.title}>
            <RiErrorWarningFill />
            <h2>중요합니다!</h2>
          </div>
          <ul className={styles.description_wrap}>
            <li>마이크를 충분히 가까이 하신 후 시작해주세요.</li>
            <li>발음이 불분명하거나 빠르게 말씀하실 경우 인식이 어려울 수 있습니다.</li>
            <li>답변을 완전히 말씀하신 후 1초 정도 뒤에 버튼을 눌러주세요.</li>
            <li>아래 버튼을 누르시고 마이크를 통해 목소리가 제대로 인식되는지 확인해주세요.</li>
          </ul>
          <div className={styles.stt_text_container}>
            <Button onClick={handleAudio} variant="ghost" size="xs" fontSize="20px">
              {isListen ? <RiMicOffFill /> : <RiMicFill />}
            </Button>
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
