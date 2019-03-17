import styled from 'styled-components';
import React from 'react';

export default <P>(c: React.ComponentType<P>) => styled(c)`
  background: #fdfdfd;
  padding-left: ${p => p.theme.layout.main.margin}px;
  padding-right: ${p => p.theme.layout.main.margin}px;

  border-bottom: 1px solid #e8e8e8;
  flex-shrink: 0; // primary content never shrinks in a flex layout

  .navigation {
    margin-top: 26px;
    margin-bottom: 26px;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 32px; // do not jump the screen when toolbar presence changes
    > *:not(:last-child) {
      margin-right: 10px;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 22px;
  }

  .tabs {
    .ant-tabs-bar {
      margin: 0;
      border-bottom-color: transparent;
    }
    .ant-tabs-nav .ant-tabs-tab-active {
      font-weight: 400;
    }
  }

  & > :last-child:not(.tabs) {
    // we need some margin at the bottom unless we have toolbar which sticks to the edge
    margin-bottom: 26px;
  }
`;
