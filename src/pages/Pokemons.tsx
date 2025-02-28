import { useEffect, useState } from 'react';
import { usePokemonStore, useUserStore } from '../store';
import { pokemonServices } from '../services/pokemonServices';
import { FaSun, FaMoon, FaTimes } from 'react-icons/fa';
import { Themes, Pokemon, pokemonTypes, PokemonsByType } from '../interface';
import { useThemes } from '../hooks/useThemes';
import SearchModal from '../components/SearchModal';
import { useNavigate } from 'react-router-dom';
import PokemonCard from 'history/PokemonCard';

const POKEMON_TYPES = [
  pokemonTypes.fire,
  pokemonTypes.water,
  pokemonTypes.electric,
  pokemonTypes.dragon,
  pokemonTypes.ghost,
];

const Pokemons = () => {
  const { name } = useUserStore();
  const { listSelectedPokemon } = usePokemonStore();
  const [showToast, setShowToast] = useState(false);

  const [pokemonsByType, setPokemonsByType] = useState<PokemonsByType>({});
  const [loading, setLoading] = useState(true);
  const { theme, handleChangeTheme } = useThemes();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { setSelectedPokemon } = usePokemonStore();

  const getListPokemonsByType = async (type: string) => {
    try {
      const pokemonList = await pokemonServices.getPokemonsByType(type);

      const pokemons: Pokemon[] = await Promise.all(
        pokemonList.map(async (pokemonData) => {
          const pokemonInfo = await pokemonServices.getPokemonDetails(
            pokemonData.pokemon.url
          );
          return {
            id: pokemonInfo!.id,
            name: pokemonData.pokemon.name,
            url: pokemonData.pokemon.url,
            sprites: {
              front_default: pokemonInfo!.sprites.front_default ?? '',
            },
          };
        })
      );

      return pokemons;
    } catch (error) {
      console.error(`Error processing ${type} type pokemons:`, error);
      return [];
    }
  };

  useEffect(() => {
    const getAllPokemonsByTypes = async () => {
      setLoading(true);
      const results: PokemonsByType = {};

      for (const type of POKEMON_TYPES) {
        results[type] = await getListPokemonsByType(type);
      }

      setPokemonsByType(results);
      setLoading(false);
    };

    getAllPokemonsByTypes();
  }, []);

  useEffect(() => {
    if (listSelectedPokemon.length > 0) {
      setShowToast(true);
    }
  }, [listSelectedPokemon]);

  const handleNavigate = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    navigate('/details');
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
        <p className='text-xl text-gray-800 dark:text-white'>
          Cargando Pokémons...
        </p>
      </div>
    );
  }

  const showPokemonHistory = listSelectedPokemon.length > 0 && showToast;
  const lastPokemonSelected =
    listSelectedPokemon[listSelectedPokemon.length - 1];

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-8 w-100%'>
          <div>
            <div className='flex items-center justify-center space-x-4'>
              <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                Bienvenido, {name}!
              </h1>
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
            </div>
            <div>
              <div className='flex items-center justify-between mb-6'>
                <input
                  type='text'
                  onClick={() => setIsSearchOpen(true)}
                  placeholder='Buscar Pokémon...'
                  className='w-full p-4 text-xl border-b-2 border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-blue-500'
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>

        {POKEMON_TYPES.map((type) => (
          <div key={type} className='mb-8'>
            <h2 className='text-xl font-semibold text-red-500 capitalize mb-4'>
              {type}
            </h2>
            <div className='relative'>
              <div className='absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-100 dark:from-gray-900 to-transparent z-10'></div>
              <div className='absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-100 dark:from-gray-900 to-transparent z-10'></div>

              <div className='overflow-x-auto scrollbar-hide'>
                <div className='flex gap-4 pb-4 min-w-max px-4'>
                  {pokemonsByType[type]?.map((pokemon) => (
                    <div
                      key={pokemon.name}
                      className='w-48 flex-none bg-white dark:bg-gray-800 rounded-xl p-4 
                               shadow-md hover:shadow-xl transition-all duration-300 
                               hover:scale-105 hover:-translate-y-1'
                      onClick={() => handleNavigate(pokemon)}
                    >
                      <div
                        className='aspect-square flex items-center justify-center 
                                    bg-gray-50 dark:bg-gray-700 rounded-lg mb-3'
                      >
                        {pokemon.sprites && (
                          <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className='w-32 h-32 object-contain drop-shadow-md'
                          />
                        )}
                      </div>
                      <p
                        className='text-center text-gray-700 dark:text-gray-300 
                                  capitalize font-medium truncate'
                      >
                        {pokemon.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {showPokemonHistory && lastPokemonSelected && (
        <div className='fixed bottom-4 right-4 animate-fade-in-up'>
          <div className='relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4'>
            <button
              onClick={() => setShowToast(false)}
              className='absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors duration-200'
              aria-label='Cerrar'
            >
              <FaTimes className='w-4 h-4' />
            </button>
            <PokemonCard pokemon={lastPokemonSelected} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemons;
