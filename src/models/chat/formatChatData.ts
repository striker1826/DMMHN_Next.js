import { ChatInfo } from '@/shared/types/chat';

export const formattingData = (questionAndAnswer: ChatInfo[]) => {
  // 데이터를 question과 answer로 매핑
  return questionAndAnswer.reduce<{ question: string; answer: string }[]>((acc, curr) => {
    if (curr.type === 'other') {
      acc.push({ question: curr.message, answer: '' });
    } else if (curr.type === 'mine') {
      const lastItem = acc[acc.length - 1];
      if (lastItem) {
        lastItem.answer = curr.message;
      }
    }
    return acc;
  }, []);
};
