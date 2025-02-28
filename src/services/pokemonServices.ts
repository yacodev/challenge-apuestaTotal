import axios from 'axios';
import { PokemonDetails, Pokemon } from '../interface/pokemon.interface';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface PokemonInfoResponse {
  name: string;
  url: string;
}

interface PokemonByTypeResponse {
  pokemon: PokemonInfoResponse;
}

interface PokemonListByTypeResponse {
  pokemon: PokemonByTypeResponse[];
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export const pokemonServices = {
  getPokemonsByType: async (type: string) => {
    try {
      const { data } = await axios.get<PokemonListByTypeResponse>(
        `${BASE_URL}/type/${type}`
      );
      return data.pokemon.slice(0, 10);
    } catch (error) {
      console.error(`Error fetching ${type} type pokemons:`, error);
      return [];
    }
  },

  getPokemonDetails: async (url: string) => {
    try {
      const { data } = await axios.get<PokemonDetails>(url);
      return data;
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      return null;
    }
  },

  searchPokemonByName: async (name: string): Promise<Pokemon | null> => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/pokemon/${name.toLowerCase()}`
      );
      return {
        id: data.id,
        name: data.name,
        sprites: {
          front_default: data.sprites.front_default,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getPokemonList: async (
    offset: number = 0,
    limit: number = 30
  ): Promise<{ pokemons: Pokemon[]; hasMore: boolean }> => {
    try {
      const { data } = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );

      const pokemonPromises = data.results.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return {
          id: response.data.id,
          name: response.data.name,
          url: pokemon.url,
          sprites: {
            front_default: response.data.sprites.front_default,
          },
        };
      });

      const pokemons = await Promise.all(pokemonPromises);
      return {
        pokemons,
        hasMore: !!data.next,
      };
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      return {
        pokemons: [],
        hasMore: false,
      };
    }
  },
};

export default pokemonServices;
