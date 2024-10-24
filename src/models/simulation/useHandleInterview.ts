'use client';

import { useCallback, useState } from 'react';
import { QuestionResponse } from '@/shared/types/question';
import { getQuestionListApi } from '@/queries/question/getQuestionListApi';
import { useSearchParams } from 'next/navigation';

export const useHandleInterview = () => {
  const [questionList, setQuestionList] = useState<QuestionResponse[]>([]);

  const handleLoadQuestionList = useCallback(async (stackIds: string[]) => {
    const stackIdsString = stackIds.join(',');
    const questionList = await getQuestionListApi(stackIdsString || '');
    setQuestionList(questionList);
  }, []);

  return {
    questionList,
    handleLoadQuestionList,
  };
};
