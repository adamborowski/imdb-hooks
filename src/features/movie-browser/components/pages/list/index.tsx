import {ContentLayout, DefaultPrimaryContent, DefaultSecondaryContent} from '../../../../../common/components/antd';
import React from 'react';
import {Breadcrumb} from 'antd';
import {Home} from '../../../../../common/components/breadcrumbs/Home';
import List from '../../breadcrumbs/List';
import {MovieList} from './MovieList';
import {Title} from './Title';
import {Toolbar} from './Toolbar';

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
