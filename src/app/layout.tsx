// RootLayout.tsx
import { Noto_Sans } from 'next/font/google';
import Providers from './providers';
import Header from '@/widgets/Header/Header';
import './globals.css';
import { Metadata } from 'next';

const noto_sans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  verification: {
    google: 'Ya7ZnVh0xkzVkVOP7YentAb0Z_1FbJ2E_qD3iqrUH0E',
  },
  title: '떨면뭐하니에 오신 것을 환영합니다! | 떨면뭐하니',
  description: '개발자 기술 면접이 걱정되신다면? 떨면뭐하니에서 연습해 보세요!',
  openGraph: {
    title: '떨면뭐하니',
    description: '개발자 기술 면접이 걱정되신다면? 떨면뭐하니에서 연습해 보세요!',
    type: 'website',
    url: 'https://www.genius-interview.com',
    siteName: '떨면뭐하니',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://s3.ap-northeast-2.amazonaws.com/battlecode.shop/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2024-11-04+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+10.10.42.png',
        width: 800,
        height: 600,
        alt: '떨면뭐하니 랜딩페이지 사진',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={noto_sans.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
