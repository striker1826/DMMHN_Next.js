import styles from './page.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <p className={styles.heading}>
          연습을 통해 면접을 대비해보세요.
          <br /> <span>“떨면 뭐하니”</span>가 도와드립니다.
        </p>
        <p className={styles.description}>
          떨면뭐하니의 모의 면접을 이용하여 당신의 꿈을 이뤄줄 면접을 대비해보세요.
        </p>
        <Link href="/interview" className={styles.interviewBtn}>
          모의면접
        </Link>
      </div>
      <div className={styles.gettyImage}></div>
    </main>
  );
}
