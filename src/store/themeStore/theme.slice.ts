import { StateCreator } from 'zustand';
import { Themes } from '../../interface';
import { ThemeState } from '../interfaces';

export const themeSlice: StateCreator<ThemeState> = (set) => ({
  theme: Themes.light,
  setTheme: (theme) => set({ theme }),
});
