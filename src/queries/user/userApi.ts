import { apiInstance } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

const key = {
  user: () => ['/user/info'],
};

export const useUserInfo = () => {
  return useQuery<User>({
    queryKey: key.user(),
    queryFn: () => apiInstance.get('/user/info'),
  });
};
