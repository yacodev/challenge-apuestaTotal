import { StateCreator } from 'zustand';
import { UserState } from '../interfaces';

export const userSlice: StateCreator<UserState> = (set) => ({
  name: '',
  setName: (name) => set({ name }),
});
