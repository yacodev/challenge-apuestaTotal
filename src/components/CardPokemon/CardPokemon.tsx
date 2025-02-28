import { CardPokemonProps } from './interface';

const CardPokemon = ({ pokemon, handleNavigate }: CardPokemonProps) => {
  return (
    <div
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
  );
};

export default CardPokemon;
