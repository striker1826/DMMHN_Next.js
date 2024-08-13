import { apiInstance } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

const key = {
  kakaoLogin: () => ['/auth/v2/kakao'],
};

export const useKakaoLogin = ({ code }: { code: string }) => {
  return useQuery({
    queryKey: key.kakaoLogin(),
    queryFn: () => apiInstance.post('/auth/v2/kakao', { code: code }),
    enabled: !!code,
  });
};
