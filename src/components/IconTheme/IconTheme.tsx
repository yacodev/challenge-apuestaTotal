import { useThemes } from '../../hooks/useThemes';
import { Themes } from '../../interface';
import { FaSun, FaMoon } from 'react-icons/fa';

const IconTheme = () => {
  const { theme, handleChangeTheme } = useThemes();

  return (
    <button
      onClick={handleChangeTheme}
      className='p-2 rounded-full bg-yellow-100 dark:bg-gray-800 text-yellow-500 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-gray-700 transition-colors'
      aria-label='Cambiar tema'
    >
      {theme === Themes.light ? (
        <FaMoon className='w-6 h-6' />
      ) : (
        <FaSun className='w-6 h-6' />
      )}
    </button>
  );
};
export default IconTheme;
