'use server';

import { cookies } from 'next/headers';

export async function verifyEmail(formData: FormData) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const email = formData.get('email');

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
