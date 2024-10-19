'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Stack } from '@/shared/types/stack';
import { InterviewStatus } from '@/app/interview/InterviewContainer';
import styles from './Stacks.module.scss';
import PrimaryBtn from '@/shared/components/Button/PrimaryBtn/PrimaryBtn';

export type stack_type = '공통' | 'FE' | 'BE';

interface Props {
  stacks: Stack[];
  selectedStacks: string[];
  handleSelectStack: (stack: string) => void;
  onChangeStatus: (status: InterviewStatus) => void;
}

export const Stacks = ({ stacks, selectedStacks, onChangeStatus, handleSelectStack }: Props) => {
  const applySelectedStacks = (selectedStacks: string[]) => {
    if (!selectedStacks.length) {
      alert('면접 볼 stack을 선택해주세요!');
      return;
    }

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
              onClick={() => handleSelectStack(String(questionTypeId))}
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
        <PrimaryBtn text="다음으로" onClick={() => applySelectedStacks(selectedStacks)} />
      </div>
    </>
  );
};
