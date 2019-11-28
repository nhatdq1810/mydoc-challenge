import React from 'react';
import Gallery from '../components/Gallery';
import styles from './Favourites.module.scss';

export default function Favourites({ path, favouriteImages, likeImage }) {
  if (path !== '/favourites') return null;

  return (
    <div className={styles.wrapper}>
      <Gallery
        emptyMessage="Nothing here!"
        gallery={favouriteImages}
        favouriteImages={favouriteImages}
        likeImage={likeImage}
      />
    </div>
  )
}
