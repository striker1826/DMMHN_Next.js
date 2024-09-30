import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '떨면뭐하니에 오신 것을 환영합니다! | 떨면뭐하니',
  description: '떨면뭐하니 랜딩페이지',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
