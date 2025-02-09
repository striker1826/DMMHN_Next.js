export const userInfo = async (accessToken?: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/server', {
    method: 'POST',
    body: JSON.stringify({
      path: '/user/info',
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
