import { toPersonViewPage } from '../../routing';
import { fixBreadcrumb } from '../../../../common/workarounds';
import React from 'react';
import { BreadcrumbItem } from '../../../../common/components/antd/BreadcrumbItem';
import { QueryLink } from '../../../../common/hooks/useHistoryPush';
import { detailsAspect } from '../../aspects';
import { IPerson } from '../../types/state';

type ViewPureProps = { loading: boolean; personId?: number; result?: IPerson };

export const ViewPure = fixBreadcrumb((props: ViewPureProps) => (
  <BreadcrumbItem loading={props.loading}>
    <QueryLink to={toPersonViewPage((props.personId || '').toString())}>{props.result && props.result.name}</QueryLink>
  </BreadcrumbItem>
));

const List = () => {
  const { loading, result } = detailsAspect.useDetails();
  const personId = detailsAspect.useDetailsId();

  return <ViewPure loading={loading} personId={personId} result={result} />;
};

export default fixBreadcrumb(List);
