'use server';

import { cookies } from 'next/headers';

const cookieStore = cookies();
const accessToken = cookieStore.get('accessToken')?.value;

export async function send(email: string) {
  const response = await fetch(`${process.env.BASE_URL}/auth/send/authcode`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return true;
}

export async function verify({ email, code }: { email: string; code: string }) {
  const response = await fetch(`${process.env.BASE_URL}/auth/confirm/authcode`, {
    method: 'POST',
    body: JSON.stringify({ email, code }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return true;
}
