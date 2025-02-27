import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Pokemons from '../pages/Pokemons';
//import Header from 'details/Header';
import PokemonDetails from 'details/PokemonDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/pokemons' element={<Pokemons />} />
      <Route path='/details' element={<PokemonDetails />} />
      {/* <Route path='/details' element={<Header />} /> */}
    </Routes>
  );
};

export default AppRoutes;
