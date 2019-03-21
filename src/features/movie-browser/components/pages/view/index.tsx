import {ContentLayout, DefaultPrimaryContent} from '../../../../../common/components/antd';
import React, {useCallback} from 'react';
import {Breadcrumb, Button, Tooltip} from 'antd';
import List from '../../breadcrumbs/List';
import {Home} from '../../../../../common/components/breadcrumbs/Home';
import {useMappedState} from 'redux-react-hook';
import View from '../../breadcrumbs/View';
import {IState} from '../../../../../common/types/state';
import {selectMovieDetails} from '../../../state/selectors';
import MovieViewPure from './MovieViewPure';
import {InlineSpinner} from '../../../../../common/components/InlineSpinner';
import {detailsAspect} from '../../../aspects';
import {IMovie} from '../../../types/state';

const MovieView = () => {
  const { loading, result } = detailsAspect.useDetails();

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
  const { loading, result } = detailsAspect.useDetails();

  const { title, original_title } = result as Partial<IMovie>;

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
    <detailsAspect.DetailsFetcher />
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
