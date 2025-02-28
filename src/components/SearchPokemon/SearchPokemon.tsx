import { SearchPokemonProps } from './interface';

const SearchPokemon = ({ openModal }: SearchPokemonProps) => {
  return (
    <div className='flex items-center justify-between mb-6'>
      <input
        type='text'
        onClick={openModal}
        placeholder='Buscar Pokémon...'
        className='w-full p-4 text-xl border-b-2 border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-blue-500'
        autoFocus
      />
    </div>
  );
};

export default SearchPokemon;
