import { Pokemon } from '../../interface';

export interface PokemonState {
  selectedPokemon: Pokemon | null;
  listSelectedPokemon: Pokemon[];
  setSelectedPokemon: (pokemon: Pokemon) => void;
  setListSelectedPokemon: (pokemon: Pokemon) => void;
}
