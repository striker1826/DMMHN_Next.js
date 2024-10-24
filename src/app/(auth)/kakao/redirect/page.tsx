'use client';

import { MoonLoader } from 'react-spinners';
import styles from './page.module.scss';

const page = () => {
  return <KakaoRedirectComponent />;
};

const KakaoRedirectComponent = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <MoonLoader color="#02592A" loading speedMultiplier={0} />
    </div>
  );
};

export default page;
