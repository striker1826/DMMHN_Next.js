import React from 'react';
import Chatting from '@/components/chat/chatting/Chatting';

interface Props {
  content: {
    type: 'other' | 'mine' | 'recording' | 'exit';
    name: string;
    message: string;
  }[];
  recordingBox: boolean;
  onRecAudio: () => void;
  onChangeRecordingBoxState: (state: boolean) => void;
  onChangeIsAnswering: (state: boolean) => void;
  handleToExitChat: () => void;
}

const ChattingList = ({
  content,
  recordingBox,
  onRecAudio,
  onChangeIsAnswering,
  onChangeRecordingBoxState,
  handleToExitChat,
}: Props) => {
  return content.map((chatInfo, index) => (
    <div key={index} className={chatInfo.type === 'other' ? 'other' : 'mine'}>
      <Chatting
        type={chatInfo.type}
        name={chatInfo.name}
        message={chatInfo.message}
        questionIsLoading
        recordingBox={recordingBox}
        onRecAudio={onRecAudio}
        handleToExitChat={handleToExitChat}
        onChangeIsAnswering={onChangeIsAnswering}
        onChangeRecordingBoxState={onChangeRecordingBoxState}
      />
    </div>
  ));
};

export default ChattingList;
