import {createActions} from './actions';
import {ActionCreatorFactory} from 'typescript-fsa';
import {createReducers} from './reducers';
import {createEpics} from './epics';
import {FindService, PopularService, SelectItems} from './types';

export const createListAspect = <Entity extends EntityLite, EntityLite extends object>(
  actionCreatorFactory: ActionCreatorFactory,
  findService: FindService<EntityLite>,
  popularService: PopularService<EntityLite>,
  selectItems: SelectItems<EntityLite>
) => {
  const actions = createActions<EntityLite>(actionCreatorFactory);
  const reducer = createReducers(actions);
  const epics = createEpics(actions, findService, popularService, selectItems);

  return {
    actions,
    reducer,
    epics
  };
};
