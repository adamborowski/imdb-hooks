import React, {ReactElement} from 'react';
import styled from 'styled-components';

interface IProps {
  primaryContent?: ReactElement<any>;
  secondaryContent?: ReactElement<any>;
}

const ContentLayout = ({
  secondaryContent,
  primaryContent,
  ...rest
}: IProps) => (
  <div {...rest}>
    {primaryContent}
    {secondaryContent}
  </div>
);

export default styled(ContentLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
