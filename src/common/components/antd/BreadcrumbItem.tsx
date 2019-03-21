import {BreadcrumbItemProps} from 'antd/es/breadcrumb';
import React, {FunctionComponent} from 'react';
import {Breadcrumb} from 'antd';
import {InlineSpinner} from '../InlineSpinner';

interface Props extends BreadcrumbItemProps {
  loading?: boolean;
}

const LazyBreadcrumbItem: FunctionComponent<Props> = ({ children, loading, ...rest }) => (
  <Breadcrumb.Item {...rest}>{loading ? <InlineSpinner /> : children}</Breadcrumb.Item>
);

export const BreadcrumbItem = LazyBreadcrumbItem;
