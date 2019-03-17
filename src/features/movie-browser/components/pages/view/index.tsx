import { ContentLayout, DefaultPrimaryContent } from '../../../../../common/components/antd';
import React from 'react';
import { Breadcrumb } from 'antd';
import List from '../../breadcrumbs/List';
import {Home} from '../../../../../common/components/breadcrumbs/Home';

export default () => (
  <ContentLayout
    primaryContent={
      <DefaultPrimaryContent
        title="Movies"
        breadcrumbs={
          <Breadcrumb>
            <Home />
            <List />
          </Breadcrumb>
        }
      />
    }
  />
);
