import {createListAspect} from '../../common/aspects/list';
import actionCreatorFactory from 'typescript-fsa';
import {findMovies, findPopularMovies} from './services/movie-search';
import {selectMovieListItems} from './state/selectors';

const factory = actionCreatorFactory('movie-list');

export const listAspect = createListAspect(factory, findMovies, findPopularMovies, selectMovieListItems);
