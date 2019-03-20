import React from 'react';
import getVirtualList from '../../../../../common/components/VirtualList';
import {ListItem} from './ListItem';
import {IListItem} from '../../../../../common/aspects/list/types';
import {IMovieLite} from '../../../types/state';
import {listAspect} from '../../../aspects';

const List = getVirtualList<IListItem<IMovieLite> | undefined>();

export const MovieList = () => {
  const { items, total, onItemsRendered, query, year } = listAspect.usePaginatedList();

  return (
    <List
      onItemsRendered={onItemsRendered}
      itemSize={69}
      row={ListItem}
      itemCount={total === null ? undefined : total}
      itemData={items}
    />
  );
};
