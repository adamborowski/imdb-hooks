import {toMovieViewPage} from '../../routing';
import {fixBreadcrumb} from '../../../../common/workarounds';
import React from 'react';
import {BreadcrumbItem} from '../../../../common/components/antd/BreadcrumbItem';
import {QueryLink} from '../../../../common/hooks/useHistoryPush';
import {detailsAspect} from '../../aspects';

const List = () => {
  const { loading, result } = detailsAspect.useDetails();
  const movieId = detailsAspect.useDetailsId();

  return (
    <BreadcrumbItem loading={loading}>
      <QueryLink to={toMovieViewPage((movieId || '').toString())}>{result && result.title}</QueryLink>
    </BreadcrumbItem>
  );
};

export default fixBreadcrumb(List);
