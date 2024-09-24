import { Question } from '@/shared/types/question';
import { apiInstance } from '@/shared/utils/axios';
import { queryOptions, useQuery } from '@tanstack/react-query';

const key = {
  question: () => ['/question'],
};

export const useQuestion = () => {
  return useQuery<Question[]>({
    queryKey: key.question(),
    queryFn: () => apiInstance.get('/question/all/2'),
  });
};

export const getFirstQuestionForGPT = async ({
  stacks,
  accessToken,
}: {
  stacks?: string;
  accessToken?: string;
}) => {
  const response = await fetch(`${process.env.BASE_URL}/question/ai/first?stacks=${stacks}`, {
    headers: {
      Cookie: `accessToken=${accessToken};`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
