import React from 'react';
import styles from './ItemDetailPopup.module.scss';

const closePopup = (setSelectedCharacter) => () => {
  setSelectedCharacter(null);
}

export default function ItemDetailPopup({ selectedCharacter, setSelectedCharacter }) {
  if (!selectedCharacter) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.popup}>
        <button onClick={closePopup(setSelectedCharacter)}>X</button>
        <section>
          <img
            className={styles.galleryImage}
            src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
            alt={selectedCharacter.name}
          />
          <p>{selectedCharacter.name}</p>
          <p>{selectedCharacter.description}</p>
        </section>
        <section>
          <h3>Comics</h3>
          {selectedCharacter.comics.available > 0 && (
            <ul>
              {selectedCharacter.comics.items.map(comic => (
                <li>{comic.name}</li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3>Series</h3>
          {selectedCharacter.series.available > 0 && (
            <ul>
              {selectedCharacter.series.items.map(series => (
                <li>{series.name}</li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3>Stories</h3>
          {selectedCharacter.stories.available > 0 && (
            <ul>
              {selectedCharacter.stories.items.map(story => (
                <li>{story.name}</li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3>Events</h3>
          {selectedCharacter.events.available > 0 && (
            <ul>
              {selectedCharacter.events.items.map(event => (
                <li>{event.name}</li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3>References</h3>
          {selectedCharacter.urls.length > 0 && (
            <ul>
              {selectedCharacter.urls.map(refer => (
                <li><a href={refer.url}>{refer.type}</a></li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
};
