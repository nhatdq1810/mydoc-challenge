const searchCharactersApiKey = '6a038473ffd6407750a2ea27115f7e7c';
const searchCharactersHashKey = '1492df65a88ef98a1a279719fe509f72';
const searchCharactersTimestamp = '1565922410';
const searchCharactersApi = ({ searchQuery, limit, offset }) =>
  `https://gateway.marvel.com/v1/public/characters?ts=${
  searchCharactersTimestamp
  }&hash=${
  searchCharactersHashKey
  }&apikey=${
  searchCharactersApiKey
  }&offset=${
  offset
  }&limit=${
  limit
  }&nameStartsWith=${
  encodeURIComponent(searchQuery)
  }`;

export { searchCharactersApi };
