import { apiInstance } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const useKakaoLogin = (code: string) => {
  return useQuery({
    queryKey: ['/auth/kakao'],
    queryFn: () => apiInstance.post('/auth/kakao', { code }),
    enabled: !!code,
  });
};
