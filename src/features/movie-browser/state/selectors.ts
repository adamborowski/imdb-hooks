import {IMovieBrowser, MovieSearchOptions} from '../types/state';
import {IState} from '../../../common/types/state';

export const selectMovieBrowser = (state: IState): IMovieBrowser => state.movieBrowser as IMovieBrowser;

export const selectMovieSearchOptions = (state: IState): MovieSearchOptions => selectMovieBrowser(state).searchOptions;

export const selectMovieSearchOptionsLoading = (state: IState) => selectMovieBrowser(state).searchOptionsLoading;

export const selectMovieDetails = (state: IState) => selectMovieBrowser(state).details;
export const selectMovieList = (state: IState) => selectMovieBrowser(state).list;

export const selectMovieListTotal = (state: IState) => selectMovieList(state).total;
export const selectMovieListItems = (state: IState) => selectMovieList(state).items;
