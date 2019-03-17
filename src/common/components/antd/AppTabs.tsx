import React from 'react';
import {Icon, Tabs} from 'antd';
import {getSelectedPaths, HOCInnerType, HOCOuterType2, IMenuItem, useRouter} from '../../misc';
import {History, LocationDescriptor} from 'history';

export interface IEnhanceProps {
  menuConfiguration: IMenuItem[];
  onMenuSelect: (to: LocationDescriptor) => void;
}

export interface IInjectProps {
  activeKey?: string;
  onChange?: (activeKey: string) => void;
}
const createMenuNodes = (menuItems: IMenuItem[]): JSX.Element[] =>
  menuItems.map(m => {
    return (
      <Tabs.TabPane
        key={m.link}
        tab={
          <>
            {m.icon && <Icon type={m.icon} />}
            <span>{m.label}</span>
          </>
        }
      />
    );
  });

const withRoutedTabs = <P extends IInjectProps>() => (
  InnerComponent: HOCInnerType<P>
): HOCOuterType2<P, IInjectProps, IEnhanceProps> => props => {
  const route = useRouter();

  const {
    menuConfiguration,
    onMenuSelect,
    ...rest
  } = (props as unknown) as IEnhanceProps;
  const menuNodes = createMenuNodes(menuConfiguration);
  const selectedNodes: string[] = getSelectedPaths(
    route.location,
    menuConfiguration
  ).filter(s => s !== undefined) as string[];

  return (
    <InnerComponent
      activeKey={selectedNodes[0]}
      children={menuNodes}
      onChange={activeKey => {
        const activeMenuItem = menuConfiguration.find(
          s => s.path === activeKey
        );
        if (activeMenuItem) {
          onMenuSelect(activeMenuItem.link);
        }
      }}
      {...rest as P}
    />
  );
};

export default withRoutedTabs;
