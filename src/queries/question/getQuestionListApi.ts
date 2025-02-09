import { QuestionResponse } from '@/shared/types/question';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getQuestionListApi = async (stacksId: string): Promise<QuestionResponse[]> => {
  const accessToken = cookies.get('accessToken');

  const response = await fetch('/api/server', {
    method: 'POST',
    body: JSON.stringify({
      path: `/question?stacks=${stacksId}`,
      method: 'GET',
      accessToken,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    if (response.status === 400) {
      alert('stack의 갯수는 3개를 넘어갈 수 없습니다');
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};
