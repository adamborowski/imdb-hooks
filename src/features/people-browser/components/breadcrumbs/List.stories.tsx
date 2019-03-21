import React from 'react';
import {centeredDecorator, routerDecorator, storiesOf} from '../../../../common/storybook-utils';
import {ListPure} from './List';
import {text} from '@storybook/addon-knobs';
import {Breadcrumb} from 'antd';

storiesOf(module)
  .addDecorator(centeredDecorator)
  .addDecorator(routerDecorator())
  .add('no search applied', () => (
    <Breadcrumb>
      <ListPure searchParam={'people'} />
    </Breadcrumb>
  ))
  .add('search applied', () => (
    <Breadcrumb>
      <ListPure searchParam={'people'} searchValue={text('search value', 'some search query')} />
    </Breadcrumb>
  ));
