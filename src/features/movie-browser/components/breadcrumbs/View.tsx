import {toMovieViewPage} from '../../routing';
import {fixBreadcrumb} from '../../../../common/workarounds';
import React from 'react';
import {BreadcrumbItem} from '../../../../common/components/antd/BreadcrumbItem';
import {QueryLink} from '../../../../common/hooks/useHistoryPush';
import {detailsAspect} from '../../aspects';
import {IMovie} from '../../types/state';

type ViewPureProps = { loading: boolean; movieId?: number; result?: IMovie };

export const ViewPure = fixBreadcrumb(({ loading, movieId, result }: ViewPureProps) => (
  <BreadcrumbItem loading={loading}>
    <QueryLink to={toMovieViewPage((movieId || '').toString())}>{result && result.title}</QueryLink>
  </BreadcrumbItem>
));

const List = () => {
  const { loading, result } = detailsAspect.useDetails();
  const movieId = detailsAspect.useDetailsId();

  return <ViewPure loading={loading} movieId={movieId} result={result} />;
};

export default fixBreadcrumb(List);
