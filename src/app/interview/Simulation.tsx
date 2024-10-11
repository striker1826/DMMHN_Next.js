'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { userInfo } from '@/queries/user/userApi';
import { End, Ready, Stacks, Start } from '@/widgets/interview';
import { Stack } from '@/shared/types/stack';

export type InterviewStatus = 'stacks' | 'ready' | 'start' | 'end';

interface Props {
  stacks: Stack[];
  firstQuestion: string;
  accessToken?: string;
}

const Simulation = ({ stacks, firstQuestion, accessToken }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<InterviewStatus>('stacks');

  useEffect(() => {
    const getUserInfo = async () => {
      console.log(accessToken);
      const result = await userInfo(accessToken);
    };

    getUserInfo();

    if (!searchParams.has('stacks')) {
      setStatus('stacks');
      router.push('/interview');
    }
  }, [router, searchParams, accessToken]);

  let content = <Stacks stacks={stacks} onChangeStatus={setStatus} />;

  if (status === 'ready') {
    content = <Ready onChangeStatus={setStatus} />;
  } else if (status === 'start') {
    content = (
      <Start
        firstQuestion={firstQuestion}
        accessToken={accessToken}
        handleInterviewStatus={setStatus}
      />
    );
  } else if (status === 'end') {
    content = <End />;
  }

  return <>{content}</>;
};

export default Simulation;
