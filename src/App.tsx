import React, { cloneElement } from 'react';
import Switch from './common/components/FlatteningSwitch';
import {
  App as AntApp,
  AppMenu,
  AppSider,
  DefaultAppLogo
} from './common/components/antd';
import { IMenuItem } from './common/misc';
import DefaultAppHeader from './common/components/antd/DefaultAppHeader';
import logo from './common/components/antd/__stories__/AppSider.logo.png';
import { toMovieListPage } from './features/movie-browser/routing';

import _ from 'lodash';
import features from './features';

const menuConfiguration = [
  {
    link: toMovieListPage(),
    path: toMovieListPage(),
    label: 'Movies',
    icon: 'play-circle'
  },
  {
    link: '/b',
    path: '/b',
    label: 'People',
    icon: 'user'
  }
] as IMenuItem[];
const App = () => (
  <AntApp
    sider={
      <AppSider
        content={<AppMenu menuConfiguration={menuConfiguration} />}
        logo={<DefaultAppLogo logo={logo} />}
      />
    }
    header={
      <DefaultAppHeader>
        <Switch>
          {_.compact(features.map(plugin => _.get(plugin, 'routes.header'))).map(
            (routes, index) => cloneElement(routes, { key: index })
          )}
        </Switch>
      </DefaultAppHeader>
    }
    content={'content!'}
  />
);

export default App;
