import React from 'react';
import Gallery from '../components/Gallery';
import styles from './Favourites.module.scss';

export default function Favourites({ path, favouriteCharacters, likeCharacter }) {
  if (path !== '/favourites') return null;

  return (
    <div className={styles.wrapper}>
      <Gallery
        emptyMessage="Nothing here!"
        renderGallery={favouriteCharacters}
        favouriteCharacters={favouriteCharacters}
        likeCharacter={likeCharacter}
      />
    </div>
  )
}
