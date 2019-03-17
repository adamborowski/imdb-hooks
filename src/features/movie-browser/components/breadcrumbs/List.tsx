import { toMovieListPage, useMovieSearchValue } from '../../routing';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { fixBreadcrumb } from '../../../../common/workarounds';
import React from 'react';
import { BreadcrumbItem } from '../../../../common/components/antd/BreadcrumbItem';

const ScopedLink = Link; // TODO create ScopedLink that accept query the same way as hooks do
const List = () => {
  const searchValue = useMovieSearchValue();

  return (
    <>
      <BreadcrumbItem>
        <ScopedLink
          to={toMovieListPage()}
          //params={movies:undefined}
        >
          Movies
        </ScopedLink>
      </BreadcrumbItem>
      {searchValue && (
        <BreadcrumbItem>
          <ScopedLink to={toMovieListPage()}>
            <Icon type="search" style={{ marginRight: 5 }} />
            {searchValue}
          </ScopedLink>
        </BreadcrumbItem>
      )}
    </>
  );
};

export default fixBreadcrumb(List);
