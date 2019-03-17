import { Location } from 'history';
import { matchPath } from 'react-router';
import _ from 'lodash';
import { ReactNode } from 'react';

/**
 * The aim of this utility it to provide react-router definition of menus, tabs from Ant Design which require specyfying selectedKeys in the parent component.
 * Usually when using react-router you just set 'selected' property on particular child item.
 * This utility gets items description containing routing information, combines with recent *location* object and provides array of selected items that match given route.
 */

export interface IMenuItem {
  link: string;
  path: string;
  exact?: boolean;
  strict?: boolean;
  label: ReactNode;
  icon?: string;
  children?: IMenuItem[];
}

export const getSelectedPaths = (
  location: Location,
  menuItems: IMenuItem[],
  keyPrefix: string = ''
): string[] =>
  menuItems
    .map(m => {
      const key = keyPrefix + m.link;
      const match = matchPath(
        location.pathname,
        _.pick(m, 'exact', 'strict', 'path')
      );
      const childrenMatches = m.children
        ? getSelectedPaths(location, m.children, key + '.')
        : [];

      const result: string[] = [];
      if (match) {
        result.push(key);
      }
      result.push(...childrenMatches);
      return result;
    })
    .reduce((acc, paths) => [...acc, ...paths], []);
