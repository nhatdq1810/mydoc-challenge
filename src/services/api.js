const searchImagesApiKey = '6a038473ffd6407750a2ea27115f7e7c';
const searchImagesHashKey = '1492df65a88ef98a1a279719fe509f72';
const searchImagesTimestamp = '1565922410';
const searchImagesApi = ({ searchQuery, limit, offset }) =>
  `https://gateway.marvel.com/v1/public/characters?ts=${
  searchImagesTimestamp
  }&hash=${
  searchImagesHashKey
  }&apikey=${
  searchImagesApiKey
  }&offset=${
  offset
  }&limit=${
  limit
  }&nameStartsWith=${
  encodeURIComponent(searchQuery)
  }`;

export { searchImagesApi };
