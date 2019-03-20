import actionCreatorFactory, {ActionCreatorFactory} from 'typescript-fsa';
import {IMovie} from '../types/state';

const actionCreator: ActionCreatorFactory = actionCreatorFactory('movie-browser');

export const movieDetailsFetch = actionCreator<{ id: number }>('DETAILS_FETCH');
export const movieDetailsFetchComplete = actionCreator<{ result: IMovie }>('DETAILS_FETCH_COMPLETE');
export const movieDetailsFetchError = actionCreator<{ error: string }>('DETAILS_FETCH_ERROR');
