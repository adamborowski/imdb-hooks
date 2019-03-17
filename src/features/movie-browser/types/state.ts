export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
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
  searchOptionsLoading:boolean;
}
