import { stringify } from 'querystring';

export const getApiUrl = (
  path: string,
  params: object
) =>
  `${path}?${stringify({
    ...params,
    api_key: process.env.REACT_APP_IMDB_API_KEY
  })}`;
