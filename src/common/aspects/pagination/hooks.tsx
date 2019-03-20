import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'redux-react-hook';
import {useDebounce} from 'react-use';
import {IListItems, PaginationActions} from './types';
import {PAGE_SIZE} from '../../api';

const selectPageOfRow = (page: number) => Math.floor(page / PAGE_SIZE);

export const usePaginatedList = <Entity extends object>(
  paginationActions: PaginationActions<Entity>,
  data: IListItems<Entity>,
  total?: number,
  year?: number,
  query?: string
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(paginationActions.reset());
  }, [query, year]);

  const [bounds, setBounds] = useState<undefined | { start: number; stop: number }>({ start: 0, stop: 0 });
  useDebounce(
    () =>
      bounds &&
      dispatch(
        paginationActions.pageRangeEnsure({ query, year, startPage: bounds.start, stopPage: bounds.stop })
      ),
    100,
    [query, year, bounds]
  );

  return useCallback(
    ({ visibleStartIndex, visibleStopIndex }) => {
      const fetchRowOverscan = 20;
      const [firstPageToLoad, lastPageToLoad] = [
        Math.max(0, visibleStartIndex - fetchRowOverscan),
        Math.min((total || 1) - 1, visibleStopIndex + fetchRowOverscan)
      ].map(selectPageOfRow);

      setBounds({ start: firstPageToLoad, stop: lastPageToLoad });
    },
    [year, query, data]
  );
};
