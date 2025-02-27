import { useState, useEffect, useCallback, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { pokemonServices } from '../services/pokemonServices';
import { usePokemonStore } from '../store';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Pokemon {
  id: number;
  name: string;
  url?: string;
  sprites: {
    front_default: string;
  };
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 30);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  const navigate = useNavigate();
  const { setSelectedPokemon, setListSelectedPokemon } = usePokemonStore();

  const loadPokemons = useCallback(async () => {
    if (!isOpen) return;
    setLoading(true);
    try {
      const result = await pokemonServices.getPokemonList(offset);
      console.log('result', result);
      setSearchResults((prev) => [...prev, ...result.pokemons]);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error(error);
      setError('Error al cargar los Pokémon');
    } finally {
      setLoading(false);
    }
  }, [offset, isOpen]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const searchPokemon = async () => {
        setLoading(true);
        setError('');

        try {
          const pokemon = await pokemonServices.searchPokemonByName(searchTerm);

          if (!pokemon) {
            setSearchResults([]);
            setError('No se encontró ningún Pokémon con ese nombre');
            return;
          }

          setSearchResults([pokemon]);
          setHasMore(false);
        } catch (error) {
          console.error(error);
          setError('Error al buscar el Pokémon');
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };

      const debounceTimer = setTimeout(() => {
        searchPokemon();
      }, 500);

      return () => clearTimeout(debounceTimer);
    } else {
      setOffset(0);
      setSearchResults([]);
      setHasMore(true);
      loadPokemons();
    }
  }, [searchTerm, loadPokemons]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      loadPokemons();
    }
  }, [offset, loadPokemons, searchTerm]);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setListSelectedPokemon(pokemon);
    onClose();
    navigate('/details'); // Asumiendo que tienes una ruta /details en tu router
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col'>
      <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Buscar Pokémon...'
            className='w-full p-4 text-xl border-b-2 border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-blue-500'
            autoFocus
          />
          <button
            onClick={onClose}
            className='ml-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          >
            <FaTimes className='w-6 h-6' />
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-7xl mx-auto p-4'>
          {error && (
            <div className='text-center text-red-500 mb-4'>{error}</div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {searchResults.map((pokemon, index) => (
              <div
                key={`${pokemon.id}-${index}`}
                ref={
                  index === searchResults.length - 1
                    ? lastPokemonElementRef
                    : null
                }
                onClick={() => handlePokemonSelect(pokemon)}
                className='bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className='w-32 h-32 object-contain'
                />
                <h3 className='mt-4 text-xl font-semibold text-gray-800 dark:text-white capitalize'>
                  {pokemon.name}
                </h3>
              </div>
            ))}
          </div>

          {loading && (
            <div className='text-center text-gray-600 dark:text-gray-400 mt-4 p-4'>
              Cargando más Pokémon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
