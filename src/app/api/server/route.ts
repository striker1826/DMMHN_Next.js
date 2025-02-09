import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { path, data, accessToken, method = 'POST' } = await req.json();

    // method가 'POST'일 때만 처리하는 부분이 필요하면 여기서 추가로 조건을 넣을 수 있습니다.

    // data가 있을 경우에만 body에 포함
    const body = data ? JSON.stringify(data) : undefined;

    const response = await fetch(`http://dmmhn.shop${path}`, {
      method,
      body: method === 'GET' ? undefined : body, // method가 GET이면 body는 전달하지 않음
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

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
