import { PokemonDetails } from '../../interface';

export interface ToastProps {
  lastPokemonSelected: PokemonDetails;
  onCloseToast: () => void;
}
