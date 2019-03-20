import React, {ComponentType} from 'react';
import {FixedSizeList, FixedSizeListProps, ListChildComponentProps} from 'react-window';
import styled from 'styled-components';
import {MeasuredComponentProps, withContentRect} from 'react-measure';
import _ from 'lodash';
import {withStyledScrollbar} from './antd';
import getOptional from '../getOptional';

export interface IVirtualListPropsBase<T> {
  itemData?: T[];
  padding?: number;
  row: ComponentType<ListChildComponentProps>;
  itemCount?: number;
  itemSize: number;
  onItemsRendered: FixedSizeListProps['onItemsRendered'];
}
export type IVirtualListProps<T> = IVirtualListPropsBase<T> & MeasuredComponentProps;

const FixedSizeListWithScrollbar = withStyledScrollbar('dark')(FixedSizeList);

export const VirtualList = <P extends any>(props: IVirtualListProps<P>) => {
  const {
    contentRect,
    onItemsRendered,
    measureRef,
    row,
    itemSize,
    itemCount,
    itemData,
    padding,
    measure,
    ...rest
  } = props;

  return (
    <div {...rest}>
      <div className="fixed-size-list-container ant-list ant-list-split" ref={measureRef}>
        <FixedSizeListWithScrollbar
          className="react-window"
          overscanCount={10}
          height={_.get(contentRect, 'bounds.height', 0)}
          onItemsRendered={onItemsRendered}
          itemCount={itemCount === undefined ? 0 : itemCount}
          itemData={itemData}
          itemSize={itemSize}
          width={getOptional(contentRect, 'bounds.width', width => width - padding! / 2, 0) || 0}
        >
          {row}
        </FixedSizeListWithScrollbar>
      </div>
    </div>
  );
};

const EnhancedVirtualList = withContentRect('bounds')(styled(VirtualList)`
  width: 100%; // virtual scroll doesn't have own dimensions, it fills parent 100%
  height: 100%;
  background: #ffffff;
  padding: ${p => `${p.padding!}px 0 ${p.padding!}px ${p.padding!}px`};

  .fixed-size-list-container {
    width: 100%;
    height: 100%;
  }

  .react-window > * > * {
    width: calc(100% - ${p => p.padding! / 2}px) !important;
    min-width: 500px;
  }
`);

EnhancedVirtualList.defaultProps = {
  padding: 12,
  itemSize: 69,
} as Partial<IVirtualListPropsBase<{}>>;

export default function getVirtualList<P>() {
  return (EnhancedVirtualList as unknown) as ComponentType<IVirtualListPropsBase<P>>;
}
