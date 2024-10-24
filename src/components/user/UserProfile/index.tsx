'use client';

import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import styles from './UserProfile.module.scss';
import Image from 'next/image';
import { MdLogout } from 'react-icons/md';
import { removeCookie } from '@/shared/utils/cookies';
import { useRouter } from 'next/navigation';

interface Props {
  profileImg: string;
}

export const UserProfileHamburger = ({ profileImg }: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    removeCookie('profileImg', '/');
    removeCookie('accessToken', '/');
    router.refresh();
  };

  return (
    <div className={styles.profile}>
      <Menu>
        <MenuButton
          className={styles.chakra_menu__menu_button}
          as={IconButton}
          icon={<UserProfile profileImg={profileImg} />}
          variant="outline"
        />
        <MenuList className={styles.chakra_menu__menu_list}>
          <MenuItem
            className={styles.chakra_menu_menu_item}
            icon={<MdLogout size={20} />}
            onClick={handleLogout}
          >
            로그아웃
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export const UserProfile = ({ profileImg }: Props) => {
  return (
    <div className={styles.container}>
      <Image
        src={profileImg}
        className={styles.profile_img}
        width={50}
        height={50}
        alt="profile"
        objectFit="fill"
      />
    </div>
  );
};
