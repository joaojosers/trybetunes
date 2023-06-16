import React, { useEffect, useState, ChangeEvent } from 'react';
import { string } from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import { UserType } from '../types';
import Carregando from './Carregando';

function Login() {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser(e.target.value);
  };
  const validateButton = () => user?.length >= 3;

  const handleClick = async () => {
    // const user: UserType = {
    //   name: value
    // }
    setIsLoading(true);
    await createUser({ name: user });
    setIsLoading(false);
    navigate('/search');
  };

  return (
    <form>
      <label>
        <input data-testid="login-name-input" onChange={ handleChange } value={ user } />
        <button
          data-testid="login-submit-button"
          // type="submit"
          type="button"
          disabled={ !validateButton() }
          onClick={ handleClick }
        >
          Entrar
        </button>
        {isLoading && <Carregando />}
        {/* {isLoading && <span>Carregando...</span>} */}
      </label>

    </form>

  );
}
export default Login;
