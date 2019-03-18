import {toMovieListPage, useMovieSearchValue} from '../../routing';
import {Icon} from 'antd';
import {fixBreadcrumb} from '../../../../common/workarounds';
import React from 'react';
import {BreadcrumbItem} from '../../../../common/components/antd/BreadcrumbItem';
import {QueryLink} from '../../../../common/hooks/useHistoryPush';

const List = () => {
  const searchValue = useMovieSearchValue();

  return (
    <>
      <BreadcrumbItem>
        <QueryLink to={toMovieListPage()} queryParams={{ movies: undefined }}>
          Movies
        </QueryLink>
      </BreadcrumbItem>
      {searchValue && (
        <BreadcrumbItem>
          <QueryLink to={toMovieListPage()}>
            <Icon type="search" style={{ marginRight: 5 }} />
            {searchValue}
          </QueryLink>
        </BreadcrumbItem>
      )}
    </>
  );
};

export default fixBreadcrumb(List);
