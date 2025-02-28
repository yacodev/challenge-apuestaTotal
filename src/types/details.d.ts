declare module 'details/Header' {
  import { FC } from 'react';
  const Header: FC;
  export default Header;
}

declare module 'details/PokemonDetails' {
  import { FC } from 'react';
  const PokemonDetails: FC;
  export default PokemonDetails;
}

declare module 'history/PokemonHistory' {
  import { FC } from 'react';
  const PokemonHistory: FC;
  export default PokemonHistory;
}

declare module 'history/PokemonCard' {
  import { FC } from 'react';

  interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: Array<{
      type: {
        name: string;
      };
    }>;
    height: number;
    weight: number;
  }

  interface PokemonCardProps {
    pokemon: PokemonDetails;
  }

  const PokemonCard: FC<PokemonCardProps>;
  export default PokemonCard;
}
