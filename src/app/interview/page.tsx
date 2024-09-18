import styles from './page.module.scss';
import Simulation from './Simulation';

const Page = ({}) => {
  return (
    <div className={styles.wrap}>
      <main className={styles.layout}>
        <Simulation />
      </main>
    </div>
  );
};

export default Page;
