import React from 'react';
import { Breadcrumb } from 'antd';
import { Home } from './Home';
import { centeredDecorator, routerDecorator, storiesOf } from '../../storybook-utils';

storiesOf(module)
  .addDecorator(centeredDecorator)
  .addDecorator(routerDecorator())
  .add('no search applied', () => (
    <Breadcrumb>
      <Home />
    </Breadcrumb>
  ));
