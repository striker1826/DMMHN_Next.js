import { apiInstance } from '@/shared/utils/axios';
import { queryOptions, useQuery } from '@tanstack/react-query';

const key = {
  user: () => ['/user/info'],
};

export const userApi = {
  queryKey: () => key.user(),

  queryOptions: (enabled?: boolean) =>
    queryOptions<User>({
      queryKey: userApi.queryKey(),
      queryFn: () => apiInstance.get('/user/info'),
      enabled,
    }),
};
