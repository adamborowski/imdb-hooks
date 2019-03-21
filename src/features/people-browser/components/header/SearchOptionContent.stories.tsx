import {storiesOf} from '../../../../common/storiesOf';
import React from 'react';
import SearchOptionContent from './SearchOptionContent';
import exampleAvatar from './__stories__/exampleAvatar.jpg';
import {Select} from 'antd';

const { Option } = Select;

storiesOf(module).add('default', () => (
  <Select open value="Select a value" style={{ width: 300 }}>
    <Option value="1">
      <SearchOptionContent
        avatar={exampleAvatar}
        name="Example Person"
        rank={4.5}
        year="2018"
      />
    </Option>
    <Option value="2">
      <SearchOptionContent name="With no avatar" rank={6.3} year="1990" />
    </Option>
  </Select>
));
