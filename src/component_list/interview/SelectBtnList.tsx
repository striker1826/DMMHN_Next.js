import SelectBtn from '@/components/interview/SelectBtn';
import { TInterviewType } from '@/shared/types/interviewType';
import { Button } from '@chakra-ui/react';

interface Props {
  selectList: TInterviewType[];
  selectedType: TInterviewType;
  handleClickBtn: (type: TInterviewType) => void;
}

const SelectBtnList = ({ selectList, selectedType, handleClickBtn }: Props) => {
  return (
    <>
      {selectList.map((type: TInterviewType, index: number) => {
        return (
          <SelectBtn
            type={type}
            selectedType={selectedType}
            handleClickBtn={handleClickBtn}
            key={type}
          />
        );
      })}
    </>
  );
};

export default SelectBtnList;
