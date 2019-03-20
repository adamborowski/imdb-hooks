import {combineReducers, Reducer} from 'redux';
import {IMovieBrowser, IMovieDetails} from '../types/state';
import {movieDetailsFetch, movieDetailsFetchComplete} from './actions';
import {listAspect, typeAheadAspect} from '../aspects';

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
  typeAhead: typeAheadAspect.reducer,
  details,
  list: listAspect.reducer
});
