export interface IMovie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  overview: string;
  release_date: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  tagline?: string;
  homepage?: string;
  production_countries: { name: string }[];
}

export interface IPerson {
  name: string;
  popularity: string;
  profile_path?: string;
  known_for: IMovie[];
}

export interface ApiResponse<Data> {
  page: number;
  total_results: number;
  total_pages: number;
  results: Data[];
}

export type MovieSearchOptions = ApiResponse<IMovie>;

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
  result?: IMovie;
  error?: string;
}
