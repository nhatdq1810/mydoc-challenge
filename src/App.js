import React, { useState } from 'react';
import Home from './app/Home';
import Navigation from './app/Navigation';
import Favourites from './app/Favourites';
import styles from './App.module.scss';

const likeImage = (setFavouriteImages) => (favouriteImage) => () => {
  setFavouriteImages(
    oldFavouriteImages => oldFavouriteImages.some(image => image.id === favouriteImage.id)
      ? oldFavouriteImages.filter(image => image.id !== favouriteImage.id)
      : oldFavouriteImages.concat([favouriteImage])
  );
}

function App() {
  const [path, setPath] = useState('/');
  const [favouriteImages, setFavouriteImages] = useState([]);

  return (
    <div className={styles.wrapper}>
      <Navigation path={path} setPath={setPath} favouriteImagesSize={favouriteImages.length} />
      {<Home path={path} favouriteImages={favouriteImages} likeImage={likeImage(setFavouriteImages)} />}
      {<Favourites path={path} favouriteImages={favouriteImages} likeImage={likeImage(setFavouriteImages)} />}
    </div>
  );
}

export default App;
