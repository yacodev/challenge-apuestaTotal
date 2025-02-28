import { useEffect, useState } from 'react';
import { usePokemonStore, useUserStore } from '../store';
import { pokemonServices } from '../services/pokemonServices';

import { Pokemon, pokemonTypes, PokemonsByType } from '../interface';
import SearchModal from '../components/SearchModal';
import { useNavigate } from 'react-router-dom';

import CardPokemon from '../components/CardPokemon';
import IconTheme from '../components/IconTheme';
import SearchPokemon from '../components/SearchPokemon';
import Loading from '../components/Loading';
import Toast from '../components/Toast';

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
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const [pokemonsByType, setPokemonsByType] = useState<PokemonsByType>({});
  const [loading, setLoading] = useState(true);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      console.error('Error fetching pokemons:', error);
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
    return <Loading />;
  }

  const showPokemonHistory = listSelectedPokemon.length > 0 && showToast;
  const lastPokemonSelected = listSelectedPokemon[0];

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div className='w-full'>
            <div className='flex items-center justify-between space-x-4'>
              <div className='flex items-center space-x-4'>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Bienvenido, {name}!
                </h1>
                <IconTheme />
              </div>
              <button
                onClick={() => navigate('/history')}
                className='px-4 py-2 bg-blue-500 hover:bg-blue-600 
                         dark:bg-blue-600 dark:hover:bg-blue-700
                         text-white font-medium rounded-lg
                         transition-colors duration-200
                         shadow-md hover:shadow-lg
                         flex items-center space-x-2'
              >
                Ver historial
              </button>
            </div>
            <div>
              <SearchPokemon openModal={() => setIsSearchOpen(true)} />
            </div>
          </div>
        </div>

        {POKEMON_TYPES.map((type) => (
          <div key={type} className='mb-8'>
            <h2 className='text-xl font-semibold text-red-500 capitalize mb-4'>
              {type}
            </h2>
            <div className='relative'>
              <div className='overflow-x-auto scrollbar-hide'>
                <div className='flex gap-4 pb-4 min-w-max px-4'>
                  {pokemonsByType[type]?.map((pokemon) => (
                    <CardPokemon
                      pokemon={pokemon}
                      handleNavigate={handleNavigate}
                      key={pokemon.name}
                    />
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
        <Toast
          lastPokemonSelected={lastPokemonSelected}
          onCloseToast={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Pokemons;
