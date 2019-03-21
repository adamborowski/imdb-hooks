import React, { ComponentType, FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { LayoutProps } from 'antd/es/layout';
import AppSider from './AppSider';

export interface AppProps extends Partial<LayoutProps> {
  sider: ReactNode;
  header: ReactNode;
  content: ReactNode;
  modals?: ReactNode;
}

const AppPure: FunctionComponent<AppProps> = ({ sider, header, content, modals, ...rest }) => (
  <Layout {...rest}>
    {sider}
    <Layout id="content-portal-container">
      {header}
      {content}
    </Layout>
    {modals}
  </Layout>
);

export default styled(AppPure)`
  height: 100vh;
  #content-portal-container {
    position: relative;
  }
  ${(AppSider as unknown) as string /* https://github.com/styled-components/webstorm-styled-components/issues/58 */} {
    z-index: 10;
  }
` as ComponentType<AppProps>;
