import Button from '@/shared/components/Button/Button';
import styles from './Ready.module.scss';
import { RxAvatar } from 'react-icons/rx';

interface Props {
  onChangeStatus: (status: 'ready' | 'start' | 'end') => void;
}

export const Ready = ({ onChangeStatus }: Props) => {
  return (
    <>
      <RxAvatar className={styles.avatar} size={105} color="white" />
      <p className={styles.description}>준비가 완료되면 시작버튼을 클릭해주세요.</p>
      <Button text="시작" onClick={() => onChangeStatus('start')} />
    </>
  );
};
