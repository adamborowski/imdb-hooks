import {combineReducers, Reducer} from 'redux';
import {ApiResponse, IMovie, IMovieBrowser} from '../types/state';
import {isType} from 'typescript-fsa';
import {movieSearchOptionsType, movieSearchOptionsTypeResponse} from './actions';

export const searchOptions: Reducer<ApiResponse<IMovie>> = (
  state = { results: [], page: 0, total_pages: 0, total_results: 0 },
  action
) => {
  if (isType(action, movieSearchOptionsTypeResponse)) {
    return { ...state, ...action.payload.value };
  }
  return state;
};

export const searchOptionsLoading: Reducer<boolean> = (
  state = false,
  action
) => {
  if (isType(action, movieSearchOptionsType)) {
    return true;
  }
  if (isType(action, movieSearchOptionsTypeResponse)) {
    return false;
  }
  return state;
};
export default combineReducers<IMovieBrowser>({
  searchOptions,
  searchOptionsLoading
});
