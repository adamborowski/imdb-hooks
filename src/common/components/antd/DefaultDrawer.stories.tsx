import React from 'react';
import DefaultDrawer from './DefaultDrawer';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import {storiesOf} from '../../storiesOf';

storiesOf(module).add('default', () => (
  <DefaultDrawer
    drawerOpened={boolean('opened', true)}
    onDrawerClose={action('drawer close')}
  >
    Some content
  </DefaultDrawer>
));
