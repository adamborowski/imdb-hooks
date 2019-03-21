import { combineReducers } from 'redux';
import { detailsAspect, listAspect, typeAheadAspect } from '../aspects';
import { IPeopleBrowser } from '../types/state';

export default combineReducers<IPeopleBrowser>({
  typeAhead: typeAheadAspect.reducer,
  details: detailsAspect.reducers,
  list: listAspect.reducer
});
