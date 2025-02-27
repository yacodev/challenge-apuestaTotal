import { create } from 'zustand';
import { Pokemon } from '../interface';

interface Store {
  name: string;
  selectedPokemon: Pokemon | null;
  setName: (name: string) => void;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

export const useUserStore = create<Store>((set) => ({
  name: '',
  selectedPokemon: null,
  setName: (name) => set({ name }),
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
}));

export default useUserStore;
