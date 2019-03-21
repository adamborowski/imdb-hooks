import {toMovieListPage} from '../../routing';
import {Icon} from 'antd';
import {fixBreadcrumb} from '../../../../common/workarounds';
import React from 'react';
import {BreadcrumbItem} from '../../../../common/components/antd/BreadcrumbItem';
import {QueryLink} from '../../../../common/hooks/useHistoryPush';
import {listAspect} from '../../aspects';

const List = () => {
  const searchValue = listAspect.useSearchValue();

  return (
    <>
      <BreadcrumbItem>
        <QueryLink to={toMovieListPage()} queryParams={{ [listAspect.searchParam]: undefined }}>
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
