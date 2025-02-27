import { createStore } from '../createStore';
import { PokemonState } from '../interfaces';
import { pokemonSlice } from './pokemon.slice';

export const usePokemonStore = createStore<PokemonState>([pokemonSlice], {
  name: 'pokemon',
});

export default usePokemonStore;
