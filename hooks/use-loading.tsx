import { create } from "zustand";

interface useLoadingModalStore {
  isLoading: boolean;
  onLoad: () => void;
  onUnLoad: () => void;
}

export const useLoadingModal = create<useLoadingModalStore>((set) => ({
  isLoading: false,
  onLoad: () => set({ isLoading: true }),
  onUnLoad: () => set({ isLoading: false }),
}));
