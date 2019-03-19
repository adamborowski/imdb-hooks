import {Epic} from 'redux-observable';
import {Action} from 'redux';
import {IState} from '../../../common/types/state';
import {catchError, debounce, filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {
    movieDetailsFetch,
    movieDetailsFetchComplete,
    movieDetailsFetchError,
    movieListPageError,
    movieListPageRequest,
    movieListPageResponse,
    movieSearchOptionsType,
    movieSearchOptionsTypeResponse
} from './actions';
import {of, timer} from 'rxjs';
import {findMoviesByTitle, findPopularMovies, getMovie} from '../services/movie-search';

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

const fetchListPage: Epic<Action, Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(movieListPageRequest.match),
    mergeMap(requestAction =>
      (requestAction.payload.query
        ? findMoviesByTitle(requestAction.payload.query, requestAction.payload.page, requestAction.payload.year)
        : findPopularMovies(requestAction.payload.page, requestAction.payload.year)
      ).pipe(
        map(response => movieListPageResponse({ response })),
        catchError(err => of(movieListPageError({ page: requestAction.payload.page, error: err }))),
        takeUntil(action$.pipe(filter(movieListPageRequest.match)))
      )
    )
  );

export default [fetchSearchOptions, fetchDetails, fetchListPage];
