import { create } from 'zustand';

type State = {
  email: string;
  code: string;
};

type Action = {
  setEmail: (email: string) => void;
  setCode: (code: string) => void;
};

export const useVerifyStore = create<State & Action>(set => ({
  email: '',
  code: '',
  setEmail: email => set({ email }),
  setCode: code => set({ code }),
}));
