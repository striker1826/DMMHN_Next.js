import { create } from 'zustand';

interface ModalStore {
  key: string | null;
  isOpen: boolean;
  setKey: (key: string | null) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const modalStore = create<ModalStore>(set => ({
  key: null,
  isOpen: false,
  setKey: key => set({ key }),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
