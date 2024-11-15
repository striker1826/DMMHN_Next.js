import { SelectBtn } from '@/components/interview';
import { TInterviewType } from '@/shared/types/interviewType';

interface Props {
  selectList: TInterviewType[];
  selectedType: TInterviewType;
  handleClickBtn: (type: TInterviewType) => void;
}

const SelectBtnList = ({ selectList, selectedType, handleClickBtn }: Props) => {
  return (
    <>
      {selectList.map((type: TInterviewType) => {
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
