import { useEffect, useState } from 'react';
import { Themes } from '../interface';

export const useThemes = () => {
  const [theme, setTheme] = useState<Themes>(Themes.light);

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
