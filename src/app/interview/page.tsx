import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getStacks } from '@/queries/stacks/stacksApi';
import InterviewContainer from './InterviewContainer';
import styles from './page.module.scss';

const Page = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const stacksData = await getStacks(accessToken);

  return (
    <div className={styles.wrap}>
      <Suspense>
        <InterviewContainer stacks={stacksData} accessToken={accessToken} />
      </Suspense>
    </div>
  );
};

export default Page;
