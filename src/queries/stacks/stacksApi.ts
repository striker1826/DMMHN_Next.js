export const getStacks = async (accessToken?: string) => {
  const response = await fetch('http://localhost:3000/api/server', {
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
  const result = await response.json();
  return result;
};
