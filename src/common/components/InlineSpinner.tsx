import { Spin } from 'antd';
import React from 'react';

export const InlineSpinner = () => (
  <>
    <Spin size="small" style={{ position: 'absolute', margin: 'auto' }} />
    <span style={{ width: 14, display: 'inline-block' }} />
  </>
);
