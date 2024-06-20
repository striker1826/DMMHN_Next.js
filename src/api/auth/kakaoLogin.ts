import { apiInstance } from '@/shared/utils/axios';
import { queryOptions, useQuery } from '@tanstack/react-query';

const key = {
  kakaoLogin: () => ['/auth/kakao'],
};

export const authApi = {
  queryKey: () => key.kakaoLogin(),

  queryOptions: (data: any) =>
    queryOptions<{ access_token: string; refresh_token: string }>({
      queryKey: authApi.queryKey(),
      queryFn: () => apiInstance.post('/auth/kakao', { code: data.code }),
      enabled: !!data.code,
    }),
  // return useQuery({
  //   queryKey: ['/auth/kakao'],
  //   queryFn: () => apiInstance.post('/auth/kakao', { code }),
  //   enabled: !!code,
  // });
};
