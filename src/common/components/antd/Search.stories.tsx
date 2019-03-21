import {centeredDecorator, storiesOf} from '../../storybook-utils';
import Search from './Search';
import React from 'react';
import {text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {Select} from 'antd';

storiesOf(module)
  .addDecorator(centeredDecorator)
  .add('default', () => (
    <Search
      searchPrompt={text('search prommpt', 'search...')}
      dataSource={[
        <Select.Option key="-1">
          search <em>Phrase</em> in movie titles...
        </Select.Option>,
        <Select.OptGroup label="Best matches">
          <Select.Option key="1">Star Trek</Select.Option>
          <Select.Option key="2">Star Wars</Select.Option>
          <Select.Option key="5">A star is born</Select.Option>
          <Select.Option key="8">The star</Select.Option>
        </Select.OptGroup>
      ]}
      onSearch={action('search')}
      onSelect={action('select')}
      notFoundContent="Not found"
    />
  ));
