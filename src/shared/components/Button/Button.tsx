"use client";

import styles from "./Button.module.scss";

interface Props {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: Props) => {
  return (
    <button className={styles.layout} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
