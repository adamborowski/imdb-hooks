import actionCreatorFactory from 'typescript-fsa';
import {findMovies, findPopularMovies, getMovie} from './services/movie-search';
import {selectMovieDetails, selectMovieList, selectMovieTypeAhead} from './state/selectors';
import {createListAspect} from '../../common/aspects/list';
import {toMovieListPage, toMovieViewPage, useMovieId} from './routing';
import {createTypeAheadAspect} from '../../common/aspects/typeahead';
import {IMovie, IMovieLite} from './types/state';
import SearchOptionContent from './components/header/SearchOptionContent';
import React from 'react';
import {getReleaseYear, getThumbUrl} from '../../common/api';
import {createDetailsAspect} from '../../common/aspects/details';

const factory = actionCreatorFactory('movie-list');

const searchParamName = 'mQuery';
export const listAspect = createListAspect(
  factory,
  findMovies,
  findPopularMovies,
  selectMovieList,
  searchParamName,
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
  selectMovieTypeAhead,
  searchParamName,
  toMovieListPage(),
  toMovieViewPage
);

export const detailsAspect = createDetailsAspect<IMovie>(factory, getMovie, selectMovieDetails, useMovieId);
