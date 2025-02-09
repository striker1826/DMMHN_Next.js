import { Suspense } from 'react';
import { cookies } from 'next/headers';
import InterviewContainer from './InterviewContainer';
import styles from './page.module.scss';

const Page = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await fetch('http://localhost:3000/api/server', {
    method: 'POST',
    body: JSON.stringify({
      path: '/stack/list',
      method: 'GET',
      accessToken,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const stacksData = await response.json();
  console.log(stacksData);

  return (
    <div className={styles.wrap}>
      <Suspense>
        <InterviewContainer stacks={stacksData} accessToken={accessToken} />
      </Suspense>
    </div>
  );
};

export default Page;
