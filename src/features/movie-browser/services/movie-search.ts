import {ApiResponse, FindService, getApiUrl, PopularService} from '../../../common/api';
import {ajax} from 'rxjs/ajax';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IMovie, IMovieLite, IPerson} from '../types/state';

const shiftPageNumber = <T extends ApiResponse<any>>(response: T): T => {
  return { ...response, page: response.page - 1 };
};

export const findMovies: FindService<IMovieLite> = (query: string, page: number = 0, year?: number) =>
  ajax(
    getApiUrl('search/movie', {
      page: (page + 1).toString(),
      query,
      primary_release_year: year
    })
  ).pipe(map(value => shiftPageNumber(value.response)));

export const findPeople: FindService<IPerson> = (
  query: string,
  page: number = 0,
  year?: number
): Observable<ApiResponse<IPerson>> =>
  ajax(
    getApiUrl('search/person', {
      page: (page + 1).toString(),
      query,
      year
    })
  ).pipe(map(value => shiftPageNumber(value.response)));

export const findPopularMovies: PopularService<IMovieLite> = (page: number = 0): Observable<ApiResponse<IMovieLite>> =>
  ajax(
    getApiUrl('movie/popular', {
      page: (page + 1).toString()
    })
  ).pipe(map(value => shiftPageNumber(value.response)));

export const getMovie = (id: number): Observable<IMovie> =>
  ajax(getApiUrl(`movie/${id}`, {})).pipe(map(value => shiftPageNumber(value.response)));
