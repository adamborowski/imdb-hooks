import React from 'react';
import {Breadcrumb, Button, Tooltip} from 'antd';
import List from '../../breadcrumbs/List';
import {Home} from '../../../../../common/components/breadcrumbs/Home';
import View from '../../breadcrumbs/View';
import MovieViewPure from './MovieViewPure';
import {InlineSpinner} from '../../../../../common/components/InlineSpinner';
import {detailsAspect} from '../../../aspects';
import {IMovie} from '../../../types/state';
import ContentLayout from '../../../../../common/components/antd/ContentLayout';
import DefaultPrimaryContent from '../../../../../common/components/antd/DefaultPrimaryContent';

const MovieView = () => {
  const { loading, result } = detailsAspect.useDetails();

  return <MovieViewPure loading={loading} entity={result} />;
};

const Toolbar = () => {
  const { result } = detailsAspect.useDetails();
  const { homepage } = result || ({} as Partial<IMovie>);

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

  const { title, original_title } = result || ({} as Partial<IMovie>);

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
