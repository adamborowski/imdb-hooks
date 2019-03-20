import {ContentLayout, DefaultPrimaryContent} from '../../../../../common/components/antd';
import React, {useCallback, useEffect} from 'react';
import {Breadcrumb, Button, Tooltip} from 'antd';
import List from '../../breadcrumbs/List';
import {Home} from '../../../../../common/components/breadcrumbs/Home';
import {useMovieId} from '../../../routing';
import {useDispatch, useMappedState} from 'redux-react-hook';
import {movieDetailsFetch} from '../../../state/actions';
import View from '../../breadcrumbs/View';
import {IState} from '../../../../../common/types/state';
import {selectMovieDetails} from '../../../state/selectors';
import MovieViewPure from './MovieViewPure';
import {InlineSpinner} from '../../../../../common/components/InlineSpinner';

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

const Toolbar = () => {
  const mapState = useCallback((state: IState) => {
    const result = selectMovieDetails(state).result;
    return result && result.homepage;
  }, []);
  const homepage = useMappedState(mapState);

  return (
    <>
      {homepage && (
        <Tooltip title="View movie homepage">
          <a href={homepage} target="_blank">
            <Button icon="export" />
          </a>
        </Tooltip>
      )}
    </>
  );
};

const MovieTitle = () => {
  const mapState = useCallback((state: IState) => {
    const movie = selectMovieDetails(state).result;
    const loading = selectMovieDetails(state).loading;
    return { title: movie && movie.title, original_title: movie && movie.original_title, loading };
  }, []);
  const { loading, title, original_title } = useMappedState(mapState);

  return loading ? (
    <InlineSpinner />
  ) : (
    <>
      {title}
      {original_title !== title && (
        <small title={'original title'} style={{ float: 'right', fontWeight: 'normal' }}>
          <em>{original_title}</em>
        </small>
      )}
    </>
  );
};

export default () => (
  <>
    <Watcher />
    <ContentLayout
      key="layout"
      primaryContent={
        <DefaultPrimaryContent
          title={<MovieTitle />}
          breadcrumbs={
            <Breadcrumb>
              <Home />
              <List />
              <View />
            </Breadcrumb>
          }
          content={<MovieView />}
          tools={<Toolbar />}
        />
      }
    />
  </>
);
