import React from 'react';
import { centeredDecorator, routerDecorator, storiesOf } from '../../../../common/storybook-utils';
import { text } from '@storybook/addon-knobs';
import { Breadcrumb } from 'antd';
import { ViewPure } from './View';
import { IPerson } from '../../types/state';

storiesOf(module)
  .addDecorator(centeredDecorator)
  .addDecorator(routerDecorator())
  .add('default', () => (
    <Breadcrumb>
      <ViewPure loading={false} personId={123} result={{ name: text('person name', 'Person Name') } as IPerson} />
    </Breadcrumb>
  ))
  .add('loading', () => (
    <Breadcrumb>
      <ViewPure loading />
    </Breadcrumb>
  ));
