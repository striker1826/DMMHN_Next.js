// RootLayout.tsx
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const noto_sans = Noto_Sans({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={noto_sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
