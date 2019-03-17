import {
  // @ts-ignore
  __RouterContext as RouterContext,
  RouteComponentProps
} from 'react-router-dom';
import { useContext, useMemo } from 'react';
// @ts-ignore
import { parse, stringify } from 'querystringify';
import _ from 'lodash';
import { History, LocationDescriptorObject } from 'history';

export const useRouter = (): RouteComponentProps => useContext(RouterContext);

type QueryParams = { [key: string]: string };

export const useQueryParams = (): QueryParams => {
  const router = useRouter();
  return useMemo(() => parse(router.location.search) as QueryParams, [
    router.location.search
  ]);
};

export const useRouteParams = () =>
  useRouter().match.params as { [key: string]: string };

export const useSetQueryParams = () => {
  const history = useRouter().history;

  return (params: { [key: string]: string | undefined }) => {
    history.push({
      ...getLocationDescriptionObject(history.location),
      search: stringify(
        _.omitBy({ ...parse(history.location.search), ...params }, _.isNil)
      )
    });
  };
};

export const getLocationDescriptionObject = (
  to: History.LocationDescriptor
): LocationDescriptorObject => (typeof to === 'string' ? { pathname: to } : to);
