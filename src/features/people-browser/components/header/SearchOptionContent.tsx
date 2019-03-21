import React, {ComponentType, FunctionComponent, memo} from 'react';
import {Avatar, Icon} from 'antd';
import styled from 'styled-components';
import emptyAvatar from './emptyAvatar.png';

export interface SearchOptionProps {
  avatar?: string;
  name: string;
  rank: number;
  year?: string;
}

const SearchOptionContent: FunctionComponent<SearchOptionProps> = ({ avatar, name, rank, year, ...rest }) => (
  <div {...rest}>
    <Avatar shape="square" src={avatar || emptyAvatar} />
    {name}
    <span className="rate">
      {year}
      <Icon type="like" theme="filled" />
      {rank.toFixed(1)}
    </span>
  </div>
);

export default memo(styled(SearchOptionContent)`
  vertical-align: middle;
  line-height: 30px;
  .ant-avatar {
    margin-right: 10px;
    img {
      object-fit: cover;
    }
  }
  .rate {
    float: right;
    font-size: 15px;
    svg {
      margin: 0 4px;
    }
  }
`) as ComponentType<SearchOptionProps>;
