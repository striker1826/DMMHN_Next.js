// RootLayout.tsx
import { Noto_Sans } from 'next/font/google';
import Providers from './providers';
import Header from '@/widgets/Header/Header';
import './globals.css';

const noto_sans = Noto_Sans({ subsets: ['latin'] });

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
