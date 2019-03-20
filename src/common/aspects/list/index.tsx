import {createActions} from './actions';
import {ActionCreatorFactory} from 'typescript-fsa';
import {createReducers} from './reducers';
import {createEpics} from './epics';
import {FindService, PopularService, SelectList} from './types';
import {createUseGoToSearch, createUseSearchValue, createUseSetYear, createUseYear} from './hooks';
import {createUseYearInput} from './hooks/useYearInput';
import {createUsePaginatedList} from './hooks/usePaginatedList';

export type ListAspect = ReturnType<typeof createListAspect>;
export const createListAspect = <Entity extends EntityLite, EntityLite extends object>(
  actionCreatorFactory: ActionCreatorFactory,
  findService: FindService<EntityLite>,
  popularService: PopularService<EntityLite>,
  selectList: SelectList<EntityLite>,
  searchParam: string,
  yearParam: string,
  listRoute: string
) => {
  const actions = createActions<EntityLite>(actionCreatorFactory);
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
