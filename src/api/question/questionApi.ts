import { Question } from '@/shared/types/question';
import { apiInstance } from '@/shared/utils/axios';
import { queryOptions } from '@tanstack/react-query';

const key = {
  question: () => ['/question'],
};

export const questionApi = {
  queryKey: () => key.question(),

  queryOptions: () =>
    queryOptions<Question[]>({
      queryKey: questionApi.queryKey(),
      queryFn: () => apiInstance.get('/question/all/2'),
    }),
};
