import React, { useState } from 'react';
import styles from './Gallery.module.scss';
import { searchImagesApi } from '../services/api';
import ItemDetailPopup from './gallery/ItemDetailPopup';

const onClickNext = ({
  gallery, searchQuery, setGallery,
  setIsLoadingMore, paginationOffset, setPaginationOffset,
  setRenderGallery
}) => async () => {
  const existedImages = gallery.slice(paginationOffset, paginationOffset + 3);

  if (existedImages.length > 0) {
    setPaginationOffset(oldPaginationOffset => oldPaginationOffset + 3);
    setRenderGallery(existedImages);
    return;
  }

  let result = [];

  setIsLoadingMore(true);

  const response = await fetch(searchImagesApi({ searchQuery, limit: 3, offset: gallery.length }));
  if (response.status === 200) {
    const data = (await response.json()).data;
    result = data.results;
  }

  setPaginationOffset(oldPaginationOffset => oldPaginationOffset + 3);
  setGallery(oldGallery => oldGallery.concat(result));
  setRenderGallery(result);
  setIsLoadingMore(false);
}

const onClickPrev = ({ gallery, setRenderGallery, setPaginationOffset, }) => () => {
  setPaginationOffset(oldPaginationOffset => {
    const newPaginationOffset = oldPaginationOffset - 3;
    setRenderGallery(gallery.slice(newPaginationOffset, oldPaginationOffset));
    return newPaginationOffset;
  });
}

const openDetail = (image, setSelectedCharacter) => () => {
  setSelectedCharacter(image);
}

function Gallery({
  renderGallery, favouriteImages,
  emptyMessage, onClickNextProps, showPagination, isLoadingMore,
  onClickPrevProps, isStartOfGallery, isEndOfGallery
}) {
  const [selectedCharacter, setSelectedCharacter] = useState();

  if (!renderGallery) return null;

  return (
    renderGallery.length === 0
      ? (<div className={styles.emptyState}>{emptyMessage}</div>)
      : (
        <>
          <ItemDetailPopup selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} />
          <ul className={styles.gallery}>
            {renderGallery.map((character) => (
              <li key={character.id} className={styles.galleryItem}>
                <button className={styles.galleryItemClickLayer} onClick={openDetail(character, setSelectedCharacter)}>
                  <div className={styles.galleryImageWrapper}>
                    <img
                      className={styles.galleryImage}
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                    />
                  </div>
                  <h3 className={styles.galleryImageCaption}>{character.name}</h3>
                </button>
              </li>
            ))}
          </ul>
          {showPagination &&
            <div className={styles.paginationArea}>
              {onClickPrevProps && (
                <button
                  onClick={onClickPrev(onClickPrevProps)}
                  disabled={isStartOfGallery}
                  className={`${styles.paginationButton} ${isStartOfGallery ? styles.disabled : ''}`}
                >
                  Prev
                </button>
              )}
              {onClickNextProps && (
                <button
                  onClick={onClickNext(onClickNextProps)}
                  disabled={isLoadingMore || isEndOfGallery}
                  className={`${styles.paginationButton} ${isLoadingMore || isEndOfGallery ? styles.disabled : ''}`}
                >
                  {isLoadingMore
                    ? 'Loading...'
                    : 'Next'}
                </button>
              )}
            </div>}
        </>
      )
  )
}

export default Gallery;
