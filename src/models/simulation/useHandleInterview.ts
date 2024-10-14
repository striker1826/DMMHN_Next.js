'use client';

import { useCallback, useState } from 'react';
import { QuestionResponse } from '@/shared/types/question';
import { getQuestionListApi } from '@/queries/question/getQuestionListApi';
import { useSearchParams } from 'next/navigation';

export const useHandleInterview = () => {
  const searchParams = useSearchParams();
  const stacksId = searchParams.get('stacks');
  const [questionList, setQuestionList] = useState<QuestionResponse[]>([]);

  const handleLoadQuestionList = useCallback(async () => {
    const questionList = await getQuestionListApi(stacksId || '');
    setQuestionList(questionList);
  }, [stacksId]);

  return {
    questionList,
    handleLoadQuestionList,
  };
};
