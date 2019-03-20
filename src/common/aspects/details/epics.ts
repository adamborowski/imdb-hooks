import {GetService} from '../../api';
import {Epic} from 'redux-observable';
import {catchError, filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {of} from 'rxjs';
import {IDetailsActions} from './types';

export const createEpics = <Entity extends object>(
  actions: IDetailsActions<Entity>,
  getService: GetService<Entity>
): Epic => action$ =>
  action$.pipe(
    filter(actions.fetch.match),
    mergeMap(fetchAction =>
      getService(fetchAction.payload.id).pipe(
        map(response => actions.fetchComplete({ result: response })),
        catchError(err => of(actions.fetchError(err))),
        takeUntil(action$.pipe(filter(actions.fetch.match)))
      )
    )
  );
