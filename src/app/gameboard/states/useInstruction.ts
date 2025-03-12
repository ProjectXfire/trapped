import { create } from "zustand";

interface InstructionState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useInstruction = create<InstructionState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
