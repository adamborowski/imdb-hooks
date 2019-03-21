import getVirtualList, { IVirtualListProps, VirtualList } from './VirtualList';
import React, { ComponentType } from 'react';
import { ListChildComponentProps } from 'react-window';
import { create } from 'react-test-renderer';

const Row: ComponentType<ListChildComponentProps> = p => <div>row #{p.index}</div>;

const MyVirtualList = getVirtualList<any>();

const createList = (props?: Partial<IVirtualListProps<any>>, List = MyVirtualList) => (
  <List row={Row} itemSize={100} {...props} />
);

describe('VirtualList', () => {
  it('renders properly', () => {
    const list = create(createList({ padding: 1 })).toJSON();

    expect(list).toMatchSnapshot();
    expect(list).toHaveStyleRule('padding', '1px 0 1px 1px');
  });
});
