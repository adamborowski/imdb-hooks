import {IList} from '../../../common/aspects/list/types';
import {ITypeAheadState} from '../../../common/aspects/typeahead/types';
import {IDetailsState} from '../../../common/aspects/details/types';
import {IMovieLite} from '../../movie-browser/types/state';

export interface IPersonLite {
  id: number;
  name: string;
  popularity: number;
  profile_path?: string;
  known_for: IMovieLite[];
}
export interface IPerson extends IPersonLite {
  homepage?: string;
  place_of_birth: string;
  popularity: number;
  biography: string;
  also_known_as: string[];
  birthday?: string;
  deathday?: string;
}

export interface IPeopleBrowser {
  typeAhead: ITypeAheadState<IPersonLite>;
  details: IDetailsState<IPerson>;
  list: IList<IPersonLite>;
}
