import { combineReducers } from 'redux';
import { IMovieBrowser } from '../types/state';
import { detailsAspect, listAspect, typeAheadAspect } from '../aspects';

export default combineReducers<IMovieBrowser>({
  typeAhead: typeAheadAspect.reducer,
  details: detailsAspect.reducers,
  list: listAspect.reducer
});
