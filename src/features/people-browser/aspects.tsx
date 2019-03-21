import actionCreatorFactory from 'typescript-fsa';
import {findPeople, findPopularPeople, getPerson} from './services/people-search';
import {selectPersonDetails, selectPersonList, selectPersonTypeAhead} from './state/selectors';
import {createListAspect} from '../../common/aspects/list';
import {toPersonListPage, toPersonViewPage, usePersonId} from './routing';
import {createTypeAheadAspect} from '../../common/aspects/typeahead';
import SearchOptionContent from './components/header/SearchOptionContent';
import React from 'react';
import {getThumbUrl} from '../../common/api';
import {createDetailsAspect} from '../../common/aspects/details';
import {IPerson, IPersonLite} from './types/state';

const factory = actionCreatorFactory('people-list');

const searchParamName = 'pQuery';
export const listAspect = createListAspect(
  factory,
  findPeople,
  findPopularPeople,
  selectPersonList,
  searchParamName,
  'mYear',
  toPersonListPage()
);

export const typeAheadAspect = createTypeAheadAspect<IPersonLite>(
  factory,
  findPeople,
  findPopularPeople,
  result => <SearchOptionContent rank={0} avatar={getThumbUrl(result.profile_path)} name={result.name} year={'0000'} />,
  'people',
  selectPersonTypeAhead,
  searchParamName,
  toPersonListPage(),
  toPersonViewPage
);

export const detailsAspect = createDetailsAspect<IPerson>(factory, getPerson, selectPersonDetails, usePersonId);
