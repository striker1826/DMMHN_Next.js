import { create } from 'zustand';

type State = {
  email: string;
};

type Action = {
  setEmail: (email: string) => void;
};

export const useVerifyStore = create<State & Action>(set => ({
  email: '',
  setEmail: email => set({ email }),
}));
