import styles from './page.module.scss';
import MovePageBtn from '@/shared/components/Button/MovePageBtn/MovePageBtn';
import LoginModal from '@/components/auth/LoginModal/LoginModal';

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
            <MovePageBtn route="/interview" />
          </div>
        </div>
      </section>

      <LoginModal />
    </div>
  );
}
