import {ActionCreatorFactory} from 'typescript-fsa';
import {IDetailsActions} from './types';

export const createActions = <Entity extends object>(
  actionCreatorFactory: ActionCreatorFactory
): IDetailsActions<Entity> => ({
  fetch: actionCreatorFactory('DETAILS_FETCH'),
  fetchComplete: actionCreatorFactory('DETAILS_FETCH_COMPLETE'),
  fetchError: actionCreatorFactory('DETAILS_FETCH_ERROR')
});
