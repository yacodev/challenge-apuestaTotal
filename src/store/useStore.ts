import { create } from 'zustand';

interface UserState {
  name: string;
  setName: (newName: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  setName: (newName) => set({ name: newName }),
}));
