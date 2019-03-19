import React, {useCallback, useEffect} from 'react';
import {useMovieSearchValue, useMovieYear} from '../../../routing';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {movieListPageRequest, movieListReset} from '../../../state/actions';
import getVirtualList from '../../../../../common/components/VirtualList';
import {IMovieListItem} from '../../../types/state';
import {ListItem} from './ListItem';
import {selectMovieListItems, selectMovieListTotal} from '../../../state/selectors';
import {IState} from '../../../../../common/types/state';
import {FixedSizeListProps} from 'react-window';

const List = getVirtualList<IMovieListItem>();

export const SecondaryContent = () => {
  const query = useMovieSearchValue();
  const year = useMovieYear();

  const dispatch = useDispatch();
  const mapState = useCallback(
    (state: IState) => ({
      total: selectMovieListTotal(state),
      data: selectMovieListItems(state)
    }),
    []
  );

  const { data, total } = useMappedState(mapState);

  useEffect(() => {
    dispatch(movieListReset());
    dispatch(movieListPageRequest({ page: 0, year, query }));
  }, [query, year]);

  const onItemsRendered: FixedSizeListProps['onItemsRendered'] = useCallback(
    ({ visibleStartIndex, visibleStopIndex }) => {
      const needToLoadPage = (page: number) => {
        const item = data[page * pageSize];
        return item === undefined || item.error;
      };

      const pageSize = 20;
      const startIndexPage = Math.floor(visibleStartIndex / pageSize);
      const stopIndexPage = Math.floor(visibleStopIndex / pageSize);

      if (needToLoadPage(startIndexPage)) {
        dispatch(movieListPageRequest({ page: startIndexPage, year, query }));
      }
      if (needToLoadPage(stopIndexPage) && startIndexPage !== stopIndexPage) {
        dispatch(movieListPageRequest({ page: stopIndexPage, year, query }));
      }
    },
    [year, query, data]
  );

  return <List onItemsRendered={onItemsRendered} itemSize={69} row={ListItem} itemCount={total || 1} itemData={data} />;
};
