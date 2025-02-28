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

interface Specie {
  name: string;
}
interface Types {
  type: {
    name: string;
  };
}

export interface PokemonDetails {
  abilities: Ability[];
  height: number;
  weight: number;
  id: number;
  name: string;
  base_experience: number;
  sprites: {
    front_default: string;
  };
  species: Specie;
  types: Types[];
}

export enum pokemonTypes {
  fire = 'fire',
  water = 'water',
  electric = 'electric',
  dragon = 'dragon',
  ghost = 'ghost',
}
