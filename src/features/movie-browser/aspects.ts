import actionCreatorFactory from 'typescript-fsa';
import {findMovies, findPopularMovies} from './services/movie-search';
import {selectMovieList} from './state/selectors';
import {createListAspect} from '../../common/aspects/list';
import {toMovieListPage} from './routing';

const factory = actionCreatorFactory('movie-list');

export const listAspect = createListAspect(
  factory,
  findMovies,
  findPopularMovies,
  selectMovieList,
  'mQuery',
  'mYear',
  toMovieListPage()
);
