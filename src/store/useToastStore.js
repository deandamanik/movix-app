import { create } from 'zustand';

export const useToastStore = create((set) => ({
  message: null,
  showToast: (msg) => {
    set({ message: msg });
    setTimeout(() => set({ message: null }), 3000);
  },
  hideToast: () => set({ message: null }),
}));