import { MouseEventHandler } from 'react';
import { stack_type } from '@/widgets/interview/Stacks';
import styles from './index.module.scss';

const STACK_TYPE = [{ type: 'FE' }, { type: 'BE' }];

interface Props {
  handleClickType: MouseEventHandler<HTMLButtonElement>;
  currentType: stack_type | null;
}

export const StackTypeList = ({ handleClickType, currentType }: Props) => {
  return (
    <>
      <ul className={styles.stack_type}>
        {STACK_TYPE.map(({ type }) => (
          <li key={type}>
            <button
              type="button"
              name={type}
              className={`${styles.stack_type_btn} ${type === currentType ? styles.selected : ''}`}
              onClick={handleClickType}
            >
              {type}
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.info}>직무를 선택하시면 관련도가 높은 기술 스택이 하이라이트됩니다.</p>
    </>
  );
};
