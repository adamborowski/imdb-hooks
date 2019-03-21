import styled from 'styled-components';
import React from 'react';

export default <P>(c: React.ComponentType<P>) => styled(c).attrs(
  // @ts-ignore
  {
    suppressClassNameWarning: true
  }
)`
  .certain-category-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix {
    right: 12px;
  }

  .ant-select-dropdown-menu-item-group-title {
    color: #666;
    font-weight: bold;
  }

  .ant-select-dropdown-menu-item-group {
    border-bottom: 1px solid #f6f6f6;
  }

  .ant-select-dropdown-menu-item {
    padding-left: 16px;
  }

  .ant-select-dropdown-menu-item.show-all {
    text-align: center;
    cursor: default;
  }

  .ant-select-dropdown-menu {
    max-height: 75vh;
  }

  .certain-search-item-count {
    position: absolute;
    color: #999;
    right: 16px;
  }

  .certain-category-search.ant-select-focused .certain-category-icon {
    color: #108ee9;
  }

  .certain-category-icon {
    color: #6e6e6e;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 16px;
  }

  .search-context-item {
    em {
      color: #108ee9;
      font-weight: bold;
      font-style: normal;
    }
  }
`;
