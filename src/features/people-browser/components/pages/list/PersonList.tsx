import React from 'react';
import getVirtualList from '../../../../../common/components/VirtualList';
import { ListItem } from './ListItem';
import { IListItem } from '../../../../../aspects/list/types';
import { listAspect } from '../../../aspects';
import { IPersonLite } from '../../../types/state';

const List = getVirtualList<IListItem<IPersonLite> | undefined>();

export const PersonList = () => {
  const { items, total, onItemsRendered } = listAspect.usePaginatedList();

  return <List onItemsRendered={onItemsRendered} itemSize={69} row={ListItem} itemCount={total} itemData={items} />;
};
