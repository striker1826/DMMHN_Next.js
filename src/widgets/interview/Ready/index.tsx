'use client';

import 'regenerator-runtime/runtime';
import { useRef, useState } from 'react';
import { useVideoHandler } from '@/models/simulation/video';
import { Button, Flex } from '@chakra-ui/react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { RiMicFill, RiMicOffFill } from 'react-icons/ri';
import styles from './Ready.module.scss';
import ReadyInfoCard from '@/components/interview/ReadyInfoCard';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import PrimaryBtn from '@/shared/components/Button/PrimaryBtn/PrimaryBtn';

interface Props {
  onChangeStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
}

export const Ready = ({ onChangeStatus }: Props) => {
  const [currentScript, setCurrentScript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const videoRef = useRef(null);

  useVideoHandler(videoRef);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleAudio = async () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
      setCurrentScript(transcript);
      return;
    } else {
      setIsListening(true);
      resetTranscript();
      setCurrentScript('');
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
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
      <h1>준비 단계입니다! 마이크와 카메라를 확인해 주세요.</h1>
      <div className={styles.content_layout}>
        <div className={styles.video_wrap}>
          <video ref={videoRef} autoPlay muted />
        </div>
        <Flex flexDirection="column" gap="20px">
          <ReadyInfoCard />
          <Flex
            alignItems="center"
            gap="5px"
            padding="12px 8px"
            borderRadius="xl"
            fontSize="md"
            fontWeight="md"
            border="1px"
            borderColor="blackAlpha.300"
          >
            <Button onClick={handleAudio} flexShrink="1" variant="ghost" size="xs" fontSize="md">
              {isListening ? <RiMicOffFill /> : <RiMicFill />}
            </Button>
            {currentScript ? sliceTranscript(currentScript) : '녹음된 음성이 Text로 표시됩니다!'}
          </Flex>
        </Flex>
      </div>

      <Button onClick={() => onChangeStatus('stacks')} variant="arrowLeft">
        <SlArrowLeft />
      </Button>
      <Button
        onClick={() => {
          resetTranscript();
          setTimeout(() => {
            onChangeStatus('interviewing');
          }, 1000);
        }}
        variant="arrowRight"
      >
        <SlArrowRight />
      </Button>
    </div>
  );
};
