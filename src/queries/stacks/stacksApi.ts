export const getStacks = async (accessToken?: string) => {
  const response = await fetch(`${process.env.BASE_URL}/stack/list`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    // switch(response.status) {
    // }
  }

  const data = await response.json();

  return data;
};
