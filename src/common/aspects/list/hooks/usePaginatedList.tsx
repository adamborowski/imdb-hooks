import { IListActions, SelectList, UseYear } from '../types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { PAGE_SIZE } from '../../../api';
import { UseValue } from '../../../types/hooks';

const selectPageOfRow = (page: number) => Math.floor(page / PAGE_SIZE);
export const createUsePaginatedList = <Entity extends object>(
  actions: IListActions<Entity>,
  useYear: UseYear,
  useSearchValue: UseValue,
  selectList: SelectList<Entity>
) => () => {
  const year = useYear();
  const query = useSearchValue();
  const { items, total: _total } = useMappedState(selectList);

  const total = _total === null ? undefined : _total; // reducer can't return undefined, we need to translate that value

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.reset());
  }, [query, year]);

  const [bounds, setBounds] = useState<undefined | { start: number; stop: number }>({ start: 0, stop: 0 });
  useDebounce(
    () =>
      bounds &&
      dispatch(
        actions.pageRangeEnsure({
          query,
          year,
          startPage: bounds.start,
          stopPage: bounds.stop
        })
      ),
    100,
    [query, year, bounds]
  );

  const onItemsRendered = useCallback(
    ({ visibleStartIndex, visibleStopIndex }) => {
      const fetchRowOverscan = 20;
      const [firstPageToLoad, lastPageToLoad] = [
        Math.max(0, visibleStartIndex - fetchRowOverscan),
        Math.min((total || 1) - 1, visibleStopIndex + fetchRowOverscan)
      ].map(selectPageOfRow);

      setBounds({ start: firstPageToLoad, stop: lastPageToLoad });
    },
    [year, query, items]
  );

  return { onItemsRendered, items, total, query, year };
};
