import React, {ComponentType, FunctionComponent, memo} from 'react';
import {Icon} from 'antd';
import styled from 'styled-components';
import emptyAvatar from './emptyAvatar.png';

export interface SearchOptionProps {
  avatar?: string;
  name: string;
  rank: number;
  year: string;
}

const SearchOptionContent: FunctionComponent<SearchOptionProps> = ({ avatar, name, rank, year, ...rest }) => (
  <div {...rest}>
    <img src={avatar || emptyAvatar} className="avatar" alt="movie logo" />
    {name}
    <span className="rate">
      {year}
      <Icon type="star" theme="filled" />
      {rank.toFixed(1)}
    </span>
  </div>
);

export default memo(styled(SearchOptionContent)`
  vertical-align: middle;
  line-height: 30px;
  img {
    height: 30px;
    width: 22px;
    margin-right: 10px;
  }
  .rate {
    float: right;
    font-size: 15px;
    svg {
      margin: 0 4px;
      color: #ffcc33;
    }
  }
`) as ComponentType<SearchOptionProps>;
