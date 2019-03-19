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
    popularity?: ReactNode;
    year?: ReactNode;
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
  popularity,
  year,
  avatar,
  ...rest
}) => (
  <ListItemLink to={to} {...rest}>
    <List.Item.Meta avatar={<Avatar src={avatar} size={43} shape="square" />} title={title} description={description} />
    {(tags || popularity || year) && (
      <>
        {tags && <div className="default-list-item-content-item">{tags}</div>}
        {(popularity || year) && (
          <div
            className="default-list-item-content-item update-info"
            title={`Released in ${year}. Popularity: ${popularity}.`}
          >
            <div>{year || <i>(no year info)</i>}</div>
            <div>{popularity ? popularity : <i>(no popularity)</i>}</div>
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

  .ant-avatar {
    background: #cccccc;
  }
`;
export default DefaultListItem;
