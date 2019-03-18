import { ContentLayout, DefaultPrimaryContent } from '../../../../../common/components/antd';
import React, { useCallback, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import List from '../../breadcrumbs/List';
import { Home } from '../../../../../common/components/breadcrumbs/Home';
import { useMovieId } from '../../../routing';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { movieDetailsFetch } from '../../../state/actions';
import View from '../../breadcrumbs/View';
import { IState } from '../../../../../common/types/state';
import { selectMovieDetails } from '../../../state/selectors';
import MovieViewPure from './MovieViewPure';

const Watcher = () => {
  const movieId = useMovieId();
  const dispatch = useDispatch();

  useEffect(() => {
    movieId && dispatch(movieDetailsFetch({ id: movieId }));
  }, [movieId]);

  return null;
};

const MovieView = () => {
  const mapState = useCallback((state: IState) => selectMovieDetails(state), []);
  const { loading, result } = useMappedState(mapState);

  return <MovieViewPure loading={loading} entity={result} />;
};

export default () => (
  <>
    <Watcher />
    <ContentLayout
      key="layout"
      primaryContent={
        <DefaultPrimaryContent
          title="Movies"
          breadcrumbs={
            <Breadcrumb>
              <Home />
              <List />
              <View />
            </Breadcrumb>
          }
          content={<MovieView />}
        />
      }
    />
  </>
);
