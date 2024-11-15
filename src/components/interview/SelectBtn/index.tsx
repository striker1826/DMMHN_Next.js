import { TInterviewType } from '@/shared/types/interviewType';
import { Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
  type: TInterviewType;
  selectedType: TInterviewType;
  handleClickBtn: (type: TInterviewType) => void;
}

enum InterviewTypeEnum {
  normal = '기본 면접',
  follow = '꼬리질문 면접',
}

export function SelectBtn({ type, selectedType, handleClickBtn }: Props) {
  return (
    <>
      {type === selectedType ? (
        <Button
          onClick={() => console.log('aa')}
          height="none"
          fontSize="36px"
          padding="12px 32px"
          borderRadius="80px"
          backgroundColor="#058841"
          transition="all 0.2s ease-in-out"
          border="2px solid rgba(0, 0, 0, 0.1)"
          color="#fff"
          _hover="none"
        >
          {InterviewTypeEnum[type]}
        </Button>
      ) : (
        <Button
          onClick={() => handleClickBtn(type)}
          height="none"
          fontSize="36px"
          paddingY="12px"
          paddingX="32px"
          borderRadius="80px"
          backgroundColor="#fff"
          border="2px solid #058841"
          transition="all 0.2s ease-in-out"
          _hover={{
            backgroundColor: '#058841',
            color: '#fff',
          }}
        >
          {InterviewTypeEnum[type]}
        </Button>
      )}
    </>
  );
}
