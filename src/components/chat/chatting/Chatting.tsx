'use client';

import React, { useEffect, useState } from 'react';
import styles from './Chatting.module.scss';
import { ScaleLoader } from 'react-spinners';
import Image, { StaticImageData } from 'next/image';

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
}

const DEFAULT_READY_RECORDING_SECOND = 3;

const Chatting = ({
  type,
  name,
  message,
  profileImg,
  recordingBox,
  handleToExitChat,
  onChangeIsAnswering,
  onChangeRecordingBoxState,
}: Props) => {
  const [count, setCount] = useState(DEFAULT_READY_RECORDING_SECOND);

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
          <div>
            {recordingBox ? <ScaleLoader height={12} /> : <p>{count}초 후 답변을 시작해주세요.</p>}
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Chatting;
