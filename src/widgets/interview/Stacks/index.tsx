'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '@/shared/components/Button/Button';
import { Stack } from '@/shared/types/stack';
import { InterviewStatus } from '@/app/interview/InterviewContainer';
import styles from './Stacks.module.scss';

export type stack_type = '공통' | 'FE' | 'BE';

interface Props {
  onChangeStatus: (status: InterviewStatus) => void;
  stacks: Stack[];
}

export const Stacks = ({ onChangeStatus, stacks }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleClickSelectStack = (stack: string) => {
    setSelectedStacks(prev => {
      if (prev.includes(stack)) {
        return prev.filter(item => item !== stack);
      }
      if (prev.length >= 3) {
        alert('기술 스택은 최대 3개까지 선택 가능합니다!');
        return prev;
      }
      return [...prev, stack];
    });
  };

  const applySelectedStacks = () => {
    if (!selectedStacks.length) {
      return;
    }
    const queryString = createQueryString('stacks', selectedStacks.join(','));
    router.push(`${pathname}?${queryString}`);
    onChangeStatus('ready');
  };

  return (
    <>
      <div className={styles.stack_header}>
        <h1>사용할 기술 스택을 선택해 주세요!</h1>
        <p>최대 3개까지 선택 가능합니다.</p>
      </div>
      <ul className={styles.stack_name_wrapper}>
        {stacks.map(({ questionTypeId, type }) => (
          <li key={questionTypeId}>
            <button
              type="button"
              name={type}
              onClick={() => handleClickSelectStack(String(questionTypeId))}
              className={
                selectedStacks.includes(String(questionTypeId))
                  ? styles.selected_stack_name_btn
                  : styles.stack_name_btn
              }
            >
              {type}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.next_btn_wrapper}>
        <Button text="다음으로" onClick={applySelectedStacks} />
      </div>
    </>
  );
};
