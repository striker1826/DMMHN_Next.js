import styles from './page.module.scss';
import { Simulation } from '@/widgets/interview';

const page = () => {
  return (
    <main className={styles.layout}>
      <Simulation />
    </main>
  );
};

export default page;
