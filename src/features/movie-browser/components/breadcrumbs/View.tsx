import { toMovieListPage, toMovieViewPage, useMovieId, useMovieSearchValue } from '../../routing';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { fixBreadcrumb } from '../../../../common/workarounds';
import React, { useCallback } from 'react';
import { BreadcrumbItem } from '../../../../common/components/antd/BreadcrumbItem';
import { selectMovieDetails } from '../../state/selectors';
import { IState } from '../../../../common/types/state';
import { useMappedState } from 'redux-react-hook';

const ScopedLink = Link; // TODO create ScopedLink that accept query the same way as hooks do
const List = () => {
  const searchValue = useMovieSearchValue();
  const movieId = useMovieId();

  const mapState = useCallback((state: IState) => selectMovieDetails(state), []);
  const { loading, result } = useMappedState(mapState);

  return (
    <>
      {searchValue && (
        <BreadcrumbItem loading={loading}>
          <ScopedLink to={toMovieViewPage((movieId || '').toString())}>{result && result.title}</ScopedLink>
        </BreadcrumbItem>
      )}
    </>
  );
};

export default fixBreadcrumb(List);
