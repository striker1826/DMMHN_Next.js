import { create } from 'zustand';

type State = {
  isSubmit: boolean;
};

type Action = {
  setIsSubmit: (isSubmit: boolean) => void;
};

export const useChatStore = create<State & Action>(set => ({
  isSubmit: false,
  setIsSubmit: isSubmit => set({ isSubmit }),
}));
