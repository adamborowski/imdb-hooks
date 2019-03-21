import { History, LocationDescriptorObject } from 'history';

export const getLocationDescriptionObject = (to: History.LocationDescriptor): LocationDescriptorObject =>
  typeof to === 'string' ? { pathname: to } : to;
