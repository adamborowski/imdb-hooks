import {Epic} from 'redux-observable';
import {Action} from 'redux';
import {IState} from '../../../common/types/state';
import {catchError, debounce, filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {
    movieDetailsFetch,
    movieDetailsFetchComplete,
    movieDetailsFetchError,
    movieSearchOptionsType,
    movieSearchOptionsTypeResponse,
    paginationActions
} from './actions';
import {of, timer} from 'rxjs';
import {findMovies, findPopularMovies, getMovie} from '../services/movie-search';
import {selectMovieListItems} from './selectors';
import {createEpics} from '../../../common/aspects/pagination/epics';

const fetchSearchOptions: Epic<Action, Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(movieSearchOptionsType.match),
    debounce(value => timer(value.payload.value === '' ? 0 : 200)),
    mergeMap(typeAction =>
      (!typeAction.payload.value ? findPopularMovies() : findMovies(typeAction.payload.value, 0)).pipe(
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

const fetchListPageEpic = createEpics(paginationActions, findMovies, findPopularMovies, selectMovieListItems);

export default [fetchSearchOptions, fetchDetails, fetchListPageEpic];
