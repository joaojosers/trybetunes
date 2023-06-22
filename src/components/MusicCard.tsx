import React, { ChangeEvent, useEffect, useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

type MusicCardProps = {
  song: SongType;
  // favoriteSongArray: SongType[] | [];

};
function MusicCard({ song }: MusicCardProps) {
  const [favoriteSong, setFavoriteSong] = useState(false);
  const [favoriteSongList, setFavoriteSongList] = useState<SongType[] | []>([]);

  const handleChange = () => {
    if (!favoriteSong) {
      addSong(song);
      return setFavoriteSong(true);
    }
    removeSong(song);
    return setFavoriteSong(false);
  };
  useEffect(() => {
    async function getMusics() {
      const favoriteSongs = await getFavoriteSongs();
      setFavoriteSongList(favoriteSongs);
    }
    getMusics();
  }, []);

  return (
    <div>
      <p>{song.trackName}</p>
      <audio data-testid="audio-component" src={ song.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
      <label
        htmlFor={ `checkbox-music-${song.trackId}` }
        data-testid={ `checkbox-music-${song.trackId}` }
      >
        <input
          type="checkbox"
          id={ `checkbox-music-${song.trackId}` }
          onChange={ handleChange }

        />
        {favoriteSong ? <img src={ checkedHeart } alt="favorite" />

          : <img src={ emptyHeart } alt="favorite" />}

        { favoriteSongList
        && favoriteSongList.some((e) => e.trackId === song.trackId)
          ? <img src={ checkedHeart } alt="favorite" />

          : <img src={ emptyHeart } alt="favorite" />}

        {/* {favoriteSong ? <img src={ checkedHeart } alt="favorite" />

          : <img src={ emptyHeart } alt="favorite" />} */}
      </label>
    </div>
  );
}

export default MusicCard;
// if (checked) {
//   addSong(song);
//   return setFavoriteSong(true);
// }
// removeSong(song);
// return setFavoriteSong(false);
// if (!favoriteSong) {
//   addSong(song);
//   return setFavoriteSong(true);
// }
// removeSong(song);
// return setFavoriteSong(false);
// const handleCheckedSong = () => {
//   if (!checkedFavorite) {
//     setCheckedFavorite(song);
//     return addSong(song);
//   }
//   return removeSong(song);
// };
// const handleChange = () => {
//   if (!favoriteSong) {
//     setFavoriteSong(true);
//   }
//   setFavoriteSong(false);
//   if (!checkedFavorite) {
//     setCheckedFavorite(song);
//     addSong(song);
//   }
//   removeSong(song);
// };
// onChange={ ({ target }) => handleChange(target.checked, song) }
// checked={ favoriteSong }
// onChange={ () => setFavoriteSong(true) }
