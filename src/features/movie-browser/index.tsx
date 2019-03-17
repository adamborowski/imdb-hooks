import { IPlugin } from '../../common/plugins';
import { Route } from 'react-router';
import { toMovieListPage, toMovieViewPage } from './routing';
import Search from './components/header/Search';
import React from 'react';
import epics from './state/epics';
import reducers from './state/reducers';

import viewPage from './components/pages/view';

export default {
  routes: {
    main: (
      <>
        <Route path={toMovieViewPage()} render={viewPage} />
      </>
    ),
    header: (
      <>
        <Route path={toMovieListPage()}>
          <Search />
        </Route>
      </>
    )
  },
  epics,
  reducers: {
    movieBrowser: reducers
  }
} as IPlugin;
