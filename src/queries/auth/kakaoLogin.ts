import { apiInstance } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

const key = {
  kakaoLogin: () => ['/auth/v2/kakao'],
};

export const useKakaoLogin = (data: { code: string }) => {
  return useQuery<{ profileImg: string }>({
    queryKey: key.kakaoLogin(),
    queryFn: () => apiInstance.post('/auth/v2/kakao', { code: data.code }),
    enabled: !!data.code,
  });
};
