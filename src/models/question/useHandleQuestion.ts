import { QuestionResponse } from '@/shared/types/question';
import { useCallback, useState } from 'react';

/**
 * 면접 질문을 로드하고 상태를 관리하는 커스텀 훅입니다.
 *
 * @param {Object} params - 훅에 전달되는 파라미터 객체입니다.
 * @param {QuestionResponse[]} params.questionList - 면접 중에 로드될 질문 객체들의 배열입니다.
 *
 * @returns {Object} - 현재 질문 상태, 다음 질문이 있는지 여부, 다음 질문을 로드하는 메서드를 포함한 객체를 반환합니다.
 *
 * @property {boolean} hasNextQuestion - 다음 질문이 있는지 여부를 나타냅니다.
 * @property {number} currentQuestionNumber - 현재 질문의 번호를 나타냅니다.
 * @property {string} currentQuestion - 현재 질문의 텍스트입니다.
 * @property {number} questionLength - 전체 질문의 개수를 나타냅니다.
 * @property {Function} handleLoadNextQuestion - 다음 질문을 로드하는 함수입니다.
 */
export const useHandleQuestion = ({ questionList }: { questionList: QuestionResponse[] }) => {
  const [hasNextQuestion, setHasNextQuestion] = useState<boolean>(true);
  const [questionInfo, setQuestionInfo] = useState<{
    questionLength: number;
    currentQuestionNumber: number;
    currentQuestion: string;
  }>({
    questionLength: 5,
    currentQuestionNumber: 1,
    currentQuestion: '',
  });

  const handleLoadNextQuestion = useCallback(() => {
    if (!hasNextQuestion) {
      return;
    }

    setQuestionInfo(prev => {
      const nextQuestionNumber = prev.currentQuestionNumber + 1;
      return {
        ...prev,
        currentQuestionNumber: nextQuestionNumber,
        currentQuestion: questionList[nextQuestionNumber - 1]?.question || '',
      };
    });

    setHasNextQuestion(questionInfo.questionLength !== questionInfo.currentQuestionNumber);
  }, [hasNextQuestion, questionInfo, questionList]);

  return {
    hasNextQuestion,
    currentQuestionNumber: questionInfo.currentQuestionNumber,
    currentQuestion: questionInfo.currentQuestion,
    questionLength: questionInfo.questionLength,
    handleLoadNextQuestion,
  };
};
