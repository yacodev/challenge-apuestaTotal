import { StateCreator } from 'zustand';
import { PokemonState } from '../interfaces';

export const pokemonSlice: StateCreator<PokemonState> = (set, get) => ({
  selectedPokemon: null,
  listSelectedPokemon: [],
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
  setListSelectedPokemon: (pokemon) =>
    set({ listSelectedPokemon: [pokemon, ...get().listSelectedPokemon] }),
});
