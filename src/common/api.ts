import {stringify} from 'querystring';

export const getApiUrl = (
  path: string,
  params: object
) =>
  `${path}?${stringify({
    ...params,
    api_key: process.env.REACT_APP_DB_API_KEY
  })}`;
export const getThumbUrl = (id?: string) => id && 'https://image.tmdb.org/t/p/w45/' + id;
export const getPosterUrl = (id?: string) => id && 'https://image.tmdb.org/t/p/w500/' + id;