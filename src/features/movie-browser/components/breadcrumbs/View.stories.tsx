import React from 'react';
import { centeredDecorator, routerDecorator, storiesOf } from '../../../../common/storybook-utils';
import { text } from '@storybook/addon-knobs';
import { Breadcrumb } from 'antd';
import { ViewPure } from './View';
import { IMovie } from '../../types/state';

storiesOf(module)
  .addDecorator(centeredDecorator)
  .addDecorator(routerDecorator())
  .add('default', () => (
    <Breadcrumb>
      <ViewPure loading={false} movieId={123} result={{ title: text('movie title', 'Movie title') } as IMovie} />
    </Breadcrumb>
  ))
  .add('loading', () => (
    <Breadcrumb>
      <ViewPure loading />
    </Breadcrumb>
  ));
