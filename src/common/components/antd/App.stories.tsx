import React from 'react';
import App from './App';
import {MemoryRouter} from 'react-router';
import {Breadcrumb, Button, Tabs} from 'antd';
import logo from './__stories__/AppSider.logo.png';
import {ThemeProvider} from 'styled-components';
import baseTheme from './app-theme';
import {storiesOf} from '../../storybook-utils';
import DefaultAppHeader from './DefaultAppHeader';
import {IMenuItem} from '../../misc/getSelectedPaths';
import DefaultAppLogo from './DefaultAppLogo';
import AppMenu from './AppMenu';
import AppSider from './AppSider';
import DefaultPrimaryContent from './DefaultPrimaryContent';
import DefaultSecondaryContent from './DefaultSecondaryContent';
import ContentLayout from './ContentLayout';

const breadcrumbs = (
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>Demo</Breadcrumb.Item>
    <Breadcrumb.Item>Page</Breadcrumb.Item>
  </Breadcrumb>
);
const tools = (
  <>
    <Button.Group>
      <Button>Toolbar</Button>
      <Button>Button</Button>
      <Button icon="edit" />
      <Button icon="save" />
    </Button.Group>
  </>
);
let tabs = (
  <Tabs activeKey="active">
    <Tabs.TabPane key="active" tab="Options" />
    <Tabs.TabPane tab="Foo" />
    <Tabs.TabPane tab="Bar" />
  </Tabs>
);
let menu = (
  <AppMenu
    menuConfiguration={
      [
        {
          link: '/a',
          path: '/a',
          label: 'Movies',
          icon: 'play-circle'
        },
        {
          link: '/b',
          path: '/b',
          label: 'People',
          icon: 'user'
        }
      ] as IMenuItem[]
    }
  />
);
storiesOf(module).add('with default children', () => (
  <MemoryRouter initialEntries={[{ pathname: '/a' }]}>
    <ThemeProvider theme={baseTheme}>
      <App
        sider={
          <AppSider
            content={menu}
            logo={<DefaultAppLogo logo={logo}>My UI</DefaultAppLogo>}
          />
        }
        content={
          <ContentLayout
            primaryContent={
              <DefaultPrimaryContent
                breadcrumbs={breadcrumbs}
                tools={tools}
                title="An useful page"
                content={<p>A primary content goes here</p>}
                tabs={tabs}
              />
            }
            secondaryContent={
              <DefaultSecondaryContent>
                <p>
                  Secondary content should have proper margin applied. It also
                  should have various flexbox and overflow css properties
                  configured.
                </p>
              </DefaultSecondaryContent>
            }
          />
        }
        header={<DefaultAppHeader />}
        modals={null}
      />
    </ThemeProvider>
  </MemoryRouter>
));
