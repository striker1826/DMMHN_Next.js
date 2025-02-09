import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { path, body, accessToken, method = 'POST' } = await req.json();

    const response = await fetch(`${process.env.BASE_URL}${path}`, {
      method,
      body: method === 'GET' ? undefined : JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `${response.status} ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
