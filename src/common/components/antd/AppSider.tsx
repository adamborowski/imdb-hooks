import styled from 'styled-components';
import { SiderProps } from 'antd/es/layout';
import * as React from 'react';
import { ComponentType, HTMLProps, ReactNode } from 'react';
import { Layout } from 'antd';
import withSublimeScrollbar from './withStyledScrollbar';

interface IProps extends SiderProps {
  logo?: ReactNode;
  content?: ReactNode;
}

const { Sider } = Layout;

const Scroll = withSublimeScrollbar()((p: HTMLProps<HTMLDivElement>) => (
  <div {...p} />
));

function AppSider(props: IProps) {
  const { logo, content, ...rest } = props;

  return (
    <Sider
      trigger={undefined}
      collapsible
      width={256}
      breakpoint="md"
      {...rest}
    >
      <div className="sider-header">{logo}</div>
      <Scroll className="sider-content">{content}</Scroll>
    </Sider>
  );
}
export default styled(AppSider)`
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  color: #ffffff;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
  .sider-header {
    height: 64px;
    line-height: 64px;
    background: #002140;
    overflow: hidden;
    flex-shrink: 0;
  }
  .sider-content {
    overflow: auto;
    flex-shrink: 1;
  }
` as ComponentType<IProps>;
