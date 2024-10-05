export const userInfo = async (accessToken?: string) => {
  const response = await fetch(`${process.env.BASE_URL}/user/info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
