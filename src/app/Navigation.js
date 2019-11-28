import React from 'react';
import styles from './Navigation.module.scss';

const navigateTo = (setPath, path) => () => {
  setPath(path);
}

export default function Navigation({ path, setPath, favouriteImagesSize }) {
  return (
    <nav className={styles.wrapper}>
      <button onClick={navigateTo(setPath, '/')} className={`${path === '/' ? styles.active : ''}`}>Search</button>
      <button
        onClick={navigateTo(setPath, '/favourites')}
        className={`${path === '/favourites' ? styles.active : ''}`}
      >
        Favourites{favouriteImagesSize !== 0 && ` (${favouriteImagesSize})`}
      </button>
    </nav>
  )
}
