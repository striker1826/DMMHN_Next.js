'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Stack } from '@/shared/types/stack';
import { InterviewStatus } from '@/app/interview/InterviewContainer';
import styles from './Stacks.module.scss';
import PrimaryBtn from '@/shared/components/Button/PrimaryBtn/PrimaryBtn';
import { Button } from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';

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

    onChangeStatus('interviewing');
  };

  return (
    <div className="relative">
      <div>
        <div className={`flex flex-col items-center gap-[8px]`}>
          <h1
            className={`r-lg:text-[36px] text-center break-keep r-lg:font-[700] text-[18px] font-[600]`}
          >
            사용할 기술 스택을 선택해주세요!
          </h1>
          <p className={`r-lg:text-[20px] r-lg:text-[rgba(0,0,0,0.4)] text-[16px]`}>
            최대 3개까지 선택 가능합니다.
          </p>
        </div>
        <div className={`mt-[60px] flex flex-col w-full h-full justify-center items-center`}>
          <ul className={`gap-[5px] flex justify-center items-center w-full gap-[20px]`}>
            {stacks.map(
              ({ questionTypeId, type }) =>
                type === 'FrontEnd' && (
                  <li key={questionTypeId}>
                    <button
                      type="button"
                      name={type}
                      onClick={() => handleSelectStack(String(questionTypeId))}
                      className={
                        selectedStacks.includes(String(questionTypeId))
                          ? 'text-[18px] py-[6px] px-[12px] rounded-[30px] r-lg:text-[36px] r-lg:py-[12px] r-lg:px-[32px] bg-[#058841] border-[2px] border-[rgba(0,0,0,0.1) text-[#fff] cursor-pointer] '
                          : 'text-[18px] py-[6px] px-[12px] rounded-[30px] r-lg:text-[36px] r-lg:py-[12px] r-lg:px-[32px] rounded-[80px] bg-[#fff] border-[2px] border-[#058841] cursor-pointer transition-all duration-200 ease-in-out'
                      }
                    >
                      {type}
                    </button>
                  </li>
                ),
            )}
          </ul>
        </div>
        <Button onClick={() => applySelectedStacks(selectedStacks)} variant="arrowRight">
          <SlArrowRight />
        </Button>
      </div>

      <button
        onClick={() => applySelectedStacks(selectedStacks)}
        className="block r-lg:hidden fixed bottom-[32px] right-1/2 translate-x-1/2 p-[12px_24px] rounded-[8px] bg-[#e3e399] text-[rgb(1,82,39)] text-[16px] cursor-pointer w-[calc(100%-88px)] transition-colors duration-200 ease-in-out hover:bg-[#04672d]"
      >
        면접보러 가기
      </button>
    </div>
  );
};
