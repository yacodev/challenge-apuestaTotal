import { useEffect } from 'react';
import { Themes } from '../interface';
import { useThemeStore } from '../store';

export const useThemes = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    if (theme === Themes.light) {
      document.documentElement.classList.add(Themes.dark);
    } else {
      document.documentElement.classList.remove(Themes.dark);
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme(theme === Themes.light ? Themes.dark : Themes.light);
  };

  return { theme, handleChangeTheme };
};
