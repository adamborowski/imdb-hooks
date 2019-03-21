import { IList } from '../../../aspects/list/types';
import { ITypeAheadState } from '../../../aspects/typeahead/types';
import { IDetailsState } from '../../../aspects/details/types';

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

export interface IMovieBrowser {
  typeAhead: ITypeAheadState<IMovieLite>;
  details: IDetailsState<IMovie>;
  list: IList<IMovieLite>;
}
