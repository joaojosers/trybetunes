import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { element, string } from 'prop-types';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import AlbumsShow from './Albums-show';

function Search() {
  const [artist, setArtist] = useState('');
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AlbumType[]>([]);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setArtist(e.target.value);
    console.log(artist);
  };

  const handleClick = async () => {
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
        if (data.length ===0)
        <p>Nenhum álbum foi encontrado</p>
        <h2>
          Resultado de álbuns de:
          { artist }

        </h2>
        {isLoading ? <Carregando />
          : (
            data.map((e, index) => (
              <Link to={ `/album/${e.collectionId}` } key={ index }>
                <AlbumsShow albums={ e } />
                <img src={ e.artworkUrl100 } alt="foto do album" />
                <h2>{e.collectionName}</h2>
                <h2>{e.artistName}</h2>
              </Link>
            ))
          )}
      </label>

    </form>
  );
}

export default Search;
