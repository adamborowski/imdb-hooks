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

export interface ApiResponse<Data> {
  page: number;
  total_results: number;
  total_pages: number;
  results: Data[];
}

export type MovieSearchOptions = ApiResponse<IMovieLite>;

export interface IMovieBrowser {
  searchOptions: MovieSearchOptions;
  searchOptionsLoading: boolean;
  details: IMovieDetails;
  list: IMovieList;
}

export interface IMovieDetails {
  loading: boolean;
  error?: string;
  result?: IMovie;
}

export interface IMovieList {
  items: IMovieListItems;
  total: number | null;
}

export type IMovieListItems = (IMovieListItem | undefined)[];

export interface IMovieListItem {
  loading: boolean;
  result?: IMovieLite;
  error?: string;
}
