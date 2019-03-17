import React from 'react';
// @ts-ignore
import logo from './__stories__/AppSider.logo.png';
import AppSider from './AppSider';
import DefaultAppLogo from './DefaultAppLogo';
import { MemoryRouter } from 'react-router';
import {storiesOf} from '../../storiesOf';

storiesOf(module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('with default logo', () => (
    <AppSider
      logo={<DefaultAppLogo logo={logo}>My UI</DefaultAppLogo>}
      content={<div>Menu content</div>}
      style={{ height: '100vh' }}
    />
  ))
  .add('menu overflow', () => (
    <AppSider

      logo={<DefaultAppLogo logo={logo}>My UI</DefaultAppLogo>}
      content={
        <>
          <p>Menu content 1</p>
          <p>Menu content 2</p>
          <p>Menu content 3</p>
          <p>Menu content 4</p>
          <p>Menu content 5</p>
          <p>Menu content 6</p>
          <p>Menu content 7</p>
          <p>Menu content 8</p>
          <p>Menu content 9</p>
          <p>Menu content 10</p>
          <p>Menu content 11</p>
          <p>Menu content 12</p>
          <p>Menu content 13</p>
          <p>Menu content 14</p>
          <p>Menu content 15</p>
          <p>Menu content 16</p>
          <p>Menu content 17</p>
          <p>Menu content 18</p>
          <p>Menu content 19</p>
          <p>Menu content 20</p>
        </>
      }
      style={{ height: '100vh' }}
    />
  ));

/// todo make flex container and menu content min height 0, add sublime scrollbar there
