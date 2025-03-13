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
    <div
      className={`flex flex-col r-lg:px-[160px] h-[calc(100vh-90px)] justify-start items-center gap-[20px] bg-gradient-to-br from-[#004922] via-[#02632f] to-[#058841] w-full p-[44px] pt-[80px]`}
    >
      <Suspense>
        <InterviewContainer stacks={stacksData} accessToken={accessToken} />
      </Suspense>
    </div>
  );
};

export default Page;
