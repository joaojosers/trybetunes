import React, { useEffect, useState, ChangeEvent } from 'react';
import { element, string } from 'prop-types';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import AlbumsShow from './Albums-show';

// type SearchProps = {
//   data: string,
//   setData: (e:string) => void;
// };

function Search() {
  const [artist, setArtist] = useState('');
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AlbumType[]>([]);
  // const navigate = useNavigate();

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setArtist(e.target.value);
    console.log(artist);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // await searchAlbumsAPI({ albums });
    const result = await searchAlbumsAPI(artist);
    setData(result);
    setArtist('');
    console.log(data);
    setIsLoading(false);
  };

  const validateButton = () => artist?.length >= 2;

  return (
    <form>
      <label>
        <input
          data-testid="search-artist-input"
          onChange={ handleChange }
          value={ artist }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ !validateButton() }
          onClick={ handleClick }
        >
          Pesquisar
        </button>
        {isLoading ? <Carregando />
          : data.map((e, index) => (<div key={ index }>
            <AlbumsShow albums={ e } />

          </div>))}

      </label>

    </form>
  );
}

export default Search;

// {registersList
//   && registersList.map((register, index) => (
//     <>
//       <div key={ index }>
//         <a href={ register.url }>{register.serviceName}</a>
//         <p>{register.login}</p>
//         { checkbox ? '******' : <p>{register.senha}</p> }

//       </div>
//       <button
//         type="button"
//         data-testid="remove-btn"
//         onClick={ removeRegister(index) }
//       >
//         Remover registro
//       </button>
//     </>
//   ))}
