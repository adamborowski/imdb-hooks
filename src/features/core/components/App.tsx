import React, { cloneElement } from 'react';
import Switch from '../../../common/components/FlatteningSwitch';
import DefaultAppHeader from '../../../common/components/antd/DefaultAppHeader';
import AntApp from '../../../common/components/antd/App';
import logo from '../../../common/components/antd/__stories__/AppSider.logo.png';

import _ from 'lodash';
import features from '../..';
import { menuConfiguration } from '../menu';
import AppSider from '../../../common/components/antd/AppSider';
import AppMenu from '../../../common/components/antd/AppMenu';
import DefaultAppLogo from '../../../common/components/antd/DefaultAppLogo';

const App = () => (
  <AntApp
    sider={
      <AppSider content={<AppMenu menuConfiguration={menuConfiguration} />} logo={<DefaultAppLogo logo={logo} />} />
    }
    header={
      <DefaultAppHeader>
        <Switch>
          {_.compact(features.map(plugin => _.get(plugin, 'routes.header'))).map((routes, index) =>
            cloneElement(routes, { key: index })
          )}
        </Switch>
      </DefaultAppHeader>
    }
    content={
      <Switch>
        {_.compact(features.map(plugin => _.get(plugin, 'routes.main'))).map((routes, index) =>
          cloneElement(routes, { key: index })
        )}
      </Switch>
    }
  />
);

export default App;
