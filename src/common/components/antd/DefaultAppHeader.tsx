import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export default styled.div`
  height: 64px;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  padding-left: 12px;
  padding-right: 12px;

  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 3;

  > *:not(:last-child) {
    margin-right: 10px;
  }
`;
