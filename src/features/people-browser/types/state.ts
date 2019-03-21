import { IList } from '../../../common/aspects/list/types';
import { ITypeAheadState } from '../../../common/aspects/typeahead/types';
import { IDetailsState } from '../../../common/aspects/details/types';

export interface IPersonLite {
  id: number;
  name: string;
  popularity: number;
  profile_path?: string;
}
export interface IPerson extends IPersonLite {
  homepage?: string;
  place_of_birth: string;
  popularity: number;
  biography: string;
  also_known_as: string[];
  known_for_department: string;
  birthday?: string;
  deathday?: string;
  movie_credits: {
    cast: ICast[];
    crew: ICrew[];
  };
}
export interface ICrew {
  id: number;
  department: string;
  original_language: string;
  original_title: string;
  job: string;
  overview: string;
  vote_count: number;
  poster_path?: string;
  backdrop_path?: string;
  title: string;
  popularity: number;
  vote_average: number;
  release_date: string;
  credit_id: number;
}
export interface ICast {
  character: string;
  credit_id: string;
  release_date: string;
  vote_count: number;
  video: boolean;
  adult: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path?: string;
}

export interface IPeopleBrowser {
  typeAhead: ITypeAheadState<IPersonLite>;
  details: IDetailsState<IPerson>;
  list: IList<IPersonLite>;
}
