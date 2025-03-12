import { create } from "zustand";

interface OptionsState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useOptions = create<OptionsState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
