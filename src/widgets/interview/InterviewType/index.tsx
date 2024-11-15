import SelectBtnList from '@/component_list/interview/SelectBtnList';
import { INTERVIEW_TYPE } from '@/shared/constant/interviewType';
import { TInterviewType } from '@/shared/types/interviewType';
import { Button, Flex } from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';

interface Props {
  selectedType: TInterviewType;
  selectInterviewType: (type: TInterviewType) => void;
  handleChangeStatus: (
    status: 'interviewType' | 'stacks' | 'ready' | 'interviewing' | 'feedback',
  ) => void;
}

export const InterviewType = ({ selectedType, selectInterviewType, handleChangeStatus }: Props) => {
  const applySelectedInterviewType = () => {
    handleChangeStatus('stacks');
  };

  return (
    <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
      <Flex alignItems="center" justifyContent="center" width="100%" height="100%" gap="20px">
        <SelectBtnList
          selectList={INTERVIEW_TYPE}
          selectedType={selectedType}
          handleClickBtn={selectInterviewType}
        />
      </Flex>
      <Button onClick={() => applySelectedInterviewType()} variant="arrowRight">
        <SlArrowRight />
      </Button>
    </Flex>
  );
};
