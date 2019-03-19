import React, {ComponentType, FunctionComponent, ReactNode} from 'react';
import styled from 'styled-components';
import {Avatar, List} from 'antd';
import {ListItemLink} from './ListItem';
import {LocationDescriptor} from 'history';
import {ListItemProps} from 'antd/es/list';
import {Assign} from 'utility-types';

export type DefaultListItemProps = Assign<
  ListItemProps,
  {
    title?: ReactNode;
    description?: ReactNode;
    updatedAt?: ReactNode;
    updatedBy?: ReactNode;
    tags?: ReactNode;
    to: LocationDescriptor;
    avatar?: string;
  }
>;

const DefaultListItemUnstyled: FunctionComponent<DefaultListItemProps> = ({
  description,
  tags,
  title,
  to,
  updatedAt,
  updatedBy,
  avatar,
  ...rest
}) => (
  <ListItemLink to={to} {...rest}>
    <List.Item.Meta avatar={<Avatar src={avatar} size={43} shape="square" />} title={title} description={description} />
    {(tags || updatedAt || updatedBy) && (
      <>
        {tags && <div className="default-list-item-content-item">{tags}</div>}
        {(updatedAt || updatedBy) && (
          <div
            className="default-list-item-content-item update-info"
            title={`Updated at ${updatedAt ? updatedAt : 'unknown'} by ${updatedBy || 'unknown'} `}
          >
            <div>{updatedBy || <i>(no user)</i>}</div>
            <div>{updatedAt ? updatedAt : <i>(no date)</i>}</div>
          </div>
        )}
      </>
    )}
  </ListItemLink>
);

const DefaultListItem: ComponentType<DefaultListItemProps> = styled(DefaultListItemUnstyled)`
  padding-left: 12px;
  padding-right: 12px;
  .ant-list-item-content {
    align-items: center;
    flex: 0;
    &:empty {
      display: none;
    }
  }
  .default-list-item-content-item {
    white-space: nowrap;
    margin-left: 40px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    display: flex;
    text-align: right;
  }
  .update-info {
    display: inline-block;
  }
`;
export default DefaultListItem;
