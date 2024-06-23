import styles from './SimulationBtn.module.scss';

interface SimulationBtnProps {
  text: string;
  onClick: () => void;
}

const SimulationBtn = ({ text, onClick }: SimulationBtnProps) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
};

export default SimulationBtn;
