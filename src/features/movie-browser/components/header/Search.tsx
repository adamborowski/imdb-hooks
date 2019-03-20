import React, {useCallback, useEffect, useState} from 'react';
import SearchPure from '../../../../common/components/antd/Search';
import {toMovieViewPage} from '../../routing';
import {useDispatch} from 'redux-react-hook';
import {SelectValue} from 'antd/es/select';
import {movieSearchOptionsType} from '../../state/actions';
import {selectMovieSearchOptions, selectMovieSearchOptionsLoading} from '../../state/selectors';
import {useSearchOptions} from '../../../../common/hooks/useSearchOptions';
import {optional} from '../../../../common/utils';
import {useHistoryPush} from '../../../../common/hooks/useHistoryPush';
import {listAspect} from '../../aspects';

const Search = () => {
  const defaultSearchValue = listAspect.useSearchValue();
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined); // todo probably more clean if put into redux

  const displayedSearchValue = optional(searchValue, defaultSearchValue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieSearchOptionsType({ value: defaultSearchValue }));
  }, [defaultSearchValue]);

  const goToMovieSearch = listAspect.useGoToSearch();
  const historyPush = useHistoryPush();

  const dataSource = useSearchOptions(
    searchValue,
    defaultSearchValue,
    'movies',
    selectMovieSearchOptionsLoading,
    selectMovieSearchOptions
  );

  const onApply = useCallback(
    (key: SelectValue) => {
      if (key === '_go_to_search') {
        goToMovieSearch(displayedSearchValue);
        setSearchValue(undefined);
      } else {
        historyPush(toMovieViewPage(key.toString()), { mQuery: displayedSearchValue });
      }
    },
    [searchValue]
  );

  const onSearch = useCallback((key: SelectValue) => {
    dispatch(movieSearchOptionsType({ value: key.toString() }));
    setSearchValue(key.toString());
  }, []);
  const onCancel = useCallback(
    (open: boolean) => {
      if (!open) {
        setSearchValue(undefined);
        dispatch(movieSearchOptionsType({ value: defaultSearchValue }));
      }
    },
    [defaultSearchValue]
  );

  return (
    <SearchPure
      onDropdownVisibleChange={onCancel}
      notFoundContent="No movies found"
      value={displayedSearchValue}
      dataSource={dataSource}
      onSearch={onSearch}
      onSelect={onApply}
      searchPrompt="Search for movies..."
    />
  );
};
export default Search;
