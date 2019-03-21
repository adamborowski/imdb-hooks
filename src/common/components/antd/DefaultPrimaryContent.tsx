import React, { ComponentType, ReactNode } from 'react';
import withStyled from './DefaultPrimaryContent.styled';
import { HBox, Spacer, VBox } from './layout';

interface IProps {
  breadcrumbs?: ReactNode;
  tools?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
  tabs?: ReactNode;
}

const DefaultPrimaryContent = ({ breadcrumbs, tools, title, content, tabs, ...rest }: IProps) => (
  <VBox {...rest}>
    {(breadcrumbs || tools) && (
      <HBox className="navigation">
        {breadcrumbs}
        <Spacer />
        {tools}
      </HBox>
    )}
    {title && <div className="title">{title}</div>}
    {content && <div className="content">{content}</div>}
    {tabs && <div className="tabs">{tabs}</div>}
  </VBox>
);

export default withStyled(DefaultPrimaryContent) as ComponentType<IProps>;
