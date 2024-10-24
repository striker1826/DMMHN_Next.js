import { QuestionResponse } from '@/shared/types/question';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getQuestionListApi = async (stacksId: string): Promise<QuestionResponse[]> => {
  const accessToken = cookies.get('accessToken');

  const response = await fetch(`${process.env.BASE_URL}/question?stacks=${stacksId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case 400:
        alert('stack의 갯수는 3개를 넘어갈 수 없습니다');
    }
  }

  const questionList = await response.json();
  return questionList;
};
