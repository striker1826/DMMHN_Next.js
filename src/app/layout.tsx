import { Noto_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/shared/components/Header/Header';
import Providers from './providers';

const noto_sans = Noto_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={noto_sans.className}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
