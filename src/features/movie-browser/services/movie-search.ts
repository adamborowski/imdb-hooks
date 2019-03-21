import { ApiResponse, FindService, getApiUrl, GetService, PopularService } from '../../../common/api';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { IMovie, IMovieLite } from '../types/state';

const shiftPageNumber = <T extends ApiResponse<any>>(response: T): T => {
  return { ...response, page: response.page - 1 };
};

export const findMovies: FindService<IMovieLite> = (query, page = 0, year) =>
  ajax(
    getApiUrl('search/movie', {
      page: (page + 1).toString(),
      query,
      primary_release_year: year
    })
  ).pipe(map(value => shiftPageNumber(value.response)));

export const findPopularMovies: PopularService<IMovieLite> = (page = 0) =>
  ajax(
    getApiUrl('movie/popular', {
      page: (page + 1).toString()
    })
  ).pipe(map(value => shiftPageNumber(value.response)));

export const getMovie: GetService<IMovie> = id =>
  ajax(getApiUrl(`movie/${id}`, {})).pipe(map(value => shiftPageNumber(value.response)));
