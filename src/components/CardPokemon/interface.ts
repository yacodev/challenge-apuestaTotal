import { Pokemon } from '../../interface';

export interface CardPokemonProps {
  pokemon: Pokemon;
  handleNavigate: (pokemon: Pokemon) => void;
}
