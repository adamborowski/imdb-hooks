import React from 'react';
import AppMenu from './AppMenu';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '../../storybook-utils';
import { IMenuItem } from '../../getSelectedPaths';

let appMenu = (
  <AppMenu
    menuConfiguration={
      [
        {
          link: '/a',
          path: '/a',
          label: 'Risk factors',
          icon: 'file',
          exact: true
        },
        {
          link: '/a/1',
          path: '/a/:id',
          label: 'Risk factors contexts',
          icon: 'folder'
        },
        {
          link: '/b',
          path: '/b',
          label: 'Historical',
          icon: 'dashboard'
        }
      ] as IMenuItem[]
    }
  />
);
storiesOf(module)
  .add('default', () => <MemoryRouter>{appMenu}</MemoryRouter>)
  .add('in /a', () => <MemoryRouter initialEntries={[{ pathname: '/a' }]}>{appMenu}</MemoryRouter>)
  .add('in /a/1', () => <MemoryRouter initialEntries={[{ pathname: '/a/1' }]}>{appMenu}</MemoryRouter>)
  .add('in /b', () => <MemoryRouter initialEntries={[{ pathname: '/b' }]}>{appMenu}</MemoryRouter>);
