import React from 'react';
import { Breadcrumb } from 'antd';
import { Home } from '../../../../../common/components/breadcrumbs/Home';
import List from '../../breadcrumbs/List';
import { MovieList } from './MovieList';
import { Title } from './Title';
import { Toolbar } from './Toolbar';
import ContentLayout from '../../../../../common/components/antd/ContentLayout';
import DefaultPrimaryContent from '../../../../../common/components/antd/DefaultPrimaryContent';
import DefaultSecondaryContent from '../../../../../common/components/antd/DefaultSecondaryContent';

export default () => (
  <>
    <ContentLayout
      key="layout"
      primaryContent={
        <DefaultPrimaryContent
          title={<Title />}
          breadcrumbs={
            <Breadcrumb>
              <Home />
              <List />
            </Breadcrumb>
          }
          tools={<Toolbar />}
        />
      }
      secondaryContent={
        <DefaultSecondaryContent>
          <MovieList />
        </DefaultSecondaryContent>
      }
    />
  </>
);
