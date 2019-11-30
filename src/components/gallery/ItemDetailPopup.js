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
        <div className={styles.closePopup}><button onClick={closePopup(setSelectedCharacter)}>X</button></div>
        <div className={styles.body}>
          <section className={styles.characterContent}>
            <img
              className={styles.characterImage}
              src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
              alt={selectedCharacter.name}
            />
            <div>
              <h1 className={styles.characterName}>{selectedCharacter.name}</h1>
              {selectedCharacter.description && <p className={styles.characterDesc}>{selectedCharacter.description}</p>}
              {selectedCharacter.urls.length > 0 && <section>
                <h3 className={styles.sectionHeader}>References</h3>
                <ul>
                  {selectedCharacter.urls.map(refer => (
                    <li key={refer.type}><a href={refer.url} target="_blank" rel="noopener noreferrer">{refer.type === 'comiclink' ? 'comic link' : refer.type}</a></li>
                  ))}
                </ul>
              </section>}
            </div>
          </section>
          {selectedCharacter.comics.available > 0 && <section>
            <h3 className={styles.sectionHeader}>Comics</h3>
            <ul>
              {selectedCharacter.comics.items.map(comic => (
                <li key={comic.name}><a href="/" target="_blank" rel="noopener noreferrer">{comic.name}</a></li>
              ))}
            </ul>
          </section>}
          {selectedCharacter.series.available > 0 && <section>
            <h3 className={styles.sectionHeader}>Series</h3>
            <ul>
              {selectedCharacter.series.items.map(series => (
                <li key={series.name}><a href="/" target="_blank" rel="noopener noreferrer">{series.name}</a></li>
              ))}
            </ul>
          </section>}
          {selectedCharacter.stories.available > 0 && <section>
            <h3 className={styles.sectionHeader}>Stories</h3>
            <ul>
              {selectedCharacter.stories.items.map(story => (
                <li key={story.name}><a href="/" target="_blank" rel="noopener noreferrer">{story.name}</a></li>
              ))}
            </ul>
          </section>}
          {selectedCharacter.events.available > 0 && <section>
            <h3 className={styles.sectionHeader}>Events</h3>
            <ul>
              {selectedCharacter.events.items.map(event => (
                <li key={event.name}><a href="/" target="_blank" rel="noopener noreferrer">{event.name}</a></li>
              ))}
            </ul>
          </section>}
        </div>
      </div>
    </div>
  )
};
