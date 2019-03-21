import React from 'react';
import {boolean, color, withKnobs} from '@storybook/addon-knobs';
import withFadeTransition from './withFading';
import {storiesOf} from '../storiesOf';

const ReactComp = ({ color, ...rest }: any) => (
  <div
    {...rest}
    style={{
      backgroundColor: color,
      width: '200px',
      height: '200px',
      margin: 'auto'
    }}
  />
);

const Faded = withFadeTransition<{ color: string }>()(ReactComp);

storiesOf(module)
  .addDecorator(withKnobs)
  .add('navigation with fading', () => (
    <Faded
      color={color('next color', 'red')}
      loading={boolean('loading', true)}
    />
  ))
  .add('with focusable', () => (
    <Faded
      color={color('next color', 'red')}
      loading={boolean('loading', true)}
    >
      <input type="text" defaultValue="write sth here" />
    </Faded>
  ));
