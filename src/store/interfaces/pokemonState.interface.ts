import { Pokemon, PokemonDetails } from '../../interface';

export interface PokemonState {
  selectedPokemon: Pokemon | null;
  listSelectedPokemon: PokemonDetails[];
  setSelectedPokemon: (pokemon: Pokemon) => void;
  setListSelectedPokemon: (pokemon: PokemonDetails) => void;
}
