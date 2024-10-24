import { useRouter } from 'next/navigation';

export const getStacks = async (accessToken?: string) => {
  const response = await fetch(`${process.env.BASE_URL}/stack/list`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
  }

  const data = await response.json();

  return data;
};
