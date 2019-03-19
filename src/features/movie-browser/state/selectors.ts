import {IMovieBrowser, IMovieListItems, MovieSearchOptions} from '../types/state';
import {IState} from '../../../common/types/state';
import {PAGE_SIZE} from '../../../common/api';

export const selectMovieBrowser = (state: IState): IMovieBrowser => state.movieBrowser as IMovieBrowser;

export const selectMovieSearchOptions = (state: IState): MovieSearchOptions => selectMovieBrowser(state).searchOptions;

export const selectMovieSearchOptionsLoading = (state: IState) => selectMovieBrowser(state).searchOptionsLoading;

export const selectMovieDetails = (state: IState) => selectMovieBrowser(state).details;
export const selectMovieList = (state: IState) => selectMovieBrowser(state).list;

export const selectMovieListTotal = (state: IState) => selectMovieList(state).total;
export const selectMovieListItems = (state: IState) => selectMovieList(state).items;

export const selectPageNeedsToBeLoaded$ = (movies: IMovieListItems, page: number) => {
  const firstInPage = page * PAGE_SIZE;
  const movie = movies[firstInPage];
  return movie === undefined || movie.error !== undefined;
};

export const selectPageOfRow = (page: number) => Math.floor(page / PAGE_SIZE);
