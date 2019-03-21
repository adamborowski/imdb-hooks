import {IState} from '../../../common/types/state';
import {ITypeAheadState} from '../../../common/aspects/typeahead/types';
import {IPeopleBrowser, IPersonLite} from '../types/state';

export const selectPeopleBrowser = (state: IState): IPeopleBrowser => state.peopleBrowser as IPeopleBrowser;

export const selectPersonTypeAhead = (state: IState): ITypeAheadState<IPersonLite> => selectPeopleBrowser(state).typeAhead;
export const selectPersonDetails = (state: IState) => selectPeopleBrowser(state).details;
export const selectPersonList = (state: IState) => selectPeopleBrowser(state).list;
