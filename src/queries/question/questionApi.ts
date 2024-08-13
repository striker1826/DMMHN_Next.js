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
