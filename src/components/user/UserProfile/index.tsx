import styles from './UserProfile.module.scss';
import Image from 'next/image';

interface Props {
  profileImg: string;
}

export const UserProfile = ({ profileImg }: Props) => {
  return (
    <div className={styles.container}>
      <Image src={profileImg} className={styles.profile_img} width={40} height={40} alt="profile" />
    </div>
  );
};
