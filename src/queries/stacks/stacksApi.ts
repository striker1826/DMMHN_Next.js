export const getStacks = async (accessToken?: string) => {
  const response = await fetch('/api/proxy', {
    method: 'POST',
    body: JSON.stringify({
      path: '/stack/list',
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
