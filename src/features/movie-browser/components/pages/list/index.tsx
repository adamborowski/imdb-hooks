import {ContentLayout, DefaultPrimaryContent, DefaultSecondaryContent} from '../../../../../common/components/antd';
import React from 'react';
import {Breadcrumb} from 'antd';
import {Home} from '../../../../../common/components/breadcrumbs/Home';
import List from '../../breadcrumbs/List';
import {SecondaryContent} from './SecondaryContent';
import {Title} from './Title';

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
        />
      }
      secondaryContent={
        <DefaultSecondaryContent>
          <SecondaryContent />
        </DefaultSecondaryContent>
      }
    />
  </>
);
