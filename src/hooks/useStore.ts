import { create } from "zustand";

interface StoreState {
  ready: boolean;
  isReady: () => void;
}

export const useStore = create<StoreState>((set) => ({
  ready: false,
  isReady: () => set({ ready: true }),
}));
