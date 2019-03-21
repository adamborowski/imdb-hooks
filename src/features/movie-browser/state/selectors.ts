import { IMovieBrowser, IMovieLite } from '../types/state';
import { IState } from '../../../common/types/state';
import { ITypeAheadState } from '../../../aspects/typeahead/types';

export const selectMovieBrowser = (state: IState): IMovieBrowser => state.movieBrowser as IMovieBrowser;

export const selectMovieTypeAhead = (state: IState): ITypeAheadState<IMovieLite> => selectMovieBrowser(state).typeAhead;
export const selectMovieDetails = (state: IState) => selectMovieBrowser(state).details;
export const selectMovieList = (state: IState) => selectMovieBrowser(state).list;
