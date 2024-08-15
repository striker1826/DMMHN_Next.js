import styles from './page.module.scss';
import { Simulation } from '@/widgets/interview';

const page = () => {
  return (
    <div className={styles.wrap}>
      <main className={styles.layout}>
        <Simulation />
      </main>
    </div>
  );
};

export default page;
