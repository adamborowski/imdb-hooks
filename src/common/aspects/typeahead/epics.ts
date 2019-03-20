import {FindService, PopularService} from '../../api';
import {Epic} from 'redux-observable';
import {ITypeAheadActions} from './types';
import {debounce, filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {timer} from 'rxjs';

export const createEpics = <Entity extends object>(
  actions: ITypeAheadActions<Entity>,
  findService: FindService<Entity>,
  popularService: PopularService<Entity>
): Epic => {
  return (action$) =>
    action$.pipe(
      filter(actions.typeOccured.match),
      debounce(value => timer(value.payload.value === '' ? 0 : 200)),
      mergeMap(typeAction =>
        (!typeAction.payload.value ? popularService() : findService(typeAction.payload.value, 0)).pipe(
          map(responseAction => actions.typeResponse({ value: responseAction })),
          takeUntil(action$.pipe(filter(actions.typeOccured.match)))
        )
      )
    );
};
