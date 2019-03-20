import actionCreatorFactory, {ActionCreatorFactory} from 'typescript-fsa';
import {IMovie, IMovieLite} from '../types/state';
import {createActions} from '../../../common/aspects/list/actions';
import {ApiResponse} from '../../../common/api';

const actionCreator: ActionCreatorFactory = actionCreatorFactory('movie-browser');

export const movieSearchOptionsType = actionCreator<{ value: string }>('SEARCH_TYPE');
export const movieSearchOptionsTypeResponse = actionCreator<{ value: ApiResponse<IMovieLite> }>('SEARCH_TYPE_RESPONSE');

export const movieDetailsFetch = actionCreator<{ id: number }>('DETAILS_FETCH');
export const movieDetailsFetchComplete = actionCreator<{ result: IMovie }>('DETAILS_FETCH_COMPLETE');
export const movieDetailsFetchError = actionCreator<{ error: string }>('DETAILS_FETCH_ERROR');

export const listActions = createActions<IMovieLite>(actionCreator);
