import React from 'react';
import { useUserStore } from '../store/useStore';

const Pokemons = () => {
  const { name } = useUserStore();

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 p-8'>
      <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
        Bienvenido, {name}!
      </h1>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
        <p className='text-gray-700 dark:text-gray-300'>
          Esta es la página de Pokemons
        </p>
      </div>
    </div>
  );
};

export default Pokemons;
