import React from 'react';
import getVirtualList from '../../../../../common/components/VirtualList';
import {ListItem} from './ListItem';
import {IListItem, IListItems} from '../../../../../common/aspects/list/types';
import {IMovieLite} from '../../../types/state';
import {listAspect} from '../../../aspects';
import {FixedSizeListProps} from 'react-window';

const List = getVirtualList<IListItem<IMovieLite> | undefined>();

type MovieListPureProps = {
  onItemsRendered?: FixedSizeListProps['onItemsRendered'];
  itemCount?: number;
  itemData: IListItems<IMovieLite>;
};
export const MovieListPure = (props: MovieListPureProps) => (
  <List
    onItemsRendered={props.onItemsRendered}
    itemSize={69}
    row={ListItem}
    itemCount={props.itemCount}
    itemData={props.itemData}
  />
);

export const MovieList = () => {
  const { items, total, onItemsRendered } = listAspect.usePaginatedList();

  return <MovieListPure onItemsRendered={onItemsRendered} itemCount={total} itemData={items} />;
};
