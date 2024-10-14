import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.introduceContainer}>
        <div className={styles.introduce}>
          <p className={styles.heading}>
            연습을 통해 면접을 대비해보세요.
            <br /> <span>떨면 뭐하니</span>가 도와드립니다.
          </p>
          <p className={styles.description}>
            떨면뭐하니의 모의 면접을 이용하여 당신의 꿈을 이뤄줄 면접을 대비해보세요.
          </p>
          <div className={styles.interviewBtnWrapper}>
            <Link href="/interview" className={styles.interviewBtn}>
              모의면접
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.gettyImageWrapper}>
        <Image src="/gettyImage.png" width={720} height={480} alt="character-image" />
      </section>
    </div>
  );
}
