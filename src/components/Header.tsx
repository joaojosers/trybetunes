import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Carregando from './Carregando';

import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Header() {
  const [user, setUser] = useState<UserType>();
  const isLoading = user === undefined;
  useEffect(() => {
    getUser().then((response) => {
      console.log(response);
      setUser(response);
    });
  }, []);
  return (
    <header data-testid="header-component">
      <NavLink data-testid="link-to-search" to="/search">Buscar</NavLink>
      <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
      <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      {isLoading ? <Carregando /> : <p data-testid="header-user-name">{user?.name}</p>}
    </header>
  );
}

export default Header;
