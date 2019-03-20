import actionCreatorFactory from 'typescript-fsa';
import {findMovies, findPopularMovies} from './services/movie-search';
import {selectMovieList, selectMovieTypeAhead} from './state/selectors';
import {createListAspect} from '../../common/aspects/list';
import {toMovieListPage} from './routing';
import {createTypeAheadAspect} from '../../common/aspects/typeahead';
import {IMovieLite} from './types/state';
import SearchOptionContent from './components/header/SearchOptionContent';
import React from 'react';
import {getReleaseYear, getThumbUrl} from '../../common/api';

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

export const typeAheadAspect = createTypeAheadAspect<IMovieLite>(
  factory,
  findMovies,
  findPopularMovies,
  result => (
    <SearchOptionContent
      rank={result.vote_average}
      avatar={getThumbUrl(result.poster_path)}
      name={result.title}
      year={getReleaseYear(result.release_date)}
    />
  ),
  'movies',
  selectMovieTypeAhead
);
