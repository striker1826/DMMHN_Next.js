export const metadata = {
  title: '모의면접 | 떨면뭐하니',
  description: '떨면 뭐하니 모의면접을 볼 수 있는 페이지입니다. ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
