import React, { useEffect, useState, ChangeEvent } from 'react';
import { element, string } from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Carregando from './Carregando';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState<AlbumType>();
  const [songs, setSongs] = useState<SongType[]>();
  const [favoriteSong, setFavoriteSong] = useState<SongType[] | []>([]);

  const isLoading = album === undefined;

  useEffect(() => {
    if (id) {
      getMusics(id).then((response) => {
        const [resAlbum, ...resSongs] = response;
        setAlbum(resAlbum);
        setSongs(resSongs);
      });
      getFavoriteSongs().then((response) => {
        // const [favoriteSongs] = response;
        console.log(response);
        setFavoriteSong(response);
      });
    }
  }, [id]);

  return (
    <div>
      {isLoading && <Carregando /> }
      {!isLoading && (
        <div>
          <p data-testid="artist-name">{album.artistName}</p>
          <p data-testid="album-name">{album.collectionName}</p>
          {(songs?.map((e) => (<MusicCard
            key={ e.trackId }
            musica={ e }
            favorites={ [] }
          />)))}
          {/* {getFavoriteSongs()} */}
        </div>
      )}
    </div>

  );
}

export default Album;
// useEffect(() => {
//   if (id) {
//     getFavoriteSongs().then((response) => {
//       // const [favoriteSongs] = response;
//       console.log(response);
//       setFavoriteSong(response);
//     });
//   }
// }, [id]);
// getFavoriteSongs();
