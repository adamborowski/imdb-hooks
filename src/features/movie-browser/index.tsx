import {IPlugin} from '../../common/plugins';
import {Route} from 'react-router';
import {toMovieListPage} from './routing';
import Search from './components/header/Search';
import React from 'react';
import epics from './state/epics';
import reducers from './state/reducers';

export default {
  routes: {
    main: <></>,
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
