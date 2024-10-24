'use client';

import styles from './PrimaryBtn.module.scss';

interface Props {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

const PrimaryBtn = ({ text, disabled, onClick }: Props) => {
  return (
    <button className={styles.layout} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default PrimaryBtn;
