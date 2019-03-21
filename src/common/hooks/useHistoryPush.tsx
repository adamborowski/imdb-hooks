import {LocationDescriptor} from 'history';
import {stringify} from 'querystring';
import _ from 'lodash';
import {Link, LinkProps} from 'react-router-dom';
import React, {ComponentType, FunctionComponent} from 'react';
import {getLocationDescriptionObject} from '../misc/getLocationDescriptionObject';
import {useQueryParams, useRouter} from './routing';

export const getDescriptor = (to: LocationDescriptor, currentQueryParams?: object, queryParams?: object) => {
  const locationDescription = getLocationDescriptionObject(to);
  return { ...locationDescription, search: stringify(_.omitBy({ ...currentQueryParams, ...queryParams }, _.isEmpty)) };
};

export const useHistoryPush = () => {
  const currentQueryParams = useQueryParams();
  const history = useRouter().history;
  return (to: LocationDescriptor, queryParams?: object) => {
    history.push(getDescriptor(to, currentQueryParams, queryParams));
  };
};

interface EnhanceProps {
  queryParams?: object;
}
interface PassProps {
  to: LinkProps['to'];
}

export interface QueryLinkProps extends EnhanceProps, PassProps {}

export const withQueryLink = <P extends PassProps>(
  InnerComponent: ComponentType<P>
): FunctionComponent<QueryLinkProps> => props => {
  const currentQueryParams = useQueryParams();
  const { to, queryParams, ...rest } = props as QueryLinkProps;

  return <InnerComponent to={getDescriptor(to, currentQueryParams, queryParams)} {...rest as P} />;
};

export const QueryLink = withQueryLink(Link);
