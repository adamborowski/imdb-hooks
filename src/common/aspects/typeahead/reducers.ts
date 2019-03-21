import { combineReducers, Reducer } from 'redux';
import { ApiResponse } from '../../api';
import { isType } from 'typescript-fsa';
import { ITypeAheadActions, ITypeAheadState } from './types';

export const createReducers = <Entity extends object>(actions: ITypeAheadActions<Entity>) => {
  const options: Reducer<ApiResponse<Entity>> = (
    state = { results: [], page: 0, total_pages: 0, total_results: 0 },
    action
  ) => {
    if (isType(action, actions.typeResponse)) {
      return { ...state, ...action.payload.value };
    }
    return state;
  };

  const loading: Reducer<boolean> = (state = false, action) => {
    if (isType(action, actions.typeOccured)) {
      return true;
    }
    if (isType(action, actions.typeResponse)) {
      return false;
    }
    return state;
  };

  return combineReducers<ITypeAheadState<Entity>>({
    options,
    loading
  });
};
