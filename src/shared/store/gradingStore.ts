import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Props {
  gradingResult: any;
  setGradingResult: (gradingResult: any) => void;
}

export const useGradingStore = create(
  persist<Props>(
    set => ({
      gradingResult: null,
      setGradingResult: (gradingResult: any) => set({ gradingResult }),
    }),
    { name: 'gradingData' },
  ),
);
