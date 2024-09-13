import { MouseEventHandler } from 'react';
import styles from './index.module.scss';

const STACK_TYPE = [{ type: 'FE' }, { type: 'BE' }];

interface Props {
  handleClickType: MouseEventHandler<HTMLButtonElement>;
}

export const StackTypeList = ({ handleClickType }: Props) => {
  return (
    <ul className={styles.stack_type}>
      {STACK_TYPE.map(({ type }) => (
        <li key={type}>
          <button
            type="button"
            name={type}
            className={styles.stack_type_btn}
            onClick={handleClickType}
          >
            {type}
          </button>
        </li>
      ))}
    </ul>
  );
};
