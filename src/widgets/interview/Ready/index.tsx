'use client';

import 'regenerator-runtime/runtime';
import { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { RiMicFill, RiMicOffFill } from 'react-icons/ri';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Video from '@/components/video/Video';
import { ReadyInfoCard } from '@/components/interview';
import styles from './Ready.module.scss';

interface Props {
  onChangeStatus: (status: 'stacks' | 'ready' | 'interviewing' | 'feedback') => void;
}

export const Ready = ({ onChangeStatus }: Props) => {
  const [currentScript, setCurrentScript] = useState('');
  const [isListening, setIsListening] = useState(false);

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
    <div className={styles.container}>
      <div className={styles.widget_wrapper}>
        <Flex w="100%" h="100%" gap={'20px'}>
          <Flex flex={1} flexDirection="column">
            <Flex
              borderRadius="md"
              position="relative"
              backgroundColor="#111"
              w="100%"
              h="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Video />
            </Flex>
          </Flex>
          <Flex flex={1} flexDirection="column" gap="20px">
            <ReadyInfoCard />
            <Button
              onClick={handleAudio}
              width="100%"
              height="100%"
              variant="ghost"
              size="xs"
              fontSize="md"
              border="1px"
              borderColor="#D6D6D6"
            >
              <Flex gap="12px" alignItems="center" justifyContent="center">
                {isListening ? <RiMicOffFill /> : <RiMicFill />}
                {currentScript
                  ? sliceTranscript(currentScript)
                  : '녹음된 음성이 Text로 표시됩니다!'}
              </Flex>
            </Button>
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
