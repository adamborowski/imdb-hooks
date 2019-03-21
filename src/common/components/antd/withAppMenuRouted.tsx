/**
 * The aim of this HOC is to provide valid menu subtree together with two critical Menu properties:
 * selectedKeys and openKeys - based on actual location and route matching.
 *
 * It consumes menuConfiguration and location.
 * It produces menuNodes and selectedNodes.
 *
 * There is no way to configure specific menu item with react-router. Instead, all routes have to be processed using react-router's matchPath function.
 */

import {Icon, Menu} from 'antd';
import React, {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {getSelectedPaths, IMenuItem} from '../../misc/getSelectedPaths';
import {HOCInnerType, HOCOuterType} from '../../misc/hoc';
import {useRouter} from '../../hooks/routing';

export interface IEnhanceProps {
  menuConfiguration: IMenuItem[];
  renderer?: MenuItemRenderer;
}
export interface IInjectProps {
  menuNodes: JSX.Element[];
  selectedNodes: string[];
}

export type MenuItemRenderer = (item: IMenuItem) => ReactNode;

const createMenuNodes = (
  menuItems: IMenuItem[],
  keyPrefix: string = '',
  renderer: MenuItemRenderer
): JSX.Element[] =>
  menuItems.map(m => {
    const key = keyPrefix + m.link;
    const label = (
      <>
        {m.icon && <Icon type={m.icon} />}
        <span>{m.label}</span>
      </>
    );
    return m.children ? (
      <Menu.SubMenu title={label} key={key}>
        {createMenuNodes(m.children, key + '.', renderer)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={key}>{renderer(m)}</Menu.Item>
    );
  });

const withAntdFix = <P extends IInjectProps>(
  InnerComponent: HOCInnerType<P>
): HOCOuterType<P, IInjectProps, IEnhanceProps> => props => {
  const { location } = useRouter();
  const {
    menuConfiguration,
    renderer,
    ...rest
  } = (props as unknown) as IEnhanceProps;

  const menuNodes = createMenuNodes(
    menuConfiguration,
    undefined,
    renderer ||
      (m => (
        <Link to={m.path}>
          {m.icon && <Icon type={m.icon} />}
          <span>{m.label}</span>
        </Link>
      ))
  );
  const selectedNodes: string[] = getSelectedPaths(
    location,
    menuConfiguration
  ).filter(s => s !== undefined) as string[];

  return (
    <InnerComponent
      selectedNodes={selectedNodes}
      menuNodes={menuNodes}
      {...rest as P}
    />
  );
};
export default withAntdFix;
