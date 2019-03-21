import {ContentLayout, DefaultPrimaryContent, DefaultSecondaryContent} from '../../../../../common/components/antd';
import React, {useMemo} from 'react';
import {Breadcrumb, Button, Tooltip, Typography} from 'antd';
import List from '../../breadcrumbs/List';
import {Home} from '../../../../../common/components/breadcrumbs/Home';
import View from '../../breadcrumbs/View';
import MovieViewPure from './PersonViewPure';
import {InlineSpinner} from '../../../../../common/components/InlineSpinner';
import {detailsAspect} from '../../../aspects';
import {IPerson} from '../../../types/state';
import {Bio} from './Bio';
import {RoutedTabs} from '../../../../../common/components/antd/AppTabs';
import {toPersonMovies, toPersonViewPage, usePersonId} from '../../../routing';
import {IMenuItem} from '../../../../../common/misc';
import {useHistoryPush} from '../../../../../common/hooks/useHistoryPush';
import {Route, Switch} from 'react-router';
import {Movies} from './Movies';

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
        <Tooltip title="View person homepage">
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

  const { name, also_known_as, known_for_department } = result || ({} as Partial<IPerson>);

  return loading ? (
    <InlineSpinner />
  ) : (
    <>
      {name}{' '}
      <small>
        <em>
          <Typography.Text type="secondary">({known_for_department})</Typography.Text>
        </em>
      </small>
    </>
  );
};

const ConnectedTabs = () => {
  const personId = String(usePersonId());
  const historyPush = useHistoryPush();
  const menuConfiguration = useMemo(
    () =>
      [
        {
          path: toPersonViewPage(personId),
          label: 'Bio',
          link: toPersonViewPage(personId),
          icon: 'user',
          exact: true
        },
        {
          path: toPersonMovies(personId),
          label: 'Movies',
          link: toPersonMovies(personId),
          icon: 'caret-right'
        }
      ] as IMenuItem[],
    [personId]
  );
  return <RoutedTabs menuConfiguration={menuConfiguration} onMenuSelect={historyPush} />;
};

const TabContent = () => {
  const personId = String(usePersonId());

  return (
    <Switch>
      <Route path={toPersonViewPage(personId)} exact component={Bio} />
      <Route path={toPersonMovies(personId)} exact component={Movies} />
    </Switch>
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
          tabs={<ConnectedTabs />}
        />
      }
      secondaryContent={
        <DefaultSecondaryContent>
          <TabContent />
        </DefaultSecondaryContent>
      }
    />
  </>
);
