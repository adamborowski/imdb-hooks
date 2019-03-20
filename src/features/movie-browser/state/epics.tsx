import {Epic} from 'redux-observable';
import {Action} from 'redux';
import {IState} from '../../../common/types/state';
import {catchError, debounce, delay, filter, map, mergeMap, take, takeUntil} from 'rxjs/operators';
import {
    movieDetailsFetch,
    movieDetailsFetchComplete,
    movieDetailsFetchError,
    movieListPageCancel,
    movieListPageError,
    movieListPageRequest,
    movieListPageResponse,
    movieSearchOptionsType,
    movieSearchOptionsTypeResponse
} from './actions';
import {merge, of, race, timer} from 'rxjs';
import {findMoviesByTitle, findPopularMovies, getMovie} from '../services/movie-search';

const fetchSearchOptions: Epic<Action, Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(movieSearchOptionsType.match),
    debounce(value => timer(value.payload.value === '' ? 0 : 200)),
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
        takeUntil(action$.pipe(filter(movieDetailsFetch.match)))
      )
    )
  );

const getFetchPageAction = (requestAction: ReturnType<typeof movieListPageRequest>, page: number) =>
  requestAction.payload.query
    ? findMoviesByTitle(requestAction.payload.query, page, requestAction.payload.year)
    : findPopularMovies(page);

const requestAllPages = (requestAction: ReturnType<typeof movieListPageRequest>) =>
  merge(
    ...requestAction.payload.pages.map(page =>
      getFetchPageAction(requestAction, page).pipe(
        map(response => movieListPageResponse({ response })),
        catchError(err => of(movieListPageError({ page, error: err })))
      )
    )
  );

const fetchListPage: Epic<Action, Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(movieListPageRequest.match),
    mergeMap(requestAction =>
      race(
        of(0).pipe(
          delay(100),
          mergeMap(() => requestAllPages(requestAction))
        ),
        action$.pipe(
          filter(movieListPageRequest.match),
          map(() => movieListPageCancel({ pages: requestAction.payload.pages })),
          take(1)
        )
      )
    )
  );

export default [fetchSearchOptions, fetchDetails, fetchListPage];
