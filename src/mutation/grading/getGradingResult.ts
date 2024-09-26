import { apiInstance } from '@/shared/utils/axios';
import { useMutation } from '@tanstack/react-query';

export const useGetGradingResult = () => {
  return useMutation({
    mutationKey: ['/answer/grading'],
    mutationFn: data => apiInstance.post('/answer/grading', data),
  });
};
