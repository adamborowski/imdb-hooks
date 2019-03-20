import {createActions} from './actions';
import {ActionCreatorFactory} from 'typescript-fsa';
import {createEpics} from './epics';
import {GetService} from '../../api';
import {createReducers} from './reducers';

export const createDetailsAspect = <Entity extends object>(
  actionCreatorFactory: ActionCreatorFactory,
  getService: GetService<Entity>
) => {
  const actions = createActions<Entity>(actionCreatorFactory);
  const epics = createEpics<Entity>(actions, getService);
  const reducers = createReducers<Entity>(actions);

  return { actions, epics, reducers };
};
