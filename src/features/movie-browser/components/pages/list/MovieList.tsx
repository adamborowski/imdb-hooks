import React, {useCallback, useEffect} from 'react';
import {useMovieSearchValue, useMovieYear} from '../../../routing';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {movieListPageRequest, movieListReset} from '../../../state/actions';
import getVirtualList from '../../../../../common/components/VirtualList';
import {IMovieListItem} from '../../../types/state';
import {ListItem} from './ListItem';
import {selectMovieListItems, selectMovieListTotal} from '../../../state/selectors';
import {IState} from '../../../../../common/types/state';
import {usePaginatedList} from '../../../../../common/hooks/usePaginatedList';

const List = getVirtualList<IMovieListItem | undefined>();

export const MovieList = () => {
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
    dispatch(movieListPageRequest({ pages: [0], year, query }));
  }, [query, year]);

  const onItemsRendered = usePaginatedList(data, total === null ? undefined : total, year, query);

  return (
    <List
      onItemsRendered={onItemsRendered}
      itemSize={69}
      row={ListItem}
      itemCount={total === null ? undefined : total}
      itemData={data}
    />
  );
};
