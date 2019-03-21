import { ActionCreatorFactory } from 'typescript-fsa';
import { createActions } from './actions';
import { createReducers } from './reducers';
import { createEpics } from './epics';
import { FindService, PopularService } from '../../common/api';
import { createUseSearchOptions } from './hooks/useSearchOptions';
import { ItemRenderer, SelectTypeAheadState, ToViewPage } from './types';
import { createUseSearchInput } from './hooks/useSearchInput';
import { createUseGoToSearch, createUseSearchValue } from '../../common/hooks';

export const createTypeAheadAspect = <Entity extends { id: number }>(
  actionCreatorFactory: ActionCreatorFactory,
  findService: FindService<Entity>,
  popularService: PopularService<Entity>,
  itemRenderer: ItemRenderer<Entity>,
  subject: string,
  selectMovieTypeAhead: SelectTypeAheadState<Entity>,
  searchParamName: string,
  listRoute: string,
  toViewPage: ToViewPage
) => {
  const actions = createActions<Entity>(actionCreatorFactory);
  const reducer = createReducers(actions);
  const epics = createEpics(actions, findService, popularService);
  const useSearchOptions = createUseSearchOptions(itemRenderer, subject, selectMovieTypeAhead);
  const useSearchValue = createUseSearchValue(searchParamName);
  const useSearchInput = createUseSearchInput(
    actions,
    useSearchValue,
    createUseGoToSearch(listRoute, searchParamName),
    useSearchOptions,
    toViewPage,
    searchParamName
  );
  return {
    actions,
    reducer,
    epics,
    useSearchOptions,
    useSearchInput
  };
};
