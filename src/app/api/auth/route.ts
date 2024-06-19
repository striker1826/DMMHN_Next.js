import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const code = new URL(request.url);

  return NextResponse.json({ code });
}
