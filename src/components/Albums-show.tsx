import { AlbumType } from '../types';

// type AlbumsShowProps = {
//   albums: {
//     artistName: string,
//     artworkUrl100: string,
//     index: number,
//   }

// };
function AlbumsShow(albums: AlbumType) {
  const { artistName, artworkUrl100, artistId } = albums;
  return (
    <>
      <img src={ artworkUrl100 } alt="Imagem do album" />
      <span>{`Album ${artistId}`}</span>
      <span>{artistName}</span>
    </>
  );
}

export default AlbumsShow;
