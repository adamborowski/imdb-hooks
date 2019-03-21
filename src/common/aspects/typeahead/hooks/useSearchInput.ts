import { useCallback, useEffect, useState } from 'react';
import { optional } from '../../../utils';
import { useDispatch } from 'redux-react-hook';
import { useHistoryPush } from '../../../hooks/useHistoryPush';
import { SelectValue } from 'antd/es/select';
import { ITypeAheadActions, ToViewPage, UseSearchOptions } from '../types';
import { UseSetValue, UseValue } from '../../../types/hooks';

export const createUseSearchInput = <Entity extends object>(
  actions: ITypeAheadActions<Entity>,
  useSearchValue: UseValue,
  useGoToSearch: UseSetValue,
  useSearchOptions: UseSearchOptions,
  toViewPage: ToViewPage,
  searchParamName: string
) => () => {
  const defaultSearchValue = useSearchValue();
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const displayedSearchValue = optional(searchValue, defaultSearchValue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.typeOccured({ value: defaultSearchValue }));
  }, [defaultSearchValue]);

  const goToMovieSearch = useGoToSearch();
  const historyPush = useHistoryPush();

  const dataSource = useSearchOptions(searchValue, defaultSearchValue);

  const onApply = useCallback(
    (key: SelectValue) => {
      if (key === '_go_to_search') {
        goToMovieSearch(displayedSearchValue);
        setSearchValue(undefined);
      } else {
        historyPush(toViewPage(key.toString()), { [searchParamName]: displayedSearchValue });
      }
    },
    [searchValue]
  );

  const onSearch = useCallback((key: SelectValue) => {
    dispatch(actions.typeOccured({ value: key.toString() }));
    setSearchValue(key.toString());
  }, []);
  const cancel = useCallback(() => {
    setSearchValue(undefined);
    dispatch(actions.typeOccured({ value: defaultSearchValue }));
  }, [defaultSearchValue]);
  return { dataSource, onSearch, onApply, cancel, value: displayedSearchValue };
};
