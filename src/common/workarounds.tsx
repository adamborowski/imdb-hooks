import React, { ComponentType } from 'react';

export function fixBreadcrumb<T>(component: T): T {
  (component as any).__ANT_BREADCRUMB_ITEM = true; // fix for 'Breadcrumb only accepts Breadcrumb.Item as it\'s children' error
  return component;
}

/**
 * As we can't use React hooks in Storybook render method, we have a factory function which we pass function component.
 * It will create a render function rendering this component.
 * @param Component
 */
export const renderComponent = (Component: ComponentType) => () => <Component />;
