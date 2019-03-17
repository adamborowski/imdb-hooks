import {IMovieBrowser, MovieSearchOptions} from '../types/state';
import {IState} from '../../../common/types/state';

export const selectMovieBrowser = (state: IState): IMovieBrowser =>
  state.movieBrowser as IMovieBrowser;

export const selectMovieSearchOptions = (state: IState): MovieSearchOptions =>
  selectMovieBrowser(state).searchOptions;

export const selectMovieSearchOptionsLoading = (state: IState) =>
  selectMovieBrowser(state).searchOptionsLoading;
