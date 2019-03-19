import {useCallback} from 'react';
import {selectPageNeedsToBeLoaded$, selectPageOfRow} from '../../features/movie-browser/state/selectors';
import _ from 'lodash';
import {movieListPageRequest} from '../../features/movie-browser/state/actions';
import {IMovieListItem} from '../../features/movie-browser/types/state';
import {useDispatch} from 'redux-react-hook';

export const usePaginatedList = (
  data: (IMovieListItem | undefined)[],
  total?: number,
  year?: number,
  query?: string
) => {
  const dispatch = useDispatch();

  return useCallback(
    ({ visibleStartIndex, visibleStopIndex }) => {
      const fetchRowOverscan = 20;
      const [firstPageToLoad, lastPageToLoad] = [
        Math.max(0, visibleStartIndex - fetchRowOverscan),
        Math.min((total || 1) - 1, visibleStopIndex + fetchRowOverscan)
      ].map(selectPageOfRow);

      const allPagesToLoad = _.range(firstPageToLoad, lastPageToLoad + 1, 1).filter(page =>
        selectPageNeedsToBeLoaded$(data, page)
      );

      if (allPagesToLoad.length) {
        dispatch(movieListPageRequest({ query, year, pages: allPagesToLoad }));
      }
    },
    [year, query, data]
  );
};
