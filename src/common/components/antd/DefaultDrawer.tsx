import KeyboardEventHandler from 'react-keyboard-event-handler';

import React, { ReactNode } from 'react';
import { Drawer } from 'antd';

export interface IProps {
  drawerOpened: boolean;
  onDrawerClose: () => void;
  children: ReactNode;
}

const DefaultDrawer = (props: IProps) => {
  const { drawerOpened, onDrawerClose, ...rest } = props;

  return (
    <>
      <KeyboardEventHandler
        isDisabled={!drawerOpened}
        handleKeys={['esc']}
        onKeyEvent={onDrawerClose}
      />
      <Drawer
        placement="right"
        destroyOnClose
        style={{ margin: 0 }}
        visible={drawerOpened}
        onClose={onDrawerClose}
        maskClosable
        closable={false}
        {...rest}
      />
    </>
  );
};

export default DefaultDrawer;
