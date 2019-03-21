import {createActions} from './actions';
import {ActionCreatorFactory} from 'typescript-fsa';
import {createEpics} from './epics';
import {GetService} from '../../api';
import {createReducers} from './reducers';
import {createUseDetails} from './hooks/useDetails';
import {SelectDetailsState} from './types';
import {createDetailsFetcher} from './components/DetailsFetcher';
import {UseValue} from '../../types/hooks';

export const createDetailsAspect = <Entity extends object>(
  actionCreatorFactory: ActionCreatorFactory,
  getService: GetService<Entity>,
  stateSelector: SelectDetailsState<Entity>,
  useDetailsId: UseValue<number>
) => {
  const actions = createActions<Entity>(actionCreatorFactory);
  const epics = createEpics<Entity>(actions, getService);
  const reducers = createReducers<Entity>(actions);

  const useDetails = createUseDetails(stateSelector);

  const DetailsFetcher = createDetailsFetcher(actions, useDetailsId);

  return { actions, epics, reducers, useDetails, DetailsFetcher, useDetailsId };
};
