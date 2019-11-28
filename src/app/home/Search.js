import React from 'react';
import styles from './Search.module.scss';
import { searchImagesApi } from '../../services/api';

const fetchImages = async ({
  searchQuery, setGallery, setIsLoading,
  setShowPagination, paginationOffset,
  setRenderGallery, setTotalImages
}) => {
  let result = [];

  setIsLoading(true);

  const response = await fetch(searchImagesApi({ searchQuery, limit: 3, offset: paginationOffset }));
  if (response.status === 200) {
    const data = (await response.json()).data;
    result = data.results;

    if (data.total > 3) {
      setShowPagination(true);
    }

    setTotalImages(data.total);
  }

  setRenderGallery(result);
  setGallery(result);
  setIsLoading(false);
};

let fetchImagesToken = null;

const onSearch = ({
  setSearchQuery, setGallery, setIsLoading,
  setShowPagination, paginationOffset,
  setRenderGallery, setTotalImages
}) => (event) => {
  const value = event.target.value;
  setSearchQuery(value);

  if (fetchImagesToken) {
    clearTimeout(fetchImagesToken);
  }

  if (value) {
    fetchImagesToken = setTimeout(() => {
      fetchImages({
        searchQuery: value, setGallery, setIsLoading,
        setShowPagination, paginationOffset, setTotalImages,
        setRenderGallery
      });
    }, 500);
  }
}

export default function Search({ searchQuery, onSearchProps, isLoading }) {
  return (
    <div className={styles.searchArea}>
      <input
        type="text"
        placeholder="Start searching for images!"
        className={styles.inputSearch}
        value={searchQuery}
        onChange={onSearch(onSearchProps)}
      />
      {isLoading && <span className={styles.loadingIndicator}>Loading...</span>}
    </div>
  )
}
