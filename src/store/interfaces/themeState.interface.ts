import { Themes } from '../../interface';

export interface ThemeState {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}
