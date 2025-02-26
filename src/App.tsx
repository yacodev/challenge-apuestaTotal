import { useEffect, useState } from 'react';
import { useUserStore } from './store/useStore';

enum Themes {
  light = 'light',
  dark = 'dark',
}

function App() {
  const [theme, setTheme] = useState<Themes>(Themes.light);
  const { name, setName } = useUserStore();

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

  console.log('name', name);

  const disabledButton = name === '';

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
      <div className='w-80 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
        <div className='mb-6'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png'
            alt='pokemons'
            className='w-full rounded-lg'
          />
        </div>

        <button
          onClick={handleChangeTheme}
          className='w-full mb-4 py-2 px-4 bg-blue-100 dark:bg-blue-800 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors'
        >
          dark / light
        </button>

        <input
          type='text'
          placeholder='usuario'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
        />

        <button
          disabled={disabledButton}
          className='w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'
        >
          ingresar
        </button>
      </div>
    </div>
  );
}

export default App;
