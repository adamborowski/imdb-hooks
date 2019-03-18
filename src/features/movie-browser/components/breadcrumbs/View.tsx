import {toMovieViewPage, useMovieId} from '../../routing';
import {fixBreadcrumb} from '../../../../common/workarounds';
import React, {useCallback} from 'react';
import {BreadcrumbItem} from '../../../../common/components/antd/BreadcrumbItem';
import {selectMovieDetails} from '../../state/selectors';
import {IState} from '../../../../common/types/state';
import {useMappedState} from 'redux-react-hook';
import {QueryLink} from '../../../../common/hooks/useHistoryPush';

const List = () => {
  const movieId = useMovieId();
  const mapState = useCallback((state: IState) => selectMovieDetails(state), []);
  const { loading, result } = useMappedState(mapState);

  return (
    <BreadcrumbItem loading={loading}>
      <QueryLink to={toMovieViewPage((movieId || '').toString())}>{result && result.title}</QueryLink>
    </BreadcrumbItem>
  );
};

export default fixBreadcrumb(List);
