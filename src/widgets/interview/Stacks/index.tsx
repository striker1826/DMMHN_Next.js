'use client';

import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { StackTypeList } from '@/component_list/index';
import Button from '@/shared/components/Button/Button';
import styles from './index.module.scss';
import { Stack } from '@/shared/types/stack';

export type stack_type = '공통' | 'FE' | 'BE';

export const Stacks = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentType, setCurrentType] = useState<stack_type | null>(null);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [stacks, setStacks] = useState<Stack[]>([]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const fetchStacks = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/stack/list`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();

      setStacks(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchStacks();
  }, [fetchStacks]);

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
  };

  const isActive = (type: stack_type) => {
    return (
      currentType === type || (type === '공통' && (currentType === 'FE' || currentType === 'BE'))
    );
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <StackTypeList handleClickType={handleClickType} currentType={currentType} />
        <div className={styles.stack_name_container}>
          <ul className={styles.stack_name_wrapper}>
            {stacks.map(({ stack, stackId, QuestionType }) => (
              <li key={stackId}>
                <button
                  type="button"
                  name={QuestionType.type}
                  onClick={() => handleClickSelectStack(stack)}
                  className={`${styles.stack_name_btn} ${
                    isActive(QuestionType.type as stack_type) ? styles.active : ''
                  }`}
                >
                  {stack}
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
      </div>
    </div>
  );
};
