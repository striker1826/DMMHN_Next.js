import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Props {
  userProfileImg: string;
  setUserProfileImg: (userProfileImg: string) => void;
}

export const useUserStore = create(
  persist<Props>(
    set => ({
      userProfileImg: '',
      setUserProfileImg: (userProfileImg: string) => set({ userProfileImg }),
    }),
    { name: 'userData' },
  ),
);
