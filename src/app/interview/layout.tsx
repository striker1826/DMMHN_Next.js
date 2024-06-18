import "../globals.css";

export const metadata = {
  title: "떨면뭐하니 | 모의면접",
  description: "떨면 뭐하니 모의면접을 볼 수 있는 페이지입니다. ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
