import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface PokemonsResponse {
  pokemon: PokemonsData[];
}

interface PokemonsData {
  pokemon: Pokemons;
}

interface Pokemons {
  name: string;
  url: string;
}

interface PokemonDetails {
  sprites: {
    front_default: string;
  };
}

export const pokemonServices = {
  getPokemonsByType: async (type: string) => {
    try {
      const { data } = await axios.get<PokemonsResponse>(
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
};
