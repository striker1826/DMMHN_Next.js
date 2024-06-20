import Header from '@/widgets/Header/Header';
import '../globals.css';

export const metadata = {
  title: '떨면뭐하니 | 모의면접',
  description: '떨면 뭐하니 모의면접을 볼 수 있는 페이지입니다. ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body lang="ko">
      <Header />
      {children}
    </body>
  );
}
