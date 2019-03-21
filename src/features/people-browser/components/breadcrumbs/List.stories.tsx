import React from 'react';
import {centeredDecorator, storiesOf} from '../../../../common/storybook-utils';
import {BrowserRouter} from 'react-router-dom';
import {ListPure} from './List';
import {text} from '@storybook/addon-knobs';
import {Breadcrumb} from 'antd';

storiesOf(module)
  .addDecorator(centeredDecorator)
  .addDecorator(story => (
    <BrowserRouter>
      <Breadcrumb>{story()}</Breadcrumb>
    </BrowserRouter>
  ))
  .add('no search applied', () => <ListPure searchParam={'people'} />)
  .add('search applied', () => (
    <ListPure searchParam={'people'} searchValue={text('search value', 'some search query')} />
  ));
