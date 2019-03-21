import { IPlugin } from '../../common/plugins';
import { Redirect, Route } from 'react-router';
import { toRootPage } from './routing';
import React from 'react';
import { toMovieListPage } from '../movie-browser/routing';

export default {
  routes: {
    main: (
      <>
        <Route exact path={toRootPage()} render={() => <Redirect to={toMovieListPage()} />} />
      </>
    )
  }
} as IPlugin;
