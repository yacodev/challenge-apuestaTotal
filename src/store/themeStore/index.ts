import { createStore } from '../createStore';
import { ThemeState } from '../interfaces';
import { themeSlice } from './theme.slice';

export const useThemeStore = createStore<ThemeState>([themeSlice], {
  name: 'theme',
});
