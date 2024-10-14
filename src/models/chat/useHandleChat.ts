import { useCallback, useEffect, useState } from 'react';
import { useSTT } from '../audio/useSTT';
import { QuestionResponse } from '@/shared/types/question';
import { useHandleQuestion } from '../question/useHandleQuestion';
import { useHandleInterview } from '../simulation/useHandleInterview';

interface ChatInfo {
  type: 'other' | 'mine' | 'recording' | 'exit';
  name: string;
  message: string;
}

/**

	•	면접 진행 중의 채팅 인터페이스를 관리하는 커스텀 훅.
	•	음성 녹음 제어, 질문 로딩, 채팅 상태 변경 등의 기능을 제공합니다.
	•	
	•	@returns {Object} - 채팅 상태 및 제어 메서드를 포함하는 객체를 반환합니다.
	•	@property {boolean} isAnswering - 사용자가 답변 중인지 여부를 나타냅니다.
	•	@property {boolean} recordingBox - 녹음 박스의 상태를 나타냅니다.
	•	@property {Array} chatInfoList - 현재 채팅 내역 리스트를 저장합니다.
	•	@property {Function} handleChangeIsAnswering - 답변 중 상태를 변경하는 함수입니다.
	•	@property {Function} handleChangeRecordingBox - 녹음 박스 상태를 변경하는 함수입니다.
	•	@property {Function} handleLoadNextQuestion - 다음 질문을 로드하는 함수입니다.
	•	@property {Function} handleChangeChatInfoList - 채팅 내역을 업데이트하는 함수입니다.
	•	@property {Function} submitAnswer - 답변을 제출하고 다음 질문을 로드하는 함수입니다.
	•	@property {Function} addRecordingBox - 녹음 박스를 채팅에 추가하는 함수입니다.
*/
export const useHandleChat = ({
  questionList,
  handleInterviewStatus,
}: {
  questionList: QuestionResponse[];
  handleInterviewStatus: (status: 'ready' | 'start' | 'end') => void;
}) => {
  const { currentQuestion, questionLength, currentQuestionNumber, handleLoadNextQuestion } =
    useHandleQuestion({ questionList });
  const { text, handleStopRecAudio } = useSTT();
  const [isAnswering, setIsAnswering] = useState(false);
  const [recordingBox, setRecordingBox] = useState(false);
  const { handleEndQuestion } = useHandleInterview(handleInterviewStatus);
  const [chatInfoList, setChatInfoList] = useState<ChatInfo[]>([
    { type: 'other', name: '면접관', message: '안녕하세요. 5초 후에 면접을 시작하겠습니다.' },
  ]);
  /**
   * 답변 중 상태를 변경합니다.
   *
   * @param {boolean} state - 답변 중 상태 값입니다.
   */

  const handleChangeIsAnswering = (state: boolean) => {
    setIsAnswering(state);
  };

  /**
   * 녹음 박스 상태를 변경합니다.
   *
   * @param {boolean} state - 녹음 박스 상태 값입니다.
   * @returns {void}
   */
  const handleChangeRecordingBox = (state: boolean) => {
    setRecordingBox(state);
  };

  /**
   * 채팅 내역을 업데이트합니다.
   *
   * @param {ChatInfo} chatInfo - 채팅 메시지의 정보 객체입니다.
   * @param {string} chatInfo.type - 메시지의 타입 ('mine', 'other', 'recording')을 나타냅니다.
   * @param {string} chatInfo.name - 채팅을 보낸 사람의 이름입니다.
   * @param {string} chatInfo.message - 채팅 메시지 내용입니다.
   * @returns {void}
   */
  const handleChangeChatInfoList = useCallback(({ type, name, message }: ChatInfo) => {
    setChatInfoList(prev => [...prev, { type, name, message }]);
  }, []);

  /**
   * 녹음 박스를 채팅 내역에 추가합니다.
   * @returns {void}
   */
  const addRecordingBox = useCallback(() => {
    setChatInfoList(prev => [...prev, { type: 'recording', name: '나', message: '' }]);
  }, []);

  /**
   * 다음 질문을 로드하고 녹음 박스를 추가합니다.
   *
   * @param {Object} timers - 면접관 메시지와 녹음 박스를 표시할 시간 정보입니다.
   * @param {number} timers.interviewerTimer - 면접관의 메시지를 표시할 시간(ms)입니다.
   * @param {number} timers.recordingBoxTimer - 녹음 박스를 표시할 시간(ms)입니다.
   * @returns {void}
   */
  const handleLoadNextInterviewrChat = useCallback(
    ({
      interviewerTimer,
      recordingBoxTimer,
      question,
    }: {
      interviewerTimer: number;
      recordingBoxTimer: number;
      question: string;
    }) => {
      setTimeout(() => {
        setChatInfoList(prev => [...prev, { type: 'other', name: '면접관', message: question }]);
      }, interviewerTimer);

      setTimeout(() => {
        addRecordingBox();
      }, recordingBoxTimer);
    },
    [addRecordingBox],
  );

  /**
   * 사용자의 답변을 제출하고, 채팅 내역을 업데이트한 후, 다음 질문을 로드합니다.
   * 음성 녹음을 중지하고 인식된 텍스트를 채팅에 추가합니다.
   *
   * @returns {Promise<void>} - 비동기로 처리되는 함수입니다.
   */
  const submitAnswer = async () => {
    setIsAnswering(false);
    handleStopRecAudio();

    setChatInfoList(prev => {
      prev[prev.length - 1].type = 'mine';
      prev[prev.length - 1].message = text.current ? text.current : '잘 모르겠습니다.';
      return prev;
    });

    setRecordingBox(false);

    if (questionLength > currentQuestionNumber) {
      handleLoadNextQuestion();
    } else {
      handleChangeChatInfoList({
        type: 'other',
        name: '면접관',
        message: '면접이 종료되었습니다.',
      });
      handleChangeChatInfoList({
        type: 'other',
        name: '면접관',
        message: '결과를 확인해보실래요?',
      });
      handleChangeChatInfoList({
        type: 'exit',
        name: '나',
        message: '결과 확인하기',
      });
    }
  };

  useEffect(() => {
    if (currentQuestion) {
      handleLoadNextInterviewrChat({
        interviewerTimer: 2000,
        recordingBoxTimer: 4000,
        question: currentQuestion,
      });
    }
  }, [currentQuestion, handleLoadNextInterviewrChat]);

  return {
    isAnswering,
    recordingBox,
    chatInfoList,
    handleChangeIsAnswering,
    handleChangeRecordingBox,
    handleLoadNextQuestion,
    handleChangeChatInfoList,
    submitAnswer,
    addRecordingBox,
  };
};
