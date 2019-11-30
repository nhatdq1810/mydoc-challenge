import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import Gallery from '../components/Gallery';
import Search from './home/Search';

function Home({ path, favouriteCharacters, likeCharacter, setPath }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState();
  const [showPagination, setShowPagination] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [renderGallery, setRenderGallery] = useState();
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!emptyMessage && searchQuery && gallery && gallery.length === 0) {
      setEmptyMessage('No images!');
    }
  }, [emptyMessage, gallery, searchQuery]);

  if (path !== '/') return null;

  return (
    <div className={styles.page}>
      <Search
        searchQuery={searchQuery}
        onSearchProps={{
          setSearchQuery, setGallery, setIsLoading,
          setShowPagination, paginationOffset,
          setRenderGallery, setTotalImages
        }}
        isLoading={isLoading}
      />
      <Gallery
        showSavedListLink
        setPath={setPath}
        emptyMessage={emptyMessage}
        favouriteCharacters={favouriteCharacters}
        likeCharacter={likeCharacter}
        onClickNextProps={{
          gallery, searchQuery, setGallery,
          setIsLoadingMore, paginationOffset, setPaginationOffset,
          setRenderGallery
        }}
        showPagination={showPagination}
        isLoadingMore={isLoadingMore}
        renderGallery={renderGallery}
        onClickPrevProps={{ gallery, setRenderGallery, setPaginationOffset, }}
        isStartOfGallery={paginationOffset === 0}
        isEndOfGallery={paginationOffset >= totalImages}
      />
    </div>
  );
}

export default Home;
