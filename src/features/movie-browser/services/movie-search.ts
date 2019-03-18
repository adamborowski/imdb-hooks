import { getApiUrl } from '../../../common/api';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, IMovie, IPerson } from '../types/state';

// due to https://github.com/omdbapi/OMDb-API/issues/37 http://www.omdbapi.com/ is not used!
const apiHost = 'https://api.themoviedb.org/3/';

const getUrl = (path: string, params: object) => getApiUrl(apiHost + path, params);

export const findMoviesByTitle = (query: string, page: number = 0, year?: number): Observable<ApiResponse<IMovie>> =>
  ajax(
    getUrl('search/movie', {
      page: (page + 1).toString(),
      query,
      primary_release_year: year
    })
  ).pipe(map(value => value.response));

export const findMoviesByPerson = (query: string, page: number = 0, year?: number): Observable<ApiResponse<IPerson>> =>
  ajax(
    getUrl('search/person', {
      page: (page + 1).toString(),
      query,
      year
    })
  ).pipe(map(value => value.response));

export const findPopularMovies = (page: number = 0, year?: number): Observable<ApiResponse<IMovie>> =>
  ajax(
    getUrl('movie/popular', {
      page: (page + 1).toString()
    })
  ).pipe(map(value => value.response));

export const getMovie = (id: number): Observable<IMovie> =>
  ajax(getUrl(`movie/${id}`, {})).pipe(map(value => value.response));
