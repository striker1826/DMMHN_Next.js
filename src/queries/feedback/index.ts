export async function postFeedback({
  accessToken,
  QnAList,
}: {
  accessToken?: string;
  QnAList: { question: string; answer: string }[];
}) {
  const response = await fetch('/api/server', {
    method: 'POST',
    body: JSON.stringify({
      path: '/grading/evaluation',
      data: QnAList,
      accessToken,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.map((string: string) => {
    const splitPoint = string.split('good: ')[1];
    const good = splitPoint.split(', bad')[0];
    const bad = splitPoint.split('bad: ')[1].slice(0, -2);
    return { good, bad };
  });
}

export async function postTotalFeedback({
  accessToken,
  totalFeedback,
}: {
  accessToken?: string;
  totalFeedback: { evaluation: string }[];
}) {
  const response = await fetch('/api/server', {
    method: 'POST',
    body: JSON.stringify({
      path: '/grading/evaluation/overall',
      data: totalFeedback,
      accessToken,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const { overallRating } = await response.json();
  return overallRating;
}
