import React from 'react';
import { StaticImageData } from 'next/image';
import { ChattingItem } from '@/components/chat';

interface Props {
  content: {
    type: 'other' | 'mine' | 'recording' | 'exit';
    name: string;
    message: string;
    profileImg: StaticImageData;
  }[];
  recordingBox: boolean;
  onChangeRecordingBoxState: (state: boolean) => void;
  onChangeIsAnswering: (state: boolean) => void;
  handleToExitChat: () => void;
  onDelayStopListening: (noAnswer?: string) => void;
}

const ChattingList = ({
  content,
  recordingBox,
  onChangeIsAnswering,
  onChangeRecordingBoxState,
  handleToExitChat,
  onDelayStopListening,
}: Props) => {
  return content.map((chatInfo, index) => (
    <div key={index} className={chatInfo.type === 'other' ? 'other' : 'mine'}>
      <ChattingItem
        type={chatInfo.type}
        name={chatInfo.name}
        message={chatInfo.message}
        profileImg={chatInfo.profileImg}
        questionIsLoading
        recordingBox={recordingBox}
        handleToExitChat={handleToExitChat}
        onChangeIsAnswering={onChangeIsAnswering}
        onChangeRecordingBoxState={onChangeRecordingBoxState}
        onDelayStopListening={onDelayStopListening}
      />
    </div>
  ));
};

export default ChattingList;
