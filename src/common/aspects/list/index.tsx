import {createActions} from './actions';
import {ActionCreatorFactory} from 'typescript-fsa';
import {createReducers} from './reducers';
import {createEpics} from './epics';
import {SelectList} from './types';
import {createUseSetYear, createUseYear} from './hooks';
import {createUseYearInput} from './hooks/useYearInput';
import {createUsePaginatedList} from './hooks/usePaginatedList';
import {FindService, PopularService} from '../../api';
import {createUseGoToSearch, createUseSearchValue} from '../../hooks/hooks';

export const createListAspect = <Entity extends object>(
  actionCreatorFactory: ActionCreatorFactory,
  findService: FindService<Entity>,
  popularService: PopularService<Entity>,
  selectList: SelectList<Entity>,
  searchParam: string,
  yearParam: string,
  listRoute: string
) => {
  const actions = createActions<Entity>(actionCreatorFactory);
  const reducer = createReducers(actions);
  const epics = createEpics(actions, findService, popularService, selectList);
  const useYear = createUseYear(yearParam);
  const useSetYear = createUseSetYear(yearParam);
  const useSearchValue = createUseSearchValue(searchParam);
  const useGoToSearch = createUseGoToSearch(listRoute, searchParam);
  const useYearInput = createUseYearInput(useYear, useSetYear, useSearchValue);
  const usePaginatedList = createUsePaginatedList(actions, useYear, useSearchValue, selectList);

  return {
    actions,
    reducer,
    epics,
    useYear,
    useSetYear,
    useSearchValue,
    useGoToSearch,
    useYearInput,
    usePaginatedList
  };
};
