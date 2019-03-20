import {useCallback, useEffect, useState} from 'react';
import {selectPageOfRow} from '../../features/movie-browser/state/selectors';
import {movieListPageRangeEnsure, movieListReset} from '../../features/movie-browser/state/actions';
import {IMovieListItem} from '../../features/movie-browser/types/state';
import {useDispatch} from 'redux-react-hook';
import {useDebounce} from 'react-use';

export const usePaginatedList = (
  data: (IMovieListItem | undefined)[],
  total?: number,
  year?: number,
  query?: string
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieListReset());
  }, [query, year]);

  const [bounds, setBounds] = useState<undefined | { start: number; stop: number }>({ start: 0, stop: 0 });
  useDebounce(
    () => bounds && dispatch(movieListPageRangeEnsure({ query, year, startPage: bounds.start, stopPage: bounds.stop })),
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
