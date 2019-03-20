import {Epic} from 'redux-observable';
import {Action} from 'redux';
import {IState} from '../../../common/types/state';
import {catchError, debounce, distinctUntilChanged, filter, map, mergeMap, skip, take, takeUntil} from 'rxjs/operators';
import {
    movieDetailsFetch,
    movieDetailsFetchComplete,
    movieDetailsFetchError,
    movieListPageCancel,
    movieListPageError,
    movieListPageRangeEnsure,
    movieListPageRequest,
    movieListPageResponse,
    movieSearchOptionsType,
    movieSearchOptionsTypeResponse
} from './actions';
import {concat, merge, of, race, timer} from 'rxjs';
import {findMoviesByTitle, findPopularMovies, getMovie} from '../services/movie-search';
import _ from 'lodash';
import {selectMovieListItems, selectPageNeedsToBeLoaded$} from './selectors';

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

const getFetchPageAction = (requestAction: ReturnType<typeof movieListPageRangeEnsure>, page: number) =>
  requestAction.payload.query
    ? findMoviesByTitle(requestAction.payload.query, page, requestAction.payload.year)
    : findPopularMovies(page);

const requestAllPages = (pages: number[], ensureAction: ReturnType<typeof movieListPageRangeEnsure>) =>
  merge(
    ...pages.map(page =>
      getFetchPageAction(ensureAction, page).pipe(
        map(response => movieListPageResponse({ response })),
        catchError(err => of(movieListPageError({ page, error: err })))
      )
    )
  );

const fetchListPage: Epic<Action, Action, IState> = (action$, state$) => {
  const pagesToLoad$ = action$.pipe(
    filter(movieListPageRangeEnsure.match),
    distinctUntilChanged(_.isEqual)
  );

  return pagesToLoad$.pipe(
    debounce(() => timer(100)),
    mergeMap(ensureAction => {
      const data = selectMovieListItems(state$.value);
      const pagesToLoad = _.range(ensureAction.payload.startPage, ensureAction.payload.stopPage + 1, 1).filter(page =>
        selectPageNeedsToBeLoaded$(data, page)
      );
      return concat(
        of(movieListPageRequest({ pages: pagesToLoad })),
        race(
          requestAllPages(pagesToLoad, ensureAction),
          pagesToLoad$.pipe(
            skip(1), // fixme effectively disables cancellation, problem needs to be investigated before turning cancellation on back again
              // maybe not use redux at all, just store some download cache info?
            take(1),
            map(() => movieListPageCancel({ pages: pagesToLoad }))
          )
        )
      );
    })
  );
};

export default [fetchSearchOptions, fetchDetails, fetchListPage];
