import React, { useState } from 'react';
import Home from './app/Home';
import Navigation from './app/Navigation';
import Favourites from './app/Favourites';
import styles from './App.module.scss';

const likeCharacter = (setFavouriteCharacters) => (favouriteCharacter) => {
  setFavouriteCharacters(
    oldFavouriteCharacters => oldFavouriteCharacters.some(character => character.id === favouriteCharacter.id)
      ? oldFavouriteCharacters.filter(character => character.id !== favouriteCharacter.id)
      : oldFavouriteCharacters.concat([favouriteCharacter])
  );
}

function App() {
  const [path, setPath] = useState('/');
  const [favouriteCharacters, setFavouriteCharacters] = useState([]);

  return (
    <div className={styles.wrapper}>
      <Navigation path={path} setPath={setPath} favouriteCharactersSize={favouriteCharacters.length} />
      {<Home path={path} setPath={setPath} favouriteCharacters={favouriteCharacters} likeCharacter={likeCharacter(setFavouriteCharacters)} />}
      {<Favourites path={path} favouriteCharacters={favouriteCharacters} likeCharacter={likeCharacter(setFavouriteCharacters)} />}
    </div>
  );
}

export default App;
