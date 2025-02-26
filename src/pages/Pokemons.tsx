import { useEffect, useState } from 'react';
import { useUserStore } from '../store';
import { pokemonServices } from '../services/pokemonServices';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Themes } from '../interface';
import { useThemes } from '../hooks/useThemes';

interface Pokemon {
  name: string;
  url: string;
  sprite?: string;
}

interface PokemonsByType {
  [key: string]: Pokemon[];
}

const POKEMON_TYPES = ['fire', 'water', 'electric', 'dragon', 'ghost'];

const Pokemons = () => {
  const { name } = useUserStore();

  const [pokemonsByType, setPokemonsByType] = useState<PokemonsByType>({});
  const [loading, setLoading] = useState(true);
  const { theme, handleChangeTheme } = useThemes();

  const fetchPokemonsByType = async (type: string) => {
    try {
      const pokemonList = await pokemonServices.getPokemonsByType(type);

      const pokemonsWithSprites = await Promise.all(
        pokemonList.map(async (pokemonData) => {
          const pokemonInfo = await pokemonServices.getPokemonDetails(
            pokemonData.pokemon.url
          );
          return {
            name: pokemonData.pokemon.name,
            url: pokemonData.pokemon.url,
            sprite: pokemonInfo?.sprites.front_default,
          };
        })
      );

      return pokemonsWithSprites;
    } catch (error) {
      console.error(`Error processing ${type} type pokemons:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllTypes = async () => {
      setLoading(true);
      const results: PokemonsByType = {};

      for (const type of POKEMON_TYPES) {
        results[type] = await fetchPokemonsByType(type);
      }

      setPokemonsByType(results);
      setLoading(false);
    };

    fetchAllTypes();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
        <p className='text-xl text-gray-800 dark:text-white'>
          Cargando Pokémons...
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
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

        {POKEMON_TYPES.map((type) => (
          <div key={type} className='mb-8'>
            <h2 className='text-xl font-semibold text-red-500 capitalize mb-4'>
              {type}
            </h2>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {pokemonsByType[type]?.map((pokemon) => (
                <div
                  key={pokemon.name}
                  className='bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow'
                >
                  {pokemon.sprite && (
                    <img
                      src={pokemon.sprite}
                      alt={pokemon.name}
                      className='w-24 h-24 mx-auto'
                    />
                  )}
                  <p className='text-center text-gray-700 dark:text-gray-300 capitalize mt-2'>
                    {pokemon.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokemons;
