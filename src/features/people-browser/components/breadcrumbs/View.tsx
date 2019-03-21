import {toPersonViewPage} from '../../routing';
import {fixBreadcrumb} from '../../../../common/workarounds';
import React from 'react';
import {BreadcrumbItem} from '../../../../common/components/antd/BreadcrumbItem';
import {QueryLink} from '../../../../common/hooks/useHistoryPush';
import {detailsAspect} from '../../aspects';

const List = () => {
  const { loading, result } = detailsAspect.useDetails();
  const personId = detailsAspect.useDetailsId();

  return (
    <BreadcrumbItem loading={loading}>
      <QueryLink to={toPersonViewPage((personId || '').toString())}>{result && result.name}</QueryLink>
    </BreadcrumbItem>
  );
};

export default fixBreadcrumb(List);
