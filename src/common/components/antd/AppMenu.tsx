import {MenuProps} from 'antd/es/menu';
import React, {FunctionComponent} from 'react';
import {Menu} from 'antd';
import withAntdFix from './withAppMenuRouted';

interface IProps extends MenuProps {
  menuNodes: JSX.Element[];
  selectedNodes: string[];
}
const AppMenu: FunctionComponent<IProps> = ({
  menuNodes,
  selectedNodes,
  ...rest
}) => (
  <Menu theme="dark" mode="inline" selectedKeys={selectedNodes} {...rest}>
    {menuNodes}
  </Menu>
);
export default withAntdFix(AppMenu);
