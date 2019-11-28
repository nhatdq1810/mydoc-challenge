import React from 'react';
import styles from './Gallery.module.scss';
import HeartIcon from '../assets/heart.svg';
import { searchImagesApi } from '../services/api';

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

function Gallery({
  renderGallery, likeImage, favouriteImages,
  emptyMessage, onClickNextProps, showPagination, isLoadingMore,
  onClickPrevProps, isStartOfGallery, isEndOfGallery
}) {
  if (!renderGallery) return null;

  return (
    renderGallery.length === 0
      ? (<div className={styles.emptyState}>{emptyMessage}</div>)
      : (
        <>
          <ul className={styles.gallery}>
            {renderGallery.map((image) => (
              <li key={image.id} className={styles.galleryItem} onClick={likeImage(image)}>
                <img
                  className={styles.galleryImage}
                  src={`${image.thumbnail.path}.${image.thumbnail.extension}`}
                  alt={image.name}
                />
                <div className={`${styles.favouriteIcon} ${favouriteImages.some(fi => fi.id === image.id) ? styles.active : ''}`}>
                  <img src={HeartIcon} alt="like icon" />
                </div>
              </li>
            ))}
          </ul>
          {showPagination &&
            <>
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
            </>}
        </>
      )
  )
}

export default Gallery;
