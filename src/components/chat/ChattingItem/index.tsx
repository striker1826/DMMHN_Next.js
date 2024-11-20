'use client';

import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import SpeechRecognition from 'react-speech-recognition';
import { ScaleLoader } from 'react-spinners';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useChatStore } from '@/shared/store/chatStore';
import styles from './ChattingItem.module.scss';

interface Props {
  type: 'other' | 'mine' | 'recording' | 'exit';
  name: string;
  message: string;
  profileImg: StaticImageData;
  questionIsLoading: boolean;
  recordingBox: boolean;
  handleToExitChat: () => void;
  onChangeIsAnswering: (state: boolean) => void;
  onChangeRecordingBoxState: (state: boolean) => void;
  onDelayStopListening: (noAnswer?: string) => void;
}

const DEFAULT_READY_RECORDING_SECOND = 3;

export const ChattingItem = ({
  type,
  name,
  message,
  profileImg,
  recordingBox,
  handleToExitChat,
  onChangeIsAnswering,
  onChangeRecordingBoxState,
  onDelayStopListening,
}: Props) => {
  const [count, setCount] = useState(DEFAULT_READY_RECORDING_SECOND);
  const { isSubmit } = useChatStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (type === 'recording') {
      timer = setTimeout(() => {
        onChangeIsAnswering(true);
        onChangeRecordingBoxState(true);
      }, 3000);
    }

    let clock: NodeJS.Timeout;
    if (type === 'recording') {
      clock = setInterval(() => {
        setCount(prev => {
          return --prev;
        });
      }, 1000);

      if (count === 1) {
        clearInterval(clock);
      }
    }

    return () => {
      clearInterval(clock);
      clearTimeout(timer);
    };
  }, [count, type, onChangeRecordingBoxState, onChangeIsAnswering]);

  useEffect(() => {
    if (recordingBox) {
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
    }
  }, [recordingBox]);

  return (
    <div className={type === 'other' ? styles.other_container : styles.mine_container}>
      <div className={styles.name_container}>
        <Image
          src={profileImg}
          width={30}
          height={30}
          alt="profile_img"
          className={styles.profile_img}
        />
        <p className={type === 'other' ? styles.name : styles.none_name}>{name}</p>
      </div>

      <div
        className={`
  ${type === 'other' ? styles.other_chat : styles.mine_chat}
  ${type === 'exit' ? styles.exit_chat : ''}
`}
        onClick={() => type === 'exit' && handleToExitChat()}
      >
        {type === 'recording' ? (
          <Flex padding="2px">
            {recordingBox ? (
              <Flex flexDirection="column" gap="5px">
                <Button
                  onClick={() => onDelayStopListening()}
                  isDisabled={isSubmit}
                  isLoading={isSubmit}
                  backgroundColor="white"
                  borderRadius="2xl"
                  boxShadow="xl"
                >
                  <Box width="10px" height="10px" rounded="full" bgColor="red.500" mr="5px" />
                  <ScaleLoader height={12} />
                </Button>
                <Button
                  onClick={() => onDelayStopListening('잘 모르겠습니다.')}
                  isDisabled={isSubmit}
                  isLoading={isSubmit}
                  backgroundColor="white"
                  borderRadius="2xl"
                  boxShadow="xl"
                >
                  잘 모르겠습니다.
                </Button>
              </Flex>
            ) : (
              <p>{count}초 후 녹음이 시작됩니다</p>
            )}
          </Flex>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};
