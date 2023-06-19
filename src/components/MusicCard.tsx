import React, { ChangeEvent, useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

type MusicCardProps = {
  song: SongType
};

function MusicCard({ song }: MusicCardProps) {
  const [favoriteSong, setFavoriteSong] = useState(false);

  const handleChange = () => {
    // e.preventDefault();
    if (!favoriteSong) {
      return setFavoriteSong(true);
    }
    return setFavoriteSong(false);
  };
  return (
    <div>
      <p>{song.trackName}</p>
      <audio data-testid="audio-component" src={ song.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
      <label htmlFor="checkbox-input" data-testid={ `checkbox-music-${song.trackId}` }>
        <input
          type="checkbox"
          id="checkbox-input"
          onChange={ handleChange }
          checked={ favoriteSong }
          // onChange={ () => setFavoriteSong(true) }
        />
        {favoriteSong ? <img src={ checkedHeart } alt="favorite" />

          : <img src={ emptyHeart } alt="favorite" />}
      </label>
    </div>
  );
}

export default MusicCard;
