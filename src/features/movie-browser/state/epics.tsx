import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { IState } from '../../../common/types/state';
import { debounce, filter, map, mergeMap, takeUntil, catchError } from 'rxjs/operators';
import {
  movieDetailsFetch,
  movieDetailsFetchComplete,
  movieDetailsFetchError,
  movieSearchOptionsType,
  movieSearchOptionsTypeResponse
} from './actions';
import { concat, timer, of } from 'rxjs';
import { findMoviesByTitle, findPopularMovies, getMovie } from '../services/movie-search';

const fetchSearchOptions: Epic<Action, Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(movieSearchOptionsType.match),
    debounce(value => timer(value.payload.value === '' ? 0 : 500)),
    mergeMap(typeAction =>
      (!typeAction.payload.value ? findPopularMovies() : findMoviesByTitle(typeAction.payload.value, 0)).pipe(
        map(responseAction => movieSearchOptionsTypeResponse({ value: responseAction })),
        takeUntil(action$.pipe(filter(movieSearchOptionsType.match)))
      )
    )
  );

const fetchDetails: Epic<Action, Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(movieDetailsFetch.match),
    mergeMap(fetchAction =>
      getMovie(fetchAction.payload.id).pipe(
        map(response => movieDetailsFetchComplete({ result: response })),
        catchError(err => of(movieDetailsFetchError(err))),
        takeUntil(action$.pipe(filter(movieDetailsFetchError.match)))
      )
    )
  );

export default [fetchSearchOptions, fetchDetails];
