import Header from '@/widgets/Header/Header';
import '../globals.css';

export const metadata = {
  title: '모의면접 | 떨면뭐하니',
  description: '떨면 뭐하니 모의면접을 볼 수 있는 페이지입니다. ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body
      lang="ko"
      style={{
        background:
          'radial-gradient(321.46% 126.46% at 86.33% 0%, #1b172f 0%, #1a1a1a 47.92%, #1b172f 100%)',
      }}
    >
      <Header />
      {children}
    </body>
  );
}
