// middleware.js
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
  console.log(userAgent);
  console.log(isMobile);

  if (isMobile) {
    return NextResponse.redirect(new URL("/mobile-page", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/", // 리다이렉션을 적용할 경로를 지정
};
