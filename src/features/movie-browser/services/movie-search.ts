import {getApiUrl} from '../../../common/api';
import {ajax} from 'rxjs/ajax';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiResponse, IMovie, IPerson} from '../types/state';

export const findMoviesByTitle = (query: string, page: number = 0, year?: number): Observable<ApiResponse<IMovie>> =>
  ajax(
    getApiUrl('search/movie', {
      page: (page + 1).toString(),
      query,
      primary_release_year: year
    })
  ).pipe(map(value => value.response));

export const findMoviesByPerson = (query: string, page: number = 0, year?: number): Observable<ApiResponse<IPerson>> =>
  ajax(
    getApiUrl('search/person', {
      page: (page + 1).toString(),
      query,
      year
    })
  ).pipe(map(value => value.response));

export const findPopularMovies = (page: number = 0, year?: number): Observable<ApiResponse<IMovie>> =>
  ajax(
    getApiUrl('movie/popular', {
      page: (page + 1).toString()
    })
  ).pipe(map(value => value.response));

export const getMovie = (id: number): Observable<IMovie> =>
  ajax(getApiUrl(`movie/${id}`, {})).pipe(map(value => value.response));
