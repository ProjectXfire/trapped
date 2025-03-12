import { create } from "zustand";

interface SelectingState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useSelecting = create<SelectingState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
