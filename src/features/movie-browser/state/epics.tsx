import {Epic} from 'redux-observable';
import {Action} from 'redux';
import {IState} from '../../../common/types/state';
import {catchError, filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {movieDetailsFetch, movieDetailsFetchComplete, movieDetailsFetchError} from './actions';
import {of} from 'rxjs';
import {getMovie} from '../services/movie-search';
import {listAspect, typeAheadAspect} from '../aspects';

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

export default [typeAheadAspect.epics, fetchDetails, listAspect.epics];
