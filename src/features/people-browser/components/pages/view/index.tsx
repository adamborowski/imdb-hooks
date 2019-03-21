import {ContentLayout, DefaultPrimaryContent} from '../../../../../common/components/antd';
import React from 'react';
import {Breadcrumb, Button, Tooltip} from 'antd';
import List from '../../breadcrumbs/List';
import {Home} from '../../../../../common/components/breadcrumbs/Home';
import View from '../../breadcrumbs/View';
import MovieViewPure from './PersonViewPure';
import {InlineSpinner} from '../../../../../common/components/InlineSpinner';
import {detailsAspect} from '../../../aspects';
import {IPerson} from '../../../types/state';

const MovieView = () => {
  const { loading, result } = detailsAspect.useDetails();

  return <MovieViewPure loading={loading} entity={result} />;
};

const Toolbar = () => {
  const { result } = detailsAspect.useDetails();
  const { homepage } = result || ({} as Partial<IPerson>);

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

  const { name, also_known_as } = result || ({} as Partial<IPerson>);

  return loading ? (
    <InlineSpinner />
  ) : (
    <>
      {name}
      {also_known_as && also_known_as.length && (
        <small title={'original title'} style={{ float: 'right', fontWeight: 'normal' }}>
          <em>{also_known_as.join(', ')}</em>
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
