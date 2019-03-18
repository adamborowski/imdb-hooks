import {stringify} from 'querystring';

// due to https://github.com/omdbapi/OMDb-API/issues/37 http://www.omdbapi.com/ is not used!
const apiHost = 'https://api.themoviedb.org/3/';

export const getApiUrl = (path: string, params?: object) =>
  `${apiHost}${path}?${stringify({
    ...params,
    api_key: process.env.REACT_APP_DB_API_KEY
  })}`;
export const getThumbUrl = (id?: string) => id && 'https://image.tmdb.org/t/p/w45/' + id;
export const getPosterUrl = (id?: string) => id && 'https://image.tmdb.org/t/p/w500/' + id;
