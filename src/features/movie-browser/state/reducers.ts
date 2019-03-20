import {combineReducers, Reducer} from 'redux';
import {IMovieBrowser, IMovieDetails, IMovieLite} from '../types/state';
import {isType} from 'typescript-fsa';
import {
    movieDetailsFetch,
    movieDetailsFetchComplete,
    movieSearchOptionsType,
    movieSearchOptionsTypeResponse
} from './actions';
import {ApiResponse} from '../../../common/api';
import {listAspect} from '../aspects';

export const searchOptions: Reducer<ApiResponse<IMovieLite>> = (
  state = { results: [], page: 0, total_pages: 0, total_results: 0 },
  action
) => {
  if (isType(action, movieSearchOptionsTypeResponse)) {
    return { ...state, ...action.payload.value };
  }
  return state;
};

export const searchOptionsLoading: Reducer<boolean> = (state = false, action) => {
  if (isType(action, movieSearchOptionsType)) {
    return true;
  }
  if (isType(action, movieSearchOptionsTypeResponse)) {
    return false;
  }
  return state;
};

export const details: Reducer<IMovieDetails> = (state = { loading: false }, action) => {
  if (movieDetailsFetch.match(action)) {
    return { loading: true, error: undefined, result: undefined };
  }
  if (movieDetailsFetchComplete.match(action)) {
    return { loading: false, error: undefined, result: action.payload.result };
  }
  return state;
};

export default combineReducers<IMovieBrowser>({
  searchOptions,
  searchOptionsLoading,
  details,
  list: listAspect.reducer
});
