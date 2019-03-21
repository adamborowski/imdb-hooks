import { Reducer } from 'redux';
import { IDetailsActions, IDetailsState } from './types';

export const createReducers = <Entity extends object>(
  actions: IDetailsActions<Entity>
): Reducer<IDetailsState<Entity>> => (state = { loading: false }, action) => {
  if (actions.fetch.match(action)) {
    return { loading: true, error: undefined, result: undefined };
  }
  if (actions.fetchComplete.match(action)) {
    return { loading: false, error: undefined, result: action.payload.result };
  }
  return state;
};
