import getVirtualList, {IVirtualListProps, VirtualList} from './VirtualList';
import {render, shallow} from 'enzyme';
import React, {ComponentType} from 'react';
import {ListChildComponentProps} from 'react-window';
import {create} from 'react-test-renderer';

const Row: ComponentType<ListChildComponentProps> = p => (
  <div>row #{p.index}</div>
);

const MyVirtualList = getVirtualList<any>();

const createList = (
  props?: Partial<IVirtualListProps<any>>,
  List = MyVirtualList
) => <List contentRect={{}} measure={() => {}} measureRef={ref => {}} row={Row} itemSize={100} {...props} />;

describe('VirtualList', () => {
  it('renders properly', () => {
    const list = create(createList({ padding: 1 })).toJSON();

    expect(list).toMatchSnapshot();
    expect(list).toHaveStyleRule('padding', '1px 0 1px 1px');
  });
  it('when loading -> it shows spinner', () => {
    const list = shallow(createList({ loading: true }, VirtualList));

    expect(list).toMatchSnapshot();
  });
  it('when error -> it shows error message', () => {
    const list = render(createList({ error: 'Test error' }));

    expect(list).toMatchSnapshot();
  });
});
