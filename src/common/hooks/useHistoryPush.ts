import { History, LocationDescriptor, LocationDescriptorObject } from 'history';
import { stringify } from 'querystring';
import { useQueryParams, useRouter } from '../misc';
import _ from 'lodash';

export const getLocationDescriptionObject = (to: History.LocationDescriptor): LocationDescriptorObject =>
  typeof to === 'string' ? { pathname: to } : to;

export const useHistoryPush = () => {
  const currentQueryParams = useQueryParams();
  const history = useRouter().history;
  return (to: LocationDescriptor, queryParams?: object) => {
    const locationDescription = getLocationDescriptionObject(to);
    locationDescription.search = stringify(_.omitBy({ ...currentQueryParams, ...queryParams }, _.isEmpty));

    history.push(locationDescription);
  };
};
