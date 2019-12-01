import React from 'react';
import styles from './Search.module.scss';
import { searchCharactersApi } from '../../services/api';

const fetchCharacters = async ({
  searchQuery, setGallery, setIsLoading,
  setShowPagination, setRenderGallery, setTotalCharacters, setPaginationOffset
}) => {
  let result = [];

  setIsLoading(true);

  const response = await fetch(searchCharactersApi({ searchQuery, limit: 3, offset: 0 }));
  if (response.status === 200) {
    const data = (await response.json()).data;
    result = data.results;

    if (data.total > 3) {
      setShowPagination(true);
    }

    setTotalCharacters(data.total);
  }

  setRenderGallery(result);
  setGallery(result);
  setIsLoading(false);
  setPaginationOffset(0);
};

let fetchCharactersToken = null;

const onSearch = ({ setSearchQuery, ...onFetchCharactersProps }) => (event) => {
  const value = event.target.value;
  setSearchQuery(value);

  if (fetchCharactersToken) {
    clearTimeout(fetchCharactersToken);
  }

  if (value) {
    fetchCharactersToken = setTimeout(() => {
      fetchCharacters({ searchQuery: value, ...onFetchCharactersProps });
    }, 500);
  }
}

export default function Search({ searchQuery, onSearchProps, isLoading }) {
  return (
    <div className={styles.searchArea}>
      <input
        type="text"
        placeholder="Start searching characters!"
        className={styles.inputSearch}
        value={searchQuery}
        onChange={onSearch(onSearchProps)}
      />
      {isLoading && <span className={styles.loadingIndicator}>Loading...</span>}
    </div>
  )
}
