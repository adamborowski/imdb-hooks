import {Epic} from 'redux-observable';
import {Action} from 'redux';
import {IState} from '../../../common/types/state';
import {debounce, filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {movieSearchOptionsType, movieSearchOptionsTypeResponse} from './actions';
import {concat, timer} from 'rxjs';
import {findMoviesByTitle, findPopularMovies} from '../services/movie-search';

const fetchSearchOptions: Epic<Action, Action, IState> = (action$, state$) =>
  concat(
    action$.pipe(
      filter(movieSearchOptionsType.match),
      debounce(value => timer(value.payload.value === '' ? 0 : 500))
    )
  ).pipe(
    mergeMap(typeAction =>
      (!typeAction.payload.value ? findPopularMovies() : findMoviesByTitle(typeAction.payload.value, 0)).pipe(
        map(responseAction => movieSearchOptionsTypeResponse({ value: responseAction })),
        takeUntil(action$.pipe(filter(movieSearchOptionsType.match)))
      )
    )
  );

export default [fetchSearchOptions];
