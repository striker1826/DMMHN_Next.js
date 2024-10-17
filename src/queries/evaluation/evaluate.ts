export async function evaluate({
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
  const result = data.map((item: string) => JSON.parse(item));

  return result;
}

export async function totalEvaluate({
  accessToken,
  totalEvaluation,
}: {
  accessToken?: string;
  totalEvaluation: string[];
}) {
  const response = await fetch(`${process.env.BASE_URL}/grading/evaluation/overall`, {
    method: 'POST',
    body: JSON.stringify(totalEvaluation),
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
