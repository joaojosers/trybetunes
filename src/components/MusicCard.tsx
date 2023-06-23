import React, { ChangeEvent, useEffect, useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

type MusicCardProps = {
  musica: SongType;

};

function MusicCard({ musica }: MusicCardProps) {
  const [favoriteSong, setFavoriteSong] = useState(false);
  const [favoriteSongList, setFavoriteSongList] = useState<SongType[] | []>([]);
  console.log(favoriteSong);

  const handleCheckbox = async (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFavoriteSong(checked);
    if (checked) {
      await addSong(musica);
    } else {
      await removeSong(musica);
    }
  };

  useEffect(() => {
    async function getMusics() {
      const favoriteSongs = await getFavoriteSongs();
      setFavoriteSongList(favoriteSongs);
    }
    getMusics();
    console.log(favoriteSongList);
    console.log('Hello');
  }, []);

  return (
    <div>
      <p>{musica.trackName}</p>
      <audio
        data-testid="audio-component"
        src={ musica.previewUrl }
        controls
      >
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
      <label
        htmlFor={ `checkbox-music-${musica.trackId}` }
        data-testid={ `checkbox-music-${musica.trackId}` }
      >
        <input
          type="checkbox"
          id={ `checkbox-music-${musica.trackId}` }
          checked={ favoriteSongList.some(
            (item) => item.trackId === musica.trackId,
          ) }
          onChange={ handleCheckbox }
        />
        {favoriteSong ? (
          <img
            src={ checkedHeart }
            alt="favorite"
          />
        ) : (
          <img
            src={ emptyHeart }
            alt="favorite"
          />
        )}
      </label>
    </div>
  );
}

export default MusicCard;
