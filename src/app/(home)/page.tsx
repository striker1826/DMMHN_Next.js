import styles from './page.module.scss';
import MovePageBtn from '@/shared/components/Button/MovePageBtn/MovePageBtn';
import LoginModal from '@/components/auth/LoginModal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모의면접 | 떨면뭐하니',
  description: '떨면 뭐하니 모의면접을 볼 수 있는 페이지입니다. ',
  openGraph: {
    title: '떨면뭐하니',
    description: '개발자 기술 면접이 걱정되신다면? 떨면뭐하니에서 연습해 보세요!',
    type: 'website',
    url: 'https://www.genius-interview.com/interview',
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

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.introduce}>
        <p className={styles.heading}>
          연습을 통해 면접을 대비해보세요.
          <br />
          <span>떨면 뭐하니</span>가 도와드립니다.
        </p>
        <p className={styles.description}>
          떨면뭐하니의 모의 면접을 이용하여 당신의 꿈을 이뤄줄 면접을 대비해보세요.
        </p>
      </section>
      <section className={styles.interviewBtnWrapper}>
        <MovePageBtn route="/interview" />
      </section>

      <LoginModal />
    </div>
  );
}
