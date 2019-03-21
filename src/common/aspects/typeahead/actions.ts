import { ActionCreatorFactory } from 'typescript-fsa';
import { ITypeAheadActions } from './types';

export const createActions = <Entity extends object>(
  actionCreatorFactory: ActionCreatorFactory
): ITypeAheadActions<Entity> => ({
  typeOccured: actionCreatorFactory('SEARCH_TYPE'),
  typeResponse: actionCreatorFactory('SEARCH_TYPE_RESPONSE')
});
