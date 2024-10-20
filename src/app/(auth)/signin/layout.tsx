import Header from '@/widgets/Header/Header';

export const metadata = {
  title: '로그인 페이지 | 떨면뭐하니',
  description: '떨면뭐하니의 로그인 페이지입니다.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
