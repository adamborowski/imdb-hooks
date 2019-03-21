import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { toMovieListPage } from '../../../features/movie-browser/routing';
import { fixBreadcrumb } from '../../workarounds';

export const Home = fixBreadcrumb(() => {
  return (
    <Breadcrumb.Item>
      <Link to={toMovieListPage()}>
        <Icon type="home" />
      </Link>
    </Breadcrumb.Item>
  );
});
