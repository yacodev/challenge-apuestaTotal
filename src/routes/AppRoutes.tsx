import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Pokemons from '../pages/Pokemons';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/pokemons' element={<Pokemons />} />
    </Routes>
  );
};

export default AppRoutes;
