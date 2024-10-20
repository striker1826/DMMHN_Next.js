export async function postFeedback({
  accessToken,
  QnAList,
}: {
  accessToken?: string;
  QnAList: {
    question: string;
    answer: string;
  }[];
}) {
  const response = await fetch(`${process.env.BASE_URL}/grading/evaluation`, {
    method: 'POST',
    body: JSON.stringify(QnAList),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const result = data.map((string: string) => {
    const splitPoint = string.split('good: ')[1];
    const good = splitPoint.split(', bad')[0];
    const bad = splitPoint.split('bad: ')[1].split('}')[0];
    return { good, bad };
  });

  return result;
}

export async function postTotalFeedback({
  accessToken,
  totalFeedback,
}: {
  accessToken?: string;
  totalFeedback: { evaluation: string }[];
}) {
  const response = await fetch(`${process.env.BASE_URL}/grading/evaluation/overall`, {
    method: 'POST',
    body: JSON.stringify(totalFeedback),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const { overallRating } = await response.json();

  return overallRating;
}
