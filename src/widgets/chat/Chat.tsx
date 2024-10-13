'use client';

import 'regenerator-runtime/runtime';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './Chat.module.scss';
import ChattingList from '@/component_list/chattingList/ChattingList';
import { useSTT } from '@/models/audio/useSTT';
import { useHandleChat } from '@/models/chat/useHandleChat';

const Chat = () => {
  const { handleRecAudio } = useSTT();
  const {
    chatInfoList,
    recordingBox,
    isAnswering,
    handleChangeRecordingBox,
    handleChangeIsAnswering,
    handleChangeChatInfoList,
    addRecordingBox,
    submitAnswer,
  } = useHandleChat();

  useEffect(() => {
    let interviewerTimer = setTimeout(() => {
      handleChangeChatInfoList({ type: 'other', name: '면접관', message: 'test 문구' });
    }, 5000);

    let recordingBoxTimer = setTimeout(() => {
      addRecordingBox();
    }, 7000);

    return () => {
      clearTimeout(interviewerTimer);
      clearTimeout(recordingBoxTimer);
    };
  }, [addRecordingBox, handleChangeChatInfoList]);

  return (
    <div className={styles.layout}>
      <div className={styles.chat}>
        <ChattingList
          content={chatInfoList}
          recordingBox={recordingBox}
          onRecAudio={handleRecAudio}
          onChangeIsAnswering={handleChangeIsAnswering}
          onChangeRecordingBoxState={handleChangeRecordingBox}
        />
      </div>
      <button
        className={isAnswering ? styles.button : styles.not_active_btn}
        onClick={() => isAnswering && submitAnswer()}
        disabled={!isAnswering}
      >
        {isAnswering ? '답변을 마쳤어요!' : '문제를 출제중입니다...'}
      </button>
    </div>
  );
};

export default Chat;
