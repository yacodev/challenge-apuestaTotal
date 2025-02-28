export interface Pokemon {
  id: number;
  name: string;
  url?: string;
  sprites: {
    front_default: string;
  };
}

export interface PokemonsByType {
  [key: string]: Pokemon[];
}

interface AbilityData {
  name: string;
}
interface Ability {
  ability: AbilityData;
}

export interface PokemonDetails {
  sprites: {
    front_default: string;
  };
  abilities: Ability[];
  height: number;
  weight: number;
  id: number;
  name: string;
  base_experience: number;
}

export enum pokemonTypes {
  fire = 'fire',
  water = 'water',
  electric = 'electric',
  dragon = 'dragon',
  ghost = 'ghost',
}
