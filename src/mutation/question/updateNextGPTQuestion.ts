'use server';

export const updateNextGPTQuestion = async ({
  stacksText,
  accessToken,
  question,
  answer,
  previousQuestions,
}: {
  stacksText: string | null;
  question: string;
  answer: string;
  previousQuestions: string[];
  accessToken?: string;
}) => {
  if (!stacksText) return;

  const stacks = stacksText.split(',');

  const response = await fetch(`${process.env.BASE_URL}/answer/grading`, {
    method: 'POST',
    body: JSON.stringify({
      question,
      answer,
      stacks,
      previousQuestions,
    }),
    headers: {
      'Content-Type': 'application/json',
      Cookie: `accessToken=${accessToken};`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
