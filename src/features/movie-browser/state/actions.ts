import actionCreatorFactory, {ActionCreatorFactory} from 'typescript-fsa';
import {ApiResponse, IMovie} from '../types/state';

const actionCreator: ActionCreatorFactory = actionCreatorFactory('movie-browser');

export const movieSearchOptionsType = actionCreator<{ value: string }>('SEARCH_TYPE');
export const movieSearchOptionsTypeResponse = actionCreator<{ value: ApiResponse<IMovie> }>('SEARCH_TYPE_RESPONSE');

export const movieDetailsFetch = actionCreator<{ id: number }>('DETAILS_FETCH');
export const movieDetailsFetchComplete = actionCreator<{ result: IMovie }>('DETAILS_FETCH_COMPLETE');
export const movieDetailsFetchError = actionCreator<{ error: string }>('DETAILS_FETCH_ERROR');

export const movieListReset = actionCreator('LIST_RESET'); // called by 'watcher' hook every query/year change
export const movieListPageRequest = actionCreator<{ query?: string; year?: number; page: number }>('LIST_PAGE_REQEUST'); //reads query/year from state and checks if already downloaded
export const movieListPageResponse = actionCreator<{ response: ApiResponse<IMovie> }>('LIST_PAGE_RESPONSE'); //reads query/year from state and checks if already downloaded
export const movieListPageError = actionCreator<{ page: number; error: string }>('LIST_PAGE_ERROR'); //reads query/year from state and checks if already downloaded
