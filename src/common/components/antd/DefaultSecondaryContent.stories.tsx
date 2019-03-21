import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
import baseTheme from './app-theme';
import { boolean } from '@storybook/addon-knobs';
import _ from 'lodash';
import { storiesOf } from '../../storybook-utils';
import DefaultSecondaryContent from './DefaultSecondaryContent';
import DefaultPrimaryContent from './DefaultPrimaryContent';

const breadcrumbs = (
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>Demo</Breadcrumb.Item>
    <Breadcrumb.Item>Page</Breadcrumb.Item>
  </Breadcrumb>
);

storiesOf(module)
  .addDecorator(story => <ThemeProvider theme={baseTheme}>{story() as any}</ThemeProvider>)
  .addDecorator(story => <Layout style={{ height: '100vh' }}>{story()}</Layout>)
  .add('default', () => <DefaultSecondaryContent>A content goes here</DefaultSecondaryContent>)
  .add('with primary content on the top, stretched', () => (
    <>
      <DefaultPrimaryContent title="Primary content" breadcrumbs={breadcrumbs} />
      <DefaultSecondaryContent>
        <p>
          Secondary content should have proper margin applied. It also should have various flexbox and overflow css
          properties configured.
        </p>
        {_.times(boolean('lots of content', false) ? 10 : 1, () => (
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?
          </p>
        ))}
      </DefaultSecondaryContent>
    </>
  ));
