import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getStacks } from '@/queries/stacks/stacksApi';
import Simulation from './Simulation';
import styles from './page.module.scss';

const Page = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const data = await getStacks(accessToken?.value);

  return (
    <div className={styles.wrap}>
      <main className={styles.layout}>
        <Suspense>
          <Simulation stacks={data} />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
