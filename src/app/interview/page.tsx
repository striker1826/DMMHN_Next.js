import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getStacks } from '@/queries/stacks/stacksApi';
import { getFirstQuestionForGPT } from '@/queries/question/questionApi';
import Simulation from './Simulation';
import styles from './page.module.scss';

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const stacksData = await getStacks(accessToken);
  const firstQuestionData = await getFirstQuestionForGPT({
    stacks: searchParams?.stacks,
    accessToken,
  });

  return (
    <div className={styles.wrap}>
      <main className={styles.layout}>
        <Suspense>
          <Simulation
            stacks={stacksData}
            firstQuestion={firstQuestionData.result.message.content}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
