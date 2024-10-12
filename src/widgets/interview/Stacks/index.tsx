'use client';

import { MouseEventHandler, useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { StackTypeList } from '@/component_list/index';
import Button from '@/shared/components/Button/Button';
import { Stack } from '@/shared/types/stack';
import { InterviewStatus } from '@/app/interview/InterviewContainer';
import styles from './index.module.scss';

export type stack_type = '공통' | 'FE' | 'BE';

interface Props {
  onChangeStatus: (status: InterviewStatus) => void;
  stacks: Stack[];
}

export const Stacks = ({ onChangeStatus, stacks }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentType, setCurrentType] = useState<stack_type | null>(null);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleClickType: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    const selectedType = e.currentTarget.name as stack_type;

    if (currentType === selectedType) {
      setCurrentType(null);
    } else {
      setCurrentType(selectedType);
    }
  };

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
    const queryString = createQueryString('stacks', selectedStacks.join(','));
    router.push(`${pathname}?${queryString}`);
    onChangeStatus('ready');
  };

  const isActive = (type: stack_type) => {
    return (
      currentType === type || (type === '공통' && (currentType === 'FE' || currentType === 'BE'))
    );
  };

  return (
    <>
      <StackTypeList handleClickType={handleClickType} currentType={currentType} />
      <div className={styles.stack_name_container}>
        <ul className={styles.stack_name_wrapper}>
          {stacks.map(({ questionTypeId, type }) => (
            <li key={questionTypeId}>
              <button
                type="button"
                name={type}
                onClick={() => handleClickSelectStack(type)}
                className={`${styles.stack_name_btn} ${
                  isActive(type as stack_type) ? styles.active : ''
                }`}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
        <p>
          {selectedStacks.length > 0
            ? `지금 선택된 스택은 ${selectedStacks.join(',')} 입니다.`
            : '위 태그를 토글해서 면접 볼 기술 스택을 최대 3개까지 선택해주세요!'}
        </p>
        <Button text="면접 시작!" onClick={applySelectedStacks} />
      </div>
    </>
  );
};
