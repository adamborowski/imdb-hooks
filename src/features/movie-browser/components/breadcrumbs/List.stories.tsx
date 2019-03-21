import React from 'react';
import {storiesOf} from '../../../../common/storiesOf';
import {BrowserRouter} from 'react-router-dom';
import {ListPure} from './List';
import {text} from '@storybook/addon-knobs';
import {Breadcrumb} from 'antd';

storiesOf(module)
  .addDecorator(story => (
    <BrowserRouter>
      <Breadcrumb>{story()}</Breadcrumb>
    </BrowserRouter>
  ))
  .add('no search applied', () => <ListPure searchParam={'movies'} />)
  .add('search applied', () => (
    <ListPure searchParam={'movies'} searchValue={text('search value', 'some search query')} />
  ));
