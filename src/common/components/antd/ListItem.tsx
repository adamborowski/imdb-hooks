import {List} from 'antd';
import styled from 'styled-components';
import {ComponentType, MouseEvent} from 'react';
import {ListItemProps} from 'antd/es/list';
import {withQueryLink} from '../../hooks/useHistoryPush';
import withLink from '../../withLink';

export const ListItem = styled(List.Item)`
  cursor: pointer;
  &:hover {
    background: #fcfcfc;
  }
`;

export const ListItemLink = withQueryLink(
  withLink(ListItem as ComponentType<
    ListItemProps & { onClick?: (event: MouseEvent<any>) => void | null }
  >)
);
