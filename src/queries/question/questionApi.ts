export const getFirstQuestionForGPT = async ({
  stacks,
  accessToken,
}: {
  stacks?: string;
  accessToken?: string;
}) => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/server', {
    method: 'POST',
    body: JSON.stringify({
      path: `/question/ai/first?stacks=${stacks}`,
      method: 'GET',
      accessToken,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};
