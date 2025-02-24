import { Suspense } from 'react';
import { cookies } from 'next/headers';
import InterviewContainer from './InterviewContainer';
import styles from './page.module.scss';

const Page = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/server', {
    method: 'POST',
    body: JSON.stringify({
      path: '/stack/list',
      method: 'GET',
      accessToken,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const stacksData = await response.json();

  return (
    <div className={styles.wrap}>
      <Suspense>
        <InterviewContainer stacks={stacksData} accessToken={accessToken} />
      </Suspense>
    </div>
  );
};

export default Page;
