import Link from 'next/link';
import styles from './LogInBtn.module.scss';

export const LogInBtn = () => {
  return (
    <Link href="/signin">
      <div className={styles.login}>
        <p>로그인</p>
      </div>
    </Link>
  );
};
