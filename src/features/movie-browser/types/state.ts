import {ApiResponse} from '../../../common/api';
import {IList} from '../../../common/aspects/list/types';

export interface IMovieLite {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

export type ProductionCountries = { name: string }[];
export type Genres = { id: number; name: string }[];

export interface IMovie extends IMovieLite {
  tagline?: string;
  homepage?: string;
  production_countries: ProductionCountries;
  genres: Genres;
}

export interface IPerson {
  name: string;
  popularity: string;
  profile_path?: string;
  known_for: IMovieLite[];
}

export type MovieSearchOptions = ApiResponse<IMovieLite>;

export interface IMovieBrowser {
  searchOptions: MovieSearchOptions;
  searchOptionsLoading: boolean;
  details: IMovieDetails;
  list: IList<IMovieLite>;
}

export interface IMovieDetails {
  loading: boolean;
  error?: string;
  result?: IMovie;
}
