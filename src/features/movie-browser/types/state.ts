import {IList} from '../../../common/aspects/list/types';
import {ITypeAheadState} from '../../../common/aspects/typeahead/types';
import {IDetailsState} from '../../../common/aspects/details/types';

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
