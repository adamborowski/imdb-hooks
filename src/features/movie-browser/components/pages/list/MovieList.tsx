import React, {useCallback} from 'react';
import {useMovieSearchValue, useMovieYear} from '../../../routing';
import {useMappedState} from 'redux-react-hook';
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

  const mapState = useCallback(
    (state: IState) => ({
      total: selectMovieListTotal(state),
      data: selectMovieListItems(state)
    }),
    []
  );

  const { data, total } = useMappedState(mapState);

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