import {ActionCreatorFactory} from 'typescript-fsa';
import {createActions} from './actions';
import {createReducers} from './reducers';
import {createEpics} from './epics';
import {FindService, PopularService} from '../../api';
import {createUseSearchOptions} from './hooks/useSearchOptions';
import {ItemRenderer, SelectTypeAheadState} from './types';

export const createTypeAheadAspect = <Entity extends { id: number }>(
  actionCreatorFactory: ActionCreatorFactory,
  findService: FindService<Entity>,
  popularService: PopularService<Entity>,
  itemRenderer: ItemRenderer<Entity>,
  subject: string,
  selectMovieTypeAhead: SelectTypeAheadState<Entity>
) => {
  const actions = createActions<Entity>(actionCreatorFactory);
  const reducer = createReducers(actions);
  const epics = createEpics(actions, findService, popularService);
  const useSearchOptions = createUseSearchOptions(itemRenderer, subject, selectMovieTypeAhead);
  return {
    actions,
    reducer,
    epics,
    useSearchOptions
  };
};
