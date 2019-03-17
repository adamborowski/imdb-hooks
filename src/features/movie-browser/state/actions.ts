import actionCreatorFactory, {ActionCreatorFactory} from 'typescript-fsa';
import {ApiResponse, IMovie} from '../types/state';

const actionCreator: ActionCreatorFactory = actionCreatorFactory(
  'movie-browser'
);

export const movieSearchOptionsType = actionCreator<{ value: string }>('SEARCH_TYPE');
export const movieSearchOptionsTypeResponse = actionCreator<{ value: ApiResponse<IMovie>}>('SEARCH_TYPE_RESPONSE');
