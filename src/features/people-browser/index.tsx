import { IPlugin } from '../../common/plugins';
import { Route } from 'react-router';
import { toPersonListPage, toPersonViewPage } from './routing';
import Search from './components/header/Search';
import React from 'react';
import epics from './state/epics';
import reducers from './state/reducers';

import viewPage from './components/pages/view';
import listPage from './components/pages/list';

export default {
  routes: {
    main: (
      <>
        <Route exact path={toPersonListPage()} render={listPage} />
        <Route path={toPersonViewPage()} render={viewPage} />
      </>
    ),
    header: (
      <>
        <Route path={toPersonListPage()}>
          <Search />
        </Route>
      </>
    )
  },
  epics,
  reducers: {
    peopleBrowser: reducers
  }
} as IPlugin;
